# Web Animation API 探索项目

一个交互式的 Web Animation API 学习项目，通过实时演示和动手控制来深入理解 Web Animation API 的核心概念和高级用法。

## 📋 项目概述

本项目提供了 6 个不同的动画演示场景，覆盖 HTML 和 SVG 元素的各种动画类型。用户可以实时交互控制动画的播放、暂停、反向、速度等，从而直观理解 Web Animation API 的强大功能。

### 演示场景

- **📸 图片裁剪动画** - HTML 元素 CSS 属性动画
- **🎨 SVG 矩形 → 圆形** - SVG 属性动画（rx/ry）
- **✨ SVG 路径描边** - SVG 描边动画（stroke-dashoffset）
- **⭕ SVG 圆形放大** - SVG 属性动画（r）
- **🔄 SVG CSS 属性** - SVG CSS 属性组合动画
- **🌀 SVG Transform 变形** - SVG 变形和位移动画

## 🎯 核心功能

### 🎮 实时动画控制

| 功能          | 说明                     |
| ------------- | ------------------------ |
| ▶️ Play       | 播放动画                 |
| ⏸️ Pause      | 暂停动画                 |
| ⏪ Reverse    | 反向播放                 |
| ❌ Cancel     | 取消动画并重置到初始状态 |
| ⏭️ Finish     | 立即跳到结束状态         |
| ⚡ 2x Speed   | 加速到 2 倍速            |
| 🐌 0.5x Speed | 减速到 0.5 倍速          |
| ⏩ Seek 50%   | 跳转到 50% 位置          |
| 🖱️ 拖动时间轴 | 拖动进度条到任意位置     |

### 📊 实时状态显示

```
▶️ 状态: running          ⏱️ 时间: 1234ms
📏 总长: 2000ms         ⚡ 速度: 1.0x
```

- 动画播放状态（idle/running/paused/finished）
- 当前时间和总时长（MM:SS 格式）
- 播放速度倍数
- 进度条可视化（带百分比显示）

### 🎨 交互式选择

- 点击任意演示区域切换动画
- Active 状态高亮指示当前选中的动画
- 切换时自动停止上一个动画
- 无缝的动画切换体验

## 🏗️ 项目结构

```
web_animation/
├── index.html          # HTML 结构和样式（左右分栏布局）
├── main.js            # 应用主逻辑和动画选择器
├── animate.js         # 动画创建函数库
├── ui.js              # 控制面板 UI 组件
└── README.md          # 项目文档
```

### 文件职责详解

#### `index.html`

- 页面结构定义
- 左右分栏布局（左侧动画演示 60%，右侧控制面板 40%）
- 6 个动画演示区域
- 响应式样式

#### `animate.js` - 动画创建核心

**导出函数：**

```javascript
// 创建动画函数
createRevealAnimation(target) // 图片裁剪动画
createSvgRectRoundAnimation(target) // SVG 矩形圆角动画
createSvgPathDrawAnimation(target) // SVG 路径描边动画
createSvgCircleRadiusAnimation(target) // SVG 圆形放大动画
createSvgCssAnimation(target) // SVG CSS 属性动画
createSvgTransformAnimation(target) // SVG Transform 动画

// 事件监听
setupAnimationListeners(animation) // 设置动画事件监听
```

#### `ui.js` - UI 组件库

**导出函数：**

```javascript
createControlPanel() // 创建控制面板
bindControlEventsWithGetter(getAnimation) // 绑定控制事件
bindControlEvents(animation) // 兼容 API
updateStatusDisplay(animation) // 更新状态显示
```

#### `main.js` - 应用入口

**核心逻辑：**

```javascript
switchAnimation(animationType) // 切换动画
getCurrentAnimation() // 获取当前动画
animationMap // 动画映射表配置
```

## 🚀 快速开始

### 环境要求

- 现代浏览器（Chrome 36+, Firefox 48+, Safari 13.1+）
- 支持 ES6 Module
- 支持 Web Animation API

### 运行项目

#### 使用 Python 3

```bash
python -m http.server 8000
# 访问 http://localhost:8000
```

#### 使用 Node.js

```bash
npx http-server
# 访问 http://localhost:8080
```

#### 使用 Live Server（VS Code 扩展）

直接在 VS Code 中打开 `index.html`，右键选择 "Open with Live Server"

## 🎨 演示场景详解

### 1️⃣ 图片裁剪动画

**HTML 元素动画示例**

```javascript
// 属性：clipPath（CSS 裁剪属性）
// 效果：图片从右到左逐渐显示（擦除效果）
// 持续时间：2000ms

keyframes: [
  { clipPath: 'inset(0 100% 0 0)' }, // 完全隐藏（右边100%）
  { clipPath: 'inset(0 0% 0 0)' }, // 完全显示
]
```

