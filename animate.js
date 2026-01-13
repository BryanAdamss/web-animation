// animate.js 最终方案
function getRevealAnimationConfig() {
  return {
    keyframes: [
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)' },
    ],
    options: {
      duration: 2000,
      fill: 'forwards',
    },
  }
}

export function createRevealAnimation(target) {
  const { keyframes, options } = getRevealAnimationConfig()
  const effect = new KeyframeEffect(target, keyframes, options)
  return new Animation(effect, document.timeline)
}

/**
 * 设置动画事件监听
 * @param {Animation} animation - 动画实例
 */
export function setupAnimationListeners(animation) {
  animation.addEventListener('finish', () => {
    console.log('✅ 动画完成')
  })

  animation.addEventListener('cancel', () => {
    console.log('🔄 动画被取消')
  })
}

/**
 * SVG 元素动画
 */

/**
 * SVG 矩形 rx/ry 属性动画（矩形→圆形）
 * @param {SVGRectElement} target - SVG 矩形元素
 * @returns {Animation}
 */
export function createSvgRectRoundAnimation(target) {
  const rect = target
  const maxRadius =
    Math.min(
      parseFloat(rect.getAttribute('width')),
      parseFloat(rect.getAttribute('height'))
    ) / 2

  const keyframes = [
    { rx: 0, ry: 0 }, // 矩形
    { rx: maxRadius, ry: maxRadius }, // 圆形
  ]

  const options = {
    duration: 2000,
    fill: 'forwards',
  }

  const effect = new KeyframeEffect(target, keyframes, options)
  return new Animation(effect, document.timeline)
}

/**
 * SVG 路径描边动画（SVG 绘画效果）
 * @param {SVGPathElement} target - SVG 路径元素
 * @returns {Animation}
 */
export function createSvgPathDrawAnimation(target) {
  const pathLength = target.getTotalLength()

  const keyframes = [
    { strokeDashoffset: pathLength }, // 完全隐藏
    { strokeDashoffset: 0 }, // 完全显示
  ]

  const options = {
    duration: 2000,
    fill: 'forwards',
  }

  const effect = new KeyframeEffect(target, keyframes, options)
  return new Animation(effect, document.timeline)
}

/**
 * SVG 圆形半径动画
 * @param {SVGCircleElement} target - SVG 圆形元素
 * @returns {Animation}
 */
export function createSvgCircleRadiusAnimation(target) {
  const keyframes = [
    { r: 10 }, // 小圆
    { r: 80 }, // 大圆
  ]

  const options = {
    duration: 2000,
    fill: 'forwards',
  }

  const effect = new KeyframeEffect(target, keyframes, options)
  return new Animation(effect, document.timeline)
}

/**
 * SVG 元素 CSS 属性动画（与 HTML 元素相同）
 * @param {SVGElement} target - SVG 元素
 * @returns {Animation}
 */
export function createSvgCssAnimation(target) {
  const keyframes = [
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

  const options = {
    duration: 2000,
    fill: 'forwards',
  }

  const effect = new KeyframeEffect(target, keyframes, options)
  return new Animation(effect, document.timeline)
}

/**
 * SVG 元素 transform 动画
 * @param {SVGElement} target - SVG 元素
 * @returns {Animation}
 */
export function createSvgTransformAnimation(target) {
  const keyframes = [
    {
      transform: 'translate(0, 0) rotate(0deg)',
    },
    {
      transform: 'translate(50px, 50px) rotate(360deg)',
    },
  ]

  const options = {
    duration: 3000,
    fill: 'forwards',
  }

  const effect = new KeyframeEffect(target, keyframes, options)
  return new Animation(effect, document.timeline)
}
