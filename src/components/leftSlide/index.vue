<template lang="pug">
.container
  .page-title 滑动组件
  ul
    li.list-item(v-for='(item,index) in list ', data-type='0')
      .list-box(@touchstart.capture='touchStart', @touchend.capture='touchEnd', @click='skip')
        img.list-img(:src='item.imgUrl', alt='')
        .list-content
          p.title {{item.title}}
          p.tips {{item.tips}}
          p.time {{item.time}}
      .delete(@click='deleteItem', :data-index='index') 删除
</template>

<script>
export default{
  name: 'index',
  data () {
    return {
      list: [
        {
          title: 'Chrome更新了',
          imgUrl: './static/images/Chrome.png',
          tips: '不再支持Flash视频播放',
          time: '上午 8:30'
        },
        {
          title: '电影新资讯',
          imgUrl: './static/images/Sina.png',
          tips: '电影《红海行动》上映以来票房暴涨，很多国人表示对国产电影有了新的改观',
          time: '上午 12:00'
        },
        {
          title: '聚焦两会·共筑中国梦',
          imgUrl: './static/images/video.png',
          tips: '习近平代表的两会故事',
          time: '下午 17:45'
        },
        {
          title: '微信团队',
          imgUrl: './static/images/Wechat.png',
          tips: '您的帐号有异常登录，如非本人操作，请及时修改密码',
          time: '昨天'
        }
      ],
      startX: 0,
      endX: 0
    }
  },
  methods: {
    // 跳转
    skip () {
      if (this.checkSlide()) {
        this.restSlide()
      } else {
        alert('You click the slide!')
      }
    },
    // 滑动开始
    touchStart (e) {
      console.log(e)
      this.startX = e.touches[0].clientX
    },
    // 滑动结束
    touchEnd (e) {
      let parentElement = e.currentTarget.parentElement
      console.log(parentElement)
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
        if (listItems[i].dataset.type === 1) {
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
      this.restSlide()
      this.list.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped="">
@import '../../assets/styles/leftSlide/index.styl';
</style>
