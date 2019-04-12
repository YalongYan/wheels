<template>
  <div>
    <!-- <Main v-model="value"/> -->
    <el-select class="condition-input" v-model="value">
      <el-option
              v-for="(item, index) in selectOptions"
              :key="index"
              :label="item.value"
              :value="item.value">
      </el-option>
    </el-select>
      <!-- <el-select class="condition-input" v-model="activeItem.left" filterable :placeholder="$t('plcHolds.fieldSelect')" @change="changeField">
          <el-option
                  v-for="item in formFieldList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
          </el-option>
      </el-select> -->
  </div>
</template>

<script>
import Main from './components/Main'
export default {
  name: 'app',
  data () {
    return {
      value: '1121',
      selectOptions: [
        {value: '啊阿萨大师大多撒'},
        {value: '大萨达深V表达式'},
        {value: '是发是fv'},
        {value: '柔柔弱弱'},
      ],
    }
  },
  components: {
    Main
  }
}
</script>

<style lang="scss">

</style>
