import React from "react"
import styled from "styled-components"
import { mainColor, accentColor, textColor, grayColor } from "../utils/color"
import { rhythm, scale } from "../utils/typography"

const TOCInner = ({ className, tocitems }) => {
  return (
    <nav className={className}>
      <div className="toc-label">// Table of Contents</div>
      <div dangerouslySetInnerHTML={{ __html: tocitems }} />
    </nav>
  )
}

const TOC = styled(TOCInner)`
  top: ${rhythm(0.5)};
  padding: ${rhythm(1.2)} ${rhythm(0.5)} ${rhythm(0.5)};
  margin-top: ${rhythm(0.5)};
  margin-left: ${rhythm(0.20)};
  margin-right: ${rhythm(0.20)};
  position: sticky;
  background-color: ${mainColor.dark};
  border: 1px solid ${grayColor.border};
  border-radius: 2px;
  color: ${textColor.secondary};
  ${scale(-0.15)};
  align-self: baseline;
  font-family: "JetBrains Mono", "Noto Sans JP", monospace;

  & .toc-label {
    position: absolute;
    top: ${rhythm(0.25)};
    left: ${rhythm(0.5)};
    font-size: 0.7em;
    color: ${textColor.dim};
    font-style: italic;
  }

  position: relative;

  & ul {
    list-style: none;
    margin-left: 0;
  }

  & li {
    margin-bottom: ${rhythm(0.15)};
    padding-left: 1.2em;
    position: relative;
  }
  & li::before {
    content: ">";
    position: absolute;
    left: 0;
    color: ${accentColor.primary};
    opacity: 0.5;
  }

  & a {
    text-decoration: none;
    color: ${textColor.secondary};
    border-bottom: none;
    transition: color 0.2s ease, padding-left 0.2s ease;
  }
  & a:hover {
    color: ${accentColor.primary};
    padding-left: 4px;
    text-shadow: 0 0 8px rgba(0, 255, 242, 0.3);
    border-bottom: none;
  }
  & a:visited {
    color: ${textColor.secondary};
  }
`
export default TOC
