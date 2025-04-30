import type { Ref } from 'vue'

/**
 * 定时器回调函数类型，接收定时器 ID 作为参数。
 */
export type IntervalCallback = (id : number | null) => void

/**
 * 配置定时器行为的选项。
 */
export interface IntervalOptions {
  /** 每次定时器执行的间隔时间（毫秒）。默认为 1000 毫秒。 */
  delay ?: number
  /** 是否在启动时立即执行回调函数。默认为 false。 */
  immediate ?: boolean
}

/**
 * useInterval Hook 的返回值类型。
 */
export interface IntervalControls {
  /** 当前定时器 ID 的响应式引用，未激活时为 null。 */
  intervalId : Ref<number | null>
  /** 启动定时器，可选择立即执行回调。 */
  start : () => void
  /** 清除定时器并将定时器 ID 重置为 null。 */
  clear : () => void
}
