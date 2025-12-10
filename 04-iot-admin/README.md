## 简介

物联网云平台采用了最新的 Vue 3、Vite、TypeScript 等主流技术开发，开箱即用，可用于中后台前端开发，也适合学习参考。

## 特性

- **最新技术栈**：使用 Vue3/vite 等前端前沿技术开发
- **TypeScript**：应用程序级 JavaScript 的语言
- **主题**：提供多套主题色彩，可配置自定义主题
- **国际化**：内置完善的国际化方案
- **权限**：内置完善的动态路由权限生成方案

## 预览

- [物联网云平台](https://cn.moodl.ink/iot-admin/) - 完整版中文站点

测试账号：vben/123456

## 安装使用

2. 安装依赖

```bash
cd iot-admin
npm i -g corepack
pnpm install
```

3. 运行

```bash
pnpm dev:antd
```

本地访问：http://localhost:5666

4. 打包

```bash
pnpm build:antd
```

## 修改 mock 数据

所有的mock数据放到 `apps/web-antd/src/views/iot/mock` 目录下，可以根据需要修改。
