<template>
  <div id="app">
    <input type="text" @focus="visible=true">
    <Main
      :host="'http://123.103.9.204:6058/official'"
      :qzId="16214"
      :memberId="3279879"
      :powers="'1,2,3,4,5,6,7,8,9,10'"
      :showFiles="false"
      :visible.sync='visible'
      :fileTreeResult.sync='fileTreeResult'
      @errorDialog='errorDialog'
      @fileTreeSelectConfirm='fileTreeSelectConfirm'
    />
  </div>
</template>

<script>
import Main from './components/Main'
export default {
  name: 'app',
  data () {
    return {
      visible: false,
      fileTreeResult: {}
    }
  },
  components: {
    Main
  },
  methods: {
    errorDialog(msg){
      console.log(msg)
      alert(msg)
    },
    fileTreeSelectConfirm () {
      console.log('点击确定按钮')
    }
  },
  watch: {
    // fileTreeResult: {
    //   handler: function (newVal, oldVal) {
    //     // console.info(newVal)
    //   },
    //   deep: true
    // }
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
