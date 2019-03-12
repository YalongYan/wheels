import Vue from 'vue'
import Vuex from 'vuex'
// import axios from "axios";

Vue.use(Vuex)
// console.log(this)
// 定义state，并将listName设置为一个空数组
const state = {
  treeData: [],
  tree_result: 0, // tree组件选择的数据结果 默认0 有数据的时候 就变成对象
  showLoading: false,
  host: '',
}
// 定义mutations，可以传参，用于设置state里的listName
const mutations = {
  vuexNewFile: (state, obj) => {
    var _id = obj.fid
    var _level = obj.level
    var treeData = state.treeData
    var belongs = obj.belongs
    var fid = obj.fid
    var filename = obj.filename
    function getArray (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].fid === _id) {
          if(!arr[i].hasChildren) {
            arr[i].hasChildren = true
            arr[i].open = true
          }
          // fid先赋值为thisIsNewFils 作为特殊标志  请求完数据之后 再把新的值拿过来
          let obj =  {newFile: true, open: false, filename: filename, level: _level + 1, checked: false, belongs: belongs, fid: 'thisIsNewFiles', hasChildren: false, children: []}
          arr[i].children.push(obj)
        } else if (arr[i].children && arr[i].children.length !== 0) {
          getArray(arr[i].children)
        }
      }
    }
    getArray(treeData)
  },
  reloadTreeNode: (state, obj) => {
    var _id = obj.fid
    var _newFileValue = obj.newFileValue
    var treeData = state.treeData
    function getArray (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].fid === 'thisIsNewFiles') {
          arr[i].newFile = false
          arr[i].fid = _id
          arr[i].filename = _newFileValue
        } else if (arr[i].children && arr[i].children.length !== 0) {
          getArray(arr[i].children)
        }
      }
    }
    getArray(treeData)
  },
  set_tree_result: (state,obj)=>{
      state.tree_result = obj
  },
  set_loadNewItem: (state, Obj) => {
    var _id = Obj.id
    var childObj = Obj.arr
    function getArray (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === _id) {
          var level = arr[i].level
          if (childObj.length === 0) {
            arr[i].hasChildren = false
          } else {
            arr[i].hasChildren = true
            for (let j = 0; j < childObj.length; j++) {
              childObj[j].level = level + 1
            }
            arr[i].children = childObj
            setTimeout(function () {
              arr[i].open = !arr[i].open
            }, 100)
          }
        } else if (arr[i].children && arr[i].children.length !== 0) {
          getArray(arr[i].children)
        }
      }
    }
    getArray(state.treeData)
  },
  set_state: (state, newData) => {
    state.treeData = newData
  },
  set_showLoading: (state, newData) => {
    state.showLoading = newData
  },
  set_host: (state, newData) => {
    state.host = newData
  }
}
// 定义getters，用于获取出state里的对象
const getters = {
  get_treeData: state => {
    return state.treeData
  },
  get_host: state => {
    return state.host
  },
  get_showLoading: state => {
    return state.showLoading
  },
  get_tree_result: state => {
    return state.tree_result
  }
}

export default new Vuex.Store({
  getters,
  state,
  mutations
})
