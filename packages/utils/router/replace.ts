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
export function Replace(url : string) : void {
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
