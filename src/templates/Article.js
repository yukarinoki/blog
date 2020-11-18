import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"
import { grayColor } from "../utils/color"
import { rhythm, scale } from "../utils/typography"

const ArticleInner = ({ className, post }) => {
    return (
        <article class={className}>
          <header>
            <h1>{post.frontmatter.title}</h1>
            <p>
                {post.frontmatter.date}
            </p>
          </header>
          <main>
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
          </main>
          <footer>
          </footer>
          <hr />
        </article>
    )
}

export const Article = styled(ArticleInner)`
  & > header > h1 {
    margin: 0 0 ${rhythm(0.25)};
  }
  & > header > p {
    display: block;
    margin-bottom: 0;
    ${scale(-0.25)};
    color: var(--fg-demisub-color);
  }
  & > header > div {
    margin: ${rhythm(0.25)} 0;
  }
  & > main {
    margin-top: ${rhythm(0.5)};
  }
  & > footer {
    margin-bottom: ${rhythm(0.5)};
    a {
      display: inline-block;
      margin-left: ${rhythm(0.25)};
    }
  }
  & > hr {
    margin-bottom: ${rhythm(1)};
  }
  h2 {
    margin-top: ${rhythm(3)};
    padding-bottom: ${rhythm(1 / 16)};
    border-bottom: 1px solid ${grayColor.light};
  }
`