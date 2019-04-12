<template>
  <div id="ylTabsContainer">
    <ul class="ctn-ul">
      <li class="item" v-for="(item, index) in type" :key="index"
        :class="{active: activeTab === item.value}"
        @click="changTab(item, index)">
        {{item.name}}
      </li>
      <div v-if="activeTab!== '' " class="activeBorderBar" :style="`transform: translateX(${sliderTrans}px)`"></div>
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
      activeTab: '',
      TabsCont: TabsCont,
      type: [{value: 'carlist', name: '汽车'}, {value: 'foodlist', name: '美食'}, {value: 'personlist', name: '人类'}],
      sliderTrans: 0
    }
  },
  methods:{
    changTab(item, index){
      this.sliderTrans = index * 68
      this.activeTab = item.value
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
    .active{
      color: #03A9F4;
    }
    .activeBorderBar{
      height: 2px;
      background:#03A9F4;
      width: 24px;
      position: absolute;
      top: 42px;
      left: 30px;
      transition: all 0.4s;
    }
  }
}
</style>
