<template>
<transition name='shown'>
  <div v-show="visable">
    <div id='slideDonwDialog' :style="{ left: dialogLeft + 'px', top: dialogTop + '%' }">
      <div class="header" @mousedown='moveAllBody'>
        <span class="title">{{$_t("orgReference")}}</span>
        <img :src='close' class="closeIcon" @click="closeDialog"/>
        <Search style="float:right;"/>
      </div>
      <div class="sub-slide-ctn">
        <div class="dialogNoDataCtn" v-if="isShowdialogNoData">
          <img :src="dialogNoDataImg"/>
          <div class="dialogNoDataDesc">{{$_t("noData")}}</div>
        </div>
        <Tree
          :data="initData"
          :treeResult="treeResult"/>
      </div>
      <div class="footer">
        <span class="defaultBtn cancel" @click="closeDialog"> {{$_t("cancle")}}</span>
        <span class="defaultBtn confirm" @click="confirm"> {{$_t("confirm")}}</span>
      </div>
      <img class="resizeBar" :src="resizeBar" @mousedown='moveResize'/>
    </div>
  </div>
</transition>
</template>

<script>
import Search from './../common/Search'
import Tree from './../tree/Tree'
import { close, resizeBar, dialogNoData } from './../../static/img/base64'
import locales from './../../../locales'
import Lang from './../../mixin/lang.js'

export default {
  props: ['initData', 'treeResult', 'visable', 'defaultText', 'isShowdialogNoData', 'dialogLeft', 'dialogTop'],
  data () {
    return {
      close: close,
      resizeBar: resizeBar,
      treeResultNew: this.treeResult,
      treeData: this.initData,
      dialogNoDataImg: dialogNoData,
      locales: (() => {
            const lang = navigator.language
            let useLang = /^zh/.test(lang) ? 'zh-CN' : /^en/.test(lang) ? 'en' : lang
            // Object.keys 获取可枚举的属性 如果浏览器的语言不是英语 中文， 而且传递的lang参数也不是这两种之一，就默认使用 zh-CN
            if (!Object.keys(locales).includes(useLang)) {
                useLang = 'zh-CN'
            }
            return locales[useLang]
      })()
      // initData: [
      //   {hasChildren:true, name: '1111', children: [], isLoading: false, open: false},
      //   {hasChildren:true, name: '2222', children: [
      //      {hasChildren:true, name: 'dsada', children: [], isLoading: false, open: false}
      //   ], isLoading: false, open: true}
      // ]
    }
  },
  mixins: [Lang],
  methods:{
    closeDialog() {
      this.$emit('update:visable', false)
    },
    confirm() {
      this.$emit("confirm")
    },
    moveResize(e){
      let odiv = e.target;
      let initX = e.clientX
      let initY = e.clientY
      let moveObj = document.querySelector("#slideDonwDialog")
      let initWidth = parseInt(moveObj.getBoundingClientRect().width)
      let initHeight = parseInt(moveObj.getBoundingClientRect().height)
      document.onmousemove = (e) => { // 鼠标按下并移动的事件
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - initX;    
          let top = e.clientY - initY;
          let lastWidth = initWidth + left
          let lastHeight = initHeight + top
          // 限制最小宽度800 最小高度600
          if(lastWidth < 800) {
            lastWidth = 800
          }
          if(lastHeight < 600) {
            lastHeight = 600
          }
          moveObj.style.width = lastWidth + 'px'
          moveObj.style.height = lastHeight + 'px'
      };
      document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
      };
    },
    moveAllBody(e){
      let initX = e.clientX
      let initY = e.clientY
      let moveObj = document.querySelector("#slideDonwDialog")
      let initTop = parseInt(moveObj.getBoundingClientRect().top)
      let initLeft = parseInt(moveObj.getBoundingClientRect().left)
      document.onmousemove = (e)=>{
          let left = e.clientX - initX;    
          let top = e.clientY - initY;
          let bodyHeight = document.body.offsetHeight
          let bodyWidth = document.body.offsetWidth
          let nowLeft = moveObj.getBoundingClientRect().left
          let nowTop = moveObj.getBoundingClientRect().top
          let nowWidth =  moveObj.getBoundingClientRect().width
          let nowHeight =  moveObj.getBoundingClientRect().height
          if((initLeft + left) <= 0) {
            moveObj.style.left = 0
          }else if((initLeft + left) > (bodyWidth - nowWidth)){
            moveObj.style.left = bodyWidth - nowWidth + 'px'
          } else {
            moveObj.style.left = initLeft + left + 'px'
          }
          if((initTop + top) <= 0) {
           moveObj.style.top = 0
          }else if((initTop + top) > (bodyHeight - nowHeight)){
            moveObj.style.top = bodyHeight - nowHeight + 'px'
          } else {
            moveObj.style.top = initTop + top + 'px'
          }
      };
      document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
      };
    }
  },
  mounted () {
  },
  watch: {
    initData: {
      handler: function (newVal, oldVal) {
        this.treeData = newVal
      },
      deep: true
    },
    treeResult: {
      handler: function (newVal, oldVal) {
        this.treeResultNew = newVal
      },
      deep: true
    }
  },
  components: {
    Search,
    Tree
  }
}
</script>

