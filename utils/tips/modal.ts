import { ModalOptions } from '@/types/index'

/**
 * 显示一个模态对话框（Modal），适用于 `uni.showModal`
 *
 * - 在小程序 (`MP`) 环境下，`confirmText` 和 `cancelText` 仅保留前 4 个字符
 * - 在 Android App (`APP-ANDROID`) 环境下，交换 `confirmText` 和 `cancelText` 及其颜色，以适应系统 UI 习惯
 *
 * @param {ModalOptions} [opt] 模态框选项，可包含 `title`、`content`、`confirmText`、`cancelText` 等
 * @returns {Promise<boolean>} 通过 Promise 返回 `true`（用户点击确认）或 `false`（用户点击取消）
 *
 * @example
 * // 基本使用：默认确认/取消按钮
 * Modal({ content: '确定要执行此操作吗？' })
 *   .then(confirmed => {
 *     if (confirmed) {
 *       console.log('用户点击了确认')
 *     } else {
 *       console.log('用户点击了取消')
 *     }
 *   })
 *
 * @example
 * // 自定义按钮文本
 * Modal({
 *   title: '警告',
 *   content: '此操作不可撤销！',
 *   confirmText: '继续',
 *   cancelText: '放弃'
 * }).then(confirmed => {
 *   if (confirmed) {
 *     console.log('用户选择继续')
 *   } else {
 *     console.log('用户选择放弃')
 *   }
 * })
 *
 * @example
 * // 处理成功/失败回调
 * Modal({
 *   title: '提示',
 *   content: '是否启用新功能？',
 *   success: (res) => console.log('Modal 显示成功:', res),
 *   fail: (err) => console.log('Modal 显示失败:', err),
 *   confirm: () => console.log('用户确认操作'),
 *   cancel: () => console.log('用户取消操作')
 * })
 */
export const Modal = (opt ?: ModalOptions) : Promise<boolean> => {
  const { success, fail, confirm, cancel, ...options } = opt || {}

  const modalOptions : UniApp.ShowModalOptions = {
    title: '温馨提示',
    showCancel: true,
    cancelText: '取消',
    cancelColor: '#666666',
    confirmText: '确定',
    confirmColor: '#0072FF',
    ...options
  }

  // #ifdef MP
  modalOptions.cancelText = modalOptions.cancelText?.slice(0, 4)
  modalOptions.confirmText = modalOptions.confirmText?.slice(0, 4)
    // #endif

    // #ifdef APP-ANDROID
    ;[modalOptions.confirmText, modalOptions.cancelText] = [modalOptions.cancelText, modalOptions.confirmText]
    ;[modalOptions.confirmColor, modalOptions.cancelColor] = [modalOptions.cancelColor, modalOptions.confirmColor]
  // #endif

  return new Promise((resolve, reject) => {
    uni.showModal({
      ...modalOptions,
      success: (res : UniApp.ShowModalRes) => {
        success?.(res)
        if (res.confirm) {
          confirm?.()
          resolve(true)
        } else {
          cancel?.()
          resolve(false)
        }
      },
      fail: (err : any) => {
        fail?.(err)
        reject(err)
      }
    })
  })
}
