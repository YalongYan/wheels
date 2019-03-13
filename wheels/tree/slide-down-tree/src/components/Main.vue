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

export default {
  name: 'app',
  data () {
    return {
      initData: [
        {name: '111'}, {name: '222'}, {name: '333'}, {name: '444', children: [{name:'ssdasdasd'}, {name: 'sssss', children: [{name: '萨达大萨达女', children: [{name: '吧吧不成熟时'}]}]}]}
      ]
    }
  },
  components: {
    Search,
    Tree
  },
  created () {
      // 允许跨域携带cookie
      axios.defaults.withCredentials = true
      axios.get('http://web.api.chaoke.com:6062/dept/getDeptList?qzid=0&sessionid=q6678tprcndl44sh1coc9gdp01&upesnc=null&upesntgc=null&upesnugc=null&v=1&parent_id=334890&page=1&count=60')
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
                &::after{
                  content: '';
                  display: inline-block;
                  position: absolute;
                  width: 1px;
                  height: 34px;
                  left: 0px;
                  top: -17px;
                  background: #d0d0d0;
                }  
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