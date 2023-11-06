---
layout: post
category: [日常日志, Burp Suite]
tags: [安全工具, Burp Suite插件开发]
title: 使用Java进行Burp Suite插件开发
---

> 环境准备：
> 1. Burp suite
> 2. JDK Java开发环境


## 1. 创建项目

- 使用JetBrains Idea 创建Java项目

![Java环境](../../../assets/posts/日常日志/Burpsuite/burpsuite-extender-01/burpsuite_java_env.png)

- 打开Burp Suite 导入API

![Burp Suite Extender](../../../assets/posts/日常日志/Burpsuite/burpsuite-extender-01/burpsuite_extender_api.png)

注意，选择接口保存的目录一定是项目根目录，在操作完成后项目中会生成一个 burp Java包


![Burp Suite Extender](../../../assets/posts/日常日志/Burpsuite/burpsuite-extender-01/burpsuite_extender_api_02.png)

## 2. 开发插件

在项目的 burp包下面创建一个：`BurpExtender.java` 文件，实现与: `IBurpExtender`

```java
  package burp;
  /**
   * @author Mrhan
   * @date 2023/9/23 10:30
   */
  public class BurpExtender implements IBurpExtender{
      @Override
      public void registerExtenderCallbacks(IBurpExtenderCallbacks callbacks) {
  
      }
  }

```
