<template>
    <div>
        <li class="slide-li" :class="{selected: itemSelected}" @click="itemClick(value)">
            {{label}}
        </li>
    </div>
</template>

<script>
export default {
    name: 'ElOption',
    data() {
        return {

        }
    },
    props:['label', 'value'],
    inject: ['select'],
    methods:{
        itemClick(v){
            // console.log(this.$parent.$emit('update: value', v))
            this.$parent.updateModelVaule(v)
            // this.$parent.selectedIndex = index
        },
        isEqual(a, b) {
            if (!this.isObject) {
                return a === b;
            } else {
                const valueKey = this.select.valueKey;
                return getValueByPath(a, valueKey) === getValueByPath(b, valueKey);
            }
        },
        // contains(arr = [], target) {
        //     if (!this.isObject) {
        //     return arr.indexOf(target) > -1;
        //     } else {
        //     const valueKey = this.select.valueKey;
        //     return arr.some(item => {
        //         return getValueByPath(item, valueKey) === getValueByPath(target, valueKey);
        //     });
        //     }
        // },
    },
    computed: {
        itemSelected() {
            return this.isEqual(this.value, this.select.value);
        }
    }
}
</script>

<style lang='scss'>
.slide-ul{
    overflow: auto;
    height: 100%;
    max-height: 274px;
    max-height: 167px;
    /*滚动条样式*/
    &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 3px;
    }
    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        background: #d8d8d8;
    }

    .slide-li{
        font-size: 14px;
        padding: 0 20px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #606266;
        height: 34px;
        line-height: 34px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover{
            cursor: pointer;
            background: #f5f7fa;
        }
        &.selected{
            color: #409eff;
            font-weight: bold;
        }
    }
}
</style>
