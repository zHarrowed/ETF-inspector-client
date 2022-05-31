<template>
  <div>
    <div class="center">
      Search&nbsp;
      <input type="text" v-model="searchText">
    </div>
    <table>
      <h4 v-if="loading">Loading...</h4>
      <tr>
        <th>Ticker</th>
        <th>Name</th>
        <th>Sector</th>
        <th>Asset type</th>
        <th>Country</th>
        <th>Weight</th>
      </tr>
      <holding-item
        v-for="holding in etfHoldings.edges"
        :key="holding.node.id"
        :holding="holding.node">
      </holding-item>
    </table>
    <div class="actions">
      <button v-if="this.etfHoldings.pageInfo.hasNextPage && !this.loading" @click="showMoreClick">Show more</button>
    </div>
  </div>
</template>

<script>
import { ALL_HOLDINGS_QUERY } from '../constants/graphql'
import HoldingItem from './HoldingItem'

export default {
  name: 'HoldingList',
  data () {
    return {
      etfHoldings: {
        edges: [],
        pageInfo: {
          endCursor: null,
          hasNextPage: true
        }
      },
      loading: 0,
      searchText: ''
    }
  },
  components: {
    HoldingItem
  },
  apollo: {
    etfHoldings: {
      query: ALL_HOLDINGS_QUERY,
      variables () {
        return {
          etfSlug: 'rbot',
          endCursor: null,
          pageSize: 50,
          searchText: this.searchText
        }
      }
    }
  },
  methods: {
    showMore () {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow && this.etfHoldings.pageInfo.hasNextPage && !this.loading) {
          this.$apollo.queries.etfHoldings.fetchMore({
            variables: {
              endCursor: this.etfHoldings.pageInfo.endCursor
            },
            updateQuery: (previousResult, {fetchMoreResult}) => {
              const newEdges = fetchMoreResult.etfHoldings.edges
              return {
                etfHoldings: {
                  __typename: previousResult.etfHoldings.__typename,
                  edges: [...previousResult.etfHoldings.edges, ...newEdges],
                  pageInfo: fetchMoreResult.etfHoldings.pageInfo
                }
              }
            }
          })
        }
      }
    },
    showMoreClick () {
      this.$apollo.queries.etfHoldings.fetchMore({
        variables: {
          endCursor: this.etfHoldings.pageInfo.endCursor
        },
        updateQuery: (previousResult, {fetchMoreResult}) => {
          const newEdges = fetchMoreResult.etfHoldings.edges
          return {
            etfHoldings: {
              __typename: previousResult.etfHoldings.__typename,
              edges: [...previousResult.etfHoldings.edges, ...newEdges],
              pageInfo: fetchMoreResult.etfHoldings.pageInfo
            },
            searchValue: this.searchValue
          }
        }
      })
    }
  },
  mounted () {
    this.showMore()
  }
}
</script>

<style>
  .center {
    display: flex;
    justify-content: left;
    align-items: flex-start;
    height: 50px;
  }
</style>
