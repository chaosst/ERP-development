import Vue from 'vue'
import Router from 'vue-router'
import login from '@/main/login'
import index from '@/main/index'
import register from '@/main/register'
import forgetPwd from '@/main/forgetPwd'
import inIndex from '@/main/inIndex'

//模块路由文件
import warehouse from './warehouseRouter'
import main from './mainRouter'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'inIndex',
      path: '/main',
      component: inIndex,
      children:[
        ...main,
        ...warehouse
      ]
    }
  ]
})
