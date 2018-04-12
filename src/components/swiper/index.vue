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
      items: []
    }
  },
  mounted () {
    this.initItems()
  },
  methods: {
    initItems () {
      const $el = this.$refs.swiperUl.children
      for (var i = 0; i < $el.length; i++) {
        this.items.push($el[i])
      }
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/styles/swiper/index.styl';
</style>
