/**
 * Dom 操作相关的工具函数
 */
module.exports = {
  /**
   * 添加class名称
   * @param $el
   * @param className
   */
  addClass ($el, className) {
    if (Object.prototype.toString.apply(className) === '[object String]') {
      let classes = $el.className.split(' ')
      className.split(' ').forEach(cl => {
        if (classes.findIndex(al => al === cl) === -1) {
          classes.push(cl)
        }
      })
      $el.className = classes.join(' ')
    }
  },
  /**
   * 移除class名称
   * @param $el
   * @param className
   */
  removeClass ($el, className) {
    if (Object.prototype.toString.apply(className) === '[object String]') {
      let classes = $el.className.split(' ')
      className.split(' ').forEach(cl => {
        const $index = classes.findIndex(al => al === cl)
        if ($index > -1) {
          classes.splice($index, 1)
        }
      })
      $el.className = classes.join(' ')
    }
  },
  /**
   * 判断class名称是否存在
   * @param $el
   * @param className
   * @return {boolean}
   */
  checkClass ($el, className) {
    let result = false
    if (Object.prototype.toString.apply(className) === '[object String]') {
      let classes = $el.className.split(' ')
      className.split(' ').forEach(cl => {
        result = classes.findIndex(al => al === cl) > -1
      })
    }
    return result
  },
  /**
   *  兼容requestAnimationFrame
   *  @param  {Function } callback
   */
  animationFrame (callback) {
    requestAnimationFrame(callback) ||
    window.webkitRequestAnimationFrame(callback) ||
    window.mozRequestAnimationFrame(callback) ||
    setTimeout(callback, 60)
  }
}
