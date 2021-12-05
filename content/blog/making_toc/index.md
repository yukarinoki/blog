---
title: gatsby-blogにtable of contentを付ける
date: "2020-11-19T22:12:03.284Z"
description: ""
---

# 概要
gatsbyで作られたブログに
* リンクが機能していて
* スクロールに追従する  
目次をつける方法について

MDX pluginは使わずに`gatsby-transformer-remark`の元で実現しています。

## graphQLでtable of contents

`gatsby-transformer-remark`を使うと、gatsbyのgraphQLにいろいろな項目が追加されますが、そのなかに`table of contents`があります。  

まず、これをblog postのtemplateから読み取りましょう。
```javascript:title=template/blog-post.js
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents //←これ追加
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
```
そして、得られた`tableOfContents`を（ここらへんは個人の実装のより異なりますが）、自分の作った`tableOfContents`用のcomponentに渡します。

```javascript:title=templates/blog-post.js
const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout 
      location={location} title={siteTitle}
      rightSide={
                  <>
                    <Bio/> 
                    <TOC tocitems={data.markdownRemark.tableOfContents}/> // <- これ
                  </>
                }
     > 
....................中略..................
)
```
うけとる、TOC componentはこんな感じ。`tableOfContents`は生のhtmlなので`dengerouslySetInnerHTML`で渡します。
```javascript:title=components/toc.js
import React from "react"
import styled from "styled-components"
import { rhythm, scale } from "../utils/typography"

const TOCInner = ({ className, tocitems }) => {
    return (
        <div classname={className} dangerouslySetInnerHTML={{__html: tocitems}} />
    )
}

const TOC = styled(TOCInner)`
padding: ${rhythm(0.5)} ${rhythm(0.25)};
padding-top: ${rhythm(0.5)}
font-style: italic;
color: var(--fg-demisub-color);
${scale(-3 / 8)};
& > a {
  line-height: 0;
}
`
export default TOC
```

この時点で見た目だけまともなのができますが、**まだpage内リンクは機能していません**　（ハリボテ・・・）
## page内リンクが機能するようにする
上で作ったtable of contentsが動かないのは、**page内の`<h1> ~ <h6>`に`id`が設定されていないからです。** なので`id`を設定するためにpluginを入れます。

`id`を設定してくれる~~（と嘯いている）~~ pluginはいくつかありますが、  
`gatsby-remark-autolink-headers`  を使ってください。  
https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/  


**`gatsby-remark-slug`や`gatsby-remark-heading-slug`はgraphQLのtableOfContentsがなにも返さなくなるので使わないように**

```
npm i gatsby-remark-autolink-headers
```
```javascript:title=gatsby-config.js
resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-code-titles`,
          `gatsby-remark-autolink-headers`, // <- これ追加
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
```

そうするとリンクが機能するようになります。

## スクロールに目次が追従するようにする
（僕なんかからすると）モダンなデザインに思えますが、現在ではcssに`position: sticky`を設定するだけでこのような動作を実現することができます。
```javascript:title=toc.js
const TOC = styled(TOCInner)`
top: 0px;
padding: ${rhythm(0.5)} ${rhythm(0.25)};
padding-top: ${rhythm(0.5)};
margin-top: ${rhythm(0.5)};
margin-left: ${rhythm(0.20)};
margin-right: ${rhythm(0.20)};
position: sticky; // <-これ
........
```

しかし、単純に`position: sticky`を設定するだけでは、うまく動かない場合がしばしばあります。  

具体的には、
* 親要素のどれかに、`overflow: hidden` `overflow: auto` が設定されている。
* その要素が動ける範囲がない
* その要素が固定される位置が明示されていない  
などの場合があります。

僕の場合も動かず、原因は3番目でした。  

要素の位置を明示するために
```javascript:title=toc.js
const TOC = styled(TOCInner)`
top: 0px; // <- これ
padding: ${rhythm(0.5)} ${rhythm(0.25)};
padding-top: ${rhythm(0.5)};
margin-top: ${rhythm(0.5)};
margin-left: ${rhythm(0.20)};
margin-right: ${rhythm(0.20)};
position: sticky; 
........
```
を指定したら動きました。

## まとめ
CSSがうまく動かない系バグはエラーメッセージがないので原因究明が大変です。`position: sticky`が動かない **理屈** も分かり次第追記しようと思います。