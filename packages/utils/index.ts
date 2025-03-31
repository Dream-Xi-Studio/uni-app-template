import * as Tips from './tips/index'
import * as Clipboard from './clipboard'
import * as Router from './router'

export * from './tips/index'
export * from './clipboard'
export * from './router'

export default {
  ...Tips,
  ...Clipboard,
  ...Router
}
