import React from "react"
import styled from "styled-components"
import { rhythm, scale } from "../utils/typography"

const TOCInner = ({ className, tocitems }) => {
    return (
        <div class={className} dangerouslySetInnerHTML={{__html: tocitems}} />
    )
}

const TOC = styled(TOCInner)`
padding: ${rhythm(0.5)} ${rhythm(0.25)};
padding-top: ${rhythm(0.5)};
margin-top: ${rhythm(0.5)};
margin-left: ${rhythm(0.20)};
margin-right: ${rhythm(0.20)};
position: sticky;
background-color: #202329;
border-radius: ${rhythm(0.5)};
color: var(--fg-demisub-color);
${scale(-3 / 8)};
box-shadow:
  0 1.9px 2.5px rgba(0, 0, 0, 0.057),
  0 5px 6.1px rgba(0, 0, 0, 0.076),
  0 10.1px 11.4px rgba(0, 0, 0, 0.086),
  0 19.2px 19.8px rgba(0, 0, 0, 0.092),
  0 38.4px 34.8px rgba(0, 0, 0, 0.1),
  0 101px 74px rgba(0, 0, 0, 0.13);
& > ul > li > p > a {
  text-decoration: none;
}
& > ul > li > p > a:hover {
  text-decoration: wavy underline;
}
& > ul > li > a {
  text-decoration: none;
}
& > ul > li > a:hover {
  text-decoration: wavy underline;
}
& > ul > li > ul > li > a {
  text-decoration: none;
}
& > ul > li > ul > li > a:hover {
  text-decoration: wavy underline;
}

`
export default TOC
