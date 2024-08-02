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
