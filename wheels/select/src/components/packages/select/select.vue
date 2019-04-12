<template>
    <div id="yylSelect" :class="{'active': isActive}" @click="isActive = !isActive">
        <div class="select-header" ref="yylSelectHeader">  
            <input type="text" class="select-input"
                :placeholder="placeholder"
                v-model="resultValue"
                @keyup="inputKeyUp"
                />
            <span class="iconCtn icon-designer-chevron"></span>
        </div>
        <div class="slide-container" ref="yylSlideDownBody">
            <div class="popper__arrow"></div>
            <div class="sldie-down-ctn">
                <ul class="slide-ul">
                    <slot></slot>
                    <!-- <li class="slide-li" v-for="(item, index) in selectOptions"
                        :key="index"
                        @click="itemClick(item, index)"
                        :class="{selected: selectedIndex === index}">
                        {{item.value}}
                    </li> -->
                    <!-- <li class="slide-li selected">撒大大</li> -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ElSelect',
    data(){
        return {
            isActive: true,
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
    provide() {
      return {
        'select': this
      };
    },
    props: {
        value: {
            required: true
        },
    },
    methods:{
        itemClick(item, index) {
            console.log(item)
            console.log(index)
            this.selectedIndex = index
        },
        updateModelVaule(v) {
           this.$emit('input', v)
        },
        inputKeyUp() {
            let value = this.value
        }
    },
    mounted() {
        document.addEventListener('click', (e) => {
            if (!this.$refs.yylSelectHeader.contains(e.target)) {
            this.isActive = false
            }
        })
    },
    watch: {
      value(v) {
        this.resultValue = v;
      }
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
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            outline: none;
            padding: 0 15px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 100%;
            padding-right: 30px;
            cursor: pointer;
            font-size: 14px;
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
            
        }
    }
    
}
</style>
