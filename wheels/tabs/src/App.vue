<template>
  <div id="ylTabsContainer">
    <ul class="ctn-ul">
      <li class="item">11</li>
      <li class="item">222</li>
      <li class="item">222</li>
      <li class="item">222</li>
      <li class="item">222</li>
      <li class="item">222</li>
      <div style="clear:both"></div>
    </ul>
    <component
      :is="TabsCont[activeTab]"
    />
  </div>
</template>

<script>
import formComps from './components/tabs'
import TabsCont from './components/tabs'

export default {
  name: 'app',
  data () {
    return {
      activeTab: 'carlist',
      TabsCont: TabsCont
    }
  },
  created() {
    console.log(this.TabsCont)
  }
}
</script>

<style lang="scss">
#ylTabsContainer{
  *{
    padding: 0;
    margin: 0;
  }
  ul, li{
    list-style-type: none;
  }
  .ctn-ul{
    .item{
      float: left;
      font-size: 14px;
      line-height: 40px;
      height: 40px;
      padding: 0 20px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
