---
layout: post
category: [工作日志, OpenCV]
tags: [OpenCV, 日志]
title: OpenCV 支持CUDA
---

> 从源码编译 opencv 和 opencv-contrib 并指支撑 cuda


```shell
git clone https://github.com/opencv/opencv.git
git clone https://github.com/opencv/opencv-contrib.git
```

```shell
mkdir build
cd build
cmake \
    -D OPENCV_DNN_CUDA=ON \
    -D WITH_CUDA=ON \
    -D WITH_CUDNN=ON \
    -D OPENCV_DNN_CUDA=ON \
    -D OPENCV_ENABLE_NONFREE=ON \
    -D OPENCV_EXTRA_MODULES_PATH=../../opencv_contrib/modules \
    ..
 
 make
```
