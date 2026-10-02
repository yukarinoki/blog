import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import { mainColor, accentColor, textColor, grayColor } from "../utils/color"
import { rhythm, scale } from "../utils/typography"

const BioInner = ({ className }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <div className={className}>
      <div className="bio-label">$ whoami</div>
      <div className="bio-content">
        <span>
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt={author.name}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              minWidth: 50,
              borderRadius: `100%`,
            }}
            imgStyle={{
              margin: "0",
              borderRadius: `50%`,
            }}
          />
        </span>
        <div>
          <div>
            Written by <b>{author.name}</b> {author.summary}
          </div>
        </div>
      </div>
    </div>
  )
}

const Bio = styled(BioInner)`
  position: relative;
  padding: ${rhythm(1.5)} ${rhythm(0.5)} ${rhythm(0.75)};
  margin-top: ${rhythm(0.5)};
  margin-left: ${rhythm(0.20)};
  margin-right: ${rhythm(0.20)};
  color: ${textColor.secondary};
  background-color: ${mainColor.dark};
  border: 1px solid ${grayColor.border};
  border-radius: 2px;
  ${scale(-0.1)};

  & .bio-label {
    position: absolute;
    top: ${rhythm(0.25)};
    left: ${rhythm(0.5)};
    font-family: "JetBrains Mono", monospace;
    font-size: 0.7em;
    color: ${accentColor.secondary};
    opacity: 0.7;
  }

  & .bio-content {
    display: flex;
    align-items: center;
  }

  & > .bio-content > a {
    line-height: 0;
    border-bottom: none;
    &:hover {
      border-bottom: none;
    }
  }

  & img {
    border: 2px solid ${accentColor.primary} !important;
  }

  & b {
    color: ${accentColor.primary};
  }

  & a {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.85em;
  }
`
export default Bio
