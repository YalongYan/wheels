<template>
<div class="container">
    <!-- <input type="text" class="input"  v-model="searchText" @keyup.enter="debounce"/> -->
    <input type="text" class="input"  v-model="searchText" @keyup="debounce"/>
    <img :src='gruopSelect' @click="showDailog" class="gruopSelectIcon"/>
    <img :src='cancle' class="cancleIcon" v-if="showClear" @click="clearSeatch"/>
    <div class="slideContainer" v-show="isShowSlideCtn">
        <ul v-for="node in searchResult" :key="node.id" class="sldieCtn">
            <li class="item" @click="selectItem(node)">
                <span class="itemText">
                    <span class="normal">{{node.startvalue}}</span>
                    <span class="item-bolder">{{node.middleValue}}</span>
                    <span class="normal">{{node.rightValue}}</span>
                </span>
            </li>
        </ul>
    </div>
    <div class="dialogNoDataCtn" v-if="isNoData">
        <img class="noDataImg" :src="slideDownNoData"/>
        <div class="noDataText">{{$_t("searchWithoutResult")}}</div>
    </div>
</div>
</template>

<script>
import Request from './../../mixin/request.js'
import FormatRequestData from './../../mixin/formatRequestData.js'
import Bus from './../../bus'
import locales from './../../../locales'
import Lang from './../../mixin/lang.js'

let timer

import { gruopSelect, cancle, slideDownNoData} from './../../static/img/base64'
export default {
  props: ['visable', 'defaultText', 'isShowClear'],
  data () {
    return {
        gruopSelect: gruopSelect,
        cancle: cancle,
        searchText: this.defaultText,
        showClear: this.isShowClear,
        searchResult: [],
        isShowSlideCtn: false,
        slideDownNoData: slideDownNoData,
        isNoData: false,
        locales: (() => {
            const lang = navigator.language
            let useLang = /^zh/.test(lang) ? 'zh-CN' : /^en/.test(lang) ? 'en' : lang
            // Object.keys 获取可枚举的属性 如果浏览器的语言不是英语 中文， 而且传递的lang参数也不是这两种之一，就默认使用 zh-CN
            if (!Object.keys(locales).includes(useLang)) {
                useLang = 'zh-CN'
            }
            return locales[useLang]
        })()
    }
  },
  inject: ['host' ,'v', 'qzid', 'page', 'count', 'breadcrumbs', 'parent_id', 'dept_type', 'is_org', 'deptIds_ext'],
  mixins: [Request, FormatRequestData, Lang],
  methods:{
        clearSeatch() {
            this.searchText = ''
            this.$emit('update:isShowClear', false)
        },
        showDailog() {
            this.$emit('update:visable', true)
        },
        startSearch() {
            let keyword = this.searchText.trim()
            let getRequestPara = this.formatRequestData({keyword: keyword})
            let url = this.host + '/dept/getDeptList'
            this.$http.get(url, getRequestPara).then((response) => {
                let data = response.data.dept_list
                if(response.code == 0) {
                    let arr = []
                    for(let i=0; i<data.length; i++) {
                        let dataValue = data[i].name
                        let keywordIndex = dataValue.indexOf(keyword)
                        data[i].hasChildren = true
                        data[i].open = false
                        data[i].isLoading = false
                        data[i].children = []
                        if(keywordIndex >= 0) {
                            data[i].middleValue = keyword
                            if(keywordIndex == 0) {
                               data[i].startvalue = ''
                            } else {
                               data[i].startvalue = dataValue.substr(0, keywordIndex)
                            }
                            data[i].rightValue = dataValue.substr((keyword.length + keywordIndex))
                            arr.push(data[i])
                       }
                    }
                    this.searchResult = arr
                    if(this.searchResult.length != 0) {
                        this.isNoData = false
                        this.isShowSlideCtn = true
                    } else {
                        this.isShowSlideCtn = false
                        this.isNoData = true
                    }
                } else {
                    Bus.$emit('errorFunc', response.msg)
                }
            }).catch((error) => {
                Bus.$emit('errorFunc', error)
            })
        },
        selectItem(node) {
            this.searchText = node.name
            this.$emit('update:isShowClear', true)
            this.isShowSlideCtn = false
            Bus.$emit('setResult', node)
        },
        // 防抖 最后输入 一段时间后才执行
        debounce: function(){
            let that = this
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(function () {
                if(that.searchText.trim()) { // 输入为空的时候 不请求数据
                    that.startSearch()
                } else {
                    that.isShowSlideCtn = false
                    that.isNoData = false
                }
                timer = undefined;
            },200)
        }
  },
  watch: {
    defaultText: {
      handler: function (newVal, oldVal) {
        this.searchText = newVal
      }
    },
    isShowClear: {
      handler: function (newVal, oldVal) {
        this.showClear = newVal
      }
    }
  },
  mounted () {
  },
  created () {
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.container{
    font-size: 0;
    width:280px;
    height:30px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    border:1px solid rgba(221,221,221,1);
    box-sizing: border-box;
    line-height: 30px;

    .input{
        display: inline-block;
        line-height: 20px;
        border: none;
        outline: none;
        margin-left: 10px;
        vertical-align: middle;
        margin-top: -2px;
        font-size: 14px;
        color: #555;
        width: 200px;
        &::-ms-clear{
            display: none;
        }
    }
    .gruopSelectIcon{
        float: right;
        margin-top: 7px;
        margin-right: 10px;
        cursor: pointer;
    }
    .cancleIcon{
        float: right;
        margin-right: 17px;
        margin-top: 7px;
        cursor: pointer;
    }
    .slideContainer{
        width:280px;
        max-height:143px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 6px 0px rgba(74,81,93,0.25);
        border-radius:3px;
        border:1px solid rgba(208,208,208,1);
        position: absolute;
        top: 29px;
        left: 0;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;

        /*滚动条样式*/
        &::-webkit-scrollbar {
            width: 3px;
            height: 3px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: #d8d8d8;
        }
        .sldieCtn{
            font-size: 0;

            .item{
              width: 100%;
              line-height: 32px;
              height: 32px;
              cursor: pointer;

              &:hover{
                background:rgba(243,243,243,1);
              }
              .itemText{
                margin-left: 10px;
                display: inline-block;
                max-width: 263px;
                overflow: hidden;
                height: 32px;
                line-height: 30px;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: top;
                display: inline-block;

                .item-bolder{
                    color: #289CF2;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 14px;
                }
                .normal{
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 14px;
                }
              }
            }
        }
    }
   .dialogNoDataCtn{
        text-align: center;
        width: 280px;
        height: 200px;
        background: rgba(255,255,255,1);
        box-shadow: 0px 3px 6px 0px rgba(74,81,93,0.25);
        border-radius: 3px;
        border: 1px solid rgba(208,208,208,1);
        // line-height: 200px;
        margin-top: -1px;
        box-sizing: border-box;

        .noDataImg{
            vertical-align: middle;
            margin-top: 15px;
        }
        .noDataText{
            text-align: center;
            font-size: 12px;
            color: #888888;
        }
   }
}
</style>