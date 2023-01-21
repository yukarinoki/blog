---
title: swager-codegenのまともな使い方
date: "2023-01-22T22:12:03.284Z"
description: ""
category: "tech"
---

## swagger

SwaggerはAPIの仕様記述言語とツール群です。APIの仕様書をYAMLまたはJSONの形式で記述し、Swagger EditorやSwagger UIを使って可視化・共有することができます。

そして、ちょっとすごいところはSwaggerで書かれたAPI記述をサーバーのコード、クライアントのコードに変換することができます。そのためのツールがswagger-codegenです。

## swagger-codegen

swagger-codegen
https://github.com/swagger-api/swagger-codegen

swagger-codegenには、goやnodejsをはじめとした複数の言語やフレームワークを対象としたバックエンドを含んでいます。今回はtype-scriptのaxiosクライアント、nodejsのサーバーコードを生成してみました。

## 手順

### cloneとbranchの切り替え

まず、[swagger-codegen](https://github.com/swagger-api/swagger-codegen) をクローンします。
クローンできたら、branchを自分のopenapi記述のバージョンによって切り替えます。
openapi2.0なら`master`、openapi3.0なら`3.0.0`です。私は`3.0.0`のブランチを利用しています。
私は、最新コミットでやりましたが、バージョンを固定したい方は適当なTagにcheckoutしてください。
僕は`commit 8f191f46a853bed86debc74f10f242712ae4758e`でやっています。

## build swagger-codegen

いくつかのbuild方法がありますが、Dockerを使うのが最も簡単な方法だと思います。
Dockerのイメージのビルド、swagger-codegenのビルドを一括でやってくれるshellスクリプトが用意されています。

```shell
./run-in-docker.sh mvn package
```

5分ぐらいでビルド完了して以下の出力が出ます。

```shell
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary for swagger-codegen-project 3.0.38-SNAPSHOT:
[INFO] 
[INFO] swagger-codegen-project ............................ SUCCESS [ 11.138 s]
[INFO] swagger-codegen (core library) ..................... SUCCESS [03:25 min]
[INFO] swagger-codegen (executable) ....................... SUCCESS [ 23.943 s]
[INFO] swagger-codegen (maven-plugin) ..................... SUCCESS [ 10.012 s]
[INFO] swagger-generator .................................. SUCCESS [01:19 min]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  05:31 min
[INFO] Finished at: 2023-01-21T04:56:44Z
[INFO] ------------------------------------------------------------------------
```

これが出れば成功です。

試しに、`./run-in-docker.sh langs`を実行してみましょう。利用可能なバックエンドの一覧が表示されるはずです。

```shell
{your host name}@ swagger-codegen % ./run-in-docker.sh langs                     
++ dirname ./run-in-docker.sh
+ cd .
+ maven_cache_repo=/Users/{your host name}/.m2/repository
+ mkdir -p /Users/nao/.m2/repository
++ id -u
++ id -g
+ docker run --rm -it -w /gen -e GEN_DIR=/gen -e MAVEN_CONFIG=/var/maven/.m2 -u 501:20 -v /Users/nao/test/swagger-codegen:/gen -v /Users/nao/.m2/repository:/var/maven/.m2/repository --entrypoint /gen/docker-entrypoint.sh maven:3-jdk-8 langs
Available languages: [dart, aspnetcore, csharp, csharp-dotnet2, go, go-server, dynamic-html, html, html2, java, jaxrs-cxf-client, jaxrs-cxf, inflector, jaxrs-cxf-cdi, jaxrs-spec, jaxrs-jersey, jaxrs-di, jaxrs-resteasy-eap, jaxrs-resteasy, micronaut, spring, nodejs-server, openapi, openapi-yaml, kotlin-client, kotlin-server, php, python, python-flask, r, ruby, scala, scala-akka-http-server, swift3, swift4, swift5, typescript-angular, typescript-axios, typescript-fetch, javascript]
```

## openapi.yamlからコードをgenerate

今回利用するbackendは、clientが`typescript-axios`、backendが`nodejs-server`です。clientは複数の選択肢がありますが、serverはjavascript(typescript)なら`nodejs-server`しか選択肢がないようです。

まず、自分の作成したopenapi.yamlをswagger-codegenの直下にコピーします。
その上で、以下を実行します。

```shell
./run-in-docker.sh generate -i openapi.yaml \
    -l typescript-axios -o /gen/out/test-client -DpackageName=test-client # client

./run-in-docker.sh generate -i openapi.yaml \
    -l nodejs-server -o /gen/out/test-server -DpackageName=test-server # server
```

すると以下のような出力が出て、生成が完了します。

```shell
...
05:00:38.447 [Thread-1] INFO  i.s.codegen.v3.AbstractGenerator - writing file /gen/out/test-client/tsconfig.json
05:00:38.459 [Thread-1] INFO  i.s.codegen.v3.AbstractGenerator - writing file /gen/out/test-client/.swagger-codegen-ignore
05:00:38.470 [Thread-1] INFO  i.s.codegen.v3.AbstractGenerator - writing file /gen/out/test-client/.swagger-codegen/VERSION
```

`swagger-codegen/out/test-{client, server}`に出力されたコードがあるはずです。

### 実行

生成された各ディレクトリにREADME.mdがあります。そこにどうやって生成コードを実行すればいいのか書いてあります。
今回の場合、どちらとも以下です。

```shell
npm install
npm start
```

これで実行できました。

## まとめ

今回は、swagger-codegenを使ってopenapi記述から、javascriptのclient, serverのコードを生成してみました。もちろん、実装上必要なコード全てが生成できるわけではありませんが、参考にするには十分なコードが生成されていると思います。このコードをパーツとして切り貼りして開発すれば、実装の速度や正確性も向上するのではないかと思っています。
