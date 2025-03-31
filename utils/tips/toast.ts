import { Router } from '@/utils'
import { ToastOptions, RouterOptions } from '@/types'

/**
 * 显示Toast提示消息，可选择在提示消失后执行页面跳转
 *
 * @param opt - Toast内容，可以是字符串或配置对象
 *              当为字符串时，将作为Toast的标题内容
 *              当为对象时，需符合UniApp.ShowToastOptions规范
 *
 * @param router - 可选参数，配置Toast消失后的页面跳转行为
 *                 传入RouterOptions对象指定跳转目标
 *
 * @example
 * // 基本用法
 * Toast('操作成功')
 *
 * @example
 * // 带配置项
 * Toast({
 *   title: '加载中...',
 *   icon: 'loading',
 *   duration: 1500
 * })
 *
 * @example
 * // Toast后跳转页面
 * Toast('提交成功', {
 *   path: '/pages/success',
 *   type: 'redirectTo'
 * })
 */
export function Toast(opt : ToastOptions, router ?: RouterOptions) : void {
  // 参数标准化处理
  const options = typeof opt === 'string' ? { title: opt } : opt

  // 合并默认配置（符合uni-app规范）
  const {
    title = '',
    icon = 'none',
    duration = 2000,
    position = 'bottom',
    mask = false,
    image = '',
    success,
    fail,
    complete
  } = options

  // 验证并显示Toast
  if (title && title.length > 0) {
    try {
      uni.showToast({
        title,
        icon: image ? 'none' : icon, // 如果有自定义图片则强制设为none
        image,
        duration,
        position,
        mask,
        success(result : any) {
          success?.(result)
        },
        fail(err : UniApp.UniError) {
          console.error('[Toast] 显示失败:', err)
          fail?.(err)
        },
        complete(result : any) {
          complete?.(result)
        }
      })
    } catch (err) {
      console.error('[Toast] 调用异常:', err)
    }
  }

  // 处理页面跳转
  if (router !== undefined) {
    const executeNavigation = () => Router(router)

    title ? setTimeout(executeNavigation, duration) : executeNavigation()
  }
}
