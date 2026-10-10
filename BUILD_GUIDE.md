# 构建 APK 安装包指南

## 最简单的方式：使用 Expo Go（立即测试）

1. 在 Android 手机安装 Expo Go：
   - Google Play: https://play.google.com/store/apps/details?id=host.exp.exponent
   - 或搜索"Expo Go"

2. 在电脑上启动开发服务器：
```bash
cd pomodoro-app
npx expo start
```

3. 在手机上打开 Expo Go，扫描终端显示的二维码

**优点**：无需构建，立即运行，所有功能完整可用
**缺点**：顶部有 Expo Go 标题栏

---

## 构建独立 APK（需要 Expo 账号）

### 步骤 1：注册 Expo 账号
访问 https://expo.dev/signup 注册一个免费账号

### 步骤 2：登录
```bash
eas login
```
输入你的 Expo 邮箱和密码

### 步骤 3：配置项目
```bash
cd pomodoro-app
eas build:configure
```
选择"Yes"自动生成配置

### 步骤 4：开始构建
```bash
eas build --platform android --profile preview
```

这会在云端构建，大约需要 10-20 分钟。
构建完成后，你会得到一个下载链接，下载 APK 即可安装。

### 步骤 5：安装 APK
将下载的 APK 文件传到手机，点击安装即可。

---

## 本地构建（需要 Android Studio）

如果你已经安装了 Android Studio 和 Android SDK：

```bash
cd pomodoro-app
npx expo run:android
```

这会：
1. 在本地编译 native Android 代码
2. 生成 debug APK
3. 自动安装到连接的设备或模拟器

APK 位置：
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**注意**：第一次构建需要 5-10 分钟，并且需要下载大量 Android 依赖。

---

## 推荐流程

**立即体验** → 使用 Expo Go（5分钟）  
**正式使用** → EAS Build 云端构建（20分钟）  
**开发调试** → 本地构建（需要完整环境）

---

## 常见问题

**Q: Expo Go 和独立 APK 有什么区别？**
A: 
- Expo Go：在 Expo Go 容器中运行，顶部有标题栏，但功能完全相同
- 独立 APK：完全独立的应用，有自己的图标，可以上架应用商店

**Q: EAS Build 免费吗？**
A: 是的，Expo 提供免费的构建额度，足够个人开发使用

**Q: 能否不注册账号直接构建？**
A: 云端构建必须有账号。本地构建不需要账号，但需要安装 Android Studio（约 3GB）

**Q: 构建失败怎么办？**
A: 运行 `npx expo-doctor` 检查项目配置，确保所有依赖都已正确安装
