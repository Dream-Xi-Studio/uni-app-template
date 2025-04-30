import { Modal } from '../tips/modal'
import { Toast } from '../tips/toast'

/**
 * 检查小程序是否有新版本并处理更新逻辑。
 *
 * 该函数通过 `uni.getUpdateManager` 检查小程序更新状态：
 * - 如果有新版本，下载完成后提示用户重启应用。
 * - 如果更新失败，提示用户稍后重试。
 * - 如果没有新版本，可选择显示友好提示。
 *
 * @param showNoUpdateTip - 是否在无新版本时显示提示（默认 `false`）。
 *                          当为 `true` 且无新版本时，显示“当前已是最新版本”。
 * @remarks
 * - 仅适用于支持 `uni.getUpdateManager` 的小程序平台（如微信小程序）。
 * - 建议在小程序启动时（`app.ts` 的 `onLaunch`）调用，或在设置页面手动调用。
 * - 若需支持原生 App 更新，需使用 UniApp 的整包更新或热更新机制。
 * @example
 * ```typescript
 * // 启动时自动检查更新（不显示无更新提示）
 * checkMiniProgramUpdate();
 *
 * // 手动检查更新（显示无更新提示）
 * checkMiniProgramUpdate(true);
 * ```
 * @returns 无返回值。
 */
export function checkMiniProgramUpdate(showNoUpdateTip : boolean = false) : void {
  if (uni.canIUse('getUpdateManager')) {
    const updateManager : UniApp.UpdateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate((res : UniApp.OnCheckForUpdateResult) => {
      if (res.hasUpdate) {
        // 当新版本下载完成，会进行回调
        updateManager.onUpdateReady(() => {
          Modal({
            title: '更新提示',
            content: '新版本已经下载好，是否重启当前应用？',
            confirmText: '重启',
            cancelText: '取消',
            success: (res : UniApp.ShowModalRes) => {
              if (res.confirm) {
                // 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })

        // 当新版本下载失败，会进行回调
        updateManager.onUpdateFailed(() => {
          Modal({
            title: '更新失败',
            content: '新版本下载失败，请稍后重试！',
            showCancel: false
          })
        })
      } else if (showNoUpdateTip) {
        // 当没有新版本且允许显示提示时，显示友好提示
        Toast('当前已是最新版本！')
      }
    })
  }
}
