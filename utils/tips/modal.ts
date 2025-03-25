import { ModalOptions } from '@/types/index'

export const Modal = (opt : ModalOptions) => {
  let confirm : () => void | null = null
  if (opt?.confirm) {
    confirm = opt.confirm
    delete opt.confirm
  }
  return new Promise((resolve, reject) => {
    uni.showModal<UniApp.ShowModalOptions>()
  })
}
