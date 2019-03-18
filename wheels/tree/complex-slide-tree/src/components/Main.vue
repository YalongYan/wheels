<template>
<div>
  <div class="ys-file-tree-select">
    <InputSlide
      :visable.sync="visable"
      :defaultText.sync="selectedVal"
    />
  </div>
  <MainDialog
    :initData="initData"
    :treeResult="treeResult"
    :visable.sync="visable"
    :defaultText.sync="selectedVal"
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
import Request from './../mixin/request'
import FormatRequestData from './../mixin/formatRequestData.js'

export default {
  name: 'app',
  data () {
    return {
      initData: [],
      selectedVal: this.defaultText,
      treeResult: {name: '1'},
      visable: false,
      finalResult: {}
    }
  },
  mixins: [FormatRequestData, Request],
  props:{
    placeHolder: {
      type: String,
      default: ()=> {
        let lang = navigator.language
        // 简陋的多语
        return  /^zh/.test(lang) ? '请输入' : 'Please input'
      }
    },
    v:{
      type: Number,
      default: 1
    },
    host: {
      type: String,
      default: '',
      required: true
    },
    qzid: {
      type: String,
      default: ''
    },
    page: {
      type: Number,
      default: 1
    },
    count: {
      type: Number,
      default: 60
    },
    breadcrumbs: {
      type: Number,
      default: 0
    },
    parent_id: {
      type: Number,
      default: 0
    },
    dept_type: {
      type: Number,
      default: 0,
      required: true
    },
    is_org: {
      type: Number,
      default: 0
    },
    dataResult: {
      type: Object,
      default: ()=> ({})
    },
    deptIds_ext: {
      type: Array,
      default: ()=> ([])
    },
    defaultText: {
      type: String,
      default: ''
    }
  },
  watch: {
    defaultText (val){
      this.selectedVal = val
    }
  },
  provide () {
    return {
      host: this.host,
      v: this.v,
      qzid: this.qzid,
      page: this.page,
      count: this.count,
      breadcrumbs: this.breadcrumbs,
      parent_id: this.parent_id,
      dept_type: this.dept_type,
      is_org: this.is_org,
      deptIds_ext: this.deptIds_ext
    }
  },
  components: {
    Search,
    Tree,
    InputSlide,
    MainDialog
  },
  methods:{
    addChildrenData(id, result) {
      let data = this.initData
      function getArray (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id == id) {
            arr[i].children = result
            arr[i].open = true
            arr[i].hasChildren = true
          } else {
            getArray(arr[i].children)
          }
        }
      }
      getArray(data)
      this.initData = data
    },
    searchData(val) {
        let keyword = val
        let getRequestPara = this.formatRequestData({keyword: keyword})
        let url = this.host + '/dept/getDeptList'
        this.$http.get(url, getRequestPara).then((response) => {
          let data = response.data.dept_list
          if(response.code == 0) {
              let arr = []
              for(let i=0; i<data.length; i++) {
                  data[i].hasChildren = true
                  data[i].open = false
                  data[i].isLoading = false
                  data[i].children = []
                  arr.push(data[i])
              }
              this.initData = arr
          } else {
            this.originErrorFunc(data.msg)
          }
        }).catch((error) => {
          this.originErrorFunc(error)
        })
    },
    // setResult(val) {
    //   this.$emit('select', val)
    // },
    setText(val) {
      this.selectedVal = val.name
      this.finalResult = val
      let data = this.initData
      let id = val.id
      function getArray (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id == id) {
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
    changeLoading (id, bool) {
      let data = this.initData
      function getArray (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id == id) {
            arr[i].isLoading = bool
          } else {
            arr[i].isLoading = false
            getArray(arr[i].children)
          }
        }
      }
      getArray(data)
      this.initData = data
    },
    lastConfirm() {
      if(JSON.stringify(this.finalResult) === "{}") {
        this.originErrorFunc('请选择一条数据')
      } else {
        this.$emit('select', this.finalResult)
      }
    }
  },
  created () {
    let getRequestPara = this.formatRequestData()
    let url = this.host + '/dept/getDeptList'
    this.$http.get(url, getRequestPara).then((response) => {
      let data = response.data.dept_list
      if(response.code == 0) {
          let arr = []
          for(let i=0; i<data.length; i++) {
              data[i].hasChildren = true
              data[i].open = false
              data[i].isLoading = false
              data[i].active = false
              data[i].children = []
              arr.push(data[i])
          }
          this.initData = arr
      } else {
        this.originErrorFunc(data.msg)
      }
    }).catch((error) => {
      this.originErrorFunc(error)
    })

    Bus.$on('searchData', (val) => {
      this.searchData(val)
    })
    Bus.$on('addChildrenData', (id, result) => {
      this.addChildrenData(id, result)
    })
    // 错误处理方法
    Bus.$on('errorFunc', (val) => {
      this.originErrorFunc(val)
    })
    // Bus.$on('setResult', (val) => {
    //   this.setResult(val)
    // })
    Bus.$on('setText', (val) => {
      this.setText(val)
    })
    Bus.$on('changeLoading', (id, bool) => {
      this.changeLoading(id, bool)
    })
    Bus.$on('setTreeResult', (obj) => {
      this.treeResult = obj
    })
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
        max-width: 200px;
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

              &::before{
                content: '';
                display: inline-block;
                position: absolute;
                width: 1px;
                left: 0px;
                top: 0;
                bottom: 16px;
                background: #d0d0d0;
              }
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
                &::before{
                  content: '';
                  display: inline-block;
                  position: absolute;
                  width: 13px;
                  height: 1px;
                  left: 0px;
                  top: 16px;
                  background: #d0d0d0;
                }
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
