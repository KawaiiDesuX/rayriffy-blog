import React from 'react'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'

import Layout from '../components/layout'

import Card from '../components/blog-card'
import Chip from '../components/chip'

interface PropsInterface {
  location: object;
  data: {
    [key: string]: any;
    site: {
      siteMetadata: {
        title: string;
        siteUrl: string;
        author: string;
        description: string;
        fbApp: string;
      };
    };
    allCategoriesJson: {
      edges: {
        node: {
          key: string;
          name: string;
          desc: string;
        };
      }[];
    };
  };
}
export default class CategoryListPage extends React.Component<PropsInterface> {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const siteDescription = this.props.data.site.siteMetadata.description
    const facebookAppID = this.props.data.site.siteMetadata.fbApp

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              name: 'name',
              content: `${siteTitle} · Category`,
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
              content: `${siteTitle} · Category`,
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
              content: `${siteTitle} · Category`,
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
          title={`${siteTitle} · Category`}>
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
        <Chip name="Category" desc="รวมประเภท Blog ไว้ให้ง่ายต่อการเข้าถึง" />
        {this.props.data.allCategoriesJson.edges.map(({node}) => {
          return (
            <Card
              key={`/category/${node.key}`}
              slug={`/category/${node.key}`}
              banner={
                this.props.data[node.key].edges[0].node.frontmatter.banner
                  .childImageSharp.fluid
              }
              title={node.name}
              subtitle={node.desc}
              status="published"
              link={true}
            />
          )
        })}
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query categoryPageQuery {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        fbApp
      }
    }
    allCategoriesJson(sort: {fields: [key], order: ASC}) {
      edges {
        node {
          key
          name
          desc
        }
      }
    }
    lifestyle: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "lifestyle"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
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
    misc: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "misc"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
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
    music: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "music"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
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
    programming: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "programming"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
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
    review: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "review"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
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
    tutorial: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {category: {eq: "tutorial"}}}
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
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
  }
`
