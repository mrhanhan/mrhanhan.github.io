---
layout: post
title: C++ WindowAPI 文档 
category: [ C++, Windows ]
tags: [ C++, Windowse ]
---

# 1. WindowApi 快查表


## 1. 进程和线程相关的

### 1.1 `Processthreadsapi.h`

| 函数名称                                | 说明                    | 链接                                          |
|-------------------------------------|:----------------------|---------------------------------------------|
| `UpdateProcThreadAttribute`         | 更新进程和线程创建的属性列表中的指定属性。 | [官方中文文档][UpdateProcThreadAttribute]         |
| `InitializeProcThreadAttributeList` | 初始化用于创建进程和线程的指定属性列表。  | [官方中文文档][InitializeProcThreadAttributeList] |

### 1.2 控制台 API 函数 `consoleapi.h`

| 函数名称                  | 说明               | 链接                            |
|-----------------------|:-----------------|-------------------------------|
| `CreatePseudoConsole` | 为调用进程创建新的伪控制台对象。 | [官方中文文档][CreatePseudoConsole] |


[UpdateProcThreadAttribute]:https://learn.microsoft.com/zh-cn/windows/win32/api/processthreadsapi/nf-processthreadsapi-updateprocthreadattribute
[InitializeProcThreadAttributeList]:https://learn.microsoft.com/zh-cn/windows/win32/api/processthreadsapi/nf-processthreadsapi-initializeprocthreadattributelist
[CreatePseudoConsole]:https://learn.microsoft.com/zh-cn/windows/console/createpseudoconsole
