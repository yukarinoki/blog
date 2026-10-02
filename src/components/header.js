import React from "react"
import { Link } from "gatsby"
import styled, { keyframes } from "styled-components"
import { mainColor, accentColor, textColor, grayColor } from "../utils/color"
import { rhythm, scale } from "../utils/typography"

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`

const HeaderInner = ({ title, className }) => {
  return (
    <header className={className}>
      <h1>
        <span className="prompt">~/blog $</span>
        <Link to="/blog/">{title}</Link>
        <span className="cursor">_</span>
      </h1>
      <nav aria-label="Main navigation">
        <Link to="/">Index</Link>
        <Link to="/blog/">Blog</Link>
        <Link to="/works/">Works</Link>
      </nav>
    </header>
  )
}

export const Header = styled(HeaderInner)`
  display: flex;
  flex-flow: wrap row;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  background-color: ${mainColor.darkest};
  border-bottom: 1px solid ${grayColor.border};
  padding: ${rhythm(0.5)} ${rhythm(3 / 4)};

  & > h1 {
    flex: auto 1 1;
    margin: 0;
    display: flex;
    align-items: baseline;
    gap: 0.5em;
  }

  & .prompt {
    font-family: "JetBrains Mono", monospace;
    color: ${accentColor.secondary};
    ${scale(0.5)}
    opacity: 0.8;
  }

  & > h1 > a {
    font-family: "JetBrains Mono", monospace;
    color: ${textColor.primary};
    ${scale(1.5)}
    text-decoration: none;
    text-shadow: none;
    border-bottom: none;
    transition: text-shadow 0.3s ease, color 0.3s ease;
    &:hover {
      text-shadow: 0 0 15px rgba(0, 255, 242, 0.5);
      color: ${accentColor.primary};
      border-bottom: none;
    }
  }

  & .cursor {
    font-family: "JetBrains Mono", monospace;
    color: ${accentColor.primary};
    animation: ${blink} 1s step-end infinite;
    ${scale(1.5)}
  }

  & > nav {
    flex: auto 0 0;
    ${scale(0.25)}
    & > a {
      display: inline-block;
      margin: 0 ${rhythm(1 / 4)};
      color: ${textColor.secondary};
      font-family: "JetBrains Mono", monospace;
      transition: color 0.2s ease;
      &:hover {
        color: ${accentColor.primary};
      }
    }
  }

  a {
    text-decoration: none;
    &:focus { outline: 2px solid currentColor; outline-offset: 4px; }
  }

  @media (max-width: 640px) {
    & .prompt {
      ${scale(0)}
    }
    & > h1 > a {
      ${scale(0.75)}
    }
    & .cursor {
      ${scale(0.75)}
    }
  }
`
