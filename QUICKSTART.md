# 快速开始指南

## 第一次运行

### 1. 确认开发环境
```bash
node --version  # 应该显示 v18 或更高
npm --version
```

### 2. 安装项目依赖
```bash
cd pomodoro-app
npm install --legacy-peer-deps
```

> **注意**：必须使用 `--legacy-peer-deps` 标志，因为某些依赖版本存在 peer dependency 冲突

### 3. 启动开发服务器
```bash
npx expo start
```

你会看到：
```
Starting project at C:\Users\...\pomodoro-app
Using src/app as the root directory for Expo Router.
Starting Metro Bundler
Waiting on http://localhost:8081
```

### 4. 在手机上测试

**最简单的方式 - 使用 Expo Go**：

1. 在 Android 手机上安装 Expo Go app（Google Play 或华为应用市场）
2. 确保手机和电脑在同一 WiFi 网络
3. 打开 Expo Go，扫描终端显示的二维码
4. 应用将在手机上加载运行

**更完整的方式 - 构建开发版本**：

```bash
npx expo run:android
```

这需要：
- 已安装 Android Studio
- 已连接 Android 设备（开启 USB 调试）或启动了 Android 模拟器
- 第一次构建需要 5-10 分钟

## 构建可安装的 APK

如果你想生成一个可以分享给朋友的 APK 文件：

```bash
# 1. 安装 EAS CLI
npm install -g eas-cli

# 2. 注册/登录 Expo 账号（免费）
eas login

# 3. 初始化 EAS 配置
eas build:configure

# 4. 开始构建
eas build --platform android --profile preview
```

构建在云端进行，大约需要 10-20 分钟。完成后：
- 你会收到一个下载链接
- 下载 APK 文件
- 直接安装到 Android 手机即可

## 常见问题

### Q: Metro bundler 启动后没有反应？
A: 等待 1-2 分钟，第一次启动需要编译所有文件。如果长时间无响应，按 `Ctrl+C` 停止，然后运行：
```bash
npx expo start --clear
```

### Q: 手机扫码后显示 "无法连接到开发服务器"？
A: 
1. 确认手机和电脑在同一 WiFi 网络
2. 检查防火墙是否阻止了 8081 端口
3. 尝试使用 tunnel 模式：`npx expo start --tunnel`

### Q: 安装依赖时出错？
A: 确保使用了 `--legacy-peer-deps` 标志：
```bash
npm install --legacy-peer-deps
```

### Q: TypeScript 报错？
A: 运行类型检查：
```bash
npx tsc --noEmit
```
项目已配置为宽松的 TypeScript 模式，不应该有错误。

### Q: 如何停止开发服务器？
A: 在终端按 `Ctrl+C`，或运行：
```bash
# Windows
Stop-Process -Name "node" -Force

# Mac/Linux
pkill node
```

## 开发技巧

### 热重载
修改代码后，应用会自动刷新。如果没有自动刷新：
- 在 Expo Go 中摇晃手机，选择 "Reload"
- 或在终端按 `r` 重新加载

### 调试
按 `m` 打开开发菜单，可以：
- 查看 Element Inspector
- 打开 Performance Monitor
- 查看 Debug JS Remotely（Chrome DevTools）

### 查看日志
```bash
# 查看所有日志
npx expo start

# 仅查看错误
npx expo start --dev-client
```

## 下一步

应用已经可以正常运行！你可以：
1. 尝试所有功能（添加任务、启动番茄钟、记笔记等）
2. 查看 `README.md` 了解项目结构
3. 修改 `src/constants/index.ts` 自定义颜色和样式
4. 查看各个页面的源代码学习实现细节

祝你使用愉快！🍅
