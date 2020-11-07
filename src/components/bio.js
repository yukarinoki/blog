/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
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
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div classname={className}
      style={{
        display: "flex",
        alignItems: "center",
        padding: `rhythm(0.5) rhythm(0.25)`,
        fontStyle: "italic",
        color: "#CCCCCC",
      }}
    >
      <a 
       href={`https://twitter.com/${social.twitter}`}
       target="_blank"
       rel="external noopener"
      >
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
      </a>
      <div>
        <div>
            Written by <b>{author.name}</b> {author.summary}
        </div>
        <div>
          <a href={`https://twitter.com/${social.twitter}`}>twitter</a>
        </div>
      </div>
    </div>
  )
}

const Bio = styled(BioInner)`
display: flex;
align-items: center;
padding: ${rhythm(0.5)} ${rhythm(0.25)};
font-style: italic;
color: var(--fg-demisub-color);
${scale(-3 / 8)};
& > a {
  line-height: 0;
}
`
export default Bio
