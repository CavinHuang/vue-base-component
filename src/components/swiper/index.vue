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

export default {
  name: 'swiper',
  data () {
    return {
      items: [], // itmes
      touchData: {} // 移动数据
    }
  },
  mounted () {
    this.initItems()

    // 绑定时事件
    const $el = this.$el

    $el.addEventListener('touchstart', this.touchStart, false)
    $el.addEventListener('touchmove', this.touchMove, false)
    $el.addEventListener('touchEnd', this.touchEnd, false)
  },
  methods: {
    /**
     * 初始化Item
     * @return {[type]} [description]
     */
    initItems () {
      const $el = this.$refs.swiperUl.children
      for (var i = 0; i < $el.length; i++) {
        this.items.push($el[i])
      }
    },
    /**
     * touch start event handle
     * @param  {[Object]} e [touch event]
     * @return {[type]}   [description]
     */
    touchStart (e) {
      const touchs = e.touchs[0] ? e.touchs[0] : e
      this.touchData.startTime = Date.now() // 开始时的时间戳
      this.touchData.startX = touchs.pageX // 开始时的横坐标
    },
    /**
     * touch move event handle
     * @param  {[Object]} e [touch event]
     * @return {[type]}   [description]
     */
    touchMove (e) {
      const touchs = e.touchs[0] ? e.touchs[0] : e
      const pageX = touchs.pageX
    },
    /**
     * touch end event hendle
     * @param  {[Object]} e [touch event]
     * @return {[type]}   [description]
     */
    touchEnd (e) {}
  }
}
</script>
<style lang="stylus">
@import '../../assets/styles/swiper/index.styl';
</style>
