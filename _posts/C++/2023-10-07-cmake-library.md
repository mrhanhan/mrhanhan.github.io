---
layout: post
title: Cmake 开发中使用头文件对应需要依赖的库
category: [ C++ ]
tags: [ C++, CMake ]
---

## Window 开发常用的库

|     库     |   头文件    |
|:---------:|:--------:|
| Windows.h | kernel32 |

### 库文件说明
- `kernel32`: 包含了Windows内核库的函数，如文件操作、线程管理、内存操作等。例如，CreateFile, ReadFile, WriteFile, CreateThread, VirtualAlloc等。
- `user32`: 包含了用户界面函数，用于窗口创建、消息处理等。例如，CreateWindowEx, MessageBox, GetMessage, DispatchMessage等
- `gdi32`: 包含了图形设备接口函数，用于图形绘制。例如，CreateDC, SelectObject, BitBlt等。
- `comdlg32`: 包含了通用对话框函数，用于打开文件对话框、颜色选择对话框等。例如，GetOpenFileName, GetSaveFileName等。
- `advapi32`: 包含了高级API函数，用于注册表操作、服务控制等。例如，RegOpenKeyEx, StartService等。
- `shell32`: 包含了Shell API函数，用于文件操作、图标管理等。例如，SHGetFolderPath, ExtractIcon等
