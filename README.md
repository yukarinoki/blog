URL: https://blog.yukarinoki.com/  
https://epic-golick-eb81d7.netlify.app/  

## Routes

- `/`: minimal Index linking to Blog and Works; no biography or personal imagery.
- `/blog/`: the existing post listing.
- Existing article URLs and `content/blog` stay unchanged.
- `/works/`: Works listing.
- `/works/flick/`: standalone フリック日和 app in `static/works/flick/`. Gatsby copies these files to `public/works/flick/`. The portable source was checksum-verified before integration; subsequent app updates live in this repository.
- `/works/flick` redirects to `/works/flick/` using `static/_redirects`, so relative script/style URLs work on Netlify.

## Local build

This repository uses the existing Gatsby 2 dependency lockfile. The current change was verified with Node 14.21.3 / npm 6.14.18 and two Gatsby workers:

```sh
npm ci --no-audit --no-fund
GATSBY_TELEMETRY_DISABLED=1 GATSBY_CPU_COUNT=2 npm run build
```

In PowerShell, set `$env:GATSBY_TELEMETRY_DISABLED='1'` and `$env:GATSBY_CPU_COUNT='2'` before `npm run build`. Limiting workers avoids a stalled build on the tested Windows host. Node 14 is a legacy compatibility runtime, not a recommendation for new projects. A Gatsby/runtime upgrade should be handled separately.

Serve the generated `public/` directory with a static server that supports directory indexes and trailing-slash redirects. `npm run serve` can preview Gatsby pages; verify the standalone app with the host's static directory behavior as well.

## Publishing

The README identifies the existing Netlify site above; this checkout contains no CI workflow or Netlify configuration proving its current production branch/build settings. Before publishing, verify in the existing Netlify project that it is connected to `yukarinoki/blog`, with production branch `master`, build command `npm run build`, and publish directory `public`. Use the tested legacy runtime or an already-verified compatible build environment; set `GATSBY_CPU_COUNT=2` if needed.

Only after publication is authorized, commit/review these changes and push/merge them to the verified production branch. Confirm the Netlify deployment succeeds, then check `/`, `/blog/`, `/works/`, `/works/flick/`, the slash redirect, one old article URL, and `/rss.xml` on the custom domain. Do not publish a partial build or change the original Sites app's sharing settings.

The app has no backend, account requirement, remote dependencies, or embedded secrets. Publishing these static files makes the app available on the blog's public host. Records remain in each visitor's browser under `flick-biyori-v1`; records from the original Sites origin do not migrate automatically. Real iPhone Safari touch/IME checks remain a device QA step.

Single-character practice offers normal input, row-only, and direction-only drills. Row-only grades the row regardless of gesture direction; direction-only grades one of center/left/up/right/down regardless of row, using direction buttons or a flick from the center. Modified kana use the base kana's mapping (ぎ → き, ょ → よ); ゆ/よ map to up/down and を/ん to left/up. These drills use the practice controls, preserving the native-keyboard preference for normal input. Words and the timed challenge keep their original full-input behavior.

New records store `drill: full|row|direction`; historical records without this field display as normal input. Row/direction rates use questions per minute and are labeled separately in results/history. Daily totals aggregate all answers and practice time. Switching an active exercise requires the existing confirmation, and finishing records the current exercise before switching.
