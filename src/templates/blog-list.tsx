import _ from 'lodash'
import React from 'react'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import Layout from '../components/layout'

import Card from '../components/blog-card'
import Pagination from '../components/pagination'

interface PropsInterface {
  location: object;
  pageContext: {
    currentPage: number;
    numPages: number;
  };
  data: {
    [key: string]: any;
    site: {
      siteMetadata: {
        author: string;
        description: string;
        title: string;
        siteUrl: string;
        fbApp: string;
      }
    };
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            slug: string;
          };
          frontmatter: {
            title: string;
            subtitle: string;
            author: string,
            date: string;
            featured: string;
            status: string;
            banner: {
              childImageSharp: {
                fluid: object,
              }
            };
          };
        }
      }[];
    };
    allAuthorsJson: {
      edges: {
        node: {
          user: string;
          name: string;
          facebook: string;
        }
      }[];
    };
  };
}
export default class BlogIndex extends React.Component<PropsInterface> {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const siteDescription = this.props.data.site.siteMetadata.description
    const posts = this.props.data.allMarkdownRemark.edges
    const {currentPage, numPages} = this.props.pageContext
    const facebookAppID = this.props.data.site.siteMetadata.fbApp

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              name: 'name',
              content: siteTitle,
            },
            {
              name: 'description',
              content: siteDescription,
            },
            {
              name: 'author',
              content: siteAuthor,
            },
            {
              name: 'image',
              content: `${siteUrl}/default.jpg`,
            },
            {
              property: 'og:url',
              content: siteUrl,
            },
            {
              property: 'og:type',
              content: 'article',
            },
            {
              property: 'og:locale',
              content: 'th_TH',
            },
            {
              property: 'og:locale:alternate',
              content: 'en_US',
            },
            {
              property: 'og:title',
              content: siteTitle,
            },
            {
              property: 'og:description',
              content: siteDescription,
            },
            {
              property: 'fb:app_id',
              content: facebookAppID,
            },
            {
              property: 'article:author',
              content: 'https://facebook.com/rayriffy',
            },
            {
              property: 'og:image',
              content: `${siteUrl}/default.jpg`,
            },
            {
              property: 'og:image:secure_url',
              content: `${siteUrl}/default.jpg`,
            },
            {
              property: 'og:image:alt',
              content: 'banner',
            },
            {
              name: 'twitter:card',
              content: 'summary_large_image',
            },
            {
              name: 'twitter:site',
              content: '@rayriffy',
            },
            {
              name: 'twitter:creator',
              content: '@rayriffy',
            },
            {
              name: 'twitter:title',
              content: siteTitle,
            },
            {
              name: 'twitter:description',
              content: siteDescription,
            },
            {
              name: 'twitter:image',
              content: `${siteUrl}/default.jpg`,
            },
          ]}
          title={siteTitle}>
          <script type="application/ld+json" data-react-helmet="true">
            {`
              {
                "@context": "http://schema.org/",
                "@type" : "Website",
                "url" : "${siteUrl}"
              }
            `}
          </script>
        </Helmet>
        {posts.map(({node}) => {
          let author: {node: {user: string, name: string, facebook: string}} = _.find(this.props.data.allAuthorsJson.edges, {
            node: {user: node.frontmatter.author},
          })
          return (
            <Card
              key={node.fields.slug}
              slug={node.fields.slug}
              author={author.node}
              banner={node.frontmatter.banner.childImageSharp.fluid}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              subtitle={node.frontmatter.subtitle}
              featured={node.frontmatter.featured}
              status={node.frontmatter.status}
              link={true}
            />
          )
        })}
        <Pagination
          numPages={numPages}
          currentPage={currentPage}
          pathPrefix="/"
        />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query blogPageQuery($limit: Int!, $skip: Int!, $status: String!) {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        fbApp
      }
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: $limit
      skip: $skip
      filter: {frontmatter: {status: {ne: $status}, type: {eq: "blog"}}}
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            subtitle
            status
            featured
            author
            banner {
              childImageSharp {
                fluid(maxWidth: 1000, quality: 90) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
            }
          }
        }
      }
    }
    allAuthorsJson {
      edges {
        node {
          user
          name
          facebook
        }
      }
    }
  }
`
