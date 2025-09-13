<template>
  <div class="dynamic-island-container">
    <div
      class="dynamic-island"
      :class="{
        'is-visible': isVisible,
        'is-expanded': isExpanded,
      }"
      :style="islandStyle"
      @click="handleClick"
    >
      <!-- 收缩状态 -->
      <div class="island-collapsed">
        <div class="island-dot"></div>
      </div>

      <!-- 拓展状态 -->
      <div class="island-expanded">
        <div class="island-icon">
          <svg
            v-if="currentNotification?.type === NotificationType.SUCCESS"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <svg
            v-else-if="currentNotification?.type === NotificationType.ERROR"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <svg
            v-else-if="currentNotification?.type === NotificationType.WARNING"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg
            v-else-if="currentNotification?.type === NotificationType.INFO"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4m0-4h.01" />
          </svg>
          <svg
            v-else
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="island-content">
          <div class="island-title">{{ currentNotification?.title }}</div>
          <div class="island-message">{{ currentNotification?.message }}</div>
        </div>
        <div class="island-close">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'

declare global {
  interface Window {
    $dynamicIsland?: {
      success: (message?: string, title?: string) => void
      error: (message?: string, title?: string) => void
      warning: (message?: string, title?: string) => void
      info: (message?: string, title?: string) => void
      show: (type: NotificationType, message?: string, title?: string) => void
      hide: () => void
    }
  }
}

// 通知类型枚举
export enum NotificationType {
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

// 通知配置接口
export interface NotificationConfig {
  title: string
  message: string
  duration: number
  color: string
}

// 通知项接口
export interface NotificationItem {
  id: number
  type: NotificationType
  title: string
  message: string
  duration: number
  timestamp: number
}

// 组件Props接口
export interface DynamicIslandProps {
  // 可选的位置配置
  position?: 'top' | 'bottom'
  // 可选的偏移量
  offset?: number
}

// 组件Emits接口
export interface DynamicIslandEmits {
  (e: 'show', notification: NotificationItem): void
  (e: 'hide', notification: NotificationItem): void
  (e: 'click', notification: NotificationItem): void
}

export default defineComponent({
  name: 'DynamicIsland',

  props: {
    position: {
      type: String as () => 'top' | 'bottom',
      default: 'top',
    },
    offset: {
      type: Number,
      default: 70,
    },
  },

  emits: ['show', 'hide', 'click'],

  setup(props: DynamicIslandProps, { emit }: { emit: DynamicIslandEmits }) {
    // 响应式状态
    const isVisible = ref<boolean>(false) // 是否可见
    const isExpanded = ref<boolean>(false) // 是否展开
    const currentNotification = ref<NotificationItem | null>(null)
    const notifications = ref<NotificationItem[]>([])

    // 定时器引用
    let expandTimer: number | null = null
    let collapseTimer: number | null = null
    let autoHideTimer: number | null = null

    // 通知配置映射
    const notificationConfigMap: Record<NotificationType, NotificationConfig> = {
      [NotificationType.DEFAULT]: {
        title: '通知',
        message: '您有一条新消息',
        duration: 3000,
        color: 'rgba(255, 255, 255, 0.9)',
      },
      [NotificationType.SUCCESS]: {
        title: '成功',
        message: '操作成功完成！',
        duration: 2500,
        color: 'rgba(52, 211, 153, 0.9)',
      },
      [NotificationType.ERROR]: {
        title: '错误',
        message: '操作失败，请重试',
        duration: 4000,
        color: 'rgba(239, 68, 68, 0.9)',
      },
      [NotificationType.WARNING]: {
        title: '警告',
        message: '请注意检查您的输入',
        duration: 3500,
        color: 'rgba(251, 191, 36, 0.9)',
      },
      [NotificationType.INFO]: {
        title: '信息',
        message: '您有新的消息',
        duration: 3000,
        color: 'rgba(59, 130, 246, 0.9)',
      },
    }

    // 计算属性：灵动岛样式
    const islandStyle = computed(() => {
      if (!currentNotification.value) return {}
      const config = notificationConfigMap[currentNotification.value.type]
      return {
        '--accent-color': config.color,
        '--position-offset': `${props.offset}px`,
      }
    })

    // 清除所有定时器
    const clearAllTimers = (): void => {
      if (expandTimer) clearTimeout(expandTimer)
      if (collapseTimer) clearTimeout(collapseTimer)
      if (autoHideTimer) clearTimeout(autoHideTimer)
      expandTimer = null
      collapseTimer = null
      autoHideTimer = null
    }

    // 显示灵动岛
    const showIsland = (): void => {
      clearAllTimers()

      isVisible.value = true

      // 延迟拓展动画
      expandTimer = window.setTimeout(() => {
        isExpanded.value = true

        // 设置自动隐藏
        autoHideTimer = window.setTimeout(() => {
          hideIsland()
        }, currentNotification.value?.duration || 3000)
      }, 200)
    }

    // 隐藏灵动岛
    const hideIsland = (): void => {
      if (!isVisible.value || !currentNotification.value) return

      // 收缩动画
      isExpanded.value = false

      // 延迟隐藏
      collapseTimer = window.setTimeout(() => {
        isVisible.value = false

        // 触发隐藏事件
        if (currentNotification.value) {
          emit('hide', currentNotification.value)
        }

        currentNotification.value = null

        // 检查队列中是否有下一个通知
        if (notifications.value.length > 0) {
          const nextNotification = notifications.value.shift()
          if (nextNotification) {
            currentNotification.value = nextNotification
            // 延迟显示下一个通知
            window.setTimeout(() => {
              showIsland()
            }, 500)
          }
        }
      }, 300)
    }

    // 显示通知
    const showNotification = (
      type: NotificationType,
      customMessage?: string,
      customTitle?: string,
    ): void => {
      const config = notificationConfigMap[type]
      const notification: NotificationItem = {
        id: Date.now(),
        type,
        title: customTitle || config.title,
        message: customMessage || config.message,
        duration: config.duration,
        timestamp: Date.now(),
      }

      // 如果当前有通知在显示，加入队列
      if (isVisible.value) {
        notifications.value.push(notification)
        return
      }

      currentNotification.value = notification

      // 触发显示事件
      emit('show', notification)

      showIsland()
    }

    // 处理点击事件
    const handleClick = (): void => {
      if (isVisible.value && currentNotification.value) {
        emit('click', currentNotification.value)
        hideIsland()
      }
    }

    // 便捷方法
    const success = (message?: string, title?: string): void => {
      showNotification(NotificationType.SUCCESS, message, title)
    }

    const error = (message?: string, title?: string): void => {
      showNotification(NotificationType.ERROR, message, title)
    }

    const warning = (message?: string, title?: string): void => {
      showNotification(NotificationType.WARNING, message, title)
    }

    const info = (message?: string, title?: string): void => {
      showNotification(NotificationType.INFO, message, title)
    }

    const hide = (): void => {
      hideIsland()
    }

    // 全局暴露方法
    onMounted(() => {
      window.$dynamicIsland = {
        show: showNotification,
        success,
        error,
        warning,
        info,
        hide,
      }
    })

    onUnmounted(() => {
      clearAllTimers()

      window.$dynamicIsland = undefined
    })

    return {
      isVisible,
      isExpanded,
      currentNotification,
      islandStyle,
      NotificationType,
      handleClick,
      // 暴露方法供外部使用
      showNotification,
      success,
      error,
      warning,
      info,
      hide,
    }
  },
})
</script>

<style scoped>
/* 灵动岛容器 */
.dynamic-island-container {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  pointer-events: none;

  /* 根据props设置位置 */
  top: var(--position-offset, 70px);

  &.position-bottom {
    top: auto;
    bottom: var(--position-offset, 70px);
  }
}

/* 灵动岛主体 */
.dynamic-island {
  position: relative;
  width: 120px;
  height: 35px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow:
    0 8px 32px 0 rgba(0, 0, 0, 0.4),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15),
    inset 0 0 0 2px rgba(255, 255, 255, 0.05);
  cursor: pointer;
  pointer-events: auto;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
  opacity: 0;
  transform: scale(0.8) translateY(-20px);

