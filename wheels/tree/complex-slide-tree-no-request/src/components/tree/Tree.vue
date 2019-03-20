<template>
<ul class="slide-ul">
  <div style="
    position: absolute;
    width: 28px;
    height: 100%;
    right: -28px;
    background: white;
    bottom: 0;
    z-index: 999;
    top: 0;
"></div>
  <TreeNode
    :data='data'
    :treeResult='treeResult'
  />
</ul>
</template>

<script>
import TreeNode from './TreeNode'
export default {
  name: 'Tree',
  props: ['data', 'treeResult'],
  data () {
    return {
    }
  },
  methods:{
  },
  mounted () {
  },
  components: {
    TreeNode
  }
}
</script>

<style lang="scss">
// .tree-container{
//   position: relative;
//   height: 350px;
//   border-radius: 2px;
//   position: relative;
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
//  /*滚动条样式*/
// .tree-container::-webkit-scrollbar {       /*滚动条整体样式*/
//     width: 7px;              /*高宽分别对应横竖滚动条的尺寸*/
//     height: 4px;
// }
// .tree-container::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
//     border-radius: 5px;
//     background: #C1C1C1;
// }
// .tree-container::-webkit-scrollbar-track { /*滚动条里面轨道*/
//     border-radius: 0;
//     background:#fff;
// }
</style>