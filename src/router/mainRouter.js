import message from '@/main/message'
import userInfo from '@/main/userInfo'
import indexPage from '@/main/indexPage'
import test from '@/main/test'

export default[
  {
    path: '',
    component: indexPage
  },
  {
    path: 'index',
    component: indexPage
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
    path: 'test',
    component: test,
  }
]
