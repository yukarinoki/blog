---
title: Jun 2020 読んだもの、やったこと
date: "2020-06-20T22:12:03.284Z"
description: ""
category: "diary"
---

# やったこと
## libfuzzer tutorial
https://github.com/google/fuzzing/blob/master/tutorial/libFuzzerTutorial.md  
  
fuzzingとは、ランダムな入力をプログラムに入力してバグを検出すること。特にメモリ周り(heap-overflow, stack-overflow)。 
コードカバレッジが100%になるまで上手いこと入力を変化させてくれる。  
そんなん上手くいくのかと思うが、上手くいくときもあるし、上手くいかないときにプログラマが入力のヒントをいれることもできる。  
  
実際、CVE-2014-0160　https://www.ipa.go.jp/security/ciadr/vul/20140408-openssl.html　　 
はfuzzingで検出できる。（できるだけで、fuzzingによって初めて発見されたかは自信がない）    
  
僕はテストとか人間が書くべきなのか？と思っており、fuzzingに希望を見出している。（テストを書くのは（反例を作るのは）人間の脳には難しいと思う）    
ただ、メモリリークとかを検出するのは難しいらしい。  
  
やりたいひとはgitpodで環境構築したので下のリポジトリからどうぞ    
https://github.com/yukarinoki/fuzzing-tutorial  
  
仕組みが知りたい人は  
https://github.com/google/fuzzing/blob/master/docs/structure-aware-fuzzing.md  

# 読んだもの
## Into Thin Error: Mountaineer Ed Viesturs on Making Mistakes
https://slate.com/news-and-politics/2010/06/into-thin-error-mountaineer-ed-viesturs-on-making-mistakes.html
  
登山家が極限状態でのミスの経験とかミスに対する考えとかを喋ってる。  
山登ってみたいけど死ぬのはこわい。
登山家の課題は、神様が（地球が）与えた形で自然に定まってるから、羨ましいなと思う。ピオレドールとかすごく夢あっていい。
コンピュータ科学はマッチポンプみたいなところがあるので。
  
**天才** Ueli Stechが死んだときからずっと思ってるけど、どれほど能力があっても山に登ってれば漸近的に100%死ぬから、そういう事実と登山家が生きたいと思う感情はどういう風に混ざり合っているのか、どこかの登山家にエッセイでも書いて欲しい。
https://www.youtube.com/watch?v=VUWBbepsdmY  


## 日本人の｢給料安すぎ問題｣の意外すぎる悪影響
https://toyokeizai.net/articles/-/357011?page=4　     　
    
「300円の牛丼が美味しいから日本人は幸せ」みたいな論法を聞くと、この記事に書いてあるような気持ちがむくむく湧いてくる。
**monopsony**という言葉は覚えておこうと思った。


## console.mihai()
**Firefoxのコンソールを立ち上げ（F12）console.mihai()と入力すると表示される**URLから読める。  

いい話、エンジニアっていい仕事ですね。

## ライフタイムで参照を検証する
https://doc.rust-jp.rs/book/second-edition/ch10-03-lifetime-syntax.html  
   
Rustを理解中。ライフタイムみたいな概念は初めて知ったが、C++で構造体・クラスにポインタを入れるときには「このポインタがいつまでもつかちゃんと管理し続けられるのかな・・・」と毎回思う。C++はそれをIQで何とかする設計なので、書くときはお腹に力をいれていたけど、Rustなら安心できそう。  
