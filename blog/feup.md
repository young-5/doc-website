---
slug: feup
title: 前端项目部署
author: young-5
author_title: young-5 @ github
author_url: https://github.com/young5
tags: [nginx]
---

## 背景

由于团队开发环境，人员配置等条件的不同，常常会导致每个开发人员做职能之外的工作，同时也为了个人知识能力的拓展，每个开发人员也应当去跨出自己的知识边界。

前端除了开发业务功能之外，对于整个项目的运维部署也应当有一定了解。

## 页面访问原理

浏览器访问域名 -> dns 解析（浏览器 操作系统 路由） -> 成功地把消息发到服务器上 -> tcp 三次握手（SYN、ACK） -> 服务器响应 -> tcp 四次挥手 -> 成功地把消息发到浏览器上 -> 浏览器解析

    服务器响应 直接返回 html 文件还是其他？

    1. nginx配置
    2. 服务器逻辑处理
    3.

## 前端部署的相关软件

1. 服务器连接工具： finalshell xftp filezilla
2. 打包：前端 IDE
3. 自动化部署： jenkins
4. 代理：nginx
5. 环境：node

## 手动部署步骤

1.  前端项目打包（基于 node 环境 build）,生成 dist 目录
2.  使用服务器连接工具 连接服务器
3.  将 dist 目录下的文件 上传到服务器上的指定文件目录下

    - 静态服务器

            python -m SimpleHTTPServer 3000

    - nginx 代理 部署

    - Node 服务

      Node 服务去 render 产出物，并未做其他任何请求处理

            var express = require("express");
            var path = require('path');
            var project = require('../project.config');

            const app = express();
            app.use('\*', function (req, res) {
            const file = path.resolve(project.basePath, project.outDir, 'index.html');
            res.sendFile(file);
            });

            app.listen(process.env.PORT || 3000, function () {
            console.log("Listening on port %d!", this.address().port);
            });

    * Node 服务作为 API 中间层

      Node 服务就必须存在，因为很有可能真正的 API 处理方不支持跨域，或者有身份验证，那么就得在这里去处理，生产环境自然也得有

            router.route('/articles/send')
            .post(async (req, res) => {
            const {params} = req.body;
            const requestUrl = '/x/x/x/x';
            const response = await requestArticle(requestUrl, params);
            res.status(200).send(response).end();
            });

## 自动化部署

### jenkins

1.  General 丢弃旧的构建
2.  构建触发器
3.  高级项目选项
4.  流水线

        node{
            stage('pull code'){
            checkout([$class: 'SubversionSCM', additionalCredentials: [], excludedCommitMessages: '', excludedRegions: '', excludedRevprop: '', excludedUsers: '', filterChangelog: false, ignoreDirPropChanges: false, includedRegions: '', locations: [[cancelProcessOnExternalsFail: true, credentialsId: '9b9505dd-ca04-4338-b0eb-25d6728d6062', depthOption: 'infinity', ignoreExternalsOption: true, local: '.', remote: 'svn://192.168.21.151:3691/nmg/code/nmg-web/gov-company']], quietOperation: true, workspaceUpdater: [$class: 'UpdateUpdater']])
            }
            stage('build'){
            nodejs('nodejs12'){
            sh '''yarn install
            yarn run build '''
            }
            }
            stage('push'){
            sshPublisher(publishers: [sshPublisherDesc(configName: 'dev2+harbor', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/usr/local/imssp/nginx/html2', remoteDirectorySDF: false, removePrefix: 'dist', sourceFiles: 'dist/\*\*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }

        }

## 本地 webpack server
