<template lang="pug">
div.swiper-warrp
  ul.swiper-contaner
    slot
  .swiper-dots(v-show='showDots')
    .swiper-dot(v-for='(page, $index) in pages', :class="{ 'dot-active': $index == currentIndex }", :key='$index')

</template>

<script>
import {addClass, removeClass} from '@/utils/dom.js'
export default {
  name: 'Swiper',
  props: {
    showDots: {
      default: true,
      type: Boolean
    },
    defaultIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pages: [], // dots
      currentIndex: 0, // default index
      touches: {} // touch data
    }
  },
  methods: {
    initPages () {
      let childrenEle = this.$children
      this.currentIndex = Math.abs(this.defaultIndex) < childrenEle.length ? this.defaultIndex : 0
      let pages = []
      childrenEle.forEach((item, $index) => {
        pages.push(item.$el)
        // removeClass
        removeClass('slide-active')
        if (this.currentIndex === $index) addClass(item.$el, 'slide-active')
      })
      this.pages = pages
    },
    touchStart (event) {
      console.log(event)
      const touch = event.touches ? event.touches[0] : event
      const touches = this.touches
      touches.startX = touch.pageX
      touches.startTime = Date.now()
      touches.$elWidth = this.$el.offsetWidth
      let prevIndex = this.currentIndex - 1 < 0 ? this.pages.length - 1 : this.currentIndex - 1
      let nextIndex = this.currentIndex + 1 > this.pages.length - 1 ? 0 : this.currentIndex + 1
      touches.prevPage = this.pages[prevIndex]
      touches.currentPage = this.pages[this.currentIndex]
      touches.nextPage = this.pages[nextIndex]
      touches.prevPage.style.display = 'block'
      touches.nextPage.style.display = 'block'
    },
    touchMove (event) {},
    touchEnd (event) {}
  },
  mounted () {
    this.initPages()

    // bind event
    let $el = this.$el

    $el.addEventListener('touchstart', this.touchStart, false)
    $el.addEventListener('touchmove', this.touchMove, false)
    $el.addEventListener('touchend', this.touchEnd, false)
  },
  destroyed () {}
}
</script>
<style lang="stylus">
@import '../../assets/styles/swiper/index.styl'

</style>
