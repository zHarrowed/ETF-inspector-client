import gql from 'graphql-tag'

export const ALL_HOLDINGS_QUERY = gql`
  query EtfHoldings($etfSlug: String!, $searchText: String, $endCursor: String, $pageSize: Int!) {
    etfHoldings(etfSlug: $etfSlug, searchText: $searchText, first: $pageSize, after: $endCursor) {
      edges {
        node {
          id
          weight
          asset {
            ticker
            name
            sector {
              name
            }
            assetType {
              name
            }
            country {
              name
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`
