import { RouterOptions } from '@/types/index'

/**
 * 导航到指定 URL
 *
 * @param url 目标URL
 *
 * @example
 * // 跳转到首页
 * Push('/pages/home/index')
 *
 * // 带参数的跳转
 * Push('/pages/detail?id=123')
 */
export const Push = (url : string) : void => {
  if (!url) return

  // #ifdef H5
  try {
    window.location.href = url
  } catch (e) {
    console.error('Push navigation failed:', e)
  }
  // #endif

  // #ifndef H5
  uni.navigateTo({ url })
  // #endif
}

/**
 * 重定向到指定 URL（替换当前页面）
 *
 * @param url 目标URL
 *
 * @example
 * // 登录后重定向到首页
 * Replace('/pages/home')
 *
 * // 替换当前页面为详情页
 * Replace('/pages/detail?id=456')
 */
export const Replace = (url : string) : void => {
  if (!url) return

  // #ifdef H5
  try {
    window.location.replace(url)
  } catch (e) {
    console.error('Replace navigation failed:', e)
  }
  // #endif

  // #ifndef H5
  uni.redirectTo({ url })
  // #endif
}

/**
 * 重启应用并跳转到指定 URL
 *
 * @param url 目标URL
 *
 * @example
 * // 登录过期后重启到登录页
 * Relaunch('/pages/login')
 *
 * // 切换用户身份后重启应用
 * Relaunch('/pages/home?role=admin')
 */
export const Relaunch = (url : string) : void => {
  if (!url) return

  // #ifdef H5
  try {
    const newWindow = window.open(url, '_blank')
    if (newWindow) {
      newWindow.opener = null
      window.close()
    } else {
      window.location.href = url
    }
  } catch (e) {
    console.error('Relaunch navigation failed:', e)
    window.location.href = url
  }
  // #endif

  // #ifndef H5
  uni.reLaunch({ url })
  // #endif
}

/**
 * 返回上一页或多页
 *
 * @param delta 返回的页面数，默认为1
 *
 * @example
 * // 返回上一页
 * Back()
 *
 * // 返回前两页
 * Back(2)
 *
 * // 从字符串参数返回
 * Back('1')
 */
export const Back = (delta : number | string = 1) : void => {
  let deltaNum = Number(delta)

  if (isNaN(deltaNum)) {
    deltaNum = 1
  } else if (deltaNum <= 0) {
    deltaNum = 1
  }

  // #ifdef H5
  try {
    window.history.go(-deltaNum)
  } catch (e) {
    console.error('Back navigation failed:', e)
  }
  // #endif

  // #ifndef H5
  uni.navigateBack({ delta: deltaNum })
  // #endif
}

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
export const Router = (router : RouterOptions) : void | Promise<any> => {
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
