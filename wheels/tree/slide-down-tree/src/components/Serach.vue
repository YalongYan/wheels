<template>
  <div class="ctn">
    <img class="searchIcon" :src= searchImg>
    <input class="input" type="text" placeholder="请输入"/>
  </div>
</template>

<script>
import { searchImg } from './../static/img/base64'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      searchImg: searchImg
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
        margin-top: -1px;
    }
}
</style>
