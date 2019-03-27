<template>
<div>
  <div class="ys-file-tree-select">
    <InputSlide
      :visable.sync="visable"
      :defaultText.sync="selectedVal"
      :isShowClear.sync="isShowClearIcon"
      :isNoData.sync="isNoData" 
      :isShowSlideCtn.sync="isShowSlideCtn"
      :searchResult="searchResult"
      :noSearch="noSearch"
    />
  </div>
  <MainDialog
    :initData="initData"
    :treeResult="treeResult"
    :visable.sync="visable"
    :defaultText.sync="selectedVal"
    :isShowdialogNoData="isShowdialogNoData"
    :dialogLeft="dialogLeft"
    :dialogTop="dialogTop"
    :noSearch="noSearch"
    @confirm="lastConfirm"
  />
</div>
  
</template>

<script>
import Search from './Serach'
import Tree from './tree/Tree'
import InputSlide from './layout/InputSlide'
import MainDialog from './layout/MainDialog'
import Bus from './../bus'
import locales from './../../locales'
import Lang from './../mixin/lang.js'

export default {
  name: 'app',
  data () {
    return {
      initData: [],
      selectedVal: this.defaultText,
      tempSelectedVal: '',
      treeResult: {name: '1'},
      visable: false,
      finalResult: {},
      isShowClearIcon: false,
      isShowdialogNoData: false,
      dialogLeft: '',
      dialogTop:'',
      isNoData: false,
      isShowSlideCtn: false,
      searchResult: [],
      locales: (() => {
            const lang = navigator.language
            let useLang = /^zh/.test(lang) ? 'zh-CN' : /^en/.test(lang) ? 'en' : lang
            // Object.keys 获取可枚举的属性 如果浏览器的语言不是英语 中文， 而且传递的lang参数也不是这两种之一，就默认使用 zh-CN
            if (!Object.keys(locales).includes(useLang)) {
                useLang = 'zh-CN'
            }
            return locales[useLang]
      })(),
      selectOneDataTip: ''
    }
  },
  mixins: [Lang],
  props:['name', 'id', 'defaultText', 'onlyOneLevel', 'noSearch'],
  watch: {
    defaultText (val){
      this.selectedVal = val
    }
  },
  provide () {
    return {
      name: this.name,
      id: this.id,
      defaultText: this.defaultText
    }
  },
  components: {
    Search,
    Tree,
    InputSlide,
    MainDialog
  },
  methods:{
    setResult(val) {
      this.$emit('select', val)
    },
    setText(val) {
      // this.selectedVal = val[this.name]
      let that = this
      this.tempSelectedVal = val[this.name]
      this.finalResult = val
      let data = this.initData
      let id = val[this.id]
      function getArray (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i][that.id] == id) {
            arr[i].active = true
          } else {
            arr[i].active = false
          }
          // 这个函数放在每次的循环里面 不然congenital
          getArray(arr[i].children)
        }
      }
      getArray(data)
      this.initData = data
    },
    originErrorFunc (val) {
      this.$emit("err", val)
    },
    lastConfirm() {
      if(JSON.stringify(this.finalResult) === "{}") {
        this.originErrorFunc(this.selectOneDataTip)
      } else {
        this.selectedVal = this.tempSelectedVal
        this.visable = false
        this.isShowClearIcon = true
        this.$emit('select', this.finalResult)
      }
    },
    clearTreeNodeActive() {
      let data = this.initData
      function getArray (arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].active = false
          if (arr[i].children.length != 0) {
             getArray(arr[i].children)
          }
        }
      }
      getArray(data)
      this.initData = data
      this.finalResult = {}
      this.$emit('select', this.finalResult)
      this.selectedVal = ''
    },
    // 第三版 不用组件自己请求数据，只当做ui组件用了。
    loadData(parent_id) {
      let that = this
      return this.$parent.yyOrgSelectLoadData(parent_id).then((res)=>{
        if(this.onlyOneLevel) {
          for (let i=0; i<res.length; i++){
            res[i].children = []
            res[i].hasChildren = false
            res[i].isLoading = false
            res[i].open = false
            res[i].active = false
          }
        } else{
          for (let i=0; i<res.length; i++){
            res[i].children = []
            res[i].hasChildren = true
            res[i].isLoading = false
            res[i].open = false
            res[i].active = false
          }
        }
        // initData有数据就是请求下级数据  没有数据就是初始化数据
        if(this.initData.length != 0) {
          let data = this.initData
          let id = parent_id
          function getArray (arr) {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i][that.id] == id && res.length != 0) {
                arr[i].isLoading = false
                arr[i].hasChildren = false
                arr[i].open = true
                arr[i].children = res
              } else if(arr[i][that.id] == id && res.length == 0) {
                arr[i].isLoading = false
                arr[i].open = false
                arr[i].hasChildren = false
              } else {
                getArray(arr[i].children)
              }
            }
          }
          getArray(data)
          that.initData = data
        }else {
          that.initData = res
        }
      })
    },
    // type: 1是外面的主搜索  2是弹框内的搜索
    searchData(keyword, type) {
      let that = this
      return this.$parent.yyOrgSelectSearchData(keyword).then((res) => {
        let data = res
        let arr = []
        for(let i=0; i<data.length; i++) {
          let dataValue = data[i][this.name]
          let keywordIndex = dataValue.indexOf(keyword)
          if(that.onlyOneLevel) {
            data[i].hasChildren = false
          } else {
            data[i].hasChildren = true
          }
          data[i].active = false
          data[i].open = false
          data[i].isLoading = false
          data[i].children = []
          if(keywordIndex >= 0) {
            data[i].middleValue = keyword
            if(keywordIndex == 0) {
                data[i].startvalue = ''
            } else {
                data[i].startvalue = dataValue.substr(0, keywordIndex)
            }
            data[i].rightValue = dataValue.substr((keyword.length + keywordIndex))
            arr.push(data[i])
          }
        }
        if(type == 1) {
          this.searchResult = arr
          if(arr.length != 0) {
              this.isNoData = false
              this.isShowSlideCtn = true
          } else {
              this.isShowSlideCtn = false
              this.isNoData = true
          }
        } else {
          this.initData = arr
        }
      })
    }
  },
  created () {
    this.selectOneDataTip = this.$_t('pleaseSelectAData')
    this.loadData()
    Bus.$on('loadData', (val) => {
      return this.loadData(val)
    })
    Bus.$on('searchData', (val, type) => {
      this.searchData(val, type)
    })
    // 错误处理方法
    Bus.$on('errorFunc', (val) => {
      this.originErrorFunc(val)
    })
    Bus.$on('setResult', (val) => {
      this.setResult(val)
    })
    Bus.$on('setText', (val) => {
      this.setText(val)
    })
    Bus.$on('clearTreeNodeActive', () => {
      this.clearTreeNodeActive()
    })
    this.dialogLeft = parseInt(document.body.clientWidth/2) - 300
    this.dialogTop = 15
  }
}
</script>

