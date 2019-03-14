<template>
<div>
    <li class="slide-item" v-for="node in data" :key='node.index'
        :class="{'has-children': node.hasChildren}"
        @click.stop="loadData(node)">
        <div class="slide-item-sub">
            <Loading v-if="node.isLoading" :size="12"/>
            <span class="icon"></span>
            <span class="item-text">{{node.name}}</span>
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
                :data="node.children"/>
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

export default {
  name: 'TreeNode',
  props: ['data'],
  inject: ['host' ,'v', 'qzid', 'page', 'count', 'breadcrumbs', 'parent_id', 'dept_type', 'is_org'],
  data () {
    return {
    }
  },
  components: {
    TreeNode,
    Loading
  },
  mixins: [TransitionMixin],
  computed: {
  },
  mounted (){
  },
  created (){
  },
  methods: {
    loadData(node) {
        if(node.children.length) {
           node.open = !node.open
           node.hasChildren = !node.hasChildren
        }else {
            node.isLoading = true
            let parent_id = node.id
            let url = this.host + '/dept/getDeptList?qzid=0&sessionid=q6678tprcndl44sh1coc9gdp01&upesnc=null&upesntgc=null&upesnugc=null&v=1&parent_id='+parent_id+'&page=1&count=60'
            this.$http.get(url).then((response) => {
            node.isLoading = false
            let data = response.data.dept_list
            if(response.code == 0) {
                if(data.length) {
                    let arr = []
                    for(let i=0; i<data.length; i++) {
                        data[i].hasChildren = true
                        data[i].open = false
                        data[i].children = []
                        arr.push(data[i])
                    }
                    // this.addChildrenData(parent_id, arr)
                    Bus.$emit('addChildrenData', parent_id, arr)
                } else {
                    node.hasChildren = false
                    node.open = false
                }
                
            } else {
                alert(data.msg)
            }
            }).catch(() => {
                node.isLoading = false
            })
        }
    }
  }
}
</script>

<style lang="scss">

</style>