<style lang="scss" scoped>
.shown-leave-active,
.shown-enter-active{
  transition: all 0.1s linear;
}
.shown-enter,.shown-leave-to{
  // transform: translateY(-50px);
  opacity: 0;
}
#slideDonwDialog {
  user-select:none;
  display: flex;
  flex-direction: column;
  width:800px;
  height:600px;
  background:rgba(255,255,255,1);
  box-shadow:0px 6px 8px 0px rgba(74,81,93,0.25);
  border-radius:3px;
  border:1px solid rgba(78,89,104,0.19);
  position: fixed;
  // // left: 50%;
  // left:calc(50%-400px);
  // left:-webkit-calc(50% - 400px);
  // left:-moz-calc(50% - 400px);
  // // top: 50%;
  // top:calc(50%-301px);
  // top:-webkit-calc(50% - 301px);
  // top:-moz-calc(50% - 301px);
  // // transform: translate(-50%, -50%);
  // // margin-left: -400px;
  // // margin-top: -301px;

  .header{
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #DDDDDD;
    line-height: 50px;
    font-size: 14px;
    cursor: move;

    .title{
      float: left;
      margin-left: 20px;
    }
    .closeIcon{
      float: right;
      cursor: pointer;
      margin-top: 17px;
      margin: 18px 20px 0 20px;
    }
  }
  .sub-slide-ctn>.slide-ul::before{
    opacity: 0;
  }
  .sub-slide-ctn>.slide-ul>div>.slide-item::before{
    opacity: 0;
  }
  .footer{
    text-align: right;
    font-size: 0;
    height: 60px; 
    line-height: 60px;
    border-top: 1px solid #DDDDDD;
    // position: absolute;
    width: 100%;
    // bottom: 0;
    // left: 0;
    // z-index: 8;

    .defaultBtn{
      display: inline-block;
      height: 32px;
      background: rgba(228,228,228,1);
      border-radius: 3px;
      text-align: center;
      line-height: 32px;
      padding: 0 20px;
      font-size: 14px;
      margin-right: 10px;
      cursor: pointer;
      vertical-align: middle;
    }
    .cancle{
      color: #555555;
    }
    .confirm{
      background: #E14C46;
      color: #FFFFFF;
      margin-right: 20px;
    }
  }
  .resizeBar{
    position: absolute;
    right: 4px;
    bottom: 4px;
    z-index: 9;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.sub-slide-ctn>.slide-ul::before{
  opacity: 0;
}
.sub-slide-ctn>.slide-ul>div>.slide-item::before{
  opacity: 0;
}
.sub-slide-ctn{
    flex: 1;
    text-align: left;
    overflow-x: hidden;
    overflow-y: auto;
    // height: 489px;
    height:calc(100%-110px);
    height:-webkit-calc(100% - 110px);
    height:-moz-calc(100% - 110px);
    // position: absolute;
    width: 100%;
    // top: 51px;
    // left: -27px;
    // z-index: 8;
    padding-right: 27px;
    margin-left: -27px;

    /*滚动条样式*/
    &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #d8d8d8;
    }
    .dialogNoDataCtn{
      text-align: center;
      margin-top: -30px;
      position: absolute;
      width: 100%;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    .dialogNoDataDesc{
      color: #888888;
      font-size: 12px;
    }
}
.slide-ul{
  position: relative;
  font-size: 0;

  &::before{
    content: '';
    display: inline-block;
    position: absolute;
    width: 1px;
    left: 27px;
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
    // margin-left: -28px;

    &.active>.slide-item-sub {
      background: #f3f3f3;
    }
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
        margin-left: 28px;
    }
    .colorWordCtn{
      font-size: 0;

      .colorWord{
        color: #289CF2;
        font-size: 14px;
      }
      .normal{
        font-size: 14px;
      }
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
      left: 28px;
      top: 16px;
      background: #d0d0d0;
    }
    .icon{
      cursor: pointer;
      position: absolute;
      display: inline-block;
      left: 48px;
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

</style>