<template>
    <div class="ctn"
        :class="{'active': isActive}"
        @mouseenter="searchActive"
        @mouseleave="mouseleave"
        >
        <input type="text"
            :placeholder="searchPlaceholder"
            v-model="searchTtext"
            class="searchInp"
            @keyup.enter="startSearch"
            />
        <img class="searchIcon" :src="searchImg" @click="searchStart"/>
    </div>
</template>

<script>
import { searchImg } from './../../static/img/base64'
import Bus from './../../bus'

export default {
//   props: ['data', 'treeResult'],
  data () {
    return {
        searchImg: searchImg,
        isActive: false,
        searchPlaceholder: '请输入组织名称/编码',
        searchTtext: ''
    }
  },
  methods:{
      startSearch() {
        Bus.$emit('searchData', this.searchTtext)
      },
      searchActive() {
        this.isActive = true
      },
      inputBlur() {
        this.isActive = false
      },
      mouseleave() {
        this.isActive = false
      },
      searchStart() {
        console.log(11)
      }
  },
  mounted () {
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
    }
    .searchInp{
        transition: width 0.5s;
        font-size: 14px;
        outline: none;
        border: none;
        line-height: 22px;
        position: absolute;
        width: 0;
        left: 0;
        top: 2px;
        z-index: 1;
        padding-right: 30px;
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