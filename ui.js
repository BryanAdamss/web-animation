/**
 * 创建控制面板
 * @returns {HTMLElement} 控制面板容器
 */
export function createControlPanel() {
  const container = document.createElement('div')
  container.style.cssText = `
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
    background: transparent;
    color: white;
    font-family: monospace;
    overflow-y: auto;
  `

  container.innerHTML = `
    <h3 style="margin-top:0; margin-bottom: 15px;">🎬 Web Animation 控制台</h3>
    
    <!-- 时间轴 -->
    <div style="margin-bottom: 15px;">
      <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 5px;">
        <span id="current-time">00:00</span>
        <span id="total-duration">00:00</span>
      </div>
      <div id="timeline-container" style="
        width: 100%;
        height: 30px;
        background: rgba(255,255,255,0.1);
        border-radius: 5px;
        position: relative;
        cursor: pointer;
        overflow: hidden;
      ">
        <div id="progress-bar" style="
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, #4CAF50, #45a049);
          border-radius: 5px;
          transition: width 0.05s linear;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 5px;
        ">
          <span id="time-indicator" style="font-size: 10px; font-weight: bold;">0%</span>
        </div>
      </div>
    </div>
    
    <!-- 状态信息 -->
    <div id="status" style="
      margin-bottom: 15px;
      padding: 10px;
      background: rgba(255,255,255,0.1);
      border-radius: 5px;
      font-size: 12px;
      line-height: 1.6;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 15px;
    ">
      <div><strong>▶️ 状态:</strong> <span id="status-playstate">idle</span></div>
      <div><strong>⏱️ 时间:</strong> <span id="status-currenttime">0</span>ms</div>
      <div><strong>📏 总长:</strong> <span id="status-duration">0</span>ms</div>
      <div><strong>⚡ 速度:</strong> <span id="status-playbackrate">1</span>x</div>
    </div>
    
    <!-- 控制按钮 -->
    <div style="margin-bottom: 15px; display: flex; gap: 5px; flex-wrap: wrap;">
      <button id="btn-play">▶️ Play</button>
      <button id="btn-pause">⏸️ Pause</button>
      <button id="btn-reverse">⏪ Reverse</button>
      <button id="btn-cancel">❌ Cancel</button>
      <button id="btn-finish">⏭️ Finish</button>
      <button id="btn-seek-50">⏩ Seek 50%</button>
      <button id="btn-speed-up">⚡ 2x Speed</button>
      <button id="btn-speed-down">🐌 0.5x Speed</button>
    </div>
  `

  // 为所有按钮添加样式
  const buttons = container.querySelectorAll('button')
  buttons.forEach(btn => {
    btn.style.cssText = `
      padding: 8px 12px;
      background: #4CAF50;
      border: none;
      border-radius: 5px;
      color: white;
      cursor: pointer;
      font-size: 12px;
      flex: 0 1 auto;
    `
  })

  return container
}

/**
 * 绑定控制按钮事件（支持动态切换动画）
 * @param {Function} getAnimation - 获取当前动画的函数
 */
