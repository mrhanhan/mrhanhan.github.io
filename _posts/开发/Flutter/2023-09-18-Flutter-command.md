---
layout: post
category: [开发, Flutter]
tags: [开发, 应用程序]
title: Flutter 常用命令
---

# Flutter

```shell
管理您的 Flutter 应用程序开发。

常用命令:

  flutter create <output directory>
    在指定目录下新建一个Flutter项目。

  flutter run [options]
    在连接的设备或模拟器中运行 Flutter 应用程序。

使用: flutter <command> [arguments]

全局选项:
-h, --help                  打印此使用信息。
-v, --verbose               打印的日志记录，包括执行的所有 shell 命令。
                            如果使用 "--help", 显示隐藏选项。如果与“flutter doctor”一起使用，会显示额外的诊断信息。 （在这些情况下使用“-vv”强制进行详细日志记录。）
-d, --device-id             目标设备 ID 或名称（允许使用前缀）。
    --version               报告此工具的版本。
    --suppress-analytics    禁止当前 CLI 调用的分析报告。
    --disable-telemetry     每次运行 flutter 或 dart 命令时禁用遥测报告，直到重新启用为止。
    --enable-telemetry      每次运行 flutter 或 dart 命令时启用遥测报告。

可用命令：

Flutter SDK
  bash-completion   输出命令行 shell 完成设置脚本。
  channel           列出或切换 Flutter 通道。
  config            配置Flutter设置。
  doctor            显示有关已安装工具的信息.
  downgrade         将 Flutter 降级到当前频道的最后一个活动版本.
  precache          填充 Flutter 工具的二进制工件缓存.
  upgrade           升级您的 Flutter.

Project
  analyze           分析项目的Dart代码
  assemble          组装和构建 Flutter 资源.
  build             构建可执行应用程序或安装包.
  clean             删除 build/ 和 .dart_tool/ 目录.
  create            创建一个新的 Flutter 项目.
  drive             在连接的设备或模拟器上运行项目的集成测试.
  gen-l10n          为当前项目生成本地化内容.
  pub               管理 Flutter 包的命令.
  run               在连接的设备上运行 Flutter 应用程序.
  test              为当前项目运行 Flutter 单元测试.

工具和设备
  attach            附加到正在运行的应用程序。
  custom-devices    列出、重置、添加和删除自定义设备。
  devices           列出所有连接的设备。
  emulators         列出、启动和创建模拟器。
  install           在连接的设备上安装 Flutter 应用程序。
  logs              显示正在运行的 Flutter 应用程序的日志输出。
  screenshot        从连接的设备截取屏幕截图。
  symbolize         对 AOT 编译的 Flutter 应用程序的堆栈跟踪进行符号化。

运行"flutter help <command>"以获取有关命令的更多信息。
运行"flutter help -v"以获得详细帮助输出，包括不太常用的选项。

```

## Flutter Run



## Flutter 组件
  
- [Material 组件](https://api.flutter-io.cn/flutter/material)
- [Bruno](https://bruno.ke.com/page/guide/start)
- [组件文章](https://zhuanlan.zhihu.com/p/545521148)
