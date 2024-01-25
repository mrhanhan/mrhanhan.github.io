---
title: "VsCode DEBUG GO: dlv 检测Go 版本太低 Go version is too old 解决"
category: [日常日志, vscode]
tags: [VsCode, Go, dlv]
---

&emsp;&emsp;问题是这样的，由于需要同时使用Java、GO、React 进行开发，那么如果打开三个专属开发工具显然对于内存
来讲简直是`灭顶之灾`, 更别说还需要开一些别的软件。

## VsCode

&emsp;&emsp;基于VsCode 开发多语言项目还是很舒服的，各种插件一装，算下来内存占用 3个G以内，比起: 2-3个 `Intellij全家桶`来所
说花费的内存占用是极低的。毕竟: `Java Runtime` 懂得都懂

&emsp;&emsp;不过相对于 `Intellij GoLang` 来说，VsCode 还是相对比较没那么好用的。但是又不是不能用。
在使用的过程中，由于我的环境是：`go 1.8` 的环境但是却安装了比较新的 `dlv`, 那么在debug 启动的时候会提示: 

![](/assets/posts/日常日志/vscode/20240125/vscode_debug_go_too_old_error_prompt.png)

配置文件: `launch.json`

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch BaizeVulNode",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceFolder}",
            "cwd": "${workspaceFolder}"
        }
    ]
}
```

网上大多数文章解决方案都是：
1. 升级 GO 版本 
2. 降级dlv  

但是都比较麻烦，这里提供一个非常简单的办法：`dlvFlags`

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch BaizeVulNode",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceFolder}",
            "cwd": "${workspaceFolder}",
            "dlvFlags": ["--check-go-version=false"]
        }
    ]
}
```

完美秒杀
 

