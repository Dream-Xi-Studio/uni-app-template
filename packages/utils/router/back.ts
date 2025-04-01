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
export function Back(delta : number | string = 1) : void {
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
