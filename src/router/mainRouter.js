import message from '@/main/system/message'
import userInfo from '@/main/system/userInfo'
import indexPage from '@/main/system/indexPage'

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
  }
]
