<template lang="pug">
div.swiper-warrp
  ul.swiper-contaner
    slot
  .swiper-dots(v-show='showDots')
    .swiper-dot(v-for='(page, $index) in pages', :class="{ 'dot-active': $index == index }", :key='$index')

</template>

<script>
import {addClass, removeClass, animationFrame} from '@/utils/dom.js'
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
    }
  },
  methods: {
    initPages () {
      let childrenEle = this.$children
      this.currentIndex = Math.abs(this.defaultIndex) < childrenEle.length ? this.defaultIndex : 0
      let pages = []
      childrenEle.forEach((item, index) => {
        pages.push(item)
        // removeClass
        removeClass('slide-active')

        if (this.currentIndex === index) addClass(item.$el, 'slide-active')
      })
    }
  },
  mounted () {
    this.initPages()
  },
  destroyed () {}
}
</script>
<style lang="stylus">
@import '../../assets/styles/swiper/index.styl'

</style>
