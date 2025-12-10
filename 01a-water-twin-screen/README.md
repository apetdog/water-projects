# 水利大屏可视化

本地运行

```bash
npm install --legacy-peer-deps
npm run dev
```

然后打开浏览器访问 `http://localhost:5173/water-twin-screen/`

## 修改数据

所有数据均为本地 Mock，直接修改以下文件即可实时更新：

- **中间地图与底部统计**: `src/api/mock/centerPageData.ts`
- **左右侧面板图表**: `src/api/mock/projectData.ts`
