---
title: "Building a Volatility Oracle Prototype: Computing Realized Volatility from Orderbook Data and Serving It On-Chain"
date: "2026-04-10T08:45:00.000Z"
description: "A product concept for an on-chain volatility oracle that computes realized volatility from orderbook microstructure data, with TypeScript prototype and Solidity interface."
category: "tech"
---

> **日本語要約**: DeFiに不足しているボラティリティデータを提供するオンチェーンOracleのプロダクトコンセプトです。オーダーブックデータからrealized volatilityを算出し、スマートコントラクトに配信する仕組みをTypeScriptプロトタイプとSolidityインターフェースのコード例とともに提案します。

I've been thinking about a gap in DeFi infrastructure that seems surprisingly under-served: volatility data. We have robust price oracles, but almost nothing purpose-built for serving volatility estimates on-chain. This post walks through a product concept I've been prototyping -- a volatility oracle that computes realized vol from high-frequency orderbook data and makes it available to smart contracts.

## The Problem: DeFi Needs Volatility, Not Just Price

Price oracles are table stakes at this point. Every lending protocol, every DEX, every derivatives platform relies on some form of price feed. But volatility? That's a different story entirely.

Think about who actually needs vol data on-chain:

**Options protocols** are the obvious case. You can't price options without implied volatility, and you can't calibrate your vol surface without realized vol as a reference. Protocols that sell options on-chain are essentially flying blind or relying on off-chain computation that users have to trust.

**Risk management** in lending protocols is another big one. Liquidation thresholds are typically static -- you set a collateral ratio of 150% and call it a day. But a 150% ratio means very different things when ETH is trading at 10% annualized vol versus 80%. A vol-aware liquidation engine could dynamically adjust thresholds, reducing unnecessary liquidations during calm markets and protecting the protocol during volatile ones.

**Liquidation engines** themselves could benefit from vol-adjusted parameters. If you know volatility is spiking, you can widen your liquidation buffers proactively rather than reacting after the damage is done.

The current state of affairs is that protocols either hardcode assumptions about volatility, compute it off-chain in trusted backends, or simply ignore it. None of these are great.

## The Concept

The idea is straightforward: ingest high-frequency orderbook data from major exchanges, compute realized volatility using multiple estimators, and push the results on-chain as an oracle feed that any smart contract can consume.

Here's the high-level architecture:

```
Binance WS → Aggregator (0.5s VWAP) → Vol Calculator → Oracle Contract → DeFi Consumers
```

The key insight is that orderbook microstructure data -- the actual bids and asks updating dozens of times per second -- gives us much better volatility estimates than the traditional approach of using daily OHLC candles. We're capturing information about price dynamics that gets lost when you downsample to hourly or daily bars.

The aggregator computes volume-weighted average prices at 500ms intervals, giving us a clean price series that incorporates the full depth of the orderbook rather than just last-trade prices. This feeds into the volatility calculator, which maintains rolling windows and outputs annualized vol estimates. Those estimates get pushed to a Solidity oracle contract whenever they change by more than a configurable threshold.

## Volatility Computation: Multiple Estimators

Not all volatility estimators are created equal. I'm implementing several and letting consumers choose which one suits their use case.

### Standard Realized Volatility

The classic approach. Take a rolling window of log returns, compute the standard deviation, annualize it.

$$\sigma_{realized} = \sqrt{\frac{252}{n} \sum_{i=1}^{n} (r_i - \bar{r})^2}$$

Simple, well-understood, but inefficient -- it only uses closing prices and throws away intra-period information.

### Parkinson Estimator

Uses the high-low range within each period, which captures more information about price dynamics:

$$\sigma_{parkinson} = \sqrt{\frac{1}{4n \ln 2} \sum_{i=1}^{n} (\ln H_i - \ln L_i)^2}$$

This is roughly 5x more efficient than the close-to-close estimator for the same number of observations. The tradeoff is that it assumes continuous trading (no gaps), which is fine for crypto markets.

### Garman-Klass Estimator

Goes further by using full OHLC data:

$$\sigma_{GK} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} \left[ \frac{1}{2}(\ln H_i - \ln L_i)^2 - (2\ln 2 - 1)(\ln C_i - \ln O_i)^2 \right]}$$

Even more efficient, roughly 8x better than close-to-close for the same observation count.

### Why Microstructure Data Matters

With traditional OHLC data from daily candles, you're working with maybe 30 data points for a monthly vol estimate. With 500ms VWAP snapshots from orderbook data, you get ~170,000 observations per day. Even accounting for the autocorrelation in high-frequency data (which you need to correct for), the statistical precision of your vol estimate is dramatically better.

More importantly, you can detect vol regime changes in minutes rather than days. For DeFi protocols that need to react quickly -- say, tightening liquidation parameters during a flash crash -- this responsiveness is the whole point.

## Live Dashboard Prototype

Here's an interactive prototype of the volatility oracle dashboard. It simulates a real-time BTC price feed and computes all three volatility estimators continuously. Try adjusting the window size and update threshold, or hit "Inject Volatility Spike" to see how each estimator responds to sudden regime changes.

