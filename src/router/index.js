import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Swiper from '@/pages/swiper'
import Message from '@/pages/message'
import LeftSlide from '@/pages/leftSlide'
import VbDialog from '@/pages/dialog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/swiper',
      name: 'Swiper',
      component: Swiper
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/leftslide',
      name: 'LeftSlide',
      component: LeftSlide
    },
    {
      path: '/dialog',
      name: 'Dialog',
      component: VbDialog
    }
  ]
})
