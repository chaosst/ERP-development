import Vue from 'vue'
import Router from 'vue-router'
import login from '@/main/system/login'
import index from '@/main/system/index'
import register from '@/main/system/register'
import forgetPwd from '@/main/system/forgetPwd'
import inIndex from '@/main/system/inIndex'

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
