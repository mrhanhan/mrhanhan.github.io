---
layout: post
title: Godbolt 中使用CMake 进行编译
category: [ 日常日志,Godbolt ]
tags: [ 日常日志, Godbolt, 反汇编, C++ ]
---

![](../../../assets/posts/日常日志/Godbolt/2024022117/img.png)

> Godbolt 一个很强大的东西！！

[go Godbolt](https://godbolt.org/)


Godbolt 可以非常方便的查看很多语言底层编译产物
![](../../../assets/posts/日常日志/Godbolt/2024022117/img_1.png)

这里那`C/C++`举例子:

![](../../../assets/posts/日常日志/Godbolt/2024022117/img_2.png)

可以看到我们可以编译单个C++文件

如果我们想编译复杂的源代码，这时候我们可以使用`CMake`来进行编译配置

## 基于CMake的多文件编译:

1. 打开 `IDE` 模式

先关闭所有窗口

![](../../../assets/posts/日常日志/Godbolt/2024022117/img_3.png)
![](../../../assets/posts/日常日志/Godbolt/2024022117/img_4.png)
![](../../../assets/posts/日常日志/Godbolt/2024022117/img_5.png)

2. 添加 `CMakeLists.txt` 文件

![](../../../assets/posts/日常日志/Godbolt/2024022117/img_6.png)

编写好 `CMakeLists.txt`
```cmake
cmake_minimum_required(VERSION 3.22)
project(helloworld CXX)

set(CMAKE_CXX_STANDARD 17)

add_executable(hello lib.c lib.h)

```

3. 添加编译器

![](../../../assets/posts/日常日志/Godbolt/2024022117/img_7.png)
![](../../../assets/posts/日常日志/Godbolt/2024022117/img_8.png)

到此，就可以使用`CMake` 来编译多个C++文件了
