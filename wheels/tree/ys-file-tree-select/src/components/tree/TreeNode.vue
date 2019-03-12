<template>
  <div>
     <li class="node" v-for="node in data" :key='node.index'>
        <div>
            <!-- 文件夹是否展示 根据 是否有node.children 属性判断的 -->
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

            <!-- 支持slideDown slideUp效果的动画 -->
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
    </li>
  </div>
</template>

<script>
// import downloadImgUrl from '../../static/img/download.png'
import Loading from './../layout/Loading'
import TreeNode from './TreeNode'
import Bus from './../../bus'
import TransitionMixin from './../../mixin/transition'
const lang = navigator.language

export default {
  name: 'TreeNode',
  props: ['data', 'treeResult'],
  data () {
    return {
      downloadImgUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkNEMjMzODgxQjU5MTFFNzhENUJBRUMzOEVGOUI0QTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkNEMjMzODcxQjU5MTFFNzhENUJBRUMzOEVGOUI0QTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QTg1OTYwMjFCNTkxMUU3OEQ1QkFFQzM4RUY5QjRBMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QTg1OTYwMzFCNTkxMUU3OEQ1QkFFQzM4RUY5QjRBMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiCrQSIAAAGOSURBVHja7NuxLgRRFAbge3dFRGQ0u51SRBREhUqxLavS6LX0Wi+gIx6AhIjYLUTwBhPxBFohGjIREXH9x55N6M3cG+c/yZ/p9u75Mjt7z2TGhxCc5ao540UAAhivgZfrdAyy1mf0M2AJOUXuEfk24Y/yiEwmeQbocRg5RNolrdNELpFF5C61a4BHDkpsvl9jyIUekwJYRVYqWm9cEZopAaxXvOaUIoymAjAfYd1Z5FyvPdEBRiKtvYB0kaGYAP75yseehjp6HXrPGtPVA3zkE9HHwVp90HlfL+vj35Ab5ATZR4pfAOF2xtI8/IRs6J7H5CzQ0D3Pju5/zA5Dm8i2xZ/Az5JZZ87yOCy9b1m/H9CyDpDxlhgBCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAlgBKAz3XwhAbhggF4A9wwC7AnCEnBlsXno+FgB5SmzN9Z7btVJd7Tn0/wVeXe+FiWWVeVCY/1JBe+poj23t+fs5Qe4DLJfnu8PcCRLAdH0JMABm0VdIdly4JgAAAABJRU5ErkJggg==',
      newFileValue: /^zh/.test(lang) ? '新建文件夹' : 'New folder'
    }
  },
  components: {
    TreeNode,
    Loading
  },
  inject: ['host', 'qzId', 'memberId', 'powers', 'showFiles', 'disableNewFile'],
  computed: {
  },
  mounted (){
  },
  created (){
  },
  mixins: [TransitionMixin],
  methods: {
    selectItem: function (node) {
        if(node.fid !== 'thisIsNewFils'){
            Bus.$emit('setTreeResult', node)
        }
        let fid = node.fid
        switch(fid) {
            case '1':
                Bus.$emit('setNewFileDisable', false)
            break; 
            case '2':
                Bus.$emit('setNewFileDisable', true)
            break;   
            case '4':
                Bus.$emit('setNewFileDisable', true)
            break; 
            case '3':
                Bus.$emit('setNewFileDisable', false)
            break;
            default:
                Bus.$emit('setNewFileDisable', false)
            break
        }
    },
    loadItem: function(node) {
        this.selectItem(node)
        let fid = node.fid
        let _this = this
        switch(fid) {
            case '1':
                // 已经请求过数据了就不用请求了，避免重复请求
                try {
                  if(!node.children.length) {
                    node.loading = true
                    this.getlist(_this, node)
                  }else {
                    // 有数据的就是展开关闭
                    node.open = !node.open
                  }
                }
                catch(err){}
            break;
            case '2':
                try {
                  if(!node.children.length) {
                    node.loading = true
                    this.grouplist(_this, node)
                  }else {
                    // 有数据的就是展开关闭
                    node.open = !node.open
                    }
                }
                catch(err){}
            break;
            case '4':
                try {
                  if(!node.children.length) {
                    node.loading = true
                    this.projectList(_this, node)
                  }else {
                    // 有数据的就是展开关闭
                    node.open = !node.open
                    }
                }
                catch(err){}
            break;
            case '3':
                try {
                  if(!node.children.length) {
                    node.loading = true
                    this.getlist(_this, node)
                  }else {
                    // 有数据的就是展开关闭
                    node.open = !node.open
                  }
                }
                catch(err){}
            break;
            default:
                try {
                  if(!node.children.length) {
                    node.loading = true
                    this.$nextTick(()=>{
                        this.getlist(_this, node)
                    })
                    
                  }else {
                    // 有数据的就是展开关闭
                    node.open = !node.open
                  }
                }
                catch(err){}
            break;
        }
    },
    // 企业文档请求接口
    getlist: (_this, node)=> {
        let fatherNode = _this.treeResult
        let isInit = false
        try {
            isInit = node.init
        }
        catch(err) {
        }
        let url = _this.host
        let postData = {
            firstType: node.belongs,
            qzId: _this.qzId,
            memberId: _this.memberId,
            secondType: 0,
            count: 1000,
            sort: 0, //排序
            showFile: 0, // 目录里存在文件时是否显示文件，0 不显示，1显示 默认为1
            thirdType: 0
        }
        let level = node.level
        // 是初次加载 加载第一级
        if(!isInit) {
            postData.thirdType = node.fid
        }
        if (fatherNode.fid != '1' && fatherNode.fid != '3') {
            postData.secondType = fatherNode.fid
        }
        // 把对象转为可用于get请求的字符串
        let postDataString = _this.transformObjToString(postData)
        _this.$http.get(url + '/rest/document/wenku/'+_this.qzId+'/'+_this.memberId+'/getList?' + postDataString).then(res => {
            let data = res.data.list
            node.loading = false
            if(res.flag === '0') {
                let arr = []
                if(data.length) {
                // 有数据的时候 才展开
                node.open = !node.open
                for(let i = 0; i < data.length; i++) { 
                    data[i].open = false
                    data[i].level = level + 1
                    data[i].children = []
                    data[i].hasChildren = true
                    arr.push(data[i])
                }
                node.children = arr
                } else {
                    node.hasChildren = false
                }
            } else {
                Bus.$emit('emitErrorDialog', res.data)
                Bus.$emit('closeLoading', fatherNode)
            }
        }).catch(msg => {})
    },
    // 内部群文档
    grouplist: (_this, node)=> {
        let isInit = false
        try {
            isInit = node.init
        }
        catch(err) {
        }
        let url = _this.host
        let postData = {
            firstType: node.belongs,
            qzId: _this.qzId,
            memberId: _this.memberId,
            secondType: 0,
            count: 1000,
            sort: 0, //排序
            showFile: 0, // 目录里存在文件时是否显示文件，0 不显示，1显示 默认为1
            thirdType: 0
        }
        let level = node.level
        // 是初次加载 加载第一级
        if(!isInit) {
            postData.thirdType = node.fid
        }
        // 把对象转为可用于get请求的字符串
        let postDataString = _this.transformObjToString(postData)
        _this.$http.get(url + '/rest/document/wenku/'+_this.qzId+'/'+_this.memberId+'/groupList?' + postDataString).then(res => {
            let data = res.data
            node.loading = false
            if(res.flag === '0') {
                let arr = []
                if(data.length) {
                // 有数据的时候 才展开
                node.open = !node.open
                for(let i = 0; i < data.length; i++) { 
                    data[i].open = false
                    data[i].level = level + 1
                    data[i].children = []
                    data[i].hasChildren = true
                    data[i].filename = data[i].group_name
                    data[i].fid = data[i].gid
                    data[i].belongs = _this.treeResult.belongs
                    arr.push(data[i])
                }
                node.children = arr
                } else {
                    node.hasChildren = false
                }
            } else {
                console.log(res.message)
            }
        }).catch(msg => {})
    },
    // 项目文档
    projectList: (_this, node)=> {
        let isInit = false
        try {
            isInit = node.init
        }
        catch(err) {
        }
        let url = _this.host
        let postData = {
            firstType: node.belongs,
            qzId: _this.qzId,
            memberId: _this.memberId,
            secondType: 0,
            count: 1000,
            sort: 0, //排序
            showFile: 0, // 目录里存在文件时是否显示文件，0 不显示，1显示 默认为1
            thirdType: 0
        }
        let level = node.level
        // 是初次加载 加载第一级
        if(!isInit) {
            postData.thirdType = node.fid
        }
        // 把对象转为可用于get请求的字符串
        let postDataString = _this.transformObjToString(postData)
        _this.$http.get(url + '/rest/document/wenku/'+_this.qzId+'/'+_this.memberId+'/projectList?' + postDataString).then(res => {
            let data = res.data.list
            node.loading = false
            if(res.flag === '0') {
                let arr = []
                if(data.length) {
                // 有数据的时候 才展开
                node.open = !node.open
                for(let i = 0; i < data.length; i++) { 
                    data[i].open = false
                    data[i].level = level + 1
                    data[i].children = []
                    data[i].hasChildren = true
                    data[i].filename = data[i].projectName
                    data[i].fid = data[i].projectId
                    data[i].belongs = _this.treeResult.belongs
                    arr.push(data[i])
                }
                node.children = arr
                } else {
                    node.hasChildren = false
                }
            } else {
                console.log(res.message)
            }
        }).catch(msg => {})
    },
    newFileBlur: function(node) {
        let fatherNode = this.treeResult
        let useNewFileName = this.newFileValue
        let postData = {}
        if(!useNewFileName) {
            Bus.$emit('emitErrorDialog', /^zh/.test(lang) ? '文件名不允许为空' : 'File names are not allowed to be empty')
            Bus.$emit('removeErrorTreeNode')
            return false
        }
        // node.newFile = false // 请求添加文件成功 才变成正常的文件显示
        node.filename = useNewFileName
        postData.qzId = this.qzId
        postData.memberId = this.memberId
        postData.firstType = fatherNode.belongs
        // 1企业文档 4个人文档的的特殊处理
        if (fatherNode.fid == '1' || fatherNode.fid == '3') {
            postData.thirdType = 0
            postData.secondType = 0
        }else {
            postData.thirdType = fatherNode.fid
            postData.secondType = fatherNode.fid
        }
        postData.name = useNewFileName
        let postDataString = this.transformObjToString(postData)
        this.$http.post(this.host + '/rest/document/wenku/'+this.qzId+'/'+this.memberId+'/createDir?' + postDataString, postData).then(res => {
            if(res.flag == '0') {
                let resultRes = res
                setTimeout(function(){
                    node.newFile = false // 请求添加文件成功 才变成正常的文件显示
                    let fid = resultRes.data.fid
                    node.fid = fid
                },0)
            } else {
                alert(res.data)
                Bus.$emit('removeErrorTreeNode')
                node.fid = thisIsNewFiles
            }
        }).catch(msg => {})
    },
    transformObjToString: (obj)=> {
        let str = ''
        for(let key in obj){
            str = str + key + '=' + obj[key] + '&'
        }
        str = str.substring(0, str.length-1)
        return str
    }
  }
}
</script>

