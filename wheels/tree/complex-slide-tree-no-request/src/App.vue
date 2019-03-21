<template>
  <div id="app">
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <!-- <Main
      :host="host"
      :qzid="qzid"
      :deptIds_ext="deptIds_ext"
      :dataResult.sync="dataResult"
      :placeHolder="placeHolder"
      :dept_type="dept_type"
      :defaultText.sync="defaultText"
      @err="errorFunc"
      @select="onSelect"
      /> -->
    <Main
      @loadData="loadData"
      @searchData="searchData"
      @select="onSelect"
      @err="errorFunc"
      :name="nameTag"
      :id="idTag"
      :defaultText="defaultText"
      />
  </div>
</template>

<script>
import Request from './mixin/request'
import Main from './components/Main.vue'
import axios from 'axios'
axios.defaults.withCredentials = true

export default {
  name: 'app',
  data () {
    return {
      host: "http://web.api.chaoke.com:6062",
      qzid: "16214",
      placeHolder: "placeHolder11",
      dataResult: {},
      deptIds_ext: [],
      dept_type: 0,
      defaultText: '选择的默认值',
      nameTag: 'name',
      idTag: 'id',
      treeData: [
        {name: '111', id: 1, hasChildren: true, active: false, open: false, isLoading: false, children: [
           {name: '11222', id: 4, hasChildren: true, active: false, open: false, isLoading: false, children: []},
           {name: '11333', id: 5, hasChildren: true, active: false, open: false, isLoading: false, children: []},
        ]},
        {name: '222', id: 2, hasChildren: true, active: false, open: false, isLoading: false, children: []},
        {name: '333', id: 3, hasChildren: true, active: false, open: false, isLoading: false, children: []}
      ]
    }
  },
  mixins: [Request],
  methods:{
    errorFunc(val) {
      alert(val)
    },
    onSelect(obj) {
      console.log(obj.name)
    },
    loadData(parentId) {
      if(!parentId && parentId != 0) {
        parentId = ''
      }
      let obj = {
        v:1,
        qzid:16214,
        page:1,
        count:60,
        breadcrumbs:0,
        dept_type:0,
        parent_id: parentId
      }
      let url = 'http://web.api.chaoke.com:6062/dept/getDeptList?v=1&qzid=16214&page=1&count=60&breadcrumbs=0&dept_type=0&parent_id=' + parentId
      return new Promise((resolve, reject) => {
          axios.get(url).then((res)=> {
            resolve(res.data.data.dept_list)
        })
      })
    },
    searchData(keyword) {
      let url = 'http://web.api.chaoke.com:6062/dept/getDeptList?v=1&qzid=16214&page=1&count=60&breadcrumbs=0&parent_id=0&dept_type=0&keyword=' + keyword
      return new Promise((resolve, reject) => {
          axios.get(url).then((res)=> {
            resolve(res.data.data.dept_list)
        })
      })
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
