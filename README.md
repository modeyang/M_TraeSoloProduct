# AI绘画启蒙网页 🎨

一个专为小学生设计的AI绘画启蒙网页，通过文生图、文生视频、图生视频、前后帧图生视频等功能，让孩子们体验AI创作的魅力。

## 🌟 项目特色

- 🎯 **专为小学生设计** - 友好的界面和简单的交互方式
- 🎨 **多种AI创作功能** - 文生图、文生视频、图生视频、前后帧图生视频
- 📚 **AI知识学习** - 寓教于乐的AI知识科普和互动测验
- 🏛️ **作品展示** - 展示和分享创作成果
- 📱 **响应式设计** - 支持桌面端、平板和手机端访问
- 🌈 **明亮友好的UI** - 卡通风格设计，激发孩子们的创造力

## 🚀 功能模块

### 核心功能
- **文生图** - 输入文字描述生成精美图片
- **文生视频** - 根据文字描述创建动态视频
- **图生视频** - 将静态图片转换为动态视频
- **前后帧图生视频** - 基于关键帧生成流畅过渡动画

### 辅助功能
- **作品展示** - 网格布局展示所有创作作品
- **AI知识学习** - 图文并茂的AI知识科普
- **互动测验** - 简单有趣的AI知识小测试

## 🛠️ 技术栈

- **前端框架**: React 18.3.1 + TypeScript
- **构建工具**: Vite 6.3.5
- **路由管理**: React Router DOM 7.3.0
- **样式框架**: Tailwind CSS 3.4.17
- **状态管理**: Zustand 5.0.3
- **图标库**: Lucide React 0.511.0
- **通知组件**: Sonner 2.0.6
- **代码规范**: ESLint + TypeScript ESLint

## 📦 安装与运行

### 环境要求
- Node.js >= 18.0.0
- npm 或 pnpm

### 安装依赖
```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

### 开发环境
```bash
# 启动开发服务器
npm run dev

# 或使用 pnpm
pnpm dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用

### 构建生产版本
```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

### 代码检查
```bash
# 运行 ESLint
npm run lint

# 类型检查
npm run check
```

## 🌐 部署

项目已配置 Vercel 部署，支持自动部署。

### Vercel 部署
1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 自动部署完成

### 手动部署
```bash
# 构建项目
npm run build

# 将 dist 目录部署到静态文件服务器
```

## 📁 项目结构

```
src/
├── components/          # 公共组件
│   ├── Empty.tsx       # 空状态组件
│   └── Layout.tsx      # 布局组件
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── TextToImage.tsx # 文生图页面
│   ├── TextToVideo.tsx # 文生视频页面
│   ├── ImageToVideo.tsx # 图生视频页面
│   ├── FrameToVideo.tsx # 前后帧图生视频页面
│   ├── Gallery.tsx     # 作品展示页面
│   └── AIKnowledge.tsx # AI知识页面
├── hooks/              # 自定义 Hooks
│   └── useTheme.ts     # 主题管理
├── lib/                # 工具库
│   └── utils.ts        # 通用工具函数
├── App.tsx             # 应用主组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 🎯 设计理念

### 用户体验
- **简单易用** - 针对小学生优化的交互设计
- **视觉友好** - 明亮的色彩搭配和卡通风格
- **响应式** - 适配各种设备屏幕尺寸

### 教育价值
- **启发创造力** - 通过AI创作激发想象力
- **科技启蒙** - 让孩子们了解AI技术应用
- **寓教于乐** - 在游戏中学习，在创作中成长

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和设计师，让我们一起为孩子们的AI启蒙教育贡献力量！

---

**让每个孩子都能体验AI创作的魅力！** ✨
