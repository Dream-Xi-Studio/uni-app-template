import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', () => {
  // #ifndef APP || WEB || MP-LARK || MP-HARMONY
  /**
   * 胶囊信息
   */
  const capsule = ref<UniApp.GetMenuButtonBoundingClientRectRes>(null)
  // #endif

  /**
   * 竖屏正方向下的安全区域插入位置
   */
  const safeAreaInsets = ref<UniApp.SafeAreaInsets>(null)
  /**
   * 状态栏高度
   */
  const statusBarHeight = ref<number>(0)
  /**
   * 高度
   */
  const height = ref<number>(0)

  /**
   * 异步获取系统信息
   */
  const getSystemInfo = () => {
    uni.getSystemInfo({
      success: (e : UniApp.GetSystemInfoResult) => {
        safeAreaInsets.value = e.safeAreaInsets
        // 状态栏高度
        statusBarHeight.value = e.statusBarHeight

        // #ifndef APP || WEB || MP-LARK || MP-HARMONY
        // 获取右上角胶囊的信息
        capsule.value = uni.getMenuButtonBoundingClientRect()
        height.value = capsule.value.height + (capsule.value.top - statusBarHeight.value) * 2
        // #endif

        // #ifdef APP || WEB || MP-LARK || MP-HARMONY
        height.value = 44
        // #endif
      }
    })
  }

  return {
    // #ifndef APP || WEB || MP-LARK || MP-HARMONY
    capsule,
    // #endif

    safeAreaInsets,
    statusBarHeight,
    height,
    getSystemInfo
  }
}, {
  persist: {
    storage: {
      setItem(key : string, value : any) {
        uni.setStorageSync(key, value)
      },
      getItem(key : string) {
        return uni.getStorageSync(key)
      }
    }
  }
})
