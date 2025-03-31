/**
 * `Modal` 函数的对象选项，继承自 `UniApp.ShowModalOptions`
 */
interface Options extends UniApp.ShowModalOptions {
  /**
   * 用户点击“确定”按钮时触发的回调
   */
  confirm ?: () => void

  /**
   * 用户点击“取消”按钮时触发的回调
   */
  cancel ?: () => void
}

/**
 * `Modal` 函数的选项
 */
export type ModalOptions = string | Options
