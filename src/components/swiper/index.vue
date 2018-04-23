<template lang="pug">
div.swiper-container
  div.swiper-warrp
    ul.swiper-ul(:style="containerStyle", @transitionend="transitionEndHandel", @touchstart="touchStartHandel", @touchmove="touchMoveHandel", @touchend="touchEndHandel",ref="swiperUl")
      slot
  div.swiper-dots
    span.swiper-dot-item(v-for="(item, $index) in items")
  div.swiper-slide-arrow
    div.swiper-slide-left(@touchstart="prev()")
      span.swiper-arrow.swiper-arrow-left
    div.swiper-slide-right(@touchstart="next()")
      span.swiper-arrow.swiper-arrow-right
</template>

<script>
function toArray (arraylike) {
  return Array.prototype.slice.call(arraylike)
}
export default {
  name: 'swiper',
  props: {
    duration: {
      type: Number,
      default: 200
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    autoInterval: {
      type: Number,
      default: 1500
    }
  },
  data () {
    return {
      warrpEle: null, // item包裹容器缓存
      containerStyle: {}, // 容器样式
      items: [], // 所有的子
      count: 0, // 所有的子的条数
      currentIndex: 1, // 当前的索引
      distance: 375, // 一次移动的距离，一个窗口的距离，下面会做初始化
      touchData: {}, // 储存触摸的数据
      offset: { // 触摸移动的距离x轴
        x: 0
      },
      shifting: { // 偏移量（带方向）
        x: 0
      },
      isTransition: false, // 标识是否正在移动
      timer: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    /**
     * 初始化整个应用
     * @return {[type]} [description]
     */
    init () {
      this.initItems()
      this.distance = window.innerWidth
      this.containerStyle = {
        transform: `translate3d(-${this.distance}px, 0, 0)`,
        width: this.count * this.distance + 'px',
        transition: 'none'
      }
      this.auto()
    },
    /**
     * 自动切换
     * @return {[type]} [description]
     */
    auto () {
      if (this.autoPlay) {
        const timer = setInterval(() => {
          this.next()
        }, this.autoInterval)
        this.timer.push({
          method: 'clearInterval',
          timer: timer
        })
      }
    },
    /**
     * 清除所有的定时器
     * @return {[type]} [description]
     */
    clearTimer () {
      let method = null
      this.timer.forEach(v => {
        method = v['method']
        window[method](v['timer'])
      })
      this.isTransition = false
    },
    /**
     * 初始化Item
     * @return {[type]} [description]
     */
    initItems () {
      const $el = this.$refs.swiperUl
      const children = $el.children
      const len = children.length
      for (var i = 0; i < len; i++) {
        children[i].style.width = this.distance + 'px'
        this.items.push(children[i])
      }
      this.warrpEle = $el
      this.count = len
      this.cloneItemNode()
    },
    /**
     * 克隆两个节点
     * @return {[type]} [description]
     */
    cloneItemNode () {
      let head = this.items[0].cloneNode(this.items[0], true)
      let tail = this.items[this.count - 1].cloneNode(this.items[this.count - 1], true)
      this.warrpEle.appendChild(head)
      this.warrpEle.insertBefore(tail, this.items[0])
      this.items = toArray(this.warrpEle.children)
      this.count = this.items.length
    },
    /**
     * 计算当前的偏移距离
     * @param {[type]} offset [description]
     */
    computedOffset (offset) {
      return offset ? this.currentIndex * this.distance + offset : this.currentIndex * this.distance
    },
    /**
     * 改变容器的样式
     * @param  {[type]}  offset       [description]
     * @param  {Boolean} isTransition [description]
     * @return {[type]}               [description]
     */
    doTranslate (offset, isTransition) {
      if (isTransition) this.isTransition = true
      this.containerStyle.transform = `translate3d(-${offset}px, 0, 0)`
      this.containerStyle.transition = isTransition ? this.duration + 'ms transform' : 'none'
    },
    /**
     * 上一节点
     * @return {[type]} [description]
     */
    prev () {
      if (this.isTransition) return
      this.currentIndex--
      if (!this.loop && this.currentIndex < 1) {
        this.currentIndex = 1
        this.isTransition = false
        return
      }
      this.doTranslate(this.computedOffset(), true)
      this.clearTimer()
      let timer = setTimeout(() => {
        this.auto()
      }, this.autoInterval)
      this.timer.push({
        method: 'clearTimeout',
        timer: timer
      })
    },
    /**
     * 下一个节点
     * @return {Function} [description]
     */
    next () {
      if (this.isTransition) return
      this.currentIndex++
      if (!this.loop && this.currentIndex > this.count - 2) {
        this.currentIndex = this.count - 2
        this.isTransition = false
        return
      }
      this.doTranslate(this.computedOffset(), true)
      this.clearTimer()
      let timer = setTimeout(() => {
        this.auto()
      }, this.autoInterval)
      this.timer.push({
        method: 'clearTimeout',
        timer: timer
      })
    },
    /**
     * 动画结束之后的回调
     * @return {[type]} [description]
     */
    transitionEndHandel () {
      if (this.currentIndex < 1) {
        this.currentIndex = this.count - 2
      }
      if (this.currentIndex > this.count - 2) {
        this.currentIndex = 1
      }
      this.doTranslate(this.computedOffset(), false)
      this.isTransition = false
      console.log(this.isTransition)
    },
    /**
     * 触摸开始的回调
     * @param  {[Object]} e [touch event]
     * @return {[type]}   [description]
     */
    touchStartHandel (e) {
      if (this.isTransition) return
      // FIXME:  此处应该有兼容问题
      const touches = e.touches[0]
      this.touchData.startX = touches.clientX
      this.touchData.startTime = Date.now()

      // 清除定时器
      this.clearTimer()
    },
    /**
     * 触摸移动的回调
     * @param  {[type]} e [touch event]
     * @return {[type]}   [description]
     */
    touchMoveHandel (e) {
      if (this.isTransition) return
      // FIXME:  此处应该有兼容问题
      const touches = e.touches[0]
      let shiftingX = this.touchData.startX - touches.clientX
      this.offset.x = Math.abs(shiftingX)
      this.shifting.x = shiftingX
      if (this.offset.x > this.distance * (2 / 3)) return
      this.doTranslate(this.computedOffset(shiftingX), false)
    },
    /**
     * 触摸结束的回调
     * @param  {[type]} e [touch event]
     * @return {[type]}   [description]
     */
    touchEndHandel (e) {
      if (this.isTransition) return
      if (this.offset.x > 50) { // 移动页码
        if (this.shifting.x > 0) {
          console.log('left')
          this.next()
        } else {
          console.log('right')
          this.prev()
        }
        if (!this.loop) this.doTranslate(this.computedOffset(), true)
      } else {
        // 返回当前页
        this.doTranslate(this.computedOffset(), true)
      }

      // 重新开启定时器
      this.auto()
    }
  },
  destroyed () {
    this.clearTimer() // 清除所有的定时器
    this.warrpEle.removeEventListener('touchstart', this.touchStartHandel, false) // 解除事件绑定
    this.warrpEle.removeEventListener('touchmove', this.touchMoveHandel, false) // 解除事件绑定
    this.warrpEle.removeEventListener('touchend', this.touchEndHandel, false) // 解除事件绑定
    this.warrpEle = '' // 清除dom挂载
  }
}
</script>
<style lang="stylus">
@import '../../assets/styles/swiper/index.styl';
</style>
