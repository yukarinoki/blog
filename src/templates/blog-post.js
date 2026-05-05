import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Bio from "../components/bio"
import TOC from "../components/toc"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { accentColor, textColor, grayColor } from "../utils/color"
import { Article } from "./Article"

const PostNav = styled.nav`
  margin-top: ${rhythm(1)};
  & > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  & li {
    margin-bottom: ${rhythm(0.5)};
  }
  & a {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.85em;
    color: ${textColor.secondary};
    border-bottom: none;
    transition: color 0.2s ease;
    &:hover {
      color: ${accentColor.primary};
    }
    &:visited {
      color: ${textColor.secondary};
    }
  }
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle} rightSide={data.markdownRemark.tableOfContents === "" ? (<Bio/>) : (<> <Bio/> <TOC tocitems={data.markdownRemark.tableOfContents}/> </>)}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Article post={post} />

      <PostNav>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                &lt;-- {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} --&gt;
              </Link>
            )}
          </li>
        </ul>
      </PostNav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
