/**
 * 提示选项，可以是字符串或对象类型
 */
export type TipsOptions = string | {
  /**
   * 提示标题
   */
  title ?: string

  /**
   * 提示图标，可选值：
   * - `'success'` - 成功图标
   * - `'loading'` - 加载中图标
   * - `'none'` - 无图标
   */
  icon ?: 'success' | 'loading' | 'none';

  /**
   * 提示显示时长（毫秒）
   */
  endtime ?: number;

  /**
   * 提示关闭时的回调函数
   */
  success ?: () => void;

  /**
   * 提示框位置，可选值：
   * - `'top'` - 顶部
   * - `'center'` - 居中
   * - `'bottom'` - 底部
   */
  position ?: 'top' | 'center' | 'bottom';
}