export function bindControlEventsWithGetter(getAnimation) {
  // 绑定时间轴事件
  const timelineContainer = document.getElementById('timeline-container')

  if (timelineContainer) {
    timelineContainer.addEventListener('click', event => {
      const animation = getAnimation()
      if (!animation) return

      const rect = timelineContainer.getBoundingClientRect()
      const clickX = event.clientX - rect.left
      const percentage = clickX / rect.width

      const duration = animation.effect.getTiming().duration
      const newTime = duration * percentage

      animation.currentTime = newTime

      console.log(
        `⏱️ Seek to ${(percentage * 100).toFixed(1)}% (${newTime.toFixed(0)}ms)`
      )
    })
  }

  // 1. play() - 播放动画
  document.getElementById('btn-play')?.addEventListener('click', () => {
    const animation = getAnimation()
    if (animation) {
      animation.play()
      console.log('▶️ 播放动画')
    }
  })

  // 2. pause() - 暂停动画
  document.getElementById('btn-pause')?.addEventListener('click', () => {
    const animation = getAnimation()
    if (animation) {
      animation.pause()
      console.log('⏸️ 暂停动画')
    }
  })

  // 3. reverse() - 反向播放
  document.getElementById('btn-reverse')?.addEventListener('click', () => {
    const animation = getAnimation()
    if (animation) {
      animation.reverse()
      console.log('⏪ 反向播放')
    }
  })

  // 4. cancel() - 取消动画，重置到初始状态
  document.getElementById('btn-cancel')?.addEventListener('click', () => {
    const animation = getAnimation()
    if (animation) {
      animation.cancel()
      console.log('❌ 取消动画')
    }
  })

  // 5. finish() - 立即跳到结束状态
  document.getElementById('btn-finish')?.addEventListener('click', () => {
    const animation = getAnimation()
    if (animation) {
      animation.finish()
      console.log('⏭️ 跳到结束')
    }
  })

  // 6. playbackRate - 控制播放速度
  document.getElementById('btn-speed-up')?.addEventListener('click', () => {
    const animation = getAnimation()
    if (animation) {
      animation.playbackRate *= 2
      console.log(`⚡ 加速到 ${animation.playbackRate}x`)
    }
  })

  document.getElementById('btn-speed-down')?.addEventListener('click', () => {
    const animation = getAnimation()
    if (animation) {
      animation.playbackRate *= 0.5
      console.log(`🐌 减速到 ${animation.playbackRate}x`)
    }
  })

  // 7. currentTime - 直接设置动画进度
  document.getElementById('btn-seek-50')?.addEventListener('click', () => {
    const animation = getAnimation()
    if (animation) {
      animation.currentTime = animation.effect.getTiming().duration / 2
      console.log('⏩ 跳到50%进度')
    }
  })
}

/**
 * 绑定控制按钮事件（兼容旧 API）
 * @param {Animation} animation - 动画实例
 */
export function bindControlEvents(animation) {
  bindControlEventsWithGetter(() => animation)
}

/**
 * 格式化时间（毫秒转 mm:ss）
 * @param {number} ms - 毫秒数
 * @returns {string} 格式化后的时间
 */
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`
}

/**
 * 更新状态显示和进度条
 * @param {Animation} animation - 动画实例
 */
export function updateStatusDisplay(animation) {
  const timing = animation.effect.getTiming()
  const duration = timing.duration
  const currentTime = animation.currentTime || 0
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  // 更新时间轴
  const progressBar = document.getElementById('progress-bar')
  const timeIndicator = document.getElementById('time-indicator')
  const currentTimeDisplay = document.getElementById('current-time')
  const totalDurationDisplay = document.getElementById('total-duration')

  if (progressBar) {
    progressBar.style.width = `${Math.min(progress, 100)}%`
  }

  if (timeIndicator) {
    timeIndicator.textContent = `${progress.toFixed(0)}%`
  }

  if (currentTimeDisplay) {
    currentTimeDisplay.textContent = formatTime(currentTime)
  }

  if (totalDurationDisplay) {
    totalDurationDisplay.textContent = formatTime(duration)
  }

  // 更新状态信息
  const statusPlaystate = document.getElementById('status-playstate')
  const statusCurrenttime = document.getElementById('status-currenttime')
  const statusDuration = document.getElementById('status-duration')
  const statusPlaybackrate = document.getElementById('status-playbackrate')

  if (statusPlaystate) {
    statusPlaystate.textContent = animation.playState || 'idle'
  }

  if (statusCurrenttime) {
    statusCurrenttime.textContent = currentTime.toFixed(0)
  }

  if (statusDuration) {
    statusDuration.textContent = duration.toFixed(0)
  }

  if (statusPlaybackrate) {
    statusPlaybackrate.textContent = animation.playbackRate.toFixed(1)
  }
}
