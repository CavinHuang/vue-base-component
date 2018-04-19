<template lang="pug">
div.swiper-container
  div.swiper-warrp
    ul.swiper-ul(ref="swiperUl")
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
function toArray (arraylike) {
  return Array.prototype.slice.call(arraylike)
}
export default {
  name: 'swiper',
  data () {
    return {
      win: {w: 0}, // Windows
      items: [], // itmes
      touchData: {}, // 移动数据
      distance: 0, // 移动距离
      offsetX: 0, // 移动的距离，不带方向
      moveX: 0, // 当前的translateX
      currentIndex: 1, // 当前索引
      count: 0,
    }
  },
  mounted () {
    this.winMethod()
    this.initItems()
    this.cloneItemNode()
    // 绑定时事件
    const $el = this.$el

    $el.addEventListener('touchstart', this.touchStart, false)
    $el.addEventListener('touchmove', this.touchMove, false)
    $el.addEventListener('touchend', this.touchEnd, false)
  },
  watch: {},
  methods: {
    winMethod () {
      this.win = {
        w: window.innerWidth
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
      this.count = len
    },
    /**
     * 克隆两个节点
     * @return {[type]} [description]
     */
    cloneItemNode () {
      const $el = this.$refs.swiperUl
      let head = this.items[0].cloneNode(this.items[0], true)
      let tail = this.items[this.count - 1].cloneNode(this.items[this.count - 1], true)
      this.$refs.swiperUl.appendChild(head)
      this.$refs.swiperUl.insertBefore(tail, this.items[0])
      this.items = toArray(this.$refs.swiperUl.children)
      this.count = this.items.length

      // warrp 的长度
      $el.style.width = this.count * this.win.w + 'px'
      this.moveX = this.win.w
      // $el.style.paddingLeft = this.win.w + 'px'
      $el.style.webkitTransitionDuration = '500ms'
      $el.style.webkitTransform = 'translate3d(-' + this.win.w + 'px, 0, 0)'
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
      //$el.style.webkitTransitionDuration = '0ms'
      // $el.style.webkitTransform = 'translate3d(' + (this.moveX + distance) * (-1) + 'px, 0, 0)'
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
          console.log(this.distance);
          if (this.distance > 0) {
            console.log('left');
            // left  next
            this.currentIndex = this.currentIndex + 1 > this.count - 3 ? 0 : this.currentIndex + 1
          } else {
            console.log('right');
            // right prev
            this.currentIndex = this.currentIndex - 1 < 1 ? this.count - 3 : this.currentIndex - 1
          }
          tranX = this.currentIndex * win.w
          this.moveX = tranX + this.win.w
          $el.style.webkitTransitionDuration = '500ms'
          $el.style.webkitTransform = 'translate3d(' + (tranX + this.win.w) * (-1) + 'px, 0, 0)'
        } else {
          console.log('fanhui');
          // 返回原位
          tranX = this.currentIndex * win.w
          // $el.style.webkitTransitionDuration = '500ms'
          // $el.style.webkitTransform = 'translate3d(' + (tranX + this.win.w) * (-1) + 'px, 0, 0)'
          this.moveX = tranX + this.win.w
        }
      }
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/styles/swiper/index.styl';
</style>
