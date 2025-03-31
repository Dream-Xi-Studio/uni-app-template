import { Toast } from '@/packages/utils'
import type { CopyOptions } from '@/packages/types'

/**
 * 剪贴板复制工具函数
 * @param opt - 复制参数，支持字符串或配置对象
 * @returns 返回Promise表示复制操作结果
 *
 * @example
 * // 基础用法
 * Copy('文本内容').catch(() => {})
 *
 * @example
 * // 完整参数
 * Copy({
 *   data: { name: 'John' },
 *   showToast: true,
 *   successMessage: '内容已复制到剪贴板',
 *   failMessage: '复制失败，请手动复制',
 *   success() {
 *     console.log('复制成功后续操作')
 *   }
 * })
 */
export function Copy(opt : CopyOptions) : Promise<boolean> {
  // 参数标准化处理，设置showToast默认值为true
  const options = {
    showToast: true, // 默认开启提示
    ...(typeof opt === 'string' ? { data: opt } : opt)
  }

  return new Promise((resolve, reject) => {
    const processedData = typeof options.data === 'string'
      ? options.data
      : JSON.stringify(options.data)

    if (!processedData) {
      const errorMsg = '复制内容不能为空'
      options.showToast && Toast(errorMsg)
      options?.fail?.({ errMsg: errorMsg })
      return reject(new Error(errorMsg))
    }

    uni.setClipboardData({
      data: processedData,
      showToast: false, // 保持禁用uni原生提示
      success: (res) => {
        try {
          // 使用配置的提示状态
          options.showToast && Toast(options.successMessage || '复制成功')

          options?.success?.(res)
        } finally {
          resolve(true)
        }
      },
      fail: (err) => {
        try {
          options.showToast && Toast(options.failMessage || '复制失败')

          options?.fail?.(err)
        } finally {
          reject(err)
        }
      }
    })
  })
}
