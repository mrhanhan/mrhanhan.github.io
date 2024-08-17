---
title: Rust 配置镜像、代理
layout: post
category: [Rust]
tags: [Rust]
---

## 配置`rustup`和`Cargo`国内源
Rust开发生态最重要的两个工具
- rustup Rust 官方的跨平台安装工具
- Cargo Rust 构建系统和包管理器

它们的下载源都位于国外，为了改善在国内的使用体验，可以为它们配置国内源。

### rustup 国内源
> 前国内 Rust 工具链镜像源有清华大学源、中国科学技术大学源、上海交通大学源等，以清华大学源为例，设置环境变量：
```shell
export RUSTUP_DIST_SERVER=https://mirrors.tuna.tsinghua.edu.cn/rustup
export RUSTUP_UPDATE_ROOT=https://mirrors.tuna.tsinghua.edu.cn/rustup/rustup
```
> 注意: windows 平台必须设置系统变量中（目前测试来看）
> 尝试了 `powershell set $env:RUSTUP_UPDATE_ROOT=https://mirrors.tuna.tsinghua.edu.cn/rustup/rustup`

### crates.io 国内源

`Cargo` 默认的源服务器为 `crates.io`，同样可以配置为国内的镜像源，以清华大学源为例，编辑 `~/.cargo/config` 文件，添加以下内容：
```toml

# 配置代理
[http]
proxy="http://127.0.0.1:7890"
[https]
proxy="http://127.0.0.1:7890"

[source.crates-io]
replace-with = 'tuna'

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```
这样可加快 Cargo 读取软件包索引的速度。
