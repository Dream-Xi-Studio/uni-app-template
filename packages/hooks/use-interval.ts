import { ref, onUnmounted } from 'vue'
import type { IntervalCallback, IntervalControls, IntervalOptions } from '@/packages/types'

/**
 * 一个用于管理 setInterval 定时器的 Vue 3 组合式 API Hook。
 * 回调函数会接收定时器 ID 作为参数。
 * 组件卸载时会自动清除定时器。
 *
 * @param callback - 每次定时器触发时执行的回调函数，接收定时器 ID。
 * @param options - 定时器的配置选项。
 * @returns 包含定时器 ID（ref 对象）、启动和清除方法的对象。
 *
 * @example
 * ```typescript
 * import { defineComponent } from 'vue'
 * import { useInterval } from './useTimer'
 *
 * export default defineComponent({
 *   setup() {
 *     const { intervalId, start, clear } = useInterval(
 *       (id) => {
 *         console.log('定时器触发，ID:', id)
 *       },
 *       { delay: 2000, immediate: true }
 *     )
 *
 *     start() // 启动定时器
 *     console.log('定时器 ID:', intervalId.value) // 访问定时器 ID
 *
 *     // clear() // 可选择清除定时器
 *   }
 * })
 * ```
 */
export function useInterval(callback : IntervalCallback, options : IntervalOptions = {}
) : IntervalControls {
  const { delay = 1000, immediate = false } = options
  const intervalId = ref<number | null>(null)

  const start = () => {
    clear()
    if (immediate) {
      callback(intervalId.value)
    }
    intervalId.value = setInterval(() => {
      callback(intervalId.value)
    }, delay)
  }

  const clear = () => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
  }

  onUnmounted(clear)

  return {
    intervalId,
    start,
    clear
  }
}
