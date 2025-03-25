import { RouterOptions } from '@/types/index'

/**
 * 导航到指定 URL，适用于 H5 和非 H5 环境
 *
 * - 在 H5 环境下，使用 `location.href` 避免浏览器历史堆叠
 * - 在非 H5 环境（如小程序、App）下，使用 `uni.navigateTo` 进行跳转
 *
 * @param {string} url 目标 URL
 */
export const Push = (url : string) : void => {
  // #ifdef H5
  // 避免浏览器历史堆叠
  location.href = url
  // #endif

  // #ifndef H5
  uni.navigateTo({ url })
  // #endif
}

/**
 * 重定向到指定 URL，适用于 H5 和非 H5 环境
 *
 * - 在 H5 环境下，使用 `location.replace(url)`，不会在浏览器历史记录中保留当前页面
 * - 在非 H5 环境（如小程序、App）下，使用 `uni.redirectTo` 进行跳转，替换当前页面
 *
 * @param {string} url 目标 URL
 */
export const Replace = (url : string) : void => {
  // #ifdef H5
  location.replace(url)
  // #endif

  // #ifndef H5
  uni.redirectTo({ url })
  // #endif
}

/**
 * 重新启动并跳转到指定 URL，适用于 H5 和非 H5 环境
 *
 * - 在 H5 环境下，使用 `location.replace(url)` 跳转并替换当前页面，同时通过 `history.pushState` 更新浏览器历史记录，避免用户点击返回时回到当前页面
 * - 在非 H5 环境（如小程序、App）下，使用 `uni.reLaunch` 跳转，重置当前页面栈
 *
 * @param {string} url 目标 URL
 */
export const Relaunch = (url : string) : void => {
  // #ifdef H5
  location.replace(url)
  setTimeout(() => {
    history.pushState(null, '', url)
  }, 50)
  // #endif

  // #ifndef H5
  uni.reLaunch({ url })
  // #endif
}

/**
 * 返回上一页面，适用于 H5 和非 H5 环境
 *
 * - 在 H5 环境下，使用 `history.go(-delta)` 返回历史记录中的页面，`delta` 为返回的页面数
 * - 在非 H5 环境（如小程序、App）下，使用 `uni.navigateBack` 返回指定页面数
 *
 * @param {number|string} delta 返回的页面数。可以是数字或数字字符串，默认为 1（返回上一页面）
 */
export const Back = (delta : number | string) : void => {
  delta = Number.isNaN(Number(delta)) ? 1 : parseInt(delta as string, 10)

  // #ifdef H5
  history.go(-delta)
  // #endif

  // #ifndef H5
  uni.navigateBack({ delta })
  // #endif
}

/**
 * 根据提供的参数跳转到指定 URL 或执行相应操作
 * 支持字符串、对象或函数类型的 `router` 参数
 *
 * - 如果 `router` 是字符串，使用 `navigate` 进行跳转
 * - 如果 `router` 是对象，支持以下选项：
 *   - `tab`: 控制跳转方式，值可以是 1 到 5，决定使用不同的跳转方法（如 `uni.switchTab`、`navigate`、`back`、`relaunch`、`redirect`）
 *   - `url`: 目标 URL，必须是有效的 URL 字符串
 * - 如果 `router` 是函数，则直接调用该函数
 *
 * @param {RouterOptions} router 跳转选项，可以是字符串、对象或函数
 */
export const Router = (router : RouterOptions) : void | Promise<any> => {
  if (typeof router === 'object') {
    const { tab = 1, url = '' } = router
    if (!url) return

    switch (tab) {
      case 1: return uni.switchTab({ url })
      case 2: return Push(url)
      case 3: return Back(url)
      case 4: return Relaunch(url)
      case 5: return Replace(url)
    }
  } else if (typeof router === 'function') {
    router()
  } else if (typeof router === 'string' && router.trim()) {
    Push(router)
  }
}
