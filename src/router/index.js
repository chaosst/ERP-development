import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import index from '@/components/index'
import register from '@/components/register'
import forgetPwd from '@/components/forgetPwd'
import message from '@/components/message'
import putInStorage from '@/purchase/putInStorage'
import putInStorageEdit from '@/purchase/putInStorageEdit'
import inIndex from '@/components/inIndex'
import userInfo from '@/components/userInfo'
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
        {
          path: '',
          component: HelloWorld
        },
        {
          path: 'index',
          component: HelloWorld
        },
        {
          path: 'message',
          component: message,
        },
        {
          path: 'userInfo',
          component: userInfo,
        },
        {
          name:"putInStorage",
          path: 'putInStorage',
          component: putInStorage,
          children:[
            {
              path: 'edit',
              component: putInStorageEdit,
            }
          ]
        },
      ]
    }
  ]
})
