# React + Webpack 5 + Module Federation Demo

这是一个使用 React + Webpack 5 + Module Federation 构建的微前端演示项目，支持多个独立的子应用。

## 🏗️ 项目架构

```
react-module-federation-demo/
├── main-app/          # 主应用 (端口: 3000)
├── remoteA/           # 子应用 A - 计数器 (端口: 3001)
├── remoteB/           # 子应用 B - 待办事项 (端口: 3002)
├── .github/workflows/ # GitHub Actions 部署配置
└── package.json       # 工作区配置
```

## 🚀 功能特性

- **主应用 (main-app)**: 统一的应用入口，集成和展示子应用
- **Remote A**: 计数器应用，演示基本的状态管理和交互
- **Remote B**: 待办事项应用，演示复杂的状态管理功能
- **独立部署**: 每个子应用可以独立开发、测试和部署
- **动态加载**: 运行时动态加载远程组件，无需重新构建
- **样式隔离**: 各个应用之间样式相互隔离，避免冲突

## 🛠️ 技术栈

- **React 18**: 用户界面库
- **Webpack 5**: 模块打包工具，支持 Module Federation
- **Module Federation**: Webpack 5 的微前端解决方案
- **Babel**: JavaScript 编译器
- **CSS3**: 样式和动画
- **GitHub Actions**: 自动化部署

## 📦 快速开始

### 本地开发

1. 克隆项目并安装依赖：
```bash
git clone <repository-url>
cd react-module-federation-demo
npm run install:all
```

2. 启动开发服务器：
```bash
# 同时启动所有应用
npm run dev

# 或者单独启动各个应用
npm run start:main    # 主应用 (http://localhost:3000)
npm run start:remoteA # Remote A (http://localhost:3001)
npm run start:remoteB # Remote B (http://localhost:3002)
```

3. 访问主应用：
```
http://localhost:3000
```

### 构建部署

1. 构建所有应用：
```bash
npm run build
```

2. 单独构建：
```bash
npm run build:main    # 构建主应用
npm run build:remoteA # 构建Remote A
npm run build:remoteB # 构建Remote B
```

## 🌐 在线部署

项目已配置 GitHub Actions，推送到 `main` 分支后会自动部署到 GitHub Pages。

部署后的访问地址：
```
https://<username>.github.io/react-module-federation-demo/main-app/
```

## 🔧 配置说明

### Module Federation 配置

每个应用的 `webpack.config.js` 都包含 Module Federation 配置：

**主应用配置：**
```javascript
new ModuleFederationPlugin({
  name: 'mainApp',
  remotes: {
    remoteA: 'remoteA@http://localhost:3001/remoteEntry.js',
    remoteB: 'remoteB@http://localhost:3002/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: deps.react },
    'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
  },
})
```

**子应用配置：**
```javascript
new ModuleFederationPlugin({
  name: 'remoteA',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App',
  },
  shared: {
    react: { singleton: true, requiredVersion: deps.react },
    'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
  },
})
```

### 动态导入

主应用中使用动态导入加载远程组件：

```javascript
const RemoteAApp = React.lazy(() => import('remoteA/App'));
const RemoteBApp = React.lazy(() => import('remoteB/App'));
```

## 📱 应用功能

### 主应用
- 应用导航和切换
- 模块联邦介绍和特性说明
- 集成显示子应用内容

### Remote A - 计数器应用
- 计数器增减功能
- 可调节步长 (1, 5, 10, 100)
- 操作历史记录
- 统计信息显示

### Remote B - 待办事项应用
- 添加/删除待办事项
- 标记完成状态
- 过滤器 (全部/进行中/已完成)
- 完成进度显示
- 批量清理已完成项目

## 🎨 设计特点

- **现代化 UI**: 使用渐变色和阴影效果
- **响应式设计**: 支持移动端适配
- **平滑动画**: 过渡效果和微交互
- **主题一致性**: 统一的设计语言和配色方案

## 📂 项目结构详解

### main-app/
```
src/
├── index.js       # 应用入口
├── App.js         # 主应用组件
└── App.css        # 样式文件
public/
└── index.html     # HTML 模板
webpack.config.js  # 开发环境配置
webpack.prod.js    # 生产环境配置
```

### remoteA/ & remoteB/
结构类似 main-app，通过 Module Federation 暴露组件给主应用使用。

## 🔍 调试技巧

1. **开发模式**: 各应用独立运行，便于单独调试
2. **网络面板**: 检查 remoteEntry.js 和动态组件的加载情况
3. **Console**: 查看模块联邦相关的日志信息
4. **热重载**: 支持代码修改后自动刷新

## 📚 学习资源

- [Webpack Module Federation 文档](https://webpack.js.org/concepts/module-federation/)
- [Module Federation 详解](https://medium.com/edensoft/module-federation-in-webpack-5-46c3432d4506)
- [微前端架构实践](https://micro-frontends.org/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License