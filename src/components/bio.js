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
    <div class={className}>
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
padding: ${rhythm(1)} ${rhythm(0.25)};
margin-top: ${rhythm(0.5)};
margin-left: ${rhythm(0.20)};
margin-right: ${rhythm(0.20)};
font-style: italic;
color: var(--fg-color);
background-color: var(--fg-article-color);
border-radius: ${rhythm(0.5)};
${scale(0)};
box-shadow:
  0 1.9px 2.5px rgba(0, 0, 0, 0.057),
  0 5px 6.1px rgba(0, 0, 0, 0.076),
  0 10.1px 11.4px rgba(0, 0, 0, 0.086),
  0 19.2px 19.8px rgba(0, 0, 0, 0.092),
  0 38.4px 34.8px rgba(0, 0, 0, 0.1),
  0 101px 74px rgba(0, 0, 0, 0.13);
& > a {
  line-height: 0;
}
`
export default Bio
