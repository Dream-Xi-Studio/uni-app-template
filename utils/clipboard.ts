import { Toast } from '@/utils/index'

export const Copy = (value : any, opt ?: any) : void => {
  const { showToast = true } = opt || {}
  uni.setClipboardData({
    data: value,
    showToast: false,
    success: () => {
      showToast && Toast('复制成功')
    },
    fail: (err) => {
      Toast(err.errMsg || '复制失败')
    }
  })
}
