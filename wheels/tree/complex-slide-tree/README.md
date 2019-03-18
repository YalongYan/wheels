# yy多级管控组织切换

>


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
  @select="onSelect"
  @err="onErr"
  :deptIds_ext="[]"
  :qzid="1"
  :placeHolder="请选择组织"/>
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
host: '空间接口api host地址',
defaultText: '选择的默认值',
qzid: '圈子ID(String,必填)',
placeHolder: '下拉框placehoder(String)',
deptIds_ext: '业务自己的组织列表,如公告分类管理员有权限管理的分类对应的所属组织(Array)'
select: 组织选取回调(参数为{orgId: 组织id, orgName: 组织名称}),
err: 错误回调(参数为错误信息),
count: 数据分页
dept_type: 业务对应id（必填, 详见: https://wiki.upesn.com/pages/viewpage.action?pageId=2403451）
```
