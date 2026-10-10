# 更新日志

本项目所有值得记录的变更都会写在这里，格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### 计划中

- 番茄钟结束的提示音与震动反馈
- 自定义专注时长（15 / 25 / 45 分钟）
- 每日目标设置与完成度提醒
- 数据导出与备份
- 深色主题
- 本地通知（计时结束提醒）

## [1.0.0] - 2026-10-10

首个正式版本 🎉

### 新增

- **今日首页**：今日番茄钟数、完成任务数、待办数一览，一键进入专注
- **番茄钟计时器**：25 分钟专注计时，支持暂停 / 继续 / 重置，基于 `react-native-svg` 的环形进度动画
- **每日计划**：任务的添加、完成与删除，待办 / 已完成分区展示
- **备忘录**：笔记的创建、编辑与删除
- **学习统计**：总番茄钟数、总专注时长、完成任务数、连续打卡天数与 7 天趋势图
- **数据持久化**：基于 AsyncStorage，所有变更自动保存，重启不丢失
- **后台计时修正**：通过 `AppState` 计算前后台切换的时间差，锁屏或切换应用后计时不漂移
- **统一设计系统**：颜色 / 间距 / 圆角 / 字体集中在 `src/constants/index.ts`
- **Tab 导航**：5 个主页面，Emoji 图标，无需额外字体依赖

### 说明

- 首个 Android 安装包由 EAS Build 的 `preview` profile 构建，包名 `com.pomodoro.app`
- 推荐使用 `npm install --legacy-peer-deps` 安装依赖（Expo SDK 57 的 peer 依赖尚未收敛）
- 因 SDK 57 下 Reanimated 3 存在兼容性问题，动画统一使用标准 `Animated` API 实现

[Unreleased]: https://github.com/youwmaoo-hub/pomodoro-app/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/youwmaoo-hub/pomodoro-app/releases/tag/v1.0.0
