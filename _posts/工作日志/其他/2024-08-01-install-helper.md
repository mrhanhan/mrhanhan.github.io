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
使用Win10 linux子系统的过程中发现一个问题：如果主/子系统同时设置环境变量，那么子系统会优先选择主系统的环境变量。

1. 打开 `注册表`  
  win + r 打开`运行`，输入`regedit`
2. 找到 `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Lxss\{GUID}\Flags`
    把值改为5。把所有linux子系统窗口关掉再打开，完成。
