## 简介

水利管理系统是基于 Vue Vben Admin 的升级版本。采用了最新的 Vue 3、Vite、TypeScript 等主流技术开发，开箱即用。

## 预览

- [水利管理系统](https://cn.moodl.ink/water-admin) - 完整版中文站点

测试账号：vben/123456

## 安装使用

2. 安装依赖

```bash
cd water-admin
npm i -g corepack
pnpm install
```

3. 运行

```bash
pnpm dev:antd
```

访问 http://localhost:5666/ 即可查看预览效果。

4. 打包

```bash
pnpm build:antd
```

5. 部署

将打包后的 app/web-antd/dist 目录下的内容部署到服务器即可。

要注意的是现在的访问路径是/water-admin。

## 许可证

[MIT © Vben-2020](./LICENSE)
