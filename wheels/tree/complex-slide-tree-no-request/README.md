# yy多级管控组织切换

>
![14a6c6df-8c72-48a3-8399-884b1f6fc1ec.gif](https://upload-images.jianshu.io/upload_images/8551758-ff33ab327581fc90.gif?imageMogr2/auto-orient/strip)

## Install

``` bash
安装方法：
npm安装：
npm: npm install yy-org-switch
yarn安装：
yarn add yy-org-switch
```
## Quick Start
``` javascript
<template>
<YYOrgSwitch
      @select="onSelect"
      @err="errorFunc"
      :name="nameTag"
      :id="idTag"
      :defaultText="defaultText"
      :onlyOneLevel="onlyOneLevel"
      :noSearch="noSearch"
      />
</template>
import YYOrgSwitch from 'yy-org-switch'
...,
components: {YYOrgSwitch},
methods:{
  yyOrgSelectLoadData(parent_id) {

  }
  yyOrgSelectSearchData(keyword){

  }
  errorFunc(msg) {

  },
  onSelect(org){

  }
}
```
## Params
```
  yyOrgSelectLoadData      不需要传递该方法，父组件内部要有这个函数就行，该组件会调用，用于加载树形组件的初始数据 或者 请求树形组件的下级数据，参数以parent_id传递
  yyOrgSelectSearchData    不需要传递该方法，父组件内部要有这个函数，该组件会调用，用于搜索数据, 搜索的关键字以 keyword 传递
  @select        触发最后的选择
  @err             获取到错误信息，一般以dialog弹出来
  :name           搜索出来展示的信息，一般是name, 比如:如果要展示 fileName, 就传递 'fileName'
  :id                 用在树形结构请求下级数据的，一般是id，比如：如果用fileId请求下级数据，就传递fileId
  :defaultText  展示的默认值
  :onlyOneLevel  布尔类型，树形组件是否只有一级，true是， false不是
  :noSearch  布尔类型，如果不需要搜索功能，就传true, 需要就传false,或者不传此参数
```
```
特殊说明： yyOrgSelectLoadData    yyOrgSelectSearchData  返回的结果需要是promise对象，并且resolve的结果是要展示的数组数据，示例如下：
yyOrgSelectLoadData(parentId) {
      return new Promise((resolve, reject) => {
          axios.get(url).then((res)=> {
            resolve(res.data.data.dept_list)
        })
      })
    },
 yyOrgSelectSearchData(keyword) {
      return new Promise((resolve, reject) => {
          axios.get(url).then((res)=> {
            resolve(res.data.data.dept_list)
        })
      })
    }
```
