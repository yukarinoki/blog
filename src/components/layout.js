import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
import { grayColor, mainColor, accentColor, textColor } from "../utils/color"
import { mainAreaWidth, sideBarWidth } from "../utils/width"
import { Header } from "./header"
import { rhythm, scale } from "../utils/typography"

const GlobalStyle = createGlobalStyle`
  :root {
    --bg-color: ${mainColor.dark};
    --bg-light-color: ${mainColor.darkest};
    --bg-surface: ${mainColor.normal};
    --fg-color: ${textColor.primary};
    --text-color: ${textColor.primary};
    --text-secondary: ${textColor.secondary};
    --header-color: ${accentColor.primary};
    --fg-demisub-color: ${textColor.secondary};
    --fg-sub-color: ${textColor.dim};
    --fg-link-color: ${accentColor.primary};
    --fg-link-visited-color: ${accentColor.tertiary};
    --bg-article-color: ${mainColor.dark};
    --fg-article-color: ${mainColor.dark};
    --border-color: ${grayColor.border};
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: ${grayColor.border} ${mainColor.darkest};
  }
  *::-webkit-scrollbar {
    width: 8px;
  }
  *::-webkit-scrollbar-track {
    background: ${mainColor.darkest};
  }
  *::-webkit-scrollbar-thumb {
    background: ${grayColor.border};
    border-radius: 4px;
  }

  ::selection {
    background: ${grayColor.selection};
    color: ${accentColor.primary};
  }

  body {
    background-color: ${mainColor.darkest};
  }

  article {
    background-color: ${mainColor.dark};
  }

  h1 {
    color: ${accentColor.primary};
    text-shadow: 0 0 20px rgba(0, 255, 242, 0.15);
  }

  h2, h3, h4, h5, h6 {
    color: ${textColor.primary};
    font-family: "JetBrains Mono", "Noto Sans JP", monospace;
  }

  /* Markdown-style prefix for article headings */
  article > main h2::before {
    content: "## ";
    color: ${accentColor.primary};
    opacity: 0.5;
  }
  article > main h3::before {
    content: "### ";
    color: ${accentColor.primary};
    opacity: 0.4;
  }

  blockquote {
    margin-left: 0;
    padding-left: ${rhythm(1)};
    border-left: 3px solid ${accentColor.primary};
    color: ${textColor.secondary};
    font-style: italic;
  }

  table {
    display: block;
    overflow: auto;
  }

  a {
    color: ${accentColor.primary};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease, text-shadow 0.2s ease;
  }
  a:hover {
    border-bottom-color: ${accentColor.primary};
    text-shadow: 0 0 8px rgba(0, 255, 242, 0.4);
  }
  a:visited {
    color: ${accentColor.tertiary};
  }

  /* prismjs code blocks */
  .gatsby-highlight {
    background-color: ${mainColor.dark};
    border: 1px solid ${grayColor.border};
    border-radius: 2px;
    margin: ${rhythm(1)} 0;
    padding-left: 0.5em;
    overflow: auto;
    position: relative;
  }
  .gatsby-highlight::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, ${accentColor.primary}, ${accentColor.tertiary});
    opacity: 0.6;
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
    background: ${mainColor.normal};
    border: 1px solid ${grayColor.border};
    border-bottom: none;
    width: 100%;
    border-radius: 2px 2px 0 0;
    overflow: hidden;
    margin-top: ${rhythm(1)};
  }
  .gatsby-code-title span {
    display: inline-block;
    height: calc(${rhythm(1)} - 3px);
    position: relative;
    color: ${accentColor.primary};
    background: ${mainColor.light};
    border-bottom-right-radius: 2px;
    padding: 0 8px 4px 8px;
    top: -3px;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8em;
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

  /* Inline code */
  :not(pre) > code {
    background: ${mainColor.normal};
    border: 1px solid ${grayColor.border};
    border-radius: 3px;
    padding: 0.15em 0.4em;
    color: ${accentColor.primary};
    font-family: "JetBrains Mono", monospace;
    font-size: 0.85em;
  }

  /* HR styling */
  hr {
    background: linear-gradient(90deg, ${accentColor.primary}, ${accentColor.tertiary});
    height: 1px;
    border: none;
  }
`

const LayoutStyle = styled.div`
  display: grid;
  grid-template-areas:
    "left header header"
    "left main   right"
    "left footer right";
  grid-template-rows: ${rhythm(5)} max-content auto;
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
    border-radius: 2px;
    max-width: ${rhythm(mainAreaWidth)};
    padding: ${rhythm(0.5)};
    margin-left: ${rhythm(0.3)};
    background-color: ${mainColor.dark};
    color: ${textColor.primary};
    border: 1px solid ${grayColor.border};
    border-top: 2px solid ${accentColor.primary};
    box-shadow: 0 0 20px rgba(0, 255, 242, 0.05);
  }
  & > div:nth-of-type(2) {
    grid-area: right;
    background-color: ${mainColor.darkest};
    @media (max-width: ${rhythm(mainAreaWidth + sideBarWidth)}) {
      display: none;
    }
  }
  & > footer {
    grid-area: footer;
    padding: ${rhythm(1)} ${rhythm(1)} ${rhythm(1)};
    background-color: ${mainColor.normal};
    color: ${textColor.secondary};
    border-top: 1px solid ${grayColor.border};
    font-family: "JetBrains Mono", monospace;
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

const Layout = ({ location, title, children, rightSide }) => {
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
        <span style={{ opacity: 0.5 }}>&gt;</span> {new Date().getFullYear()}, Built with Gatsby
      </footer>
    </LayoutStyle>
  )
}

export default Layout
