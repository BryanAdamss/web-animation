import { createRevealAnimation, setupAnimationListeners } from './animate.js'
import {
  createControlPanel,
  bindControlEventsWithGetter,
  updateStatusDisplay,
} from './ui.js'
import {
  createSvgRectRoundAnimation,
  createSvgPathDrawAnimation,
  createSvgCircleRadiusAnimation,
  createSvgCssAnimation,
  createSvgTransformAnimation,
} from './animate.js'

// 动画映射表
const animationMap = {
  reveal: {
    create: target => createRevealAnimation(target),
    target: () => document.getElementById('erasable-image'),
  },
  'svg-rect': {
    create: target => createSvgRectRoundAnimation(target),
    target: () => document.getElementById('svg-rect'),
  },
  'svg-path': {
    create: target => createSvgPathDrawAnimation(target),
    target: () => document.getElementById('svg-path'),
  },
  'svg-circle': {
    create: target => createSvgCircleRadiusAnimation(target),
    target: () => document.getElementById('svg-circle'),
  },
  'svg-css': {
    create: target => createSvgCssAnimation(target),
    target: () => document.getElementById('svg-css-rect'),
  },
  'svg-transform': {
    create: target => createSvgTransformAnimation(target),
    target: () => document.getElementById('svg-transform-rect'),
  },
}

let currentAnimation = null
let currentAnimationType = 'reveal'

/**
 * 切换到指定的动画
 * @param {string} animationType - 动画类型
 */
function switchAnimation(animationType) {
  // 停止当前动画
  if (currentAnimation) {
    currentAnimation.cancel()
  }

  // 取消所有 demo-section 的 active 状态
  document.querySelectorAll('.demo-section').forEach(section => {
    section.classList.remove('active')
  })

  // 获取动画配置
  const config = animationMap[animationType]
  if (!config) {
    console.error(`❌ 未知的动画类型: ${animationType}`)
    return
  }

  // 获取目标元素
  const target = config.target()
  if (!target) {
    console.error(`❌ 找不到动画目标元素: ${animationType}`)
    return
  }

  // 创建新动画
  currentAnimation = config.create(target)
  currentAnimationType = animationType

  // 设置事件监听
  setupAnimationListeners(currentAnimation)

  // 标记选中的 demo-section
  document
    .querySelector(`[data-animation="${animationType}"]`)
    .classList.add('active')

  // 自动播放
  currentAnimation.play()

  console.log(`🎬 已切换到动画: ${animationType}`)
}

/**
 * 获取当前动画
 */
function getCurrentAnimation() {
  return currentAnimation
}

function main() {
  // 创建并添加控制面板到右侧面板
  const controlPanel = createControlPanel()
  const controlPanelContainer = document.getElementById(
    'control-panel-container'
  )
  controlPanelContainer.appendChild(controlPanel)

  // 初始化所有 demo-section 的点击事件
  document.querySelectorAll('.demo-section').forEach(section => {
    section.addEventListener('click', () => {
      const animationType = section.getAttribute('data-animation')
      switchAnimation(animationType)
    })
  })

  // 绑定控制事件
  bindControlEventsWithGetter(() => getCurrentAnimation())

  // 实时更新状态显示
  setInterval(() => {
    const anim = getCurrentAnimation()
    if (anim) {
      updateStatusDisplay(anim)
    }
  }, 100)

  // 默认启动第一个动画
  switchAnimation('reveal')

  console.log('🎬 Web Animation 探索项目已启动')
}

// 页面加载完成后启动
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main)
} else {
  main()
}
