<template>
<ul class="slide-ul">
  <TreeNode
    :data='data'
  />
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