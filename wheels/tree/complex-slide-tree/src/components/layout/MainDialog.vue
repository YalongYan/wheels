<template>
<transition name='shown'>
  <div v-if="visable">
    <div id='slideDonwDialog'>
      <div class="header">
        <span class="title">组织参照</span>
        <img :src='close' class="closeIcon" @click="closeDialog"/>
        <Search style="float:right;"/>
      </div>
      <div class="sub-slide-ctn">
        <Tree
          :data="initData"
          :treeResult="treeResult"/>
      </div>
      <div class="footer">
        <span class="defaultBtn cancel" @click="closeDialog">取消</span>
        <span class="defaultBtn confirm" @click="confirm">确定</span>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import Search from './../common/Search'
import Tree from './../tree/Tree'
import { close } from './../../static/img/base64'

export default {
  props: ['initData', 'treeResult', 'visable', 'defaultText'],
  data () {
    return {
      close: close,
      treeResultNew: this.treeResult,
      treeData: this.initData
      // initData: [
      //   {hasChildren:true, name: '1111', children: [], isLoading: false, open: false},
      //   {hasChildren:true, name: '2222', children: [
      //      {hasChildren:true, name: 'dsada', children: [], isLoading: false, open: false}
      //   ], isLoading: false, open: true}
      // ]
    }
  },
  methods:{
    closeDialog() {
      this.$emit('update:visable', false)
    },
    confirm() {
      this.$emit("confirm")
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
  width:800px;
  height:600px;
  background:rgba(255,255,255,1);
  box-shadow:0px 6px 8px 0px rgba(74,81,93,0.25);
  border-radius:3px;
  border:1px solid rgba(78,89,104,0.19);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .header{
    height: 50px;
    border-bottom: 1px solid #DDDDDD;
    line-height: 50px;
    font-size: 14px;

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
    }
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
    text-align: left;
    overflow-x: hidden;
    overflow-y: auto;
    // height: 228px;
    height: 489px;
    margin-left: -25px;

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
  font-size: 0;
  // margin-left:-30px;
  // margin-left: -26px;

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