---

### 2️⃣ SVG 矩形 → 圆形

**SVG 原生属性动画示例**

```javascript
// 属性：rx, ry（SVG 矩形圆角半径）
// 效果：矩形逐渐变圆形
// 持续时间：2000ms
// 原理：计算最大半径 = Math.min(width, height) / 2

keyframes: [
  { rx: 0, ry: 0 }, // 直角矩形
  { rx: maxRadius, ry: maxRadius }, // 完全圆形
]
```

---

### 3️⃣ SVG 路径描边

**SVG 绘画效果示例**

```javascript
// 属性：stroke-dashoffset（虚线偏移）
// 效果：路径被"绘制"出来（笔迹效果）
// 持续时间：2000ms

keyframes: [
  { strokeDashoffset: pathLength }, // 完全隐藏
  { strokeDashoffset: 0 }, // 完全显示
]
```

**工作原理：**

1. `stroke-dasharray` 设置虚线段长度 = 整个路径长度
2. `stroke-dashoffset` 从路径长度动画到 0
3. 效果就像路径被逐渐"画"出来

---

### 4️⃣ SVG 圆形放大

**SVG 属性插值动画示例**

```javascript
// 属性：r（圆形半径）
// 效果：圆形从小变大
// 持续时间：2000ms

keyframes: [
  { r: 10 }, // 小圆
  { r: 80 }, // 大圆
]
```

---

### 5️⃣ SVG CSS 属性动画

**多属性组合动画示例**

```javascript
// 属性：fill, opacity, transform
// 效果：颜色变化 + 透明度变化 + 缩放
// 持续时间：2000ms

keyframes: [
  {
    fill: 'rgba(156, 39, 176, 1)',
    opacity: 0.5,
    transform: 'scale(0.5)',
  },
  {
    fill: 'rgba(33, 150, 243, 1)',
    opacity: 1,
    transform: 'scale(1)',
  },
]
```

---

### 6️⃣ SVG Transform 变形

**复杂变形动画示例**

```javascript
// 属性：transform（位移和旋转）
// 效果：位移和旋转组合
// 持续时间：3000ms

keyframes: [
  { transform: 'translate(0, 0) rotate(0deg)' },
  { transform: 'translate(50px, 50px) rotate(360deg)' },
]
```

## 🔑 Web Animation API 核心概念

### 基础架构

```javascript
// 1. KeyframeEffect - 定义"如何动画"
const effect = new KeyframeEffect(
  target, // 目标元素
  keyframes, // 关键帧数组
  options // 动画配置
)

// 2. Animation - 定义"什么时候动画"
const animation = new Animation(
  effect, // KeyframeEffect 实例
  document.timeline // 时间轴（通常是文档时间轴）
)
```

### 播放控制 API

```javascript
// 基础播放控制
animation.play() // 播放
animation.pause() // 暂停
animation.reverse() // 反向播放
animation.cancel() // 取消
animation.finish() // 立即完成

// 速度和时间控制
animation.playbackRate = 2 // 2 倍速
animation.playbackRate = 0.5 // 半速
animation.currentTime = 1000 // 跳到 1000ms

// 状态查询
animation.playState // 'idle'|'running'|'paused'|'finished'
animation.effect.getTiming() // 获取动画配置
```

### 动画配置选项

```javascript
const options = {
  duration: 2000, // 持续时间（毫秒）
  delay: 0, // 延迟开始（毫秒）
  easing: 'ease-in-out', // 缓动函数
  fill: 'forwards', // 填充模式：forwards|backwards|both|none
  iterations: 1, // 重复次数
  direction: 'normal', // 播放方向：normal|reverse|alternate
}
```

### 事件监听

```javascript
// 动画完成
animation.addEventListener('finish', () => {
  console.log('动画已完成')
})

// 动画被取消
animation.addEventListener('cancel', () => {
  console.log('动画已取消')
})
```

## 📊 与 CSS Animation/Transition 对比

| 功能         | CSS Animation | CSS Transition | Web Animation API |
| ------------ | ------------- | -------------- | ----------------- |
| 基础属性动画 | ✅            | ✅             | ✅                |
| 多步关键帧   | ✅            | ❌             | ✅                |
| 播放控制     | ⚠️ CSS        | ❌             | ✅ JavaScript     |
| 速度调整     | ❌            | ❌             | ✅                |
| 时间跳转     | ❌            | ❌             | ✅                |
| 反向播放     | ❌            | ❌             | ✅                |
| 精细事件控制 | ⚠️ 有限       | ⚠️ 有限        | ✅ 完整           |
| 运行时修改   | ❌            | ⚠️             | ✅                |
| 浏览器兼容性 | ✅ 极好       | ✅ 极好        | ⚠️ 现代浏览器     |