  /* 可见状态 */
  &.is-visible {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  /*拓展状态 */
  &.is-expanded {
    width: 320px;
    height: 80px;
    border-radius: 20px;
    background-image: linear-gradient(
      to bottom right,
      rgb(0, 0, 0, 0.4) 0%,
      rgb(0, 0, 0, 0.1) 100%
    );

    .island-collapsed {
      opacity: 0;
      transform: scale(0);
    }

    .island-expanded {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* 悬停效果 */
  &:hover {
    box-shadow:
      0 12px 40px 0 rgba(0, 0, 0, 0.5),
      inset 0 0 0 1px rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    backdrop-filter: blur(28px) saturate(130%);
    -webkit-backdrop-filter: blur(28px) saturate(130%);
  }

  /* 点击效果 */
  &:active {
    transform: translateY(0);
    box-shadow:
      0 4px 16px 0 rgba(0, 0, 0, 0.4),
      inset 0 0 0 1px rgba(255, 255, 255, 0.2),
      inset 0 0 0 2px rgba(255, 255, 255, 0.05);
  }

  /* 液态玻璃效果 - 内层渐变 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.07) 25%,
      rgba(255, 255, 255, 0.03) 50%,
      rgba(255, 255, 255, 0.07) 75%,
      rgba(255, 255, 255, 0.15) 100%
    );
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
  }

  /* 液态玻璃效果 - 外层高光 */
  &::after {
    content: '';
    position: absolute;
    top: -51px;
    left: -51px;
    right: -51px;
    bottom: -51px;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.1) 30%,
      rgba(255, 255, 255, 0.05) 60%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: calc(20px - 1px);
    pointer-events: none;
    z-index: 0;
    animation: shimmer 4s infinite;
  }
}

/* 收缩状态 */
.island-collapsed {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.island-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-color, rgba(255, 255, 255, 0.9));
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent-color, rgba(255, 255, 255, 0.5));
  animation: pulse 2s infinite;
}

/* 拓展状态 */
.island-expanded {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.island-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color, rgba(255, 255, 255, 0.9));
  margin-right: 15px;
}

.island-content {
  flex: 1;
  text-align: left;
}

.island-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.island-message {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.3;
}

.island-close {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  margin-left: 10px;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
}

/* 脉冲动画 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

/* 高光闪烁动画 */
@keyframes shimmer {
  0% {
    opacity: 0.5;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.7;
    transform: rotate(5deg);
  }
  100% {
    opacity: 0.5;
    transform: rotate(0deg);
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .dynamic-island.is-expanded {
    width: calc(100vw - 40px);
    max-width: 320px;
  }
}
</style>
