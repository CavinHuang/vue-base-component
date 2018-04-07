<template lang="pug">
div.swiper-warrp
  ul.swiper-contaner
    slot
  .swiper-dots(v-show='showDots')
    .swiper-dot(v-for='(page, $index) in pages', :class="{ 'dot-active': $index == index }", :key='$index')

</template>

<script>
import {addClass, removeClass} from '@/utils/dom.js'
export default {
  name: 'Swiper',
  props: {
    showDots: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      pages: []
    }
  },
  mounted () {
    this.initPages()
  },
  methods: {
    /**
     * 初始化子组件
     */
    initPages () {
      const children = this.$children
      const pages = []
      console.log(children)
      this.index = Math.abs(this.defaultIndex) < children.length ? this.defaultIndex : 0
      children.forEach((child, $index) => {
        pages.push(child.$el)
        removeClass(child.$el, 'slide-active')
        if ($index === this.index) addClass(child.$el, 'slide-active')
      })
      this.pages = pages
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/styles/swiper/index.styl'

</style>
