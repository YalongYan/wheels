<template>
  <div id="app">
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <Main
      @select="onSelect"
      @err="errorFunc"
      :name="nameTag"
      :id="idTag"
      :defaultText="defaultText"
      :onlyOneLevel="onlyOneLevel"
      :noSearch="noSearch"
      />
  </div>
</template>

<script>
import Main from './components/Main.vue'
import axios from 'axios'
axios.defaults.withCredentials = true
 let t = 0
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
      treeData: [],
      onlyOneLevel: false,
      noSearch:false
    }
  },
  methods:{
    errorFunc(val) {
      alert(val)
    },
    onSelect(obj) {
      console.log(obj.name)
    },
    yyOrgSelectLoadData(parentId) {
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
      // let url = 'http://web.api.chaoke.com:6062/dept/getDeptList?v=1&qzid=2984&page=1&count=60&breadcrumbs=0&dept_type=0&parent_id=' + parentId
      console.log(t)
      if(t==0) {
          t=1
          return new Promise((resolve, reject) => {
            resolve([{name:'111', id: 0}])
          })
      }else {
        return new Promise((resolve, reject) => {
              axios.get(url).then((res)=> {
                resolve(res.data.data.dept_list)
              })
        })
      }
    },
    yyOrgSelectSearchData(keyword) {
      let url = 'http://web.api.chaoke.com:6062/dept/getDeptList?v=1&qzid=16214&page=1&count=60&breadcrumbs=0&parent_id=0&dept_type=0&keyword=' + keyword
      // let url = 'http://web.api.chaoke.com:6062/dept/getDeptList?v=1&qzid=2984&page=1&count=60&breadcrumbs=0&parent_id=0&dept_type=0&keyword=' + keyword
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
       this.noSearch = false 
    },5000)
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
