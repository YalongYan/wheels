<template>
  <div id="app">
    <Main :host="'http://123.103.9.204:6058/official'"/>
  </div>
</template>

<script>
import Main from './components/Main'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    Main
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
