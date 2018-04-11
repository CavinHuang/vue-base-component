<template lang="pug">
div.swiper-container
  div.swiper-warrp
    ul.swiper-ul
      slot
  div.swiper-dots
    span.swiper-dot-item(v-for="(item, $index) in items")
  div.swiper-slide-arrow
    div.swiper-slide-left
      span.swiper-arrow-left
    div.swiper-slide-right
      span.swiper-arrow-right
</template>

<script>

export default {
  name: 'swiper',
  data () {
    return {
      items: [1, 2, 3]
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/styles/swiper/index.styl';
</style>
