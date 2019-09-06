# vue-work-template

## 项目介绍

> 基于vue-cli3的常用模板，主要用于规范工作目录，并针对工作流程进行定制。

* api接口分离
* CDN地址配置
* 测试环境和生产环境分离打包

## 环境依赖

> 本项目依赖 Node.js，请先安装 Node.js

## 快速开始

```bash
git clone https://github.com/grace5925/vue-work-template.git

cd vue-work-template

npm install
# OR
yarn
```

## 常用命令

```bash
# 开启mock服务
yarn mock

# 开启本地服务，实时热重载
yarn serve

# 打包到测试环境，代码将被打包到a04目录，环境变量staging
yarn build:test

# 打包到生产环境，代码将被打包到dist目录，环境变量production
yarn build

# 静态代码分析，简易修复
yarn lint
```

## 目录结构

```bash
    ├── README.md                       项目介绍
    ├── src
    │     ├── api                             api统一管理
    │     ├── assets                          静态资源，这里的资源会被wabpack构建
    │     │     ├── images
    │     │     └── scss
    │     ├── views                           页面级组件
    │     ├── components                      组件
    │     ├── store                           vuex
    │     ├── utils                           工具函数
    │     ├── skeleton.js                     loading页面的渲染函数
    │     ├── Skeleton.vue                    loading页面的结构
    │     ├── App.vue                         根组件
    │     └── main.js                         入口文件
    ├── config                          配置项统一存放位置
    ├── mock                            用于配置mock server的api
    ├── public                          这里的资源不会被wabpack构建
    ├── .env.development                用于配置本地服务器特有的环境变量
    ├── .env.production                 用于配置生产服务器特有的环境变量
    ├── .env.staging                    用于配置测试服务器特有的环境变量
    └── vue.config.js                   配置文件
```

## Todo

* [x] 图片压缩
* [x] mock api
* [x] 前端防连点
* [x] 骨架屏（loading）
* [ ] 常用api封装
* [ ] 常用函数封装
* [ ] 多页

## License

[MIT](https://github.com/grace5925/vue-work-template/blob/master/LICENSE)
