---
id: microFE
title: 微前端
sidebar_label: 微前端
---

## 微前端定义

借鉴于后端微服务的的理念，由独立交付的多个前端应用组成整体的架构风格。将前端应用分解成一些更小、更简单的能够独立开发、测试、部署的小块，而在用户看来仍然是内聚的单个产品。

    微服务：

        服务是面向服务架构（SOA）的一种变体，把应用程序设计成一系列松耦合的细粒度服务，并通过轻量级的通信协议组织起来
    具体地，将应用构建成一组小型服务。这些服务都能够独立部署、独立扩展，每个服务都具有稳固的模块边界，甚至允许使用不同的编程语言来编写不同服务，也可以由不同的团队来管理

## 特点

1. 简单、松耦合的代码库
2. 增量升级
3. 独立部署
4. 团队自治

## 实现方案

多 Bundle 集成

1. 服务端集成：如 SSR 拼装模板
2. 构建时集成：通过 npm 独立包的方式进行集成。如 Code Splitting
3. 运行时集成：如通过
   1. iframe 嵌套
   2. JS 每个子应用暴露出渲染函数，主应用在启动时加载各个子应用的独立 Bundle，之后根据路由规则渲染相应的子应用
   3. Web Components （将每个子应用封装成自定义 HTML 元素）等方式

## 基于 qiankun 的实现

### 步骤（dev）

1.  安装@umi/qiankuan 依赖

2.  主应用 config 配置 qiankun 配置（子应用注册）

          qiankun: {
                master: {
                    apps: [
                        {
                            name: 'micro_testing',
                            // entry: 'http://192.168.21.158:8082',
                            entry: '//localhost:8082',
                            history: 'browser',
                        },
                    ],
                    jsSandbox: true, // 是否启用 js 沙箱，默认为 false
                    prefetch: true, // 是否启用 prefetch 特性，默认为 true
                },
            },

3.  路由配置

        export default {
            path: '/testing',
            component: '../layouts/QinkunLayout',
            routes: [
                {
                path: '/testing',
                redirect: '/testing/micro_testing',
                },
            // 配置微应用 app1 关联的路由
                {
                path: '/testing/micro_testing',
                microApp: 'micro_testing',
                },
                {
                component: '404',
                },
            ],
        }

4.  document.ejs

    (id="<%= context.config.mountElementId %>" 替换 id="root")

5.  子应用 package.json 修改 name 与主应用一致

6.  子应用 创建 app.ts 设置

        export const qiankun = {
            // 应用加载之前
            async bootstrap(props: any) {
                console.log('app1 bootstrap', props)
            },
            // 应用 render 之前触发
            async mount(props: any) {
                console.log('app1 mount', props)
            },
            // 应用卸载之后触发
            async unmount(props: any) {
                console.log('app1 unmount', props)
            },
        }

### 部署

    nginx 部署

    子应用要实现可跨域访问
