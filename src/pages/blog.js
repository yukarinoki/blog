import React from "react"
import { Link, graphql, withPrefix } from "gatsby"
import styled, { keyframes } from "styled-components"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { mainColor, accentColor, textColor, grayColor } from "../utils/color"
import { rhythm } from "../utils/typography"

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${rhythm(0.75)};
  padding: ${rhythm(0.25)};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.article`
  position: relative;
  background: ${mainColor.dark};
  border: 1px solid ${grayColor.border};
  border-radius: 2px;
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px);
    border-color: ${accentColor.primary};
    box-shadow: 0 0 20px rgba(0, 255, 242, 0.1);
  }
`

const CardTitleBar = styled.div`
  height: 28px;
  background: ${mainColor.normal};
  border-bottom: 1px solid ${grayColor.border};
  display: flex;
  align-items: center;
  padding: 0 10px;

  &::before {
    content: "● ● ●";
    font-size: 9px;
    color: ${textColor.dim};
    letter-spacing: 4px;
  }
`

const CardImageWrap = styled.div`
  width: 100%;
  height: ${rhythm(5)};
  overflow: hidden;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.6) saturate(0.7);
    transition: filter 0.3s ease;
  }

  ${Card}:hover & img {
    filter: brightness(0.75) saturate(0.9);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(transparent, ${mainColor.dark});
  }
`

const CardCategory = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7em;
  color: ${accentColor.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;

  &::before {
    content: "[";
    opacity: 0.5;
  }
  &::after {
    content: "]";
    opacity: 0.5;
  }
`

const CardHeader = styled.header`
  padding: ${rhythm(0.4)} ${rhythm(0.5)} 0;
`

const CardTitle = styled.h2`
  margin: ${rhythm(0.2)} 0 ${rhythm(0.25)};
  font-size: 1rem;
  line-height: 1.4;

  &::before {
    content: none !important;
  }

  & a {
    color: ${textColor.primary};
    border-bottom: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${accentColor.primary};
      border-bottom: none;
    }
    &:visited {
      color: ${textColor.primary};
    }
  }
`

const CardBody = styled.section`
  padding: 0 ${rhythm(0.5)};
  flex: 1;
  color: ${textColor.secondary};
  font-size: 0.85em;
  line-height: 1.6;

  & p {
    margin-bottom: ${rhythm(0.25)};
  }
`

const CardFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${rhythm(0.25)} ${rhythm(0.5)};
  border-top: 1px solid ${grayColor.border};
  margin-top: auto;

  & small {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75em;
    color: ${textColor.dim};
  }

  & > a {
    color: ${accentColor.primary};
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8em;
    border-bottom: none;
    &:hover {
      border-bottom: none;
    }
  }

  & > a > .cursor-blink {
    animation: ${blink} 1s step-end infinite;
  }
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle} rightSide={<Bio />}>
      <SEO title="All posts" />
      <CardGrid>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const category = node.frontmatter.category || "etc"
          const img_withext = category + ".jpg"
          return (
            <Card key={node.fields.slug}>
              <CardTitleBar />
              <CardImageWrap>
                <img
                  src={withPrefix("/article_headers/" + img_withext)}
                  alt={category}
                />
              </CardImageWrap>
              <CardHeader>
                <CardCategory>{category}</CardCategory>
                <CardTitle>
                  <Link to={node.fields.slug}>{title}</Link>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </CardBody>
              <CardFooter>
                <small>{node.frontmatter.date}</small>
                <Link to={node.fields.slug}>
                  read<span className="cursor-blink">_</span>
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </CardGrid>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            category
          }
        }
      }
    }
  }
`
