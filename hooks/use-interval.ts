import { ref, onUnmounted } from 'vue'
import { UseIntervalReturn } from '@/types/index'

/**
 * 自定义 Vue 3 Hook，用于管理 `setInterval`
 *
 * @param {() => void} callback - 需要在每个间隔执行的回调函数
 * @param {Number} delay - 时间间隔（毫秒）
 * @returns {UseIntervalReturn} 包含 `start`、`stop` 方法和 `isActive` 状态的对象
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
   * 启动定时器（如果未运行）
   */
  const start = () : void => {
    if (intervalId.value === null) {
      intervalId.value = setInterval(callback, delay) as unknown as number
      isActive.value = true
    }
  }

  /**
   * 停止定时器（如果正在运行）
   */
  const stop = () : void => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
      isActive.value = false
    }
  }

  /**
   * 组件卸载时自动清除定时器
   */
  onUnmounted(stop)

  return { start, stop, isActive }
}
