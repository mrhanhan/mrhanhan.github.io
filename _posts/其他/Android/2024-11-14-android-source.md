---
title: Android 源码获取
layout: post
category: [其他, Android]
tags: [Android, 源码]
---

> 背景: 

最近在研究 `Android` 模拟器,在使用Google提供的 `Android Emulator` 时对其背后原理深感疑惑。打算研究一波源码，一是能够学到 Android和虚拟化相关的东西
二是，也能锻炼C++的源码阅读能力!

注: 和国产其他虚拟机不同, `Android Emulator`是基于 `QEMU`做的。
相关 `Android Emulator` 使用文档：https://developer.android.com/studio/run/emulator-commandline?hl=zh-cn#common

## 环境依赖

1. `Git`: 
2. `Repo`: Repo 是一个由 Google 开发的工具，用于简化管理 Android 开源项目（AOSP）代码的过程。它是一个 Git 版本控制工具的封装，用于处理多个 Git 仓库的管理，特别是在处理像 Android 这样包含多个 Git 仓库的大型项目时，Repo 可以帮助简化代码的下载和同步工作。
3. `梯子`

注:
1. Repo 工具安装教程

```bash
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
```

2. 配置梯子:

```shell
HOST=127.0.0.1:7890
export HTTP_PROXY=http://$HOST
export HTTPS_PROXY=http://$HOST

git config --global http.https://android.googlesource.com.proxy http://$HOST
git config --global https.https://android.googlesource.com.proxy http://$HOST
```

## 下载源码


文档：https://source.android.com/docs/setup/download?hl=zh-cn#initialize_the_repo_client

