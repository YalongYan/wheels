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
      @loadData="loadData"
      @searchData="searchData"
      @select="onSelect"
      @err="errorFunc"
      :name="nameTag"
      :id="idTag"
      :defaultText="defaultText"
      />
</template>
import YYOrgSwitch from 'yy-org-switch'
...,
components: {YYOrgSwitch},
methods:{
  loadData(parent_id) {

  }
  searchData(keyword){

  }
  errorFunc(msg) {

  },
  onSelect(org){

  }
}
```
## Params
```
  @loadData        加载树形组件的初始数据 或者 请求树形组件的下级数据，参数以parent_id传递
  @searchData    搜索数据, 搜索的关键字以 keyword 传递
  @select        触发最后的选择
  @err             获取到错误信息，一般以dialog弹出来
  :name           搜索出来展示的信息，一般是name, 比如:如果要展示 fileName, 就传递 'fileName'
  :id                 用在树形结构请求下级数据的，一般是id，比如：如果用fileId请求下级数据，就传递fileId
  :defaultText  展示的默认值
```
```
特殊说明： loadData    searchData     返回的结果需要是promise对象，并且resolve的结果是要展示的数组数据，示例如下：
loadData(parentId) {
      return new Promise((resolve, reject) => {
          axios.get(url).then((res)=> {
            resolve(res.data.data.dept_list)
        })
      })
    },
 searchData(keyword) {
      return new Promise((resolve, reject) => {
          axios.get(url).then((res)=> {
            resolve(res.data.data.dept_list)
        })
      })
    }
```
