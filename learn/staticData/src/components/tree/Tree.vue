<template>
  <ul class="tree-ctn">
    <TreeNode :data='data'></TreeNode>
  </ul>
</template>

<script>
import TreeNode from './TreeNode'
export default {
  name: 'Tree',
  props: ['data'],
  data () {
    return {
    }
  },
  components: {
    TreeNode
  }
}
</script>

<style lang="scss" scoped >
// .tree-ctn{
//   border-radius: 2px;
//   // border-top: 1px solid #EDEDED;
//   position: relative;
//   max-height: 400px;
//   overflow-y: auto;
//   // 禁止选中文字
//   -webkit-touch-callout: none;
//   -webkit-user-select: none;
//   -khtml-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
//   text-align: left;
// }
// /*滚动条样式*/
// .tree-ctn::-webkit-scrollbar {       /*滚动条整体样式*/
//     width: 7px;              /*高宽分别对应横竖滚动条的尺寸*/
//     height: 4px;
// }
// .tree-ctn::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
//     border-radius: 5px;
//     // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
//     background: #C1C1C1;
// }
// .tree-ctn::-webkit-scrollbar-track { /*滚动条里面轨道*/
//     // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
//     border-radius: 0;
//     background:#fff;
// }
</style>