<template>
  <div id="app">
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <Main
      :host="host"
      :qzid="qzid"
      :deptIds_ext="deptIds_ext"
      :dataResult.sync="dataResult"
      :placeHolder="placeHolder"
      :dept_type="dept_type"
      :defaultText.sync="defaultText"
      @err="errorFunc"
      @select="onSelect"
      />
  </div>
</template>

<script>
import Main from './components/Main.vue'
export default {
  name: 'app',
  data () {
    return {
      host: "http://web.api.chaoke.com:6062",
      qzid: "16214",
      placeHolder: "请输入",
      dataResult: {},
      deptIds_ext: [],
      dept_type: 0,
      defaultText: '选择的默认值',
    }
  },
  methods:{
    errorFunc(val) {
      alert(val)
    },
    onSelect(val) {
      console.log(val.name)
    }
  },
  components: {
    Main
  },
  created () {
    setTimeout(()=>{
       this.defaultText = 'sdasdad' 
    },0)
  }
}
</script>

<style lang="scss">
html, body{
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
