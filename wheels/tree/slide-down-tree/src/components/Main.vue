<template>
  <div id="app">
      <div class="ys-file-tree-select">
        <div class="select-head">
            <span class="select-result">选择</span>    
        </div>
        <div class="slide-ctn">
          <Search/>
          <div class="sub-slide-ctn">
            <Tree :data="initData"/>
          </div>
          <ul class="slide-ul" style="display:none">
              <li class="slide-item">
                  <span class="icon"></span>
                  <span class="item-text">全局</span>
                  <ul class="slide-ul">
                      <li class="slide-item">
                          <span class="icon"></span>
                          <span class="item-text">撒打算大</span>
                      </li>
                      <li class="slide-item">
                          <span class="icon"></span>
                          <span class="item-text">啛啛喳喳</span>
                      </li>
                      <li class="slide-item">
                          <span class="icon"></span>
                          <span class="item-text">打断点</span>
                          <ul class="slide-ul">
                      <li class="slide-item">
                          <span class="icon"></span>
                          <span class="item-text">撒打算大</span>
                      </li>
                      <li class="slide-item">
                          <span class="icon"></span>
                          <span class="item-text">啛啛喳喳</span>
                      </li>
                      <li class="slide-item">
                          <span class="icon"></span>
                          <span class="item-text">打断点</span>
                      </li>
                  </ul>
                      </li>
                  </ul>
              </li>
              <li class="slide-item has-children">
                  <span class="icon"></span>
                  <span class="item-text">全局1</span>
              </li>
              <li class="slide-item has-children">
                  <span class="icon"></span>
                  <span class="item-text">全局2</span>
              </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Search from './Serach'
import Tree from './tree/Tree'
import Bus from './../bus'
import FormatRequestData from './../mixin/formatRequestData.js'

export default {
  name: 'app',
  data () {
    return {
      initData: [] 
    }
  },
  mixins: [FormatRequestData],
  props:{
    v:{
      type: Number,  
      default: 1
    },
    host: {
      type: String,
      default: ''
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
      default: 0
    },
    is_org: {
      type: Number,
      default: 0
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
      is_org: this.is_org
    }
  },
  components: {
    Search,
    Tree
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
        let url = this.host + '/dept/getDeptList?qzid=0&upesnc=null&upesntgc=null&upesnugc=null&v=1&parent_id=0&page=1&count=60&keyword='+keyword
        this.$http.get(url).then((response) => {
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
            alert(data.msg)
        }
        }).catch(() => {

        })
    }
  },
  created () {
    let getRequestPara = this.formatRequestData()
    let url = this.host + '/dept/getDeptList?' + getRequestPara
    this.$http.get(url).then((response) => {
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
        alert(data.msg)
    }
    }).catch(() => {

    })

    Bus.$on('searchData', (val) => {
      this.searchData(val)
    })
    Bus.$on('addChildrenData', (id, result) => {
      this.addChildrenData(id, result)
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
        min-width: 130px;
        max-width: 200px;
        text-align: left;
        position: relative;
        // &:hover .slide-ctn{
        //     opacity: 1;
        //     height: 20px;
        // }

        .select-head{
            margin-right: 10px;
            min-width: 96px;
            height: 28px;
            line-height: 28px;
            padding: 0 8px;
            color: #999;
            background-color: #F5F7F8;
            border-color: #F5F7F8;
            font-size: 12px;
            padding: 0;
            margin: 0;
            min-width: 130px;
            border-radius: 4px;

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
            opacity: 1;
            // height: 0;
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
                line-height: 33px;
                height: 33px;
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
                  .icon::after{
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