<template>
    <div id="yylSelect" :class="{'active': isActive}" @click="isActive = !isActive">
    <!-- <div id="yylSelect" :class="{'active': isActive}"> -->
        <div class="select-header" ref="yylSelectHeader">  
            <input type="text" class="select-input"
                :placeholder="placeholder"
                v-model="resultValue"
                />
            <span class="iconCtn icon-designer-chevron"></span>
        </div>
        <div class="slide-container" ref="yylSlideDownBody">
            <div class="popper__arrow"></div>
            <div class="sldie-down-ctn">
                <ul class="slide-ul">
                    <li class="slide-li" v-for="(item, index) in selectOptions"
                        :key="index"
                        @click="itemClick(item, index)"
                        :class="{selected: selectedIndex === index}">
                        {{item.value}}
                    </li>
                    <!-- <li class="slide-li selected">撒大大</li> -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isActive: false,
            resultValue: this.value,
            placeholder: 'placeholder111',
            selectOptions: [
                {value: '啊阿萨大师大多撒'},
                {value: '大萨达深V表达式'},
                {value: '是发是fv'},
                {value: '柔柔弱弱'},
            ],
            selectedIndex: ''
        }
    },
    props:['value'],
    methods:{
        itemClick(item, index) {
            this.selectedIndex = index
            this.resultValue = item.value
            this.$emit('input', item.value) 
        }
    },
    mounted() {
        document.addEventListener('click', (e) => {
            if (!this.$refs.yylSelectHeader.contains(e.target)) {
            this.isActive = false
            }
        })
    }
}
</script>

<style lang='scss' scoped>
#yylSelect {
    display: inline-block;
    width: 240px;
    position: relative;

    &.active{
        .select-header{
            .select-input{
                border-color: #409eff;
            }
            .icon-designer-chevron{
                transform: translateY(-50%) rotate(180deg);
            }
        }
        .slide-container{
            display: block;
            .sldie-down-ctn{
                display: block;
            }
        }
        
    }

    ul, li{
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    .select-header{
        position: relative;

        .select-input{
            font-size: 14px;
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            outline: none;
            padding: 0 15px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 100%;
            padding-right: 30px;
            cursor: pointer;
        }
        .iconCtn{
            position: absolute;
            right: 12px;
            text-align: center;
            color: #c0c4cc;
            transition: all .3s;
            pointer-events: none;
            top: 50%;
            transform: translateY(-50%) rotate(0deg);
            height: auto;
            font-size: 12px;
            &.trans-up{
                // transform: translateY(-50%) rotate(180deg);
            }
        }
    }
    .slide-container{
        display: none;
        position: relative;

        .popper__arrow{
            // display: none;
            position: absolute;
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 6px solid #eae2e2;
            left: 36px;
            top: 4px;
            z-index: 10;

            &::before{
                content: " ";
                display: inline-block;
                position: absolute;
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 6px solid white;
                left: -6px;
                top: 2px;
                z-index: 2;
            }
        }

        .sldie-down-ctn{
            display: none;
            overflow: hidden;
            position: relative;
            min-width: 240px;
            transform-origin: center top 0px;
            z-index: 2119;
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 10px;
            border: 1px solid #e4e7ed;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            z-index: 9;
            // &::before{
            //     content: '';
            //     display: inline-block;
            // }
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
        }
    }
    
}
</style>
