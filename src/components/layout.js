import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
import { grayColor, mainColor, subColor } from "../utils/color"
import { mainAreaWidth, sideBarWidth } from "../utils/width"
import { Header } from "./header"
import { rhythm, scale } from "../utils/typography"

const GlobalStyle = createGlobalStyle`
  :root {
    --bg-color: ${grayColor.black};
    --bg-light-color: ${grayColor.darkest};
    --fg-color: hsl(0, 100%, 100%, 0.9);
    --fg-demisub-color: hsl(0, 100%, 100%, 0.78);
    --fg-sub-color: hsl(0, 100%, 100%, 0.65);
    --fg-link-color: ${subColor.normal};
    --fg-link-visited-color: ${subColor.light};
    @media (prefers-color-scheme: dark) {
      --bg-color: ${grayColor.black};
      --bg-light-color: ${grayColor.darkest};
      --fg-color: hsl(0, 100%, 100%, 0.9);
      --fg-demisub-color: hsl(0, 100%, 100%, 0.78);
      --fg-sub-color: hsl(0, 100%, 100%, 0.65);
      --fg-link-color: ${subColor.normal};
      --fg-link-visited-color: ${subColor.light};
    }
  }
  body {
    background-color: var(--bg-light-color);
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${mainColor.dark};
    @media (prefers-color-scheme: dark) {
      color: var(--fg-color);
    }
  }
  blockquote {
    margin-left: 0;
    padding-left: ${rhythm(1)};
    border-left: ${rhythm(1 / 8)} solid ${grayColor.light};
    color: var(--fg-demisub-color);
  }
  table {
    display: block;
    overflow: auto;
  }
  a {
    color: var(--fg-link-color);
  }
  a:visited {
    color: var(--fg-link-visited-color);
  }
  /* prismjs */
  .gatsby-highlight {
    background-color: #2f2f2f;
    border-radius: 0.3em;
    margin: ${rhythm(1)} 0;
    padding-left: 0.5em;
    overflow: auto;
  }
  @media (max-width: 640px) {
    .gatsby-highlight {
      ${scale(-0.25)}
    }
  }
  .gatsby-highlight pre[class*="language-"].line-numbers {
    padding: 0;
    padding-left: 2.8em;
    overflow: initial;
  }
  .gatsby-code-title {
    display: block;
    background: #2f2f2f;
    width: 100%;
    border-top-left-radius: 0.3em;
    border-top-right-radius: 0.3em;
    overflow: hidden;
    margin-top: ${rhythm(1)};
  }
  .gatsby-code-title span {
    display: inline-block;
    height: calc(${rhythm(1)} - 3px);
    position: relative;
    color: ${grayColor.lightest};
    background: ${grayColor.darker};
    border-top-left-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
    padding: 0 4px 4px 4px;
    top: -3px;
  }
  .gatsby-code-title + .gatsby-highlight {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin-top: 0;
  }
  /* remark footnotes */
  .footnotes {
    ${scale(-1 / 8)}
  }
`
const LayoutStyle = styled.div`
  display: grid;
  grid-template-areas:
    "left header ."
    "left main   right"
    "left footer right";
  grid-template-rows: max-content max-content auto;
  grid-template-columns: 0 100% 0;
  max-width: ${rhythm(mainAreaWidth)};
  @media (min-width: ${rhythm(mainAreaWidth + sideBarWidth)}) {
    grid-template-columns: auto ${rhythm(mainAreaWidth)} ${rhythm(sideBarWidth)};
    max-width: none;
    width: 100%;
  }
  @media (min-width: ${rhythm(mainAreaWidth + sideBarWidth * 2)}) {
    grid-template-columns: ${rhythm(sideBarWidth)} ${rhythm(mainAreaWidth)} ${rhythm(
        sideBarWidth
      )};
    width: ${rhythm(mainAreaWidth + sideBarWidth * 2)};
  }
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
  & > div:nth-of-type(1) {
    grid-area: header;
  }
  & > main {
    grid-area: main;
    max-width: ${rhythm(mainAreaWidth)};
    padding: ${rhythm(1)};
    background-color: var(--bg-color);
    color: var(--fg-color);
    box-shadow:
      0 1.9px 2.5px rgba(0, 0, 0, 0.057),
      0 5px 6.1px rgba(0, 0, 0, 0.076),
      0 10.1px 11.4px rgba(0, 0, 0, 0.086),
      0 19.2px 19.8px rgba(0, 0, 0, 0.092),
      0 38.4px 34.8px rgba(0, 0, 0, 0.1),
      0 101px 74px rgba(0, 0, 0, 0.13);
  }
  & > div:nth-of-type(2) {
    grid-area: right;
    @media (max-width: ${rhythm(mainAreaWidth + sideBarWidth)}) {
      display: none;
    }
  }
  & > footer {
    grid-area: footer;
    padding: ${rhythm(1)} ${rhythm(1)} ${rhythm(1)};
    background-color: var(--bg-color);
    color: var(--fg-demisub-color);
  }
  & > footer p {
    margin-bottom: ${rhythm(0.25)};
    ${scale(-0.25)};
    line-height: 1.25;
  }
  & > footer > aside {
    @media (min-width: ${rhythm(mainAreaWidth + sideBarWidth)}) {
      display: none;
    }
  }
  & > footer > div:first-child {
    margin-bottom: ${rhythm(0.25)};
  }
  & > footer > div:last-child {
    margin-top: ${rhythm(3 / 8)};
  }
`



const Layout = ({ location, title, children , rightSide}) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
      }
    `
  )
  return (
    <LayoutStyle>
      <GlobalStyle />
          <div>
            <Header title={site.siteMetadata.title} />
          </div>
          <main>{children}</main>
          <div>{rightSide}</div>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
    </LayoutStyle>
  )
}

export default Layout
