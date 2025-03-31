/**
 * 微信
 */
type Weixin = 'weixin'

/**
 * qq
 */
type Qq = 'qq'

/**
 * 新浪微博
 */
type Sinaweibo = 'sinaweibo'

/**
 * 小米
 */
type Xiaomi = 'xiaomi'

/**
 * Apple
 */
type Apple = 'apple'

/**
 * 一键登录
 */
type Univerify = 'univerify'

/**
 * 授权登录
 */
export type Oauth = Weixin | Qq | Sinaweibo | Xiaomi | Apple | Univerify

/**
 * 分享
 */
export type Share = Sinaweibo | Qq | Weixin

/**
 * 服务类型及对应的服务供应商
 */
export type ProviderOptions = {
  /**
   * 授权登录
   */
  oauth ?: Oauth

  /**
   * 分享
   */
  share ?: Share

  /**
   * 支付
   */
  payment ?: string

  /**
   * 推送
   */
  push ?: string
}

/**
 * 服务类型
 */
export type ProviderOptionsKeys = keyof ProviderOptions
