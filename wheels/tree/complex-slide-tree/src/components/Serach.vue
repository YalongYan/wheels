<template>
  <div class="ctn">
    <img class="searchIcon" :src= searchImg @click="searchData" />
    <input class="input" type="text" :placeholder="placeHolder" v-model="searchVal" @keyup.enter="searchData"/>
  </div>
</template>

<script>
import { searchImg } from './../static/img/base64'
import Bus from './../bus.js'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      searchImg: searchImg,
      searchVal: ''
    }
  },
  props:{
    placeHolder: {
      type: String,
      default: ''
    }
  },
  methods: {
    searchData() {
      Bus.$emit('searchData', this.searchVal)
    }
  }
}
</script>

<style lang="scss">
.ctn{
    width:360px;
    height:30px;
    background:rgba(255,255,255,1);
    border-radius:3px;
    border:1px solid rgba(221,221,221,1);
    margin: 10px auto;
    line-height: 30px;

    .searchIcon{
        vertical-align: middle;
        margin-left: 10px;
        margin-top: -2px;
        transform: scale(0.9);
        cursor: pointer;
    }
    .input{
        border: none;
        outline: none;
        vertical-align: middle;
        margin-left: 6px;
        font-size: 12px;
        width: 300px;
        height: 16px;
        line-height: 16px;
        display: inline-block;
        margin-top: 1px;
    }
}
</style>
