<template>
<div>
    <li class="slide-item" v-for="node in data" :key='node.index'
        :class="{'has-children': node.hasChildren}"
        @click.stop="loadData(node)">
        <div class="slide-item-sub">
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
    <!-- <li class="slide-item has-children"> -->
   
     <!-- <li class="node" v-for="node in data" :key='node.index'>
        <div>
            <div v-if="!node.newFile">
                <div v-if="node.hasChildren" @click="loadItem(node)"
                class="li-hover-item"
                :class="{seceltedCLass: treeResult.fid == node.fid}"
                :style="{ paddingLeft: ( node.level*20 + 17 ) + 'px' }">
                <span :class="{'dropTogleIconRoate': node.open}" class="dropTogleIcon"></span>
                <img class="downloadIconImg" :src='downloadImgUrl'>
                <Loading :size='12' v-show="node.loading"/>
                <span class="node-name">{{node.filename}}</span>
                </div>
                <div v-else class="li-hover-item"
                    :class="{seceltedCLass: treeResult.fid == node.fid}"
                    @click.stop='selectItem(node)'
                    :style="{ paddingLeft: ( node.level*20 + 10 ) + 'px' }">
                    <span class="empty-node-icon"></span>
                    <img class="downloadIconImg" :src='downloadImgUrl'>
                    <span class="node-name">{{node.filename}}</span>
                </div>
            </div>
            <div v-else
                class="li-hover-item"
                :style="{ paddingLeft: ( node.level*20 + 10 ) + 'px' }">
                <span class="empty-node-icon"></span>
                <img class="downloadIconImg" :src='downloadImgUrl'>
                <input type="text" id="newFileInput" v-model="newFileValue" @blur="newFileBlur(node)" autocomplete="off">
            </div>
            <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @leave="leave"
                @after-leave="afterLeave">
                <ul v-if="node.children" v-show="node.open">
                    <TreeNode
                        :data="node.children"
                        :treeResult="treeResult"
                    />
                </ul>
            </transition>
        </div>
    </li> -->
</template>

<script>
// import downloadImgUrl from '../../static/img/download.png'
// import Loading from './../layout/Loading'
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
    TreeNode
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
            let parent_id = node.id
            let url = this.host + '/dept/getDeptList?qzid=0&sessionid=q6678tprcndl44sh1coc9gdp01&upesnc=null&upesntgc=null&upesnugc=null&v=1&parent_id='+parent_id+'&page=1&count=60'
            this.$http.get(url).then((response) => {
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

            })
        }
    }
  }
}
</script>

<style lang="scss">

</style>