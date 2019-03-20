# yy多级管控组织切换

>
![14a6c6df-8c72-48a3-8399-884b1f6fc1ec.gif](https://upload-images.jianshu.io/upload_images/8551758-ff33ab327581fc90.gif?imageMogr2/auto-orient/strip)

## Install

``` bash
安装方法：
npm: npm install yy-org-switch
yarn add yy-org-switch
```
## Quick Start
``` javascript
<template>
<YYOrgSwitch
  @loadData="loadData"
  @searchData="searchData"
  @select="selectData"
  :name="nameTag"
  :id="idTag"
  :treeData="treeData"
  />
</template>
import YYOrgSwitch from 'yy-org-switch'
...,
components: {YYOrgSwitch},
methods:{
  onErr(msg) {

  },
  onSelect(org){

  }
}
```
## Params
```
  @loadData      加载tree的数据
  @searchData    搜索数据
  @select        触发最后的选择
  :name          代表name的字符串
  :id            代表id的字符串
  :dataResult    数据请求的结果      
```
