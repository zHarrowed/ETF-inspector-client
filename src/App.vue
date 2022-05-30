<template>
  <div id="app">
    <holding-list></holding-list>
  </div>
</template>

<script>
import HoldingList from './components/HoldingList'

export default {
  name: 'app',
  components: {
    HoldingList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