**结论**：Web Animation API 提供最灵活的控制，适合复杂和动态的动画场景。

## 🎓 学习路径

### 初级 - 理解基础

1. 查看 animate.js 中的 `createRevealAnimation()`
2. 理解 KeyframeEffect 和 Animation 的区别
3. 尝试改变 duration、easing、fill 参数
4. 使用控制面板体验 play/pause/reverse

### 中级 - 掌握 SVG 动画

1. 学习 SVG 属性的动画（rx/ry、r、stroke-dashoffset）
2. 理解 SVG Transform 和 CSS 属性的区别
3. 尝试创建自己的 SVG 动画
4. 实验多属性组合动画

### 高级 - 实战应用

1. 实现动画序列和回调
2. 将动画与应用逻辑集成
3. 实现响应式动画
4. 优化动画性能

## 💡 常见用法示例

### 示例 1：创建简单动画

```javascript
const target = document.getElementById('my-element')

const animation = new Animation(
  new KeyframeEffect(
    target,
    [
      { opacity: 0, transform: 'scale(0.5)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    {
      duration: 1000,
      easing: 'ease-out',
      fill: 'forwards',
    }
  ),
  document.timeline
)

animation.play()
```

### 示例 2：控制动画

```javascript
// 播放
animation.play()

// 2 秒后暂停
setTimeout(() => animation.pause(), 2000)

// 加速
animation.playbackRate = 2

// 反向播放
animation.reverse()

// 跳到中点
animation.currentTime = animation.effect.getTiming().duration / 2
```

### 示例 3：监听动画事件

```javascript
animation.addEventListener('finish', () => {
  console.log('动画完成，可以执行后续操作')
})

animation.addEventListener('cancel', () => {
  console.log('动画被取消')
})

animation.play()
```

## 🌐 浏览器兼容性

| 浏览器  | 支持度      | 最低版本 |
| ------- | ----------- | -------- |
| Chrome  | ✅ 完全支持 | 36+      |
| Firefox | ✅ 完全支持 | 48+      |
| Safari  | ✅ 完全支持 | 13.1+    |
| Edge    | ✅ 完全支持 | 79+      |
| IE 11   | ❌ 不支持   | -        |

**提示**：使用 [caniuse.com](https://caniuse.com/web-animation) 查看最新兼容性信息。

## 📚 参考资源

### 官方文档

- [MDN - Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [W3C - Web Animations Specification](https://www.w3.org/TR/web-animations-1/)

### 相关技术

- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [SVG 动画](https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL)

### 缓动函数

- [Easing Functions Cheat Sheet](https://easings.net/)
- [Cubic Bezier Curve Editor](https://cubic-bezier.com/)

## 🎯 项目特点

✅ **代码结构清晰** - 遵循单一职责原则
✅ **模块化设计** - 易于扩展和维护
✅ **实时交互** - 直观理解动画行为
✅ **完整文档** - 详细的代码注释和示例
✅ **最佳实践** - 展示 Web Animation API 的正确用法
✅ **现代 UI** - 左右分栏布局，美观易用

## 📝 代码规范

- 使用 ES6+ 语法
- 导出函数使用 JSDoc 注释
- 变量和函数名采用 camelCase
- 动画配置集中管理
- 事件处理使用箭头函数

## 🔄 工作流

```
用户点击演示区域
    ↓
切换动画 switchAnimation()
    ↓
取消上一个动画
    ↓
创建新动画实例
    ↓
自动播放 animation.play()
    ↓
用户操作控制面板
    ↓
修改动画状态（播放、暂停、反向等）
    ↓
每 100ms 更新状态显示
    ↓
实时显示进度、时间、速度等信息
```

## 🚀 扩展建议

### 功能扩展

- [ ] 添加更多动画类型（旋转、倾斜、模糊等）
- [ ] 实现动画序列（Animation Group）
- [ ] 添加自定义缓动函数
- [ ] 支持关键帧预设库

### UI 增强

- [ ] 动画录制和回放
- [ ] 动画代码生成器
- [ ] 关键帧编辑器
- [ ] 性能监控面板

### 教学资源

- [ ] 交互式教程
- [ ] 视频讲解
- [ ] 练习题和解答
- [ ] 最佳实践指南

## 📄 许可证

MIT License

## 👨‍💻 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发步骤

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📞 联系方式

- 提交 Issue 报告问题
- 提交 PR 贡献代码

---

**最后更新**：2026 年 1 月

**状态**：积极维护中 ✅
