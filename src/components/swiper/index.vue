<template lang="pug">
div.swiper-container
  div.swiper-warrp
    ul.swiper-ul(:style="containerStyle", @transitionend="transitionEndHandel" ref="swiperUl")
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
  data () {
    return {
      warrpEle: null,
      containerStyle: {},
      items: [],
      count: 0,
      currentIndex: 1,
      distance: 375
    }
  },
  computed: {},
  watch: {},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.initItems()
      this.distance = window.innerWidth
      this.containerStyle = {
        transform: `translate3d(-${this.distance}px, 0, 0)`,
        width: this.count * this.distance + 'px',
        transition: 'none'
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
      for (var i = 0; i < len; i++) {
        children[i].style.width = this.distance + 'px'
        this.items.push(children[i])
      }
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
      this.$refs.swiperUl.appendChild(head)
      this.$refs.swiperUl.insertBefore(tail, this.items[0])
      this.items = toArray(this.$refs.swiperUl.children)
      this.count = this.items.length
    },
    doTranslate () {
      this.containerStyle.transform = `translate3d(-${this.currentIndex * this.distance}px, 0, 0)`
      this.containerStyle.transition = '200ms transform'
    },
    prev () {
      this.currentIndex--
      this.doTranslate()
    },
    next () {
      this.currentIndex++
      this.doTranslate()
    },
    transitionEndHandel () {
      if (this.currentIndex < 1) {
        this.currentIndex = this.count - 2
      }
      if (this.currentIndex > this.count - 2) {
        this.currentIndex = 1
      }
      this.containerStyle.transform = `translate3d(-${this.currentIndex * this.distance}px, 0, 0)`
      this.containerStyle.transition = 'none'
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/styles/swiper/index.styl';
</style>
