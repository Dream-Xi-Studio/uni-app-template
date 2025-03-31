interface Options extends UniNamespace.SetClipboardDataOptions {
  /**
   * 要复制的内容，支持：
   * - 字符串直接复制
   * - 对象自动转为JSON字符串
   */
  data : any;
  /**
   * 自定义成功提示消息
   */
  successMessage ?: string;
  /**
   * 自定义失败提示消息
   */
  failMessage ?: string;
}

/**
 * `Copy` 函数的选项
 */
export type CopyOptions = string | Options
