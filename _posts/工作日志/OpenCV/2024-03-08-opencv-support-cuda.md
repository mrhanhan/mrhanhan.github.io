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
cmake -G Ninja \
  -D OPENCV_EXTRA_MODULES_PATH=..\..\opencv_contrib\modules \
  -D WITH_CUDA=ON \
  -D WITH_CUDNN=ON \
  -D CUDA_FAST_MATH=ON \
  -D WITH_OPENEXR=ON \
  -D OPENCV_ENABLE_NONFREE=NO \
  -D BUILD_JAVA=OFF \
  -D BUILD_opencv_python3=OFF \
  -D WITH_NVCUVENC=OFF \
  -D WITH_NVCUVID=OFF   ..
 
 make
```
