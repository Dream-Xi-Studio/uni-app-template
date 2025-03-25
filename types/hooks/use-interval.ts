import type { Ref } from 'vue'

/**
 * 定时器 Hook 返回值类型。
 * 用于管理基于 `setInterval` 的定时器。
 */
export interface UseIntervalReturn {
  /**
   * 启动定时器
   */
  start : () => void

  /**
   * 停止定时器
   */
  stop : () => void

  /**
   * 是否处于激活状态
   */
  isActive : Ref<boolean>
}
