# 我的个人网站 (My Personal Website)

这是一个基于 Vue 3 和 Vite 构建的个人网站项目，具有现代化的界面设计和响应式布局。

## 项目特点

- 使用 Vue 3 Composition API 和 TypeScript 开发
- 采用 Vite 构建工具，提供快速的开发体验
- 响应式设计
- 使用 SCSS 进行样式开发
- 集成 Vue Router 进行路由管理
- 使用 Axios 进行 HTTP 请求
- 异步组件加载，优化性能

## 技术栈

- [Vue 3](https://v3.cn.vuejs.org/)
- [Vite](https://cn.vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [Vue Router](https://router.vuejs.org/zh/)
- [Axios](https://axios-http.com/)
- [Pinia](https://pinia.vuejs.org/)

## 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (并禁用 Vetur)。

## 项目结构

```
src/
├── apis/              # API 接口定义
├── assets/            # 静态资源
├── components/        # 组件
├── docs/              # 文档
├── router/            # 路由配置
├── styles/            # 全局样式
├── utils/             # 工具函数
├── views/             # 页面视图
├── App.vue            # 根组件
└── main.ts            # 入口文件
```

## 项目设置

```sh
npm install
```

### 编译和热重载以进行开发

```sh
npm run dev
```

### 类型检查、编译和压缩以用于生产

```sh
npm run build
```

### 使用 [ESLint](https://eslint.org/) 进行代码检查

```sh
npm run lint
```

## 自定义配置

参考 [Vite 配置参考](https://vite.dev/config/)。
