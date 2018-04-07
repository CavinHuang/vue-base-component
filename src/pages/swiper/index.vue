<template lang="pug">
div(style="position:relative;width:100%;height:200px;")
  swiper
    swiper-item
      <div class="slide-dbg gbg1">第一页</div>
    swiper-item
      <div class="slide-dbg gbg2">第二页</div>
    swiper-item
      <div class="slide-dbg gbg3">第三页</div>
    swiper-item
      <div class="slide-dbg gbg4">第四页</div>
    swiper-item
      <div class="slide-dbg gbg1">第五页</div>
</template>

<script>
import swiper from '@/components/swiper'
import swiperItem from '@/components/swiper/item/swiper-item'
export default {
  components: {
    swiper,
    swiperItem
  }
}
</script>

<style lang="stylus">
.slide-demo
  width 100%
  height 200px
  margin-bottom 20px
.slide-dbg
  line-height 200px
  font-size 20px
  text-align center
  color #fff
.gbg1
  background-color #00aeae
.gbg2
  background-color #ff77ff
.gbg3
  background-color #79ff79
.gbg4
  background-color #ff7575

</style>
