import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Swiper from '@/pages/swiper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/swiper',
      name: 'Swiper',
      component: Swiper
    }
  ]
})
