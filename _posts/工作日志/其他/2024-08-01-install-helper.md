---
category: [ 工作日志, 其他 ]
tags: [ 安装 ]
title: 快速软件安装手册
---


## Redis

- ubuntu 使用apt快速安装Redis 最新版
```shell
  sudo apt install lsb-release curl gpg
  curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
  echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
  sudo apt-get update
  apt install redis -y
```

## build-essential
- build-essentials 包是编译软件所必需的元包的形式。它们包含 GNU/g++ 编译器集合、GNU 调试器以及编译程序所需的其他一些库和工具。当我们安装 build-essential 包时，其他一些包，如 GCC、make、G++、dpkg-dev 等，也会安装在我们的系统上。
```shell
  apt install build-essential
```


## pkg-config 

- 

```shell
  # 下载
  wget https://pkgconfig.freedesktop.org/releases/pkg-config-0.29.tar.gz
  # 解压
  tar -zxf pkg-config-0.29.tar.gz
  cd pkg-config-0.29
  ./configure --with-internal-glib
  make check
  make install
```

## 依赖库安装

### glib-2.0

ubuntu:
```shell
  apt install  libglib2.0-dev -y
```

## 子系统环境变量冲突

方法:

1. 进入子系统中 编辑 `/etc/wsl.conf` 添加如下配置

```toml
[interop]
appendWindowsPath=false # 设置此键将确定 WSL 是否将 Windows 路径元素添加到 $PATH 环境变量
```
2. 重启服务

```shell
  wsl --shutdown
  wsl
```
