---
title: anteをコンパイルするときの謎つまづきポイント
date: "2022-06-18T22:12:03.284Z"
description: ""
category: "tech"
---
 
Anteという、新しめの言語がある。

Ante low-level functionnal language  
https://antelang.org/  

C++のような手続き型言語とRush, Haskelのような関数型言語の中間を目指しているらしい。Rustほど真面目にメモリ安全を目指さない分、自由度が高く書きやすい言語を目指しているようだ。特徴的なのは、Algebraic Effectかな、プロダクションレベルでこの仕様を使える最初の言語になりそう。（LISP・・・？なんですかそれ）

使うには自分でAnteのコンパイラ（Rust製）をコンパイルする必要があるようだ。コンパイラのリポジトリは以下である。

jfecher/ante  
https://github.com/jfecher/ante  

本記事はこのコンパイラをコンパイルするうえでつまづいたポイントを後世のために残しておくためのものである。

## 環境 &　ビルド法
環境はWSL: Ubuntu20.04

ビルドは以下のコマンドを用いて行った。
```
$ cargo install llvmenv
$ llvmenv init
$ llvmenv build-entry -G Makefile -j7 13.0.0
$ llvmenv global 13.0.0
$ LLVM_SYS_130_PREFIX=$(llvmenv prefix)
$ cargo build
```
llvm 13.0.0も自前でビルドする方式である。

## ポイント1  error: a destructor cannot be ‘constexpr‘

### 問題
```
$ llvmenv build-entry -G Makefile -j7 13.0.0
```
の部分のコンパイルで、
```
error: a destructor cannot be ‘constexpr‘
```
というエラーが出る。

### 対処法
gcc, g++のバージョンが古いことが原因。現在のllvmはgcc-9ではコンパイルできない。aptからgcc-10, g++-10を入れて、update-altanativeでデフォルト化する。
```
sudo apt install gcc-10 g++-10
```
update-altanativeについては、ここを参照  
https://students-tech.blog/post/change-gcc.html

## ポイント2  mach-o/compact_unwind_encoding.h が無い

### 問題
```
$ llvmenv build-entry -G Makefile -j7 13.0.0
```
の部分のコンパイルで、
```
fatal error: mach-o/compact_unwind_encoding.h: No such file or directory
```
というエラーが出る。

### 対処法
ここに記述がある。  
https://github.com/llvmenv/llvmenv/issues/115#issuecomment-1072951262  
super hackyだがこれしかないようだった。
つまり、mach-oディレクトリを作成し、そこにネットからググって取ってきたcompact_unwind_encoding.hを作るという方法だ。環境にもよるかもしれないが、以下の位置にファイルを配置すれば良い。  
`/home/{ユーザー名}/.cache/llvmenv/13.0.0/tools/lld/MachO/mach-o/compact_unwind_encoding.h`

## ポイント3 sys/cdefs.hがない
### 問題
```
$ llvmenv build-entry -G Makefile -j7 13.0.0
```
の部分のコンパイルで、
```
sys/cdefs.h: そのようなファイルやディレクトリはありません
```
というエラーが出る。

### 対処法
ここに記述がある。  
https://qiita.com/milmilk/items/e4a8821abbf04c3c942c  

これでOK
```
sudo apt install libc6-dev-i386
```

## ポイント4 なぜか対応するllvmがないといわれる。
### 問題
```
$ cargo build
```
の部分でllvm-sysのコンパイル中に対応するllvmのバージョンがないといわれる

### 対処法
使っていたshellがzshだったので、llvmenvのgitに書いてある、zsh integrationを行った。  
https://github.com/llvmenv/llvmenv#zsh-integration  

```
source <(llvmenv zsh)
```
を`.zshrc`に書き込み。

これでできるようになったが、単にshellに入りなおすだけでも良かったのかも。（llvmenv関連の環境変数の読み込み？）


## 終わりに
コンパイル時間がかかった。コントリビュートできたらしたい、rustかけないけど逆説的に勉強モチベがわきました。
