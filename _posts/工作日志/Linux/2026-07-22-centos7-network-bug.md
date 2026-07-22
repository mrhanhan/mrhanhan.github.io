---
layout: post
category: [工作日志, Linux]
tags: [Linux, CUDA]
title: Centos 7.0.1406 一次奇怪的问题
---

## 问题概述：

Docker 启动OpenVAS 后，将OpenVAS 的容器端口映射到主机，然后发现主机无法访问映射出来的端口，同时也无法直接访问容器IP的端口:


环境说明：
- 虚拟化：KVM
- OS: Centos 7.0.1406
- 容器：OpenVAS


容器：

![img.png](/assets/posts/%E5%B7%A5%E4%BD%9C%E6%97%A5%E5%BF%97/Linux/20260722/img_1.png)

访问命令：
```bash
curl -v https://127.0.0.1:443
curl -v https://172.19.0.16:443
telnet 127.0.0.1 443
telnet 172.19.0.16 443
ping 172.19.0.16
```

![img.png](/assets/posts/%E5%B7%A5%E4%BD%9C%E6%97%A5%E5%BF%97/Linux/20260722/img.png)

目前排查了如下问题：

1. Docker 服务
2. iptables 规则
3. 系统网卡

均无问题，正当不知道什么原因的时候，正打算使用tcpdump 抓包看一下情况，这时候神奇的事情就来了，抓包后立马就可以访问了

```bash
tcpdump -i br-9ced80d58324 > /dev/null
```

![img.png](/assets/posts/%E5%B7%A5%E4%BD%9C%E6%97%A5%E5%BF%97/Linux/20260722/img_2.png)
![img.png](/assets/posts/%E5%B7%A5%E4%BD%9C%E6%97%A5%E5%BF%97/Linux/20260722/img_3.png)

> 访问通了，只是证书错误

![img.png](/assets/posts/%E5%B7%A5%E4%BD%9C%E6%97%A5%E5%BF%97/Linux/20260722/img_4.png)

> Ping

![img.png](/assets/posts/%E5%B7%A5%E4%BD%9C%E6%97%A5%E5%BF%97/Linux/20260722/img_5.png)

## 结论

- 目前未能有什么结论




