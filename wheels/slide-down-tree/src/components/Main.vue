<template>
  <div id="app">
      <div class="file-tree-select">
        <div class="select-head">
            <span class="select-result">选择</span>    
        </div>
        <ul class="slide-ctn">
            <li class="slide-item">
                <span class="icon">+</span>
                <span class="item-text">全局</span>
            </li>
            <li class="slide-item">
                <span class="icon">+</span>
                <span class="item-text">全局1</span>
            </li>
            <li class="slide-item">
                <span class="icon">+</span>
                <span class="item-text">全局2</span>
            </li>
        </ul>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
    //   msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
      // 允许跨域携带cookie
      axios.defaults.withCredentials = true
      axios.get('http://web.api.chaoke.com:6062/dept/getDeptList?qzid=0&sessionid=q6678tprcndl44sh1coc9gdp01&upesnc=null&upesntgc=null&upesnugc=null&v=1&parent_id=334890&page=1&count=60')
  }
}
</script>

<style lang="scss" scoped>
    ul, li{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .file-tree-select{
        min-width: 130px;
        max-width: 200px;
        text-align: left;
        position: relative;
        &:hover .slide-ctn{
            opacity: 1;
            height: 20px;
        }

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
        .slide-ctn{
            opacity: 0;
            height: 0;
            -webkit-transition: height 200ms ease-in;
            -moz-transition: height 200ms ease-in;
            -o-transition: height 200ms ease-in;
            transition: height 200ms ease-in;
            font-size: 12px;
            position: absolute;
            width: 459px;
            background: #fff;
            padding: 4px 20px;
            box-shadow: 0 4px 8px 0 rgba(41,42,45,.28);
            z-index: 9;
            padding-left: 10px;
            max-height: 365px;
            overflow-y: auto;
            /*滚动条样式*/
            &::-webkit-scrollbar {/*滚动条整体样式*/
                width: 3px;     /*高宽分别对应横竖滚动条的尺寸*/
                height: 3px;
            }
            &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 5px;
                background: #d8d8d8;
            }
            // &::-webkit-scrollbar-track {/*滚动条里面轨道*/
            //     -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            //     border-radius: 0;
            //     background: rgba(0,0,0,0.1);
            // }

            .slide-item{
                width: 100%;
                line-height: 33px;
            }
        }
    }
    /*start多级管控新下拉*/
#initInfiniteUl {
  display: none;
  font-size: 12px;
  position: absolute;
  /*left: 200px;*/
  /*top: 100px;*/
  width: 459px;
  background: white;
  padding: 4px 20px;
  box-shadow:0px 4px 8px 0px rgba(41,42,45,0.28);
  z-index: 9;
  padding-left: 10px;
  max-height: 365px;
  overflow-y: auto;
}
#initInfiniteUl::-webkit-scrollbar {
   width: 4px;
   height: 4px;
 }
#initInfiniteUl::-webkit-scrollbar-thumb {
   border-radius: 5px;
   -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
   background: rgba(0,0,0,0.2);
 }
#initInfiniteUl::-webkit-scrollbar-track {
   -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
   border-radius: 0;
   background: rgba(0,0,0,0.1);
 }
.initInfiniteUl .initInfiniteLi{
  line-height: 33px;
  /*height: 33px;*/
  position: relative;
}
.initInfiniteCtn{
  display: none;
}
.initInfiniteCtn>.verticalLine{
  display: inline-block;
  width: 1px;
  position: absolute;
  top: 24px;
  background: #DEE0E3;
  height: 0;
}
.initInfiniteItem {
  padding-left: 22px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
}
.initInfiniteItem::before{
  content: '';
  display: inline-block;
  position: absolute;
  background: #DEE0E3;
  width: 13px;
  height: 1px;
  left: 0;
  top: 15px;
}
.toggleShowIcon{
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  border: 1px solid rgba(85,85,85,1);
  vertical-align: middle;
  margin-top: -3px;
  position: relative;
  cursor: pointer;
  margin-right: 8px;
  position: absolute;
  left: 14px;
  top: 12px;
}
.toggleShowIcon::before{
  content: '';
  display: inline-block;
  position: absolute;
  width: 6px;
  height: 2px;
  background: #555555;
  left: 2px;
  top: 4px;
}
.toggleShowIcon::after{
  content: '';
  display: inline-block;
  position: absolute;
  width: 2px;
  height: 6px;
  background: #555555;
  left: 4px;
  top: 2px;
}
.active>.toggleShowIcon::after{
  display: none;
}
.initInfiniteLi>.initInfiniteCtn{
  display: block;
}
.initInfiniteCtn .active>.initInfiniteCtn{
  display: block;
}
.initInfiniteUl .details{
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  padding-left: 6px;
}
.initInfiniteLi>.initInfiniteCtn>.initInfiniteItem::before{
  display: none;
}
.initInfiniteLi>.initInfiniteCtn>.initInfiniteItem>.toggleShowIcon{
  position: absolute;
  left: 0;
  top: 12px;
}
.initInfiniteLi>.initInfiniteCtn>.initInfiniteItem>.details{
  padding-left: 0;
}
/*end多级管控新下拉*/
</style>
