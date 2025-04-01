import { Back } from './back'
import { Push } from './push'
import { Relaunch } from './relaunch'
import { Replace } from './replace'
import type { RouterOptions } from '@/packages/types'

/**
 * 统一路由方法
 *
 * @param router 路由配置
 *
 * @example
 * // 字符串形式跳转
 * Router('/pages/home')
 *
 * // 对象形式跳转 - 切换tab页
 * Router({ tab: 1, url: '/pages/home' })
 *
 * // 对象形式跳转 - 普通跳转
 * Router({ tab: 2, url: '/pages/detail' })
 *
 * // 对象形式跳转 - 返回
 * Router({ tab: 3, url: '1' }) // 返回1页
 *
 * // 函数形式执行
 * Router(() => {
 *   console.log('执行自定义路由逻辑')
 *   // 可以在这里添加自定义跳转逻辑
 * })
 */
export function Router(router : RouterOptions) : void | Promise<any> {
  if (!router) return

  if (typeof router === 'object') {
    const { tab = 2, url = '' } = router
    if (!url) return

    switch (tab) {
      case 1: return uni.switchTab({ url })
      case 2: return Push(url)
      case 3: return Back(url)
      case 4: return Relaunch(url)
      case 5: return Replace(url)
      default: return Push(url)
    }
  } else if (typeof router === 'function') {
    try {
      return router()
    } catch (e) {
      console.error('Router function execution failed:', e)
    }
  } else if (typeof router === 'string' && router.trim()) {
    Push(router)
  }
}
