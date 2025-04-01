import { Toast } from '../tips/toast'
import type { PasteOptions } from '@/packages/types'

/**
 * 剪贴板粘贴工具函数
 * @param {PasteOptions} [options] - 配置选项（可选）
 * @param {boolean} [options.showToast=true] - 是否显示操作结果提示（默认 true）
 * @param {string} [options.successMessage="粘贴成功"] - 成功时的提示文案
 * @param {string} [options.failMessage="粘贴失败"] - 失败时的提示文案
 * @param {(res: UniApp.GetClipboardDataSuccessRes) => void} [options.success] - 成功回调
 * @param {(err: UniApp.UniError) => void} [options.fail] - 失败回调
 * @returns {Promise<string>} - 返回剪贴板文本内容（成功时）或抛出错误（失败时）
 * @throws {UniApp.UniError} - 当剪贴板访问失败时抛出错误
 *
 * @example
 * // 基本用法
 * Paste().then(text => console.log(text)).catch(err => console.error(err));
 *
 * @example
 * // 自定义提示和回调
 * Paste({
 *   showToast: true,
 *   successMessage: 'Custom success',
 *   failMessage: 'Custom failed',
 *   success: (res) => console.log('Success:', res),
 *   fail: (err) => console.error('Failed:', err)
 * });
 */
export function Paste(options ?: PasteOptions) : Promise<string> {
  return new Promise((resolve, reject) => {
    uni.getClipboardData({
      success: (res : UniApp.GetClipboardDataSuccessRes) => {
        try {
          // 使用配置的提示状态
          options?.showToast && Toast(options?.successMessage || '粘贴成功')

          options?.success?.(res)
        } finally {
          resolve(res.data)
        }
      },
      fail: (err : UniApp.UniError) => {
        try {
          options?.showToast && Toast(options?.failMessage || '粘贴失败')

          options?.fail?.(err)
        } finally {
          reject(err)
        }
      }
    })
  })
}
