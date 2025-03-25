export interface ModalOptions extends UniApp.ShowModalOptions {
  /**
   * 点击了确定按钮的回调函数
   */
  confirm ?: () => void

  /**
   * 点击了取消按钮的回调函数
   */
  cancel ?: () => void
}
