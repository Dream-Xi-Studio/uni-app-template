import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ProviderOptions, ProviderOptionsKeys } from '@/types/index'
// import Tips from '@/utils/tips'

export const useAppStore = defineStore('app', () => {
  // #ifndef WEB
  /**
   * 服务供应商
   */
  const provider = ref<ProviderOptions>(null)

  /**
   * 获取服务供应商
   */
  const getProvider = (service : ProviderOptionsKeys) => {
    uni.getProvider({
      service,
      success: (res : UniApp.GetProviderRes) => {
        const providers = res.provider || []
        provider.value = Object.assign(provider.value || {}, {
          [service]: providers[0]
        })
      },
      fail: (err) => {
        // Tips(err.errMsg)
      }
    })
  }
  // #endif

  return {
    // #ifndef WEB
    provider,
    getProvider
    // #endif
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
