<template lang="pug">
div.swiper-container
  div.swiper-warrp
    ul.swiper-ul(:style="trackStyle", ref="swiperUl")
      slot
  div.swiper-dots
    span.swiper-dot-item(v-for="(item, $index) in items")
  div.swiper-slide-arrow
    div.swiper-slide-left
      span.swiper-arrow.swiper-arrow-left
    div.swiper-slide-right
      span.swiper-arrow.swiper-arrow-right
</template>

<script>

export default {
  name: 'swiper',
  data () {
    return {
      width: 0,
      count: 0,
      initialSwipe: 0, // 初始化第几章
      currentDuration: 500,
      win: {}, // Windows
      items: [], // itmes
      touchData: {}, // 移动数据
      distance: 0, // 移动距离
      offsetX: 0, // 移动的距离，不带方向
      moveX: 0, // 当前的translateX
      currentIndex: 0 // 当前索引
    }
  },
  computed: {
    trackStyle () {
      return {
        paddingLeft: this.width + 'px',
        width: (this.count + 2) * this.width + 'px',
        transitionDuration: `${this.currentDuration}ms`,
        transform: `translate(${this.offsetX}px, 0)`
      }
    }
  },
  mounted () {
    this.winMethod()
    this.initItems()

    // 绑定时事件
    const $el = this.$el

    $el.addEventListener('touchstart', this.touchStart, false)
    $el.addEventListener('touchmove', this.touchMove, false)
    $el.addEventListener('touchend', this.touchEnd, false)
  },
  methods: {
    winMethod () {
      this.win = {
        w: window.innerWidth,
        h: window.innerHeight
      }
    },
    /**
     * 初始化Item
     * @return {[type]} [description]
     */
    initItems () {
      const $el = this.$refs.swiperUl
      const children = $el.children
      const len = children.length
      const win = this.win
      for (var i = 0; i < len; i++) {
        children[i].style.width = win.w + 'px'
        this.items.push(children[i])
      }
      this.width = this.$el.getBoundingClientRect().width
      this.count = len
      this.offsetX = this.count > 1 ? -this.width * (this.currentIndex + 1) : 0
      // warrp 的长度
      // $el.style.width = len * win.w + 'px'
      // $el.style.paddingLeft = win.w + 'px'
      // $el.style.webkitTransitionDuration = '500ms'
      // $el.style.webkitTransform = 'translate3d(-' + this.win.w + 'px, 0, 0)'
    },
    /**
     * touch start event handle
     * @param  {[Object]} e [touch event]
     * @return {[type]}   [description]
     */
    touchStart (e) {
      const touchs = e.touches[0] ? e.touches[0] : e
      this.touchData.startTime = Date.now() // 开始时的时间戳
      this.touchData.startX = touchs.clientX // 开始时的横坐标
    },
    /**
     * touch move event handle
     * @param  {[Object]} e [touch event]
     * @return {[type]}   [description]
     */
    touchMove (e) {
      const touchs = e.touches[0] ? e.touches[0] : e
      const pageX = touchs.clientX
      const $el = this.$refs.swiperUl
      let distance = this.touchData.startX - pageX
      this.distance = distance
      this.offsetX = Math.abs(distance)

      // 判断方向
      if (this.currentIndex - 1 < 0) {
        this.items[this.items.length - 1].style.webkitTransform = 'translate3d(-' + (this.items.length - 1) * this.win.w + 'px, 0, 0)'
      }
      $el.style.webkitTransitionDuration = '0ms'
      $el.style.webkitTransform = 'translate3d(' + (this.moveX + distance) * (-1) + 'px, 0, 0)'
    },
    /**
     * touch end event hendle
     * @param  {[Object]} e [touch event]
     * @return {[type]}   [description]
     */
    touchEnd (e) {
      if (this.distance) {
        let tranX
        let win = this.win
        let $el = this.$refs.swiperUl
        if (this.offsetX > 50) {
          // 下一页
          if (this.distance > 0) {
            // left  next
            tranX = (this.currentIndex + 1) * win.w
            $el.style.webkitTransitionDuration = '500ms'
            $el.style.webkitTransform = 'translate3d(' + tranX * (-1) + 'px, 0, 0)'
            this.currentIndex++
            this.moveX = tranX
          } else {
            // right prev
            this.currentIndex = this.currentIndex - 1 < 0 ? this.items.length : this.currentIndex
            tranX = (this.currentIndex - 1) * win.w

            $el.style.webkitTransitionDuration = '500ms'
            $el.style.webkitTransform = 'translate3d(' + tranX * (-1) + 'px, 0, 0)'
            this.currentIndex--
            this.moveX = tranX
          }
        } else {
          // 返回原位
          tranX = this.currentIndex * win.w
          $el.style.webkitTransitionDuration = '500ms'
          $el.style.webkitTransform = 'translate3d(' + tranX + 'px, 0, 0)'
          this.moveX = tranX
        }
      }
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/styles/swiper/index.styl';
</style>
