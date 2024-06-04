---
layout: post
category: [Java, 工具]
tags: [Java, jmap]
title: jmap java 进程调试工具
---

## jmap 参数

1. `-clstats <pid>`: 打印堆内存中类加载信息的统计
2. `finalizerinfo <pid>`：打印等待最终确定的对象的信息
3. `-histo[:live] <pid>`: 打印堆内存中对象直方图，如果指定为：`-histolive`，则只打印存活对象的统计
4. `-dump:<dump_options> <pid>`：dump 堆内存，`dump_options`，可以指定如下参数
  - `live`：仅dump活动对象；如果未指定，则dump堆中的所有对象。
  - `format=<b>`: 以 hprof 二进制格式转储 Java 堆
  - `filename=<filename>`：将堆dump到文件名
  tips: `jmap -dump:live,format=b,file=heap.bin <pid>`
 
 
