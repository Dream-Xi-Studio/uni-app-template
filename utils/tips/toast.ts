import { Router } from '@/utils/index'
import { ToastOptions, RouterOptions } from '@/types/index'

/**
 * 显示一个提示消息，并根据配置进行页面跳转
 *
 * @param {ToastOptions} opt - 提示的配置或提示文本
 * @param {RouterOptions} [router] - 页面跳转配置或跳转目标，或一个回调函数
 *
 * @example
 * // 显示一个成功的提示
 * Toast({ title: '操作成功', icon: 'success' });
 *
 * @example
 * // 提示后跳转到 TabBar 页面
 * Toast({ title: '跳转中...' }, { tab: 1, url: '/pages/index/index' });
 *
 * @example
 * // 提示后执行回调
 * Toast('操作完成', () => { console.log('回调函数'); });
 */
export const Toast = (opt : ToastOptions, router ?: RouterOptions) : void => {
  if (typeof opt === 'string') {
    opt = { title: opt }
  }

  const title = opt.title || ''
  /**
   * 提示图标，默认值为 none
   *
   * @param {String} title
   */
  let icon = opt.icon || 'none'
  /**
   * 提示显示时长（毫秒），默认值为 2000
   *
   * @param {Number} endtime
   */
  const endtime = opt.endtime ?? 2000
  const success = opt.success
  /**
   * 提示框位置，默认位置为 bottom
   *
   * @param {String} title
   */
  const position = opt.position || 'bottom'

  // 处理 Toast 提示
  if (title) {
    // #ifdef MP-WEIXIN
    if (icon === 'loading') {
      uni.showLoading({ title })
    } else {
      uni.showToast({
        title,
        icon,
        duration: endtime,
        position,
        success
      })
    }
    // #endif

    // #ifdef H5
    // H5 端不传 success，避免无效参数
    uni.showToast({
      title,
      icon,
      duration: endtime,
      position
    })
    // #endif

    // #ifndef H5 || MP-WEIXIN
    // 其他端正常显示
    uni.showToast({
      title,
      icon,
      duration: endtime,
      position,
      success
    })
    // #endif
  }

  // 处理页面跳转
  if (router !== undefined) {
    const executeNavigation = () => Router(router)

    title ? setTimeout(executeNavigation, endtime) : executeNavigation()
  }
}
