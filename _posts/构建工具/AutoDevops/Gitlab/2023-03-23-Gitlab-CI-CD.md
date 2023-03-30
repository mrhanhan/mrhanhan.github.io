---
title: Gitlab CI/CD
category: [构建工具, AutoDevops, Gitlab]
tags: [CI/CD, 私有仓库, 更新中, Gitlab]
---

## 1. Gitlab CI/CD

> 关于`CI/CD`的理论概念可以查看前面这篇文章: [CI/CD](/posts/CI-CD)，详细的 gitlab ci/cd 配置可查看[gitlab 官网文档][gitlab_dock_link]

如果需要使用到`gitlab ci/cd` 功能，则需要在代码仓库中创建一个 `.gitlab-ci.yml` 配置文件，用来描述在`何时` 采用 `什么方式` 进行 `持续集成和构建`

`.gitlab-ci.yml` 简单的例子:
```yaml
# 构建阶段
stages:
  - build
  - test
  - deploy

build-job:
  stage: build
  script:
    - echo "Hello, $GITLAB_USER_LOGIN!"

test-job1:
  stage: test
  script:
    - echo "This job tests something"

test-job2:
  stage: test
  script:
    - echo "This job tests something, but takes more time than test-job1."
    - sleep 20

deploy-prod:
  stage: deploy
  script:
    - echo "This job deploys something from the $CI_COMMIT_BRANCH branch."
  environment: production
```


## x. 内置变量

- `$CI_COMMIT_REF_NAME`：当前分支的名称。
- `$CI_COMMIT_SHA`：提交的哈希值。
- `$CI_PIPELINE_ID`：当前CI/CD流程的ID。
- `$CI_PROJECT_DIR`：Git仓库的根目录。
- `$CI_PROJECT_NAME`：Git仓库的名称。
- `$CI_PROJECT_NAMESPACE`：Git仓库的命名空间。
- `$CI_REGISTRY_IMAGE`：Docker镜像仓库的名称。
- `$CI_BUILD_ID`：当前构建的ID。
- `$CI_BUILD_REF`：当前构建的哈希值。
- `$CI_JOB_ID`：当前Job的ID。
- `$CI_JOB_NAME`：当前Job的名称。
- `$CI_JOB_STAGE`：当前Job所属的Stage。
- `$CI_RUNNER_DESCRIPTION`：当前Runner的描述信息。
- `$CI_RUNNER_ID`：当前Runner的ID。
- `$CI_RUNNER_TAGS`：当前Runner的标签。
- `$CI_COMMIT_TAG`：如果当前CI/CD流程是由标签触发的，则为标签的名称。
- `$CI_COMMIT_TITLE`：当前提交的标题。
- `$CI_COMMIT_MESSAGE`：当前提交的消息。
- `$CI_COMMIT_TIMESTAMP`：当前提交的时间戳。
- `$CI_COMMIT_AUTHOR`：当前提交的作者。
- `$CI_COMMIT_EMAIL`：当前提交的作者的电子邮件地址。
- `$CI_REGISTRY_USER`：Docker镜像仓库的用户名。
- `$CI_REGISTRY_PASSWORD`：Docker镜像仓库的密码。
- `$CI_ENVIRONMENT_NAME`：当前环境的名称。
- `$CI_ENVIRONMENT_SLUG`：当前环境的Slug。
- `$CI_DEPLOY_USER`：当前部署的用户。
- `$CI_DEPLOY_PASSWORD`：当前部署的密码。
- `$CI_RUNNER_EXECUTABLE_ARCH`：当前Runner的架构类型（例如，amd64）。
- `$CI_NODE_INDEX`：当前Job在集群中的索引值。
- `$CI_NODE_TOTAL`：当前Job在集群中的总数。
- `$CI_SERVER_VERSION`：GitLab服务器的版本号。
- `$CI_SERVER_NAME`：GitLab服务器的名称。
- `$CI_SERVER_REVISION`：GitLab服务器的哈希值。
- `$CI_SERVER_HOST`：GitLab服务器的主机名。
- `$CI_SERVER_PORT`：GitLab服务器的端口号。
- `$CI_SERVER_PROTOCOL`：GitLab服务器的协议类型（http或https）。
- `$CI_JOB_MANUAL`：如果当前Job是手动触发的，则为true，否则为false。
- `$RUNNER_ID`：当前 Runner 的唯一标识符。
- `$RUNNER_TAGS`：当前 Runner 的标签列表，可以用于选择和筛选任务。
- `$RUNNER_VERSION`：当前 Runner 的版本号。
- `$RUNNER_REVISION`：当前 Runner 的 Git 提交哈希值。
- `$RUNNER_EXECUTABLE_NAME`：当前 Runner 的可执行文件名。
- `$RUNNER_EXECUTABLE_VERSION`：当前 Runner 的可执行文件版本号。
- `$RUNNER_PROJECT_TEMP_DIR`：用于访问当前 Runner 所在的临时项目目录，在执行任务时，GitLab Runner 会为每个项目创建一个临时目录，其中包含任务所需的所有文件和代码

[gitlab_dock_link]:https://docs.gitlab.cn/jh/ci/quick_start/
