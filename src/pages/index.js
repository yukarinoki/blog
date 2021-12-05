// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

/* type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
} */

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle} rightSide={<Bio />}>
      <SEO title="All posts" />
      <div style={{display: `flex`, flexWrap: `wrap`, flexDirection: `row`}}>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug} style={{position:`relative`, margin: `20px auto auto auto`, paddingTop: rhythm(0.5), paddingLeft: rhythm(0.5), paddingRight: rhythm(0.5), width: `45%`, height: rhythm(12)}}>
            <header>
              <h2
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h2>
            
            </header>
            <section style={{ margin: rhythm(0.5)}}>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
            <div style={{position: `absolute`, left: rhythm(0.5), right: rhythm(0.5), bottom: `0px`}}>
              <footer style={{display: `flex`}}>
                <small style={{fontFamily: `Helvetica`}}>{node.frontmatter.date}</small>
                <div style={{ marginLeft: `auto` }}>
                <Link  to={node.fields.slug}>
                  →
                </Link>
                </div>
              </footer>
            </div>
          </article>
        )
      })}
      </div>
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
          }
        }
      }
    }
  }
`
