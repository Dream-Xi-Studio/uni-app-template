import { ref, onUnmounted } from 'vue'
import type { UseIntervalReturn } from '@/packages/types'

/**
 * 自定义 Vue 3 Hook，用于管理 setInterval 定时器
 *
 * @param callback - 需要在每个时间间隔执行的回调函数
 * @param delay - 间隔时间（单位：毫秒）
 *
 * @returns 返回包含控制方法和状态的对象 { start, stop, isActive }
 *
 * @example
 * // 基本用法
 * const { start, stop, isActive } = useInterval(() => {
 *   console.log('每秒执行一次')
 * }, 1000)
 *
 * // 启动定时器
 * start()
 *
 * // 停止定时器
 * stop()
 *
 * // 检查定时器状态
 * console.log(isActive.value) // true/false
 */
export function useInterval(callback : () => void, delay : number) : UseIntervalReturn {
  /**
   * 定时器的 ID
   */
  const intervalId = ref<number | null>(null)
  /**
   * 定时器的状态
   */
  const isActive = ref<boolean>(false)

  /**
   * 启动定时器
   * - 如果定时器未运行则创建新定时器
   * - 自动更新isActive状态
   */
  const start = () : void => {
    if (intervalId.value === null) {
      intervalId.value = setInterval(callback, delay) as unknown as number
      isActive.value = true
    }
  }

  /**
   * 停止定时器
   * - 如果定时器正在运行则清除定时器
   * - 自动更新isActive状态
   * - 自动清理定时器ID引用
   */
  const stop = () : void => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
      isActive.value = false
    }
  }

  // 组件卸载时自动停止定时器
  onUnmounted(() => {
    stop()
  })

  return { start, stop, isActive }
}
