<template lang="pug">
.list-item(data-type='0')
    .list-box(:data-index='index' @touchstart.capture='touchStart', @touchend.capture='touchEnd', @click='skip')
      slot(name="content")
    .delete(@click='deleteItem', :data-index='index') 删除
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  name: 'leftSlideItem',
  data () {
    return {
      startX: 0,
      endX: 0
    }
  },
  methods: {
    // 跳转
    skip (e) {
      if (this.checkSlide()) {
        this.restSlide()
      } else {
        let index = e.currentTarget.dataset.index
        this.$emit('itemClickAction', e, index)
      }
    },
    // 滑动开始
    touchStart (e) {
      this.startX = e.touches[0].clientX
    },
    // 滑动结束
    touchEnd (e) {
      let parentElement = e.currentTarget.parentElement
      this.endX = e.changedTouches[0].clientX
      if (parentElement.dataset.type * 1 === 0 && this.startX - this.endX > 30) {
        this.restSlide()
        parentElement.dataset.type = 1
      }
      if (parentElement.dataset.type * 1 === 1 && this.startX - this.endX < -30) {
        this.restSlide()
        parentElement.dataset.type = 0
      }
      this.startX = 0
      this.endX = 0
    },
    // 判断当前是否有滑块处于滑动状态
    checkSlide () {
      let listItems = document.querySelectorAll('.list-item')
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type * 1 === 1) {
          return true
        }
      }
      return false
    },
    // 一次只能滑动一个
    restSlide () {
      let listItems = document.querySelectorAll('.list-item')
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0
      }
    },
    // 删除
    deleteItem (e) {
      let index = e.currentTarget.dataset.index
      this.$emit('deleteAction', index, e)
    }
  }
}
</script>
