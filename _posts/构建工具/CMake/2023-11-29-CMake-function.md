---
title: CMake 常用函数
category: [构建工具, CMake]
tags: [CMake, CPP, 构建工具, 更新中]
---


## 1. 文件函数

## 1.1 file

```shell
Reading

file(READ <filename> <out-var> [...])
file(STRINGS <filename> <out-var> [...])
file(<HASH> <filename> <out-var>)
file(TIMESTAMP <filename> <out-var> [...])
file(GET_RUNTIME_DEPENDENCIES [...])

Writing

file({WRITE | APPEND} <filename> <content>...)
file({TOUCH | TOUCH_NOCREATE} [<file>...])
file(GENERATE OUTPUT <output-file> [...])
file(CONFIGURE OUTPUT <output-file> CONTENT <content> [...])

Filesystem

file({GLOB | GLOB_RECURSE} <out-var> [...] [<globbing-expr>...])
file(MAKE_DIRECTORY [<dir>...])
file({REMOVE | REMOVE_RECURSE } [<files>...])
file(RENAME <oldname> <newname> [...])
file(COPY_FILE <oldname> <newname> [...])
file({COPY | INSTALL} <file>... DESTINATION <dir> [...])
file(SIZE <filename> <out-var>)
file(READ_SYMLINK <linkname> <out-var>)
file(CREATE_LINK <original> <linkname> [...])
file(CHMOD <files>... <directories>... PERMISSIONS <permissions>... [...])
file(CHMOD_RECURSE <files>... <directories>... PERMISSIONS <permissions>... [...])

Path Conversion

file(REAL_PATH <path> <out-var> [BASE_DIRECTORY <dir>] [EXPAND_TILDE])
file(RELATIVE_PATH <out-var> <directory> <file>)
file({TO_CMAKE_PATH | TO_NATIVE_PATH} <path> <out-var>)

Transfer

file(DOWNLOAD <url> [<file>] [...])
file(UPLOAD <file> <url> [...])

Locking

file(LOCK <path> [...])

Archiving

file(ARCHIVE_CREATE OUTPUT <archive> PATHS <paths>... [...])
file(ARCHIVE_EXTRACT INPUT <archive> [...])
```

### 1.2 aux_source_directory

```shell
aux_source_directory(<dir> <variable>)
```


## 2. 流程控制

### 2.1 foreach

```shell
foreach(<loop_var> <items>)
  <commands>
endforeach()

RANGE
foreach(<loop_var> RANGE <start> <stop> [<step>])

IN
foreach(<loop_var> IN [LISTS [<lists>]] [ITEMS [<items>]])

```


## 3. 字符串函数

### 3.1 字符串替换
