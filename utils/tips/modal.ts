import { ModalOptions } from '@/types/index'

/**
 * 显示跨平台统一的模态对话框
 *
 * 平台差异处理：
 * - 小程序：限制按钮文本前4个字符
 * - Android：交换按钮位置并保持语义一致性
 * - iOS/H5：保持默认右确认布局
 *
 * @param {ModalOptions} [opt] 弹窗配置选项
 * @returns {Promise<boolean>} 始终返回基于"确认在右"逻辑的布尔值
 *
 * @example
 * // 跨平台统一调用
 * Modal({ content: '操作确认' }).then(confirmed => {
 *   confirmed // true=用户点击右侧主操作，false=左侧次要操作
 * })
 */
export const Modal = (opt ?: ModalOptions) : Promise<boolean> => {
  // 解构用户配置并分离回调方法
  const {
    success,
    fail,
    confirm: onConfirm,
    cancel: onCancel,
    ...userOptions
  } = opt || {}

  // 初始化弹窗配置（包含默认值）
  const modalOptions : UniApp.ShowModalOptions = {
    title: '温馨提示',
    content: '',
    showCancel: true,
    confirmText: '确定',
    confirmColor: '#0072FF',
    cancelText: '取消',
    cancelColor: '#666666',
    ...userOptions,
  }

  /* 处理小程序平台限制 */
  // #ifdef MP
  const truncateText = (text ?: string) => text?.slice(0, 4) || ''
  modalOptions.confirmText = truncateText(modalOptions.confirmText)
  modalOptions.cancelText = truncateText(modalOptions.cancelText)
  // #endif

  /* 处理Android平台布局适配 */
  // #ifdef APP-ANDROID
  if (modalOptions.showCancel) {
    // 交换按钮文本及颜色（视觉层适配）
    [modalOptions.confirmText, modalOptions.cancelText] = [modalOptions.cancelText, modalOptions.confirmText];
    [modalOptions.confirmColor, modalOptions.cancelColor] = [modalOptions.cancelColor, modalOptions.confirmColor]
  }
  // #endif

  return new Promise((resolve, reject) => {
    uni.showModal({
      ...modalOptions,
      success: (res : UniApp.ShowModalRes) => {
        /* Android结果映射 */
        // #ifdef APP-ANDROID
        if (modalOptions.showCancel) {
          // 将物理位置差异转换为逻辑一致性
          res.confirm = !res.confirm
        }
        // #endif

        // 执行用户回调
        success?.(res)
        res.confirm ? onConfirm?.() : onCancel?.()

        // 统一解析为确认在右的语义
        resolve(res.confirm)
      },
      fail: (err : any) => {
        fail?.(err)
        reject(err)
      }
    })
  })
}
