# Playground

## 📂 项目结构

---

```plaintext
├── src
│   ├── api                  # 接口请求
│   ├── assets               # 静态资源
│   ├── components           # 通用组件
│   ├── composables          # 逻辑复用
│   ├── views                # 业务页面
│   ├── types                # 类型声明
│   ├── router               # 路由配置
│   ├── store                # 状态管理
│   ├── utils                # 工具函数
│   ├── App.vue              # 主应用入口
│   ├── main.js              # 入口文件
│   └── ...
├── unocss.config.js         # unocss 配置
└── vite.config.js           # vite 配置
```

n.b.: 对于规模较小项目，可直接所有 reactive 数据放在 store 中代替 pinia 或 vuex。

---

## 🚀 使用方法

1. 安装依赖：

```bash
   pnpm install
```

2. 启动开发服务器：

```bash
   pnpm run dev
```

3. 构建生产环境：

```bash
   pnpm run build
```

---

## 🫕 特别感谢

感谢以下优秀开源项目的支持：

- [vue 3](https://vuejs.org/)
- [naive-ui](https://www.naiveui.com/)
- [unocss](https://unocss.dev/)

希望本项目能够助顺利进行移动端开发！ 🎉

## 📝 许可证

本仓库采用 MIT 许可证 开源，详见 [LICENSE](LICENSE) 文件。
