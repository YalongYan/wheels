<template>
    <div class="ctn"
        :class="{'active': isActive}">
        <input type="text"
            :placeholder="searchPlaceholder"
            v-model="searchTtext"
            class="searchInp"
            @keyup.enter="startSearch"
            @focus="isActive = true"
            @blur="inputBlur"
            />
        <img class="searchIcon" :src="searchImg" @click="searchStart"/>
        <!-- <i class="search-icon"></i> -->
    </div>
</template>

<script>
import { searchImg } from './../../static/img/base64'
import Bus from './../../bus'
import locales from './../../../locales'
import Lang from './../../mixin/lang.js'

export default {
  data () {
    return {
        searchImg: searchImg,
        isActive: false,
        // searchPlaceholder: '请输入组织名称/编码',
        searchPlaceholder: '',
        searchTtext: '',
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
  mixins: [Lang],
  methods:{
      startSearch() {
        Bus.$emit('searchData', this.searchTtext, 2)
      },
      searchActive() {
        this.isActive = true
      },
      inputBlur() {
        if(!this.searchTtext.trim()) {
            this.isActive = false
        }
      },
      mouseleave() {
        this.isActive = false
      },
      searchStart() {
      }
  },
  mounted () {
  },
  created () {
    this.searchPlaceholder = this.$_t('dialogInputPlaceHolder')
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.ctn{
    height: 28px;
    line-height: 28px;
    margin-top: 11px;
    border-bottom: none;
    width: 19px;
    transition: width 0.5s;
    position: relative;

    .searchIcon{
        position: absolute;
        right: 6px;
        z-index: 2;
        top: 6px;
        cursor: pointer;
        pointer-events: none;
    }
    // .search-icon{
    // }
    .searchInp{
            -webkit-transition: width 0.5s;
    -o-transition: width 0.5s;
    -moz-transition: width 0.5s;
    transition: width 0.5s;
    font-size: 14px;
    outline: none;
    border: none;
    line-height: 22px;
    /* position: absolute; */
    width: 0;
    left: 0;
    /* top: 2px; */
    z-index: 1;
    padding-right: 30px;
    vertical-align: middle;
    margin-top: -2px;
        &::-ms-clear{
            display: none;
        }
    }
}
.active{
    width: 300px;
    border-bottom: 1px solid #888;

    .searchInp{
        width: 270px;
    }
    .searchIcon{
    }
}
</style>