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
