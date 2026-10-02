import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import styled, { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body { margin: 0; background: #101412; color: #e5ebe7; }
`

const Directory = styled.main`
  box-sizing: border-box;
  max-width: 48rem;
  min-height: 100vh;
  margin: 0 auto;
  padding: clamp(2rem, 10vh, 7rem) 1.5rem;
  font-family: ui-monospace, "Cascadia Code", "SFMono-Regular", Consolas, monospace;
  line-height: 1.75;
  overflow-wrap: anywhere;

  h1, h2 { font: inherit; font-weight: 700; color: inherit; }
  h1 { margin: 0 0 2.5rem; font-size: 1.5rem; }
  p { margin: 0 0 1rem; }
  .prompt { color: #a6cbb0; }
  a, a:visited { color: #b9e8c5; text-decoration: underline; text-underline-offset: .25em; }
  a:hover { color: #fff; }
  a:focus { outline: 2px solid #b9e8c5; outline-offset: 5px; }
  ul { list-style: none; padding: 0; margin: 0; }
  li { margin: 0 0 1rem; }
  li a { display: inline-block; padding: .5rem 0; min-height: 44px; box-sizing: border-box; }
  nav { margin-bottom: 3rem; }
  nav a { display: inline-block; padding: .5rem 0; margin-right: 1.5rem; }
  .work { border-top: 1px solid #435348; padding-top: 1.5rem; }
`

const DirectoryLayout = ({ title, children, navigation = true }) => (
  <>
    <Helmet htmlAttributes={{ lang: "ja" }} title={title} titleTemplate="%s">
      <meta name="description" content="Blog and Works" />
    </Helmet>
    <GlobalStyle />
    <Directory>
      {navigation && (
        <nav aria-label="Main navigation">
          <Link to="/">Index</Link>
          <Link to="/blog/">Blog</Link>
          <Link to="/works/" aria-current="page">Works</Link>
        </nav>
      )}
      <h1><span className="prompt" aria-hidden="true">~/ </span>{title}</h1>
      {children}
    </Directory>
  </>
)

export default DirectoryLayout
