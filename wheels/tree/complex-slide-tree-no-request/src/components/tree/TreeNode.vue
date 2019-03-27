<template>
<div class="treeNodeCtn">
    <li class="slide-item" v-for="node in data" :key='node.index'
        :class="{'has-children': node.hasChildren, 'active': node.active}"
        >
        <div v-if="node.middleValue" class="slide-item-sub" @click.stop="setText(node)">
            <span class="icon" @click.stop="loadData(node)"></span>
            <span class="item-text colorWordCtn"> <Loading v-show="node.isLoading" :size="12"/>
                <span class="searchWordMark normal">{{node.startvalue}}</span>
                <span class="searchWordMark colorWord">{{node.middleValue}}</span>
                <span class="searchWordMark normal">{{node.rightValue}}</span>
            </span>
            <!-- 这个东西用来解决子集点击加载的时候 不显示loading的问题 -->
            <span class="item-text" style="display:none">{{treeResult[name]}}</span>
        </div>
        <div v-else class="slide-item-sub" @click.stop="setText(node)">
            <span class="icon" @click.stop="loadData(node)"></span>
            <span class="item-text"> <Loading v-show="node.isLoading" :size="12"/> {{node[name]}}</span>
            <!-- 这个东西用来解决子集点击加载的时候 不显示loading的问题 -->
            <span class="item-text" style="display:none">{{treeResult.name}}</span>
        </div>
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave">
            <ul class="slide-ul"  v-if="node.open">
                <TreeNode
                    :data="node.children"
                    :treeResult="treeResult"
                />
            </ul>
        </transition>
    </li>
</div>
</template>

<script>
import Loading from './../Loading'
import TreeNode from './TreeNode'
import Bus from './../../bus'
import TransitionMixin from './../../mixin/transition'
import Request from './../../mixin/request'
import FormatRequestData from './../../mixin/formatRequestData.js'

export default {
  name: 'TreeNode',
  props: ['data', 'treeResult'],
//   inject: ['host' ,'v', 'qzid', 'page', 'count', 'breadcrumbs', 'parent_id', 'dept_type', 'is_org', 'deptIds_ext'],
  inject: ['name', 'id', 'defaultText'],
  data () {
    return {
    }
  },
  components: {
    TreeNode,
    Loading
  },
  mixins: [TransitionMixin, Request, FormatRequestData],
  computed: {
  },
  mounted (){
  },
  created (){
  },
  methods: {
    setText(node) {
        Bus.$emit('setText', node)
    },
    loadData(node) {
        if(node.children.length) {
           node.open = !node.open
           node.hasChildren = !node.hasChildren
        }else if(node.hasChildren){
            node.isLoading = true
            Bus.$emit('setTreeResult', node)
            Bus.$emit('loadData',  node[this.id])
            // node.isLoading = true
            // let parent_id = node.id
            // let getRequestPara = this.formatRequestData({parent_id: parent_id})
            // let url = this.host + '/dept/getDeptList'
            // this.$http.get(url, getRequestPara).then((response) => {
            //     node.isLoading = false
            //     let data = response.data.dept_list
            //     if(response.code == 0) {
            //         if(data.length) {
            //             let arr = []
            //             for(let i=0; i<data.length; i++) {
            //                 data[i].hasChildren = true
            //                 data[i].open = false
            //                 data[i].active = false
            //                 data[i].children = []
            //                 arr.push(data[i])
            //             }
            //             Bus.$emit('addChildrenData', parent_id, arr)
            //         } else {
            //             node.hasChildren = false
            //             node.open = false
            //         }
            //         node.hasChildren = false
            //     } else {
            //         Bus.$emit('errorFunc', response.msg)
            //     }
            // }).catch((error) => {
            //     Bus.$emit('errorFunc', error)
            //     node.isLoading = false
            // })
        }
    }
  }
}
</script>

<style lang="scss">

</style>