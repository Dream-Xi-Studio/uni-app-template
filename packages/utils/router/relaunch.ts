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
export function Relaunch(url : string) : void {
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