<iframe src="/visualizations/vol-oracle-dashboard.html" width="100%" height="600" frameborder="0" style="border: 1px solid #30363d; border-radius: 2px;"></iframe>

## TypeScript Prototype: Real-Time Vol Computation

Here's the core of the prototype. This service connects to a WebSocket feed, maintains a rolling window of VWAP prices, and computes realized vol on demand.

```typescript
import WebSocket from "ws";

interface PricePoint {
  timestamp: number;
  vwap: number;
}

class VolatilityService {
  private prices: PricePoint[] = [];
  private readonly windowSize: number;
  private readonly aggregationMs: number;
  private currentBucket: { sumPQ: number; sumQ: number; ts: number } | null = null;

  constructor(windowSize = 3600, aggregationMs = 500) {
    this.windowSize = windowSize; // seconds of history to keep
    this.aggregationMs = aggregationMs;
  }

  connectToFeed(wsUrl: string, symbol: string): void {
    const ws = new WebSocket(wsUrl);
    ws.on("message", (data: string) => {
      const msg = JSON.parse(data);
      if (msg.s === symbol && msg.e === "trade") {
        this.ingestTrade(msg.T, parseFloat(msg.p), parseFloat(msg.q));
      }
    });
  }

  private ingestTrade(timestamp: number, price: number, qty: number): void {
    const bucketTs = Math.floor(timestamp / this.aggregationMs) * this.aggregationMs;
    if (!this.currentBucket || this.currentBucket.ts !== bucketTs) {
      if (this.currentBucket && this.currentBucket.sumQ > 0) {
        this.prices.push({
          timestamp: this.currentBucket.ts,
          vwap: this.currentBucket.sumPQ / this.currentBucket.sumQ,
        });
        this.pruneOldPrices();
      }
      this.currentBucket = { sumPQ: 0, sumQ: 0, ts: bucketTs };
    }
    this.currentBucket.sumPQ += price * qty;
    this.currentBucket.sumQ += qty;
  }

  computeRealizedVol(windowSeconds?: number): number {
    const window = windowSeconds || this.windowSize;
    const cutoff = Date.now() - window * 1000;
    const relevant = this.prices.filter((p) => p.timestamp >= cutoff);
    if (relevant.length < 2) return 0;

    const logReturns: number[] = [];
    for (let i = 1; i < relevant.length; i++) {
      logReturns.push(Math.log(relevant[i].vwap / relevant[i - 1].vwap));
    }

    const mean = logReturns.reduce((a, b) => a + b, 0) / logReturns.length;
    const variance =
      logReturns.reduce((sum, r) => sum + (r - mean) ** 2, 0) / (logReturns.length - 1);

    // Annualize: scale by observations per year
    const obsPerYear = (365.25 * 24 * 3600 * 1000) / this.aggregationMs;
    return Math.sqrt(variance * obsPerYear);
  }

  private pruneOldPrices(): void {
    const cutoff = Date.now() - this.windowSize * 1000;
    this.prices = this.prices.filter((p) => p.timestamp >= cutoff);
  }
}
```

The service exposes the current vol estimate via a simple REST endpoint (not shown here for brevity, but it's a basic Express route returning `{ annualizedVol, timestamp, windowSeconds, sampleCount }`). This is what the oracle updater process polls to decide whether to push a new value on-chain.

A key design choice: the 500ms VWAP aggregation smooths out individual trade noise while preserving meaningful price movements. If you compute returns on raw trade-by-trade data, you get a lot of microstructure noise (bid-ask bounce, etc.) that inflates your vol estimate. The VWAP bucketing handles this elegantly.

## Solidity Interface: The Oracle Contract

On the smart contract side, I want something simple and composable. Here's the interface:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IVolatilityOracle {
    struct VolData {
        uint256 realizedVol;      // Annualized vol in basis points (e.g., 5000 = 50%)
        uint256 parkinsonVol;     // Parkinson estimator
        uint256 garmanKlassVol;   // Garman-Klass estimator
        uint256 timestamp;        // When this was computed
        uint32  windowSeconds;    // Observation window used
        uint16  confidence;       // Sample count / quality metric
    }

    function getVolatility(bytes32 pair) external view returns (VolData memory);
    function getRealizedVol(bytes32 pair) external view returns (uint256 vol, uint256 timestamp);
    function isStale(bytes32 pair, uint256 maxAge) external view returns (bool);

    event VolatilityUpdated(bytes32 indexed pair, uint256 realizedVol, uint256 timestamp);
}

