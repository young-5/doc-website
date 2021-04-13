---
slug: nginx
title: nginx部署前端站点
author: young-5
author_title: young-5 @ github
author_url: https://github.com/young5
tags: [nginx]
---

# Nginx 安装部署前端站点

标签（空格分隔）： 构建

---

## Nginx 安装

1.  连接服务器，root 登录
2.  进入http://nginx.org/en/download.html 选择 nginx 版本 （如：1.18.0 版本）
3.  进入 nginx 安装文件目录 （如：usr/local/nginx）执行

        cd  usr/local/nginx
        wget http://nginx.org/download/nginx-1.18.0.tar.gz

4.  安装依赖（可省略）

        yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel

5.  解压文件

        tar -zxvf nginx-1.18.0.tar.gz

6.  进入解压后目录执行编译

        Cd nginx-1.18.0
        ./configure --with-http_ssl_module

可以增加相关模块，如 SSL 模块 --prefix=PATH：指定 nginx 的安装目录 --add-module=PATH：添加第三方外部模块

7. 执行 make 命令
8. 执行 make install
9. 安装完成

## Nginx 启动

1. 进入 nginx 启动 sbin 目录
   cd /usr/local/nginx/sbin
2. 执行 ./nginx
3. 启动完成 浏览器访问 ip 即可见 nginx 默认页面(默认页面是在 nginx /html 目录下)

相关命令：

        进入/usr/local/nginx/sbin 目录
        1.	./nginx   启动
        2.	./nginx –s reload   重启
        3.	./nginx –s   stop  停止
        4.	./nginx –V  版本查看
        5.	Pr –ef | grep nginx  查看nginx服务状态
        6.	Whereis nginx    nginx目录查找
        …

## Nginx 配置

在/usr/local/nginx/目录下 有 conf 目录 （配置目录） html 目录（前端静态文件目录） sbin 目录(nginx 启动目录)

1. 进入 cd /usr/local/nginx/conf 目录，编辑 nginx.conf 文件 配置 nginx 相关配置，如代理等

如

    server {
        listen      61;  //站点端口
        client_max_body_size 100m;
        server_name  localhost;
        location / { //入口文件配置
            root  html/basicHtml;
            index  index.html index.htm;
        }
        location /group1/ { //代理配置
             proxy_pass http://192.168.21.146:8081/group1/;
        }
        location /WG_IP/ {
            proxy_pass http://192.168.21.150:5761/;
        }
         location /fileread/ {
            proxy_pass http://192.168.21.146:8081/;
        }

}

## 前端项目发布

1. 进入 /usr/local/nginx/html 目录 将需要发布的前端打包后的静态文件放在该目录下
2. 进入 /usr/local/nginx/confg 目录,编辑 nginx.conf 文件，使得对应站点访问端口，访问的是 html 目录下对应的 index.html 文件

## 注意

如果访问 ip 依旧无法访问，建议 关闭防火墙或者对外映射出对应端口

1. systemctl status firewalld 查看防护墙 如果状态 active 是 running ，说明防火墙服务启动中
2. systemctl stop firewalld 关闭防火墙
