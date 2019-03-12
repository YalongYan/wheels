<template>
<transition name="shown">
<div v-if="visible">
  <div class="container">
    <!-- <span class="header-tips">请选择目标文件夹</span> -->
    <div class="ctn">
      <div class="fixTopHead">
        <span class="header-tips"> {{$_t('selectFileTips')}} </span>
        <span class="new-folder btn-deafult newFileBtn" :class="{disableClass: disableNewFile}" @click="newFile"> {{$_t('newFileBtn')}} </span>
      </div>
      <!-- <span class="header-tips"> {{$_t('selectFileTips')}} </span>
      <span class="new-folder btn-deafult newFileBtn" :class="{disableClass: disableNewFile}" @click="newFile"> {{$_t('newFileBtn')}} </span> -->
      <Tree
        :data="treeData"
        :treeResult='treeResult'
      />
    </div>
    <div class="footer">
      <!-- <div class="new-folder btn-deafult" :class="{disableClass: disableNewFile}" @click="newFile">
        {{$_t('newFileBtn')}}
      </div> -->
      <div class="confirm-btn-groups">
        <span class="btn-cancle btn-deafult" @click="cancel" style="min-width: 34px;">{{$_t('cancle')}}</span>
        <span class="btn-confirm btn-color-red" :class="{disableClass: disableNewFile, disableConfirm: disableConfirm}" @click="confirm">{{$_t('confirm')}}</span>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
  <div class="back-drop"></div>
</div>
  
</transition>  
</template>

<script>
import Tree from './tree/Tree'
import mixins from './../mixin/mixin'
import locales from './../../locales'
import Bus from './../bus'
import transition from '../mixin/transition';
const lang = navigator.language

export default {
  data () {
    return {
      treeResult: {fid: ''}, // tree组件选择的数据结果
      showLoading: false,
      locales:  (() => {
          // this.lang 是从父组件继承的
          let useLang = /^zh/.test(lang) ? 'zh-CN' : /^en/.test(lang) ? 'en' : lang
          // Object.keys 获取可枚举的属性 如果浏览器的语言不是英语 中文， 而且传递的lang参数也不是这两种之一，就默认使用 zh-CN
          if (!Object.keys(locales).includes(useLang)) useLang = 'zh-CN'
          return locales[useLang]
      })(),
      treeData: [],
      disableNewFile: false,
      disableConfirm: false
    }
  },
  mixins: [mixins],
  provide () {
    return {
      host: this.host,
      qzId: this.qzId,
      memberId: this.memberId,
      powers: this.powers,
      showFiles: this.showFiles,
      treeResult: this.treeResult,
      disableNewFile: this.disableNewFile
    }
  },
  // qzId:空间id  memberId: 用户id
  props: {
    host: {
      type: String,
      required: true
    },
    qzId: {
       type: Number,
       required: true 
    },
    memberId: {
       type: Number,
       required: true 
    },
    powers: {
      type: String,
      required: true,
      default: '1,2,3,4,5,6,7,8,9,10' 
    },
    showFiles: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    fileTreeResult: {
      type: Object
    }
  },
  components: {
    Tree
  },
  computed: {
  },
  methods: {
    emitErrorDialog(mes) {
      this.$emit('errorDialog', mes)
    },
    initData() {
      let _this = this
      let _url = this.host
      let postData = {}
      this.$http.get(_url + "/rest/document/wenku/9463/3289062/getList", postData).then(res => {
        let data = res.data
        if(data.flag === '0') {
          let _data = data['data'].list
          let arr = []
          for(let i = 0; i < _data.length; i++) {
            _data[i].open = false
            _data[i].level = 0
            _data[i].children = []
            arr.push(_data[i])
          }
          _this.treeData = arr
        } else {
          console.log(data.desc)
        }
      }).catch(msg => {})
    },
    newFile() {
      // treeResult 有数据 并且页面上没有 #newFileInput
      if(this.treeResult.fid && !document.querySelectorAll("#newFileInput").length) {
        let that = this
        let obj = this.treeResult
        let id = obj.fid
        let _level = obj.level
        let belongs = obj.belongs
        let fid = obj.fid
        let filename = obj.filename
        function getArray (arr) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].fid === id) {
              if(!arr[i].hasChildren) {
                arr[i].hasChildren = true
                arr[i].open = true
              }
              // fid先赋值为thisIsNewFils 作为特殊标志  请求完数据之后 再把新的值拿过来
              let obj =  {newFile: true, open: false, filename: '', level: _level + 1, checked: false, belongs: belongs, fid: 'thisIsNewFiles', hasChildren: false, children: []}
              if((that.treeResult.fid === '1' || that.treeResult.fid === '2' || that.treeResult.fid === '3' || that.treeResult.fid === '4') && !that.treeResult.children.length) {
                that.reloadTreeNode(obj)
              } else {
                arr[i].children.push(obj)
                // 先渲染dom 不然获取不到----vue的dom异步渲染
                that.$nextTick(()=>{
                try{
                    document.querySelector("#newFileInput").select()
                }catch(err){}
                })
              }
            } else if (arr[i].children && arr[i].children.length !== 0) {
              getArray(arr[i].children)
            }
          }
        }
        getArray(this.treeData)
      }
    },
    reloadTreeNode(obj) {
      let id = this.treeResult.fid
      let that = this
      let data = this.treeData
      function getArray (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].fid === id) {
            arr[i].children.push(obj)
            // 先渲染dom 不然获取不到----vue的dom异步渲染
            that.$nextTick(()=>{
            try{
                document.querySelector("#newFileInput").select()
            }catch(err){}
            })
          }else {
            getArray(arr[i].children)
          }
        }
      }
      getArray(data)
      this.treeData = data
    },
    removeErrorTreeNode() {
      let id = this.treeResult.fid
      let that = this
      let data = this.treeData
      function getArray (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].fid === id) {
            arr[i].children.pop()
            // arr[i].open = false
            // arr[i].hasChildren = false
          } else {
            getArray(arr[i].children)
          }
        }
      }
      getArray(data)
      this.treeData = data
    },
    closeLoading(obj) {
      let id = obj.fid
      let that = this
      let data = this.treeData
      function getArray (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].fid === id) {
            arr[i].loading = false
            arr[i].hasChildren = false
          } else {
            getArray(arr[i].children)
          }
        }
      }
      getArray(data)
      this.treeData = data
    },
    setTreeResult: function(node){
      this.treeResult = node
      this.$emit('update:fileTreeResult', this.treeResult)
    },
    // 点击取消
    cancel () {
      this.$emit('update:visible', false)
    },
    confirm () {
      this.$emit('update:fileTreeResult', this.treeResult)
      this.$emit('fileTreeSelectConfirm')
      this.disableConfirm = true
      let that = this
      setTimeout(() => {
        that.disableConfirm = false
      },1500)
    }
  },
  mounted () {
    this.treeData = [
      {open: false, loading: false, filename: this.$_t('enterpriseDoc'), level: 0, checked: false, belongs: '1', init: true, fid: '1', children:[], hasChildren: true},
      {open: false, loading: false, filename: this.$_t('internalGroupDoc'), level: 0, checked: true, belongs: '2', init: true, fid: '2', children:[], hasChildren: true},
      {open: false, loading: false, filename: this.$_t('projectDoc'), level: 0, checked: false, belongs: '4', init: true, fid: '4', children:[], hasChildren: true},
      {open: false, loading: false, filename: this.$_t('personalDoc'), level: 0, checked: false,  belongs: '3', init: true, fid: '3',children:[], hasChildren: true}
    ]
  },
  created (){
    Bus.$on('setTreeResult', (node) => {
      this.setTreeResult(node)
    })
    Bus.$on('setShowLoading', (isShow) => {
      this.showLoading = isShow
    }),
    Bus.$on('setNewFileDisable', (bool) => {
      this.disableNewFile = bool
    })
    Bus.$on('removeErrorTreeNode', () => {
      this.removeErrorTreeNode()
    })
    Bus.$on('emitErrorDialog', (msg) => {
      this.emitErrorDialog(msg)
    })
    Bus.$on('closeLoading', (obj) => {
      this.closeLoading(obj)
    })
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
.fixTopHead{
  // position: fixed;
  width: 100%;
  height: 50px;
  background: white;
  // left: 0;
  // top: 0;
  border-bottom: 1px solid #DDDDDD;
  // z-index: 99;
}
.newFileBtn{
  display: inline-block;
  width: 100px;
  background: rgba(228,228,228,1);
  border-radius: 4px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #555555;
  font-size: 14px;
  margin-right: 20px;
  margin-top: 9px;
  cursor: pointer;
}
.back-drop{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(51, 51, 51, 0.5);
  z-index: 99;
}
.container{
  width: 680px;
  margin: 0 auto;
  border: 1px solid #ededed;
  text-align: left;
  height: 474px;
  position: fixed;
  z-index: 100;
  background: white;
  left: 50%;
  // transform: translateX(-50%);
  transform: translate(-50%, -50%);
  top:50%;
  border-radius: 4px;

  .header-tips{
    display: inline-block;
    font-size: 14px;
    color: #111;
    font-style: normal;
    padding-left: 17px;
    height: 50px;
    line-height: 50px;
  }
  .ctn {
    position: relative;
    border-radius: 2px;
    // border-top: 1px solid #EDEDED;
    position: relative;
    // 禁止选中文字
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: left;

    .new-folder{
      float: right;
    }
  }
  .footer{
    padding: 15px 20px;
    margin-top: 14px;

    .btn-deafult{
      font-size: 14px;
      display: inline-block;
      text-align: center;
      // width: 68px;
      padding: 0 16px;
      height: 30px;
      border: 1px solid  #dcdcdc;
      color: #555;
      border-radius: 4px;
      line-height: 30px;
      cursor: pointer;
      background: #e4e4e4;

      &:hover{
        // color: #ff5e5e;
        // border-color: #ff5e5e;
      }
    }
    .btn-color-red{
      font-size: 14px;
      display: inline-block;
      cursor: pointer;
      min-width: 68px;
      height: 32px;
      background: #e14c46;
      border-color: #e14c46;
      text-align: center;
      line-height: 32px;
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
    .btn-deafult.disableClass{
      color: #bcbcbc;
      background: transparent;
      border-color: #ececec;
      pointer-events: none;
    }
    .btn-color-red.disableClass{
      color: #fff!important;
      opacity: .5;
      pointer-events: none;
    }
    .disableConfirm{
      pointer-events: none
    }
    .confirm-btn-groups{
      float: right;
      font-size: 0;

      .btn-confirm{
        margin-left: 10px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
  .shown-leave-active,
  .shown-enter-active{
    transition: all 0.1s linear;
  }
  .shown-enter,.shown-leave-to{
    transform: translateY(-50px);
    opacity: 0;
  }
</style>