contract VolatilityOracle is IVolatilityOracle {
    mapping(bytes32 => VolData) private _latestVol;
    mapping(address => bool) public authorizedUpdaters;
    uint256 public updateThresholdBps = 100; // Only update if vol changed by >1%

    modifier onlyUpdater() {
        require(authorizedUpdaters[msg.sender], "unauthorized");
        _;
    }

    function pushUpdate(bytes32 pair, VolData calldata data) external onlyUpdater {
        VolData storage current = _latestVol[pair];
        uint256 delta = _absDiff(current.realizedVol, data.realizedVol);
        require(
            delta * 10000 / (current.realizedVol + 1) >= updateThresholdBps,
            "change below threshold"
        );
        _latestVol[pair] = data;
        emit VolatilityUpdated(pair, data.realizedVol, data.timestamp);
    }

    function getVolatility(bytes32 pair) external view returns (VolData memory) {
        return _latestVol[pair];
    }

    function getRealizedVol(bytes32 pair) external view returns (uint256, uint256) {
        VolData storage d = _latestVol[pair];
        return (d.realizedVol, d.timestamp);
    }

    function isStale(bytes32 pair, uint256 maxAge) external view returns (bool) {
        return block.timestamp - _latestVol[pair].timestamp > maxAge;
    }

    function _absDiff(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a - b : b - a;
    }
}
```

A few design decisions worth noting:

**Push model with threshold.** The updater only sends a transaction when vol has changed meaningfully (configurable threshold, defaulting to 1% relative change). This keeps gas costs manageable -- during stable markets, updates might happen every few minutes; during volatile periods, more frequently.

**Staleness check built in.** Consumers can call `isStale()` to verify the data is fresh enough for their use case. A lending protocol might tolerate 5-minute-old data; an options protocol might want sub-minute freshness.

**Multiple estimators in one struct.** Different consumers have different needs. By publishing all three estimators in a single update, we amortize the gas cost across multiple use cases.

**Basis points representation.** Using uint256 with basis points (50% vol = 5000 bps) avoids floating point entirely while giving sufficient precision for any practical application.

## Monitoring Dashboard

I've been building a simple dashboard to visualize the feed in real time -- nothing fancy, just a React frontend with a chart showing the rolling vol estimate, the raw VWAP prices it's computed from, and the on-chain update history. It's useful for debugging and for demonstrating to potential integrators that the feed is responsive and accurate.

The most interesting visualization is overlaying the three estimators. During normal markets they track closely, but during dislocations (flash crashes, sudden liquidity events) the Parkinson estimator reacts fastest because it captures the intra-bucket range expansion immediately. Watching them diverge and reconverge is genuinely interesting from a market microstructure perspective.

## Challenges and Future Work

This prototype works, but there's a gap between "works on my laptop" and "production oracle that protocols depend on." Here's what I'm thinking about:

### Gas Costs

Even with the threshold-based update mechanism, gas costs add up. On L1 Ethereum, pushing updates every few minutes for multiple pairs gets expensive quickly. The obvious answer is deploying on L2s (Arbitrum, Base, etc.) where updates cost fractions of a cent. You could also explore a pull-based model where consumers pay for their own reads from an off-chain data availability layer, but that adds complexity.

### Multi-Source Aggregation

Relying on a single exchange's orderbook is a centralization risk and a manipulation vector. The production version needs to aggregate across multiple venues -- Binance, OKX, Bybit, Coinbase -- and use some form of outlier detection to handle cases where one venue's data diverges (possibly due to manipulation or technical issues).

I'm thinking a median-of-estimators approach across venues, with automatic exclusion of any source that deviates more than 2 standard deviations from the median. This is similar to how existing price oracle networks handle multi-source aggregation.

### Manipulation Resistance

This is the hard problem. If someone knows that a DeFi protocol uses this vol oracle to set liquidation thresholds, they could theoretically manipulate the underlying orderbook data to spike the vol estimate, causing the protocol to widen thresholds, and then exploit the looser parameters.

Defenses include: using longer observation windows (harder to sustain manipulation), requiring consistent signals across multiple venues, implementing rate-of-change limits on the oracle output (vol can't jump more than X% per update), and incorporating TWAP-style smoothing.

### Integration with Oracle Networks

The end game isn't running this as a standalone service. It's getting vol data integrated into existing oracle networks so that it benefits from their existing security models, node operator sets, and consumer ecosystems. The computation methodology described here could run as a module within a decentralized oracle network, with multiple independent node operators each computing vol from their own data sources and reaching consensus on the output.

### Further Estimator Research

There are more sophisticated approaches worth exploring: realized kernels (which handle microstructure noise more elegantly), jump-robust estimators (bi-power variation), and multi-scale realized volatility. Each has tradeoffs between noise sensitivity, computation cost, and the assumptions they make about the price process.

## Wrapping Up

I think there's a real product here. The DeFi options market is growing, lending protocols are getting more sophisticated about risk management, and everyone needs better vol data. The gap between "price oracle" and "volatility oracle" is mostly an engineering challenge at this point -- the statistical methods are well-established, the data sources exist, and the smart contract interface is straightforward.

The prototype is running locally, ingesting Binance trade data and computing vol estimates that look reasonable when compared against Deribit's implied vol surface. Next steps are multi-venue aggregation, a proper deployment on a testnet, and conversations with potential consumers about what API they actually want.

If you're building something in the DeFi derivatives or risk management space and would find a vol oracle useful, I'd love to hear about your requirements. The interface design should be driven by actual consumer needs rather than my assumptions about what's useful.
