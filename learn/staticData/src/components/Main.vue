<template>
  <div>
    <div class="container">
      <!-- <span class="header-tips">请选择目标文件夹</span> -->
      <div class="ctn">
        <span class="header-tips">请选择目标文件夹</span>
        <Tree :data="treeData"/>
      </div>
      <div class="footer">
        <div class="new-folder btn-deafult">
          新建文件夹
        </div>
        <div class="confirm-btn-groups">
          <span class="btn-cancle btn-deafult">取消</span>
          <span class="btn-confirm btn-color-red">确定</span>
        </div>
        <div style="clear:both"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Tree from './tree/Tree'
import {mapGetters, mapMutations} from 'vuex'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      // open 控制打开/关闭子集 level 控制paddingLeft checked之前是用来判断是否选择的 现在不用了。
      // treeData: []
      treeData: [
        {open: false, filename: '企业文档', level: 0, checked: false, belong: 1, children:[]},
        {open: false, filename: '内部群文档', level: 0, checked: false, belong: 2, children:[]},
        {open: false, filename: '项目文档', level: 0, checked: false, belong: 3, children:[]},
        {open: false, filename: '个人文档', level: 0, checked: false,  belong: 4,  children:[]}
      ],
    }
  },
  props: ['host'],
  components: {
    Tree
  },
  computed: {
    ...mapGetters([
      'get_treeData',
      'get_host'
    ])
  },
   methods: {
    ...mapMutations(['set_host', 'set_state']),
    initData() {
      var _this = this
      var _url = this.host
      var postData = {}
      this.$http.get(_url + "/rest/document/wenku/9463/3289062/getList", postData).then(res => {
        var data = res.data
        if(data.flag === '0') {
          let _data = data['data'].list
          let arr = []
          for(var i = 0; i < _data.length; i++) {
            _data[i].open = false
            _data[i].level = 0
            _data[i].children = []
            arr.push(_data[i])
          }
          _this.set_state(arr)
          console.log(this.get_treeData)
          _this.treeData = this.get_treeData
        } else {
          console.log(data.desc)
        }
      }).catch(msg => {})
    }
  },
  mounted (){
    // 把 host 复制给 vuex 的 host
    this.set_host(this.host)
    // this.initData()
  },
  created (){
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
ui, li{
  list-style-type: none;
}
.container{
  width: 680px;
  margin: 0 auto;
  border: 1px solid #ededed;
  text-align: left;

  .header-tips{
    display: inline-block;
    font-size: 12px;
    color: #999;
    font-style: normal;
    padding-left: 17px;
    margin-top: 15px;
    margin-bottom: 5px;
  }
  .ctn {
    min-height: 400px;
    border-radius: 2px;
    // border-top: 1px solid #EDEDED;
    position: relative;
    max-height: 400px;
    overflow-y: auto;
    // 禁止选中文字
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: left;
  }
  /*滚动条样式*/
  .ctn::-webkit-scrollbar {       /*滚动条整体样式*/
      width: 7px;              /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
  }
  .ctn::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
      border-radius: 5px;
      // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: #C1C1C1;
  }
  .ctn::-webkit-scrollbar-track { /*滚动条里面轨道*/
      // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background:#fff;
  }
  .footer{
    padding: 15px 20px;
    margin-top: 14px;

    .btn-deafult{
      font-size: 14px;
      display: inline-block;
      text-align: center;
      width: 100px;
      height: 35px;
      border: 1px solid  #dcdcdc;
      color: #262626;
      border-radius: 4px;
      line-height: 35px;
      cursor: pointer;

      &:hover{
        color: #ff5e5e;
        border-color: #ff5e5e;
      }
    }
    .btn-color-red{
      font-size: 14px;
      display: inline-block;
      cursor: pointer;
      width: 100px;
      height: 35px;
      background: #ff5e5e;
      border-color: #ff5e5e;
      text-align: center;
      line-height: 35px;
      color: #fff;
      border-radius: 4px;

      &:hover{
        background: #fa4f52;
        border-color: #fa4f52;
      }
    }
    .new-folder{
      float: left;
    }
    .confirm-btn-groups{
      float: right;

      .btn-confirm{
        margin-left: 14px;
      }
    }
  }
}




// .bg{
//     height: 60px;
//     width: 60px;
//     margin: 0 auto;
//     background: url('../static/img/download.png') center;
//     background-repeat: no-repeat;
// }
</style>
