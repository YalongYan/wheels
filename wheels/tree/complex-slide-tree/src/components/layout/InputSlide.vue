<template>
<div class="container">
    <input type="text" class="input"  v-model="searchText"/>
    <img :src='gruopSelect' @click="showDailog" class="gruopSelectIcon"/>
    <img :src='cancle' class="cancleIcon" v-if="isShowClear" @click="clearSeatch"/>
    <div class="slideContainer" style="display:none">
        <ul class="sldieCtn">
            <li class="item"><span class="itemText"><span class="item-bolder">青山</span>奥术大师多萨达</span></li>
            <li class="item"><span class="itemText">sdada奥术大师多萨达</span></li>
            <li class="item"><span class="itemText">sdada奥术大师多萨达</span></li>
            <li class="item"><span class="itemText">sdada奥术大师多萨达</span></li>
            <li class="item"><span class="itemText">sdada奥术大师多萨达</span></li>
            <li class="item"><span class="itemText">sdada奥术大师多萨达</span></li>
            <li class="item"><span class="itemText">sdada奥术大师多萨达</span></li>
            <li class="item"><span class="itemText">sdada奥术大师多萨达</span></li>
            <li class="item"><span class="itemText">sdada奥术大师多萨达</span></li>
            <li class="item"><span class="itemText">sdada奥术大师多萨达</span></li>
            <li class="item"><span class="itemText">sdada奥术大师多萨达</span></li>
            <li class="item"><span class="itemText">sdada奥术大师多萨达</span></li>
            <li class="item"><span class="itemText">sdada奥术大师多萨达</span></li>
        </ul>
    </div>
</div>
</template>

<script>
import { gruopSelect, cancle } from './../../static/img/base64'
export default {
  props: ['visable', 'defaultText'],
  data () {
    return {
        gruopSelect: gruopSelect,
        cancle: cancle,
        searchText: this.defaultText,
        isShowClear: true
    }
  },
  methods:{
        clearSeatch() {
            this.searchText = ''
            this.isShowClear = false
        },
        showDailog() {
            this.$emit('update:visable', true)
        }
  },
  watch: {
    defaultText: {
      handler: function (newVal, oldVal) {
        this.searchText = newVal
      }
    }
  },
  mounted () {
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
        height:143px;
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
            // padding: 0 10px;
            .item{
              width: 100%;  
              font-size: 14px;
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

                .item-bolder{
                    color: #289CF2;
                    display: inline-block;
                    vertical-align: middle;
                }
              }
            }
        }
    }
   
}
</style>