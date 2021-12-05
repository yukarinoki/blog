import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { mainColor } from "../utils/color"
import { rhythm, scale } from "../utils/typography"

const HeaderInner = ({ title, className}) =>{
    return (
      <header className={className}>
        <h1>
        <Link to="/">{title}</Link>
        </h1>
      </header>
    )
}

export const Header = styled(HeaderInner)`
  display: flex;
  flex-flow: wrap row;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  background-color: ${mainColor.normal};
  padding: ${rhythm(0.5)} ${rhythm(3 / 4)};
  & > h1 {
    flex: auto 1 1;
    margin: 0;
  }
  & > h1 > a {
    font-family: "Source Code Pro";
    color: white;
    ${scale(2.4)}
  }
  & > nav {
    flex: auto 0 0;
    ${scale(0.5)}
    & > a {
      display: inline-block;
      margin: 0 ${rhythm(1 / 4)};
      color: white;
    }
  }
  a {
    text-decoration: none;
  }
`