---
category: [ 工作日志, 其他 ]
tags: [ 迁移 ]
title: 最新版微信4.x 内置浏览器开启F12教程
---

> 瞒天过海，即可 

> 260526

补全一下，前面说的漫天过海其实还是使用Python的工具，DevTools工具，但是新版本的小程序是不支持
注入的，这时候可以把旧版本的小程序文件复制到新版本小程序文件夹下，直接覆盖，即可使用。

但是目前这种方法不行了，而且非常容易封号；

## 最新办法:

WMPFDebugger + CDP 协议 + Chrome即可完成最新版的Debugger

WMPFDebugger: https://github.com/evi0s/WMPFDebugger


