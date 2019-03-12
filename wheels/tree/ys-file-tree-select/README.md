# ys-file-tree-select

> 树形文件选择组件   
<!-- 1 -->
![008b3682-6d51-4282-b1f8-69134704dcad.gif](https://upload-images.jianshu.io/upload_images/8551758-65d071a95dc96845.gif?imageMogr2/auto-orient/strip)

开发： npm run dev 
打包： npm run build

使用方法：
npm install ys-file-tree-select -D

参数
```
      host  请求的域名 
      qzId  空间id
      memberId  用户id
      powers  权限
      showFiles 是否展示文件（暂时没用到）
      visible           控制弹框显示
      fileTreeResult  选择的文件夹数据
      @errorDialog  错误提示框（组件自身没弹框）
      @fileTreeSelectConfirm 点击确定触发的事件
```

示例
 ```
<Main
      :host="'http://123.103.9.204:6058/official'"
      :qzId="16214"
      :memberId="3279879"
      :powers="'1,2,3,4,5,6,7,8,9,10'"
      :showFiles="false"
      :visible.sync='visible'
      :fileTreeResult.sync='fileTreeResult'
      @errorDialog='errorDialog'
      @fileTreeSelectConfirm='fileTreeSelectConfirm'
    />
```