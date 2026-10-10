# 🍅 番茄钟学习 App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Android-3DDC84?logo=android&logoColor=white)](https://github.com/youwmaoo-hub/pomodoro-app/releases)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-57-000020?logo=expo&logoColor=white)](https://docs.expo.dev/versions/v57.0.0/)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> 一款用 React Native + Expo + TypeScript 编写的番茄工作法学习助手：专注计时、每日计划、备忘录与学习统计，全部数据本地保存，无需登录、无广告。

A Pomodoro study companion built with React Native + Expo + TypeScript — focus timer, daily plan, notes and study statistics, with all data stored locally.

---

## 📥 下载安装

前往 [**Releases**](https://github.com/youwmaoo-hub/pomodoro-app/releases/latest) 下载最新的 `pomodoro-app-v1.0.0.apk`，传到 Android 手机点击安装即可（首次安装需在系统设置中允许「安装未知来源应用」）。

- 支持系统：Android 7.0 及以上
- 包名：`com.pomodoro.app`
- 安装包大小：约 100 MB（包含全部原生运行时，安装后可离线使用）

## ✨ 功能特性

| 模块 | 说明 |
| --- | --- |
| 🏠 今日首页 | 今日番茄钟数、完成任务数、待办数一览，一键开始专注 |
| 🍅 番茄钟 | 25 分钟专注计时，支持暂停 / 继续 / 重置，环形进度动画 |
| 📋 每日计划 | 任务的添加、完成、删除，待办与已完成分区展示 |
| 📝 备忘录 | 笔记的创建、编辑、删除 |
| 📊 学习统计 | 总番茄钟数、总专注时长、完成任务数、连续打卡天数与 7 天趋势图 |

**技术亮点**

- 💾 **数据持久化**：基于 AsyncStorage，所有变更自动保存，重启不丢失
- ⏱️ **后台计时准确**：通过 `AppState` 记录切后台时间戳，回前台补算经过时间
- 🎞️ **流畅动画**：`react-native-svg` + `Animated` 实现环形进度、按钮按压反馈
- 🎨 **统一设计系统**：颜色 / 间距 / 圆角 / 字体集中在 `src/constants/index.ts`
- 🧩 **Expo Router**：基于文件系统的路由，5 个 Tab 页面结构清晰
- 🔒 **隐私友好**：无网络请求、无账号、无第三方统计 SDK

## 🧰 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | React Native 0.86.3 |
| 工具链 | Expo SDK 57 + EAS Build |
| 路由 | Expo Router（文件路由） |
| 语言 | TypeScript 6.0.3 |
| 状态与存储 | React Hooks + AsyncStorage |
| 动画与图形 | React Native Animated API + react-native-svg |
| 图标 | Emoji（零额外字体依赖） |

## 🚀 快速开始

### 环境要求

- Node.js 18+（推荐 20 / 22 LTS）
- npm 或 yarn
- 真机调试需安装 [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)；模拟器调试需安装 Android Studio

### 本地运行

```bash
git clone https://github.com/youwmaoo-hub/pomodoro-app.git
cd pomodoro-app
npm install --legacy-peer-deps
npx expo start
```

启动后终端会显示二维码：

- **真机**：用 Expo Go 扫码即可加载应用
- **模拟器**：按 `a` 启动 Android 模拟器

### 代码检查

```bash
npx tsc --noEmit    # TypeScript 类型检查
npx expo-doctor     # 依赖与配置体检
```

## 📁 项目结构

```
pomodoro-app/
├── src/
│   ├── app/                    # Expo Router 路由（每个文件即一个页面）
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx     # Tab 导航布局
│   │   │   ├── index.tsx       # 今日首页
│   │   │   ├── pomodoro.tsx    # 番茄钟
│   │   │   ├── plan.tsx        # 每日计划
│   │   │   ├── notes.tsx       # 备忘录
│   │   │   └── stats.tsx       # 学习统计
│   │   └── _layout.tsx         # 根布局
│   ├── components/             # 可复用组件（Button / Card / TaskItem / TimerCircle）
│   ├── hooks/                  # useTasks / useSessions / useNotes / useTimer
│   ├── utils/                  # storage.ts（AsyncStorage 封装）、helpers.ts
│   ├── types/                  # TypeScript 类型定义
│   └── constants/              # 设计系统与番茄钟时长常量
├── assets/                     # 图标、启动图等静态资源
├── app.json                    # Expo 应用配置
├── eas.json                    # EAS Build 构建配置
└── BUILD_GUIDE.md              # 详细的打包与构建指南
```

## 🔍 核心实现说明

### 1. 数据持久化

所有数据通过 AsyncStorage 保存，键名统一定义在 `src/constants/index.ts`：

```
@pomodoro/tasks        # 任务列表
@pomodoro/sessions     # 番茄钟会话记录
@pomodoro/daily_plans  # 每日计划
@pomodoro/notes        # 备忘录
@pomodoro/stats        # 统计缓存
```

### 2. 后台计时

`src/hooks/useTimer.ts` 使用 `AppState` 监听前后台切换：进入后台记录时间戳，回到前台用时间差修正剩余秒数，因此锁屏或切换应用不会导致计时漂移。

### 3. 设计系统

- 主色 `#5F9EA0`（低饱和蓝绿色）
- 背景 `#F5F3EF`（米白）
- 圆角 8 / 12 / 16 / 20，间距 4 / 8 / 16 / 24 / 32 / 48
- 字体 12 / 14 / 16 / 20 / 24 / 28

## 📦 构建 APK

项目使用 [EAS Build](https://docs.expo.dev/build/introduction/) 云端构建，无需本地 Android SDK。

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview     # 生成可直接安装的 APK
eas build --platform android --profile production  # 生成上架 Google Play 的 AAB
```

本地构建（需 Android Studio + Android SDK）：

```bash
npx expo run:android
# 产物：android/app/build/outputs/apk/debug/app-debug.apk
```

更多细节见 [BUILD_GUIDE.md](BUILD_GUIDE.md)。

## ❓ 常见问题

<details>
<summary>为什么安装依赖要加 <code>--legacy-peer-deps</code>？</summary>

Expo SDK 57 的部分依赖声明了尚未收敛的 peer 版本范围，npm 11 会严格校验。使用 `--legacy-peer-deps` 可跳过该检查，不影响运行。
</details>

<details>
<summary>为什么没有使用 React Native Reanimated？</summary>

SDK 57 下 Reanimated 3 存在兼容性问题，因此改用标准 `Animated` API 实现全部动画，功能与体验一致且更稳定。
</details>

<details>
<summary>支持 iOS 吗？</summary>

代码是跨平台的，但未在 macOS / iOS 真机上测试，目前仅对 Android 提供正式构建与发布。
</details>

<details>
<summary>应用需要联网吗？</summary>

不需要。应用不含任何网络请求，全部数据保存在设备本地，卸载应用会同时清除数据。
</details>

## 🗺️ 后续计划

- [ ] 番茄钟结束的提示音与震动反馈
- [ ] 自定义专注时长（15 / 25 / 45 分钟）
- [ ] 每日目标设置与完成度提醒
- [ ] 数据导出与备份
- [ ] 深色主题
- [ ] 本地通知（计时结束提醒）

完整变更记录见 [CHANGELOG.md](CHANGELOG.md)。

## 🤝 贡献

欢迎提交 Issue 与 Pull Request，参与前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

1. Fork 本仓库
2. 新建分支 `git checkout -b feat/your-feature`
3. 提交改动 `git commit -m "feat: add your feature"`
4. 推送并发起 Pull Request

## 📄 开源许可

本项目基于 [MIT License](LICENSE) 开源，Copyright (c) 2026 youwmaoo-hub。

> 说明：仓库最初由 `create-expo` 脚手架生成，脚手架自带的模板文件版权归 Expo 团队所有；应用本身的代码以 MIT 协议开源。
