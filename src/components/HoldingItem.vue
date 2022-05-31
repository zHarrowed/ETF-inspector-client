<template>
  <tr>
    <td>{{holding.asset.ticker}}</td>
    <td>{{holding.asset.name}}</td>
    <td>{{holding.asset.sector.name}}</td>
    <td>{{holding.asset.assetType.name}}</td>
    <td>{{holding.asset.country.name}}</td>
    <td>{{holding.weight}}%</td>
  </tr>
</template>

<script>
export default {
  name: 'HoldingItem',
  props: ['holding']
}
</script>
