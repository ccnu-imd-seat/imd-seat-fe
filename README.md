# 华中师范大学信息管理学院座位预约系统

![Platform](https://img.shields.io/badge/platform-微信小程序-green.svg)
![Framework](https://img.shields.io/badge/framework-Taro-brightgreen.svg)

## 📖 项目简介

这是一个基于 Taro 框架开发的微信小程序，为华中师范大学信息管理学院提供智能化座位预约服务。用户可以通过小程序预约自习室座位，查看预约记录，管理员可以查看和导出预约数据。

## ✨ 主要功能

### 用户功能

- 🔐 **微信登录**：支持微信授权登录
- 📅 **座位预约**：支持按天或按周预约座位
- 🏠 **教室选择**：可视化教室和座位状态展示
- 📋 **预约管理**：查看我的预约和违约记录
- 💯 **信誉分系统**：根据预约行为计算信誉分
- ✅ **扫码签到**：到达后扫码签到确认使用
- 💬 **建议反馈**：用户可提交意见和建议

### 管理员功能

- 📊 **数据导出**：管理员可导出所有预约数据
- 👥 **管理员名单**：支持管理员权限配置

## 🛠️ 技术栈

- **框架**：Taro 4.0.12
- **UI 库**：@taroify/core
- **语言**：TypeScript
- **样式**：Sass + TailwindCSS
- **状态管理**：React Hooks
- **包管理器**：pnpm
- **平台**：微信小程序

## 📦 项目结构

```
imd-seat-fe/
├── src/
│   ├── apis/              # API 接口
│   │   ├── admin.ts       # 管理员相关接口
│   │   ├── checkin.ts     # 签到相关接口
│   │   ├── feedback.ts    # 反馈相关接口
│   │   ├── mine.ts        # 个人信息相关接口
│   │   ├── reservation.ts # 预约相关接口
│   │   └── user.ts        # 用户相关接口
│   ├── assets/            # 静态资源
│   │   ├── bg/            # 背景图片
│   │   ├── icons/         # 图标
│   │   └── tabbar/        # 底部导航栏图标
│   ├── components/        # 公共组件
│   │   ├── chair/         # 座位组件
│   │   ├── classroom/     # 教室卡片组件
│   │   ├── downLoadButtun/# 下载按钮组件
│   │   ├── narbar/        # 导航栏组件
│   │   ├── recordCard/    # 预约记录卡片组件
│   │   ├── ruleDialog/    # 预约规则弹窗组件
│   │   ├── selectDialog/  # 确认预约弹窗组件
│   │   └── suggestDialog/ # 建议反馈弹窗组件
│   ├── pages/             # 页面
│   │   ├── index/         # 首页（我的预约）
│   │   ├── login/         # 登录页
│   │   ├── scan/          # 扫码签到页
│   │   └── appoint/       # 预约页
│   ├── utils/             # 工具函数
│   │   ├── auth.ts        # 认证相关
│   │   ├── dateUtils.ts   # 日期处理
│   │   ├── dealRecrds.ts  # 记录处理
│   │   └── request.ts     # 网络请求封装
│   ├── constants/         # 常量配置
│   ├── app.config.ts      # 应用配置
│   ├── app.scss           # 全局样式
│   └── app.ts             # 应用入口
├── types/                 # TypeScript 类型定义
├── config/                # 环境配置
├── scripts/               # 脚本工具
├── .env.development       # 开发环境变量
├── .env.production        # 生产环境变量
├── package.json           # 项目依赖
└── project.config.json    # 小程序配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 8
- 微信开发者工具

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

启动后，在微信开发者工具中打开项目的 `dist` 目录即可预览。

### 生产构建

```bash
pnpm build
```

### 代码格式化

```bash
pnpm format
```

### 生成类型定义

```bash
pnpm gen:types
```

## 🔧 环境配置

项目支持多环境配置，通过 `.env.*` 文件管理：

- `.env.development` - 开发环境
- `.env.production` - 生产环境
- `.env.test` - 测试环境

## 📱 功能截图

### 首页

- 查看我的预约
- 查看违约记录
- 信誉分展示
- 扫码签到入口
- 建议反馈入口

### 预约页面

- 选择预约方式（按天/按周）
- 选择教室
- 可视化座位状态
- 实时预约

## 🔐 权限说明

小程序需要以下权限：

- `scope.userInfo` - 获取用户信息
- `camera` - 扫码签到功能

## 🌐 API 接口

项目使用 RESTful API，主要接口包括：

- **用户认证**：登录、获取用户信息
- **预约管理**：获取可预约日期、获取教室列表、获取座位状态、创建预约、取消预约
- **个人中心**：获取我的预约、获取信誉分
- **签到**：扫码签到
- **反馈**：提交建议反馈
- **管理**：获取管理员名单、导出数据

## 📝 开发规范

### 代码风格

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 TypeScript 严格模式

### 命名规范

- 组件使用 PascalCase
- 函数和变量使用 camelCase
- 常量使用 UPPER_SNAKE_CASE
- 样式类使用 kebab-case

### Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具链相关
```

## 🐛 常见问题

### Q: 预约失败怎么办？

A: 检查是否在可预约时间内，座位是否已被占用，以及信誉分是否足够。

### Q: 如何成为管理员？

A: 联系系统管理员将您的学号添加到管理员名单中。

### Q: 扫码签到失败？

A: 确保已授权相机权限，且扫描的是有效的座位二维码。

## 👥 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 小程序内建议反馈功能

## 🙏 致谢

感谢华中师范大学信息管理学院对本项目的支持。

---

Made with ❤️ by CCNU iSchool Team