<style lang="scss">
    ul, li{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .ys-file-tree-select{
        display: inline-block;
        min-width: 130px;
        // max-width: 200px;
        text-align: left;
        position: relative;
        &:hover .slide-ctn{
          height: 280px;
        }

        .select-head{
          margin-right: 10px;
          min-width: 96px;
          height: 30px;
          line-height: 28px;
          padding: 0 8px;
          color: #999;
          background-color: #F5F7F8;
          border-color: #F5F7F8;
          font-size: 12px;
          padding: 0;
          margin: 0;
          min-width: 130px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 10px;

            .select-result{
                font-size: 12px;
                margin-left: 10px;
            }
        }
        .sub-slide-ctn>.slide-ul::before{
          opacity: 0;
        }
        .sub-slide-ctn>.slide-ul>div>.slide-item::before{
          opacity: 0;
        }
        .slide-ctn{
            padding-bottom: 10px;
            height: 0;
            -webkit-transition: height 200ms ease-in;
            -moz-transition: height 200ms ease-in;
            -o-transition: height 200ms ease-in;
            transition: height 200ms ease-in;
            font-size: 12px;
            position: absolute;
            width: 400px;
            background: #fff;
            box-shadow: 0 4px 8px 0 rgba(41,42,45,.28);
            z-index: 9;
            max-height: 365px;
            padding: 0;
            overflow: hidden;
            z-index: 999;

            .sub-slide-ctn{
                overflow-x: hidden;
                overflow-y: auto;
                height: 228px;

                /*滚动条样式*/
                &::-webkit-scrollbar {
                    width: 3px;
                    height: 3px;
                }
                &::-webkit-scrollbar-thumb {
                    border-radius: 5px;
                    background: #d8d8d8;
                }
            }
            .slide-ul{
              position: relative;

              // &::before{
              //   content: '';
              //   display: inline-block;
              //   position: absolute;
              //   width: 1px;
              //   left: 0px;
              //   top: 0;
              //   bottom: 16px;
              //   background: #d0d0d0;
              // }
              .slide-item:nth-of-type(1)::after {
                top: 0;
                height: 16px;
              }
              .slide-item{
                width: 100%;
                // line-height: 33px;
                // height: 33px;
                position: relative;
                padding-left: 40px;
                font-size: 12px;
                .slide-item-sub{
                    height: 33px;
                }
                .item-text{
                    display: inline-block;
                    max-width: 200px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align: top;
                    line-height: 33px;
                }
                .slide-item-sub{
                    cursor: pointer;
                    &:hover{
                    background:rgba(243,243,243,1);
                    }
                }
                // &::before{
                //   content: '';
                //   display: inline-block;
                //   position: absolute;
                //   width: 13px;
                //   height: 1px;
                //   left: 0px;
                //   top: 16px;
                //   background: #d0d0d0;
                // }
                // &::after{
                //   content: '';
                //   display: inline-block;
                //   position: absolute;
                //   width: 1px;
                //   height: 34px;
                //   left: 0px;
                //   top: -17px;
                //   background: #d0d0d0;
                // }
                .icon{
                  cursor: pointer;
                  position: absolute;
                  display: inline-block;
                  left: 19px;
                  top: 11px;
                  width: 10px;
                  height: 10px;
                  border-radius: 2px;
                  border: 1px solid #555555;
                  transform: translateY(-15%);
                }
                .icon::before{
                  display: inline-block;
                  content: '';
                  position: absolute;
                  width: 6px;
                  height: 2px;
                  background:rgba(85,85,85,1);
                  left: 2px;
                  top: 4px;
                  transform: translate(-3%, -11%);
                }
                &.has-children{
                  &>.slide-item-sub>.icon::after{
                    display: inline-block;
                    content: '';
                    position: absolute;
                    width: 2px;
                    height: 6px;
                    background: #555555;
                    left: 4px;
                    top: 2px;
                  }
                }
              }
            }

        }
    }
</style>
