import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import index from '@/components/index'
import cmp2 from '@/components/cmp2'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'index',
      component: index,
      children: [
        {
          path: 'index',
          component: HelloWorld
        },
        {
          path: '',
          redirect: 'index'
        },
        {
          path: 'cmp2',
          component: cmp2
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      redirect: '/login'
    },
  ]
})
