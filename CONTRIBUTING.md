# 贡献指南

感谢你有兴趣为「番茄钟学习 App」做出贡献！本文档说明参与协作的流程与规范。

## 行为准则

请保持友善、尊重与耐心。我们欢迎任何经验水平的贡献者，不接受人身攻击、歧视性言论或骚扰行为。

## 我可以做什么？

- 🐛 报告 Bug（请使用 [Bug 反馈模板](.github/ISSUE_TEMPLATE/bug_report.yml)）
- 💡 提出新功能建议（请使用 [功能建议模板](.github/ISSUE_TEMPLATE/feature_request.yml)）
- 🌍 改进文档、修正错别字
- 🎨 优化交互与视觉细节
- ⚡ 提升性能、修复类型问题
- 🔧 提交代码修复或新功能

## 开发环境

```bash
git clone https://github.com/youwmaoo-hub/pomodoro-app.git
cd pomodoro-app
npm install --legacy-peer-deps
npx expo start
```

- Node.js 18+，推荐 20 / 22 LTS
- 真机调试使用 Expo Go 扫码；模拟器调试需要 Android Studio

新增依赖请使用 Expo 的安装命令，它会自动解析与当前 SDK 兼容的版本：

```bash
npx expo install <package>
```

## 目录约定

- 路由页面放在 `src/app/`，`_layout.tsx` 定义导航器
- 组件、Hooks、工具函数等非路由代码**不要**放在 `src/app/` 内
- 组件放 `src/components/`，自定义 Hooks 放 `src/hooks/`，纯函数放 `src/utils/`
- 颜色、间距、圆角、字体一律引用 `src/constants/index.ts` 中的设计系统，不要硬编码

## 提交前自查

```bash
npx tsc --noEmit   # 必须无错误
npx expo-doctor    # 依赖与配置体检
```

同时请确认以下场景在真机或模拟器上工作正常：

- [ ] 添加 / 完成 / 删除任务
- [ ] 开始番茄钟，暂停、继续、重置
- [ ] 切到后台等待一段时间再返回，计时是否准确
- [ ] 完成一个番茄钟后统计数字是否更新
- [ ] 备忘录的增删改
- [ ] 杀掉进程重新打开，数据是否保留

## 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/)：

```
feat: 新增自定义番茄钟时长
fix: 修复切后台后计时漂移
docs: 补充构建说明
refactor: 抽离计时逻辑
style: 调整统计页间距
chore: 升级 expo 到 57.0.27
```

## Pull Request 流程

1. Fork 本仓库并从 `main` 切出新分支：`git checkout -b feat/your-feature`
2. 保持改动聚焦，一个 PR 只解决一件事
3. 若修改了 UI，请在 PR 描述中附上改动前后的截图
4. 发起 PR，填写模板中的说明，等待 Review

## 代码风格

- 全部使用 TypeScript，新代码避免 `any`
- 函数组件 + Hooks，暂不引入额外的状态管理库
- 动画优先使用标准 `Animated` API（SDK 57 下 Reanimated 3 存在兼容性问题）
- 不做与当前改动无关的重构或格式化，避免 PR 难以审阅

## 许可证

提交贡献即表示你同意以本项目的 [MIT License](LICENSE) 授权你的代码。
