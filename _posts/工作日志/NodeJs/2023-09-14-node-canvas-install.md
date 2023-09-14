---
category: [ 工作日志, NodeJs ]
tags: [ 数据库, NodeJs, 后端渲染, node-canvas ]
title: NodeJS 后端Canvas渲染环境安装
---

# NodeCanvas

如果需要进行后端的图标渲染，例如：报告、图片等等。则`node-canvas` 绝对是很好的选择之一。

使用`node-canvas` 后可以在nodejs 中使用 `Echarts` 等前段渲染图表的技术


## 使用 node-canvas 的必须环境

| 操作系统    | 环境安装命令	                                                                                                  |
|---------|----------------------------------------------------------------------------------------------------------|
| OS X	   | 使用 brew安装: `brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman`                       |
| Ubuntu  | `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev` |
| Fedora	 | `sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel`                      |
| Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`                              |
| OpenBSD | `doas pkg_add cairo pango png jpeg giflib`                                                               |
| Windows | 查看 [文档](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)                            |
| Others	 | 查看 [文档](https://github.com/Automattic/node-canvas/wiki)                                                  |

## Demo:

```nodejs
  const { createCanvas, loadImage } = require('canvas')
  const canvas = createCanvas(200, 200)
  const ctx = canvas.getContext('2d')
  
  // Write "Awesome!"
  ctx.font = '30px Impact'
  ctx.rotate(0.1)
  ctx.fillText('Awesome!', 50, 100)
  
  // Draw line under text
  var text = ctx.measureText('Awesome!')
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  ctx.beginPath()
  ctx.lineTo(50, 102)
  ctx.lineTo(50 + text.width, 102)
  ctx.stroke()
  
  // Draw cat with lime helmet
  loadImage('examples/images/lime-cat.jpg').then((image) => {
    ctx.drawImage(image, 50, 0, 70, 70)
  
    console.log('<img src="' + canvas.toDataURL() + '" />')
  })
```

参考：

- (node-canvas 官网)[(https://github.com/Automattic/node-canvas]
