---
title: Nov 2020 読んだもの、やったこと
date: "2020-11-02T22:12:03.284Z"
description: ""
---

# やったこと
## ハル本2章の最小リスクヘッジの導出
https://mathlog.info/articles/279
このサイト、画像の大きさが変更できない？

# 読んだもの

## The Complete Idiot’s Guide to the Independence of the Continuum Hypothesis: Part 1 of <=Aleph_0
https://www.scottaaronson.com/blog/?p=4974  

Aaronsonが書いている。連続体仮説の独立性の証明。GedelとCohenの強制法を含めて、何回かで解説するらしい。 Aaronsonは（コロナの影響で暇だったから？）ちょっと頑張って理解したらしい。研究者のバイタリティ＋理解力は本当にすごい。強制法とか日本で理解している人100人 ~ 200人ぐらいの話だと思う。僕も昔から興味はあったんだが、駒場の本屋で開いた本には、理論の本質に入る前の段階の記述が大量で、そっ閉じした記憶がある。

僕は知らなかったが、以下のような強制法の初心者向けガイドがあるらしい。いつか読みたい  
A beginner's guide to forcing  
Timothy Y. Chow  
https://arxiv.org/abs/0712.1320


## Linux カーネルのなかに入り込む GCC
https://www.ibm.com/developerworks/jp/linux/library/l-gcc-hacks/  

gcc拡張について書いてある。知らないものがいくつもあった。例えば、switchの範囲指定。
```c
char calcGradeByScore(int score){
  switch(score) {
  case 0 ... 49:
    return 'F';
  case 50 ... 69:
    return 'C';
  case 70 ... 80:
    return 'B';
  case 80 ... 100:
    return 'A';
  default:
    return 'X';
  }
}
```

## Deprecated scp
https://lwn.net/SubscriberLink/835962/ae41b27bc20699ad/

scpにはちょっとした脆弱性があって、deprecatedになるらしい。ifconfigは実はdeprecatedなのはそれなりに有名な話？scpもifconfigも手癖で使う人が多いから置換するのは難しそう。あと、直感的に使えて便利だからなぁ。

# Loving twins Bitterly Divided by Politics 
 https://www.nytimes.com/2020/11/04/opinion/2020-election-trump-family.html　　

兄弟がトランプサポーターである(民主党支持の)記者が書いた文章。いい文章だと思う。こういうことがアメリカで沢山起きているんだろうなという話だった。twitterは良くない呟きにノーテーションつけるよりも、違う政治的考えの呟きをサジェスチョンする試みをした方が良いと思う。政治的な分断はアルゴリズムから生み出されている側面もあると思う。
共和党支持者には、健康保険に加入できていない人も多い。ギリギリで作り上げられた「今」の生活を守るために、変化をもたらす民主党が嫌悪されるのはその通りなのかもしれない。排他的で属性の違う人を排除することは変化を恐れる心情から生まれているのだと思う。

# キャラハンの時空の幾何学 5.1 ~ 5.3
https://arxiv.org/abs/1502.03808  
を理解したい（というかweb上でブラックホールの画像を生成したい）という気持ちがあり、その実現のために、一般相対論的な幾何学を勉強していくことにした。この本は（数学的な部分は）とてもわかりやすかった。こういう物理と数学を足して二で割ったような本はちゃんと、数学としてのステートメントか物理としてのステートメントかちゃんと書いといてほしい。