<style lang="scss" scoped >
    .node {
        cursor: pointer;
        font-family: monospace;
        color: #333;
        line-height: 36px;
        font-size: 12px;
        font-weight:400;
        color:rgba(17,17,17,1);
        width: 100%;
        margin: 0;

        .li-hover-item{
            font-size: 0;
            &:hover{
                background: #f5f5f5;
            }
            .downloadIconImg{
                display: inline-block;
                width: 23px;
                height: 21px;
                vertical-align: middle;
                margin-top: -2px;
                margin-left: 6px;
                margin-right: 7px;
            }
            .dropTogleIcon{
                // margin-right: 5px;
                width: 0;
                display: inline-block;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-left: 7px solid #aba5a5;
                vertical-align: middle;
                margin-top: -2px;
                transition: all .2s;
            }
            .dropTogleIconRoate{
                transform: rotate(90deg);
            }
            .node-name{
                display: inline-block;
                vertical-align: middle;
                font-size: 14px;
                color: #555;
            }
            .empty-node-icon{
                display: inline-block;
                width: 19px;
            }
            #newFileInput{
                outline: none;
                line-height: 20px;
                padding-left: 3px;
                vertical-align: middle;
            }
        }
        .seceltedCLass{
            background: #f5f5f5;
        }
        .cover-ctn{
            position: absolute;
            left: 0;
        }
        .tree-node-mark{
            display: block;
            width: 14px;
            height: 14px;
            border: 1px solid red;
            border-radius: 50%;
            text-align: center;
            float: right;
            margin-right: 20px;
            margin-top: 7px;
            border: 1px solid rgba(224,224,224,1);
            background: white;
            &.el-icon-circle-check{
                background: red;
            }
        }
    }
    .minus-sign-icon{
        position: relative;
        display: inline-block;
        width: 12px;
        height: 11px;
        border: 1px solid #A5A5A5;
        border-radius: 2px;
        vertical-align: middle;
        margin-top: -2px;
        &::before{
            content: '';
            display: inline-block;
            position: absolute;
            background: #8c8a8a;
            height: 2px;
            width: 6px;
            top: 4px;
            left: 3px;
        }
    }
    .plus-icon{
        position: relative;
        display: inline-block;
        width: 12px;
        height: 11px;
        border: 1px solid #A5A5A5;
        border-radius: 2px;
        vertical-align: middle;
        margin-top: -2px;
        &::before{
            content: '';
            display: inline-block;
            position: absolute;
            background: #8c8a8a;
            height: 2px;
            width: 6px;
            top: 4px;
            left: 3px;
        }
        &::after{
            content: '';
            display: inline-block;
            position: absolute;
            width: 2px;
            height: 7px;
            top: 2px;
            left: 5px;
            background: #8c8a8a;
        }
    }
    .node-leaf {
        // color: #999;
    }
    ul, li {
        // padding-left: 1em;
        list-style-type: none;
    }
    .close-open-icon{
        width: 14px;
        height: 14px;
        border-radius: 2px;
        border: 1px solid #A5A5A5;
        display: inline-block;
        text-align: center;
        line-height: 9px;
        font-size: 14px;
        color: #666666;
        font-weight: 400;
        vertical-align: middle;
        margin-top: -2px;
        margin-right: 4px;
    }
</style>