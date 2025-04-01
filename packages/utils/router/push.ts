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
export function Push(url : string) : void {
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
