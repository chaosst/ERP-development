import putInStorage from '@/warehouse/putInStorage'
import putInStorageEdit from '@/warehouse/putInStorageEdit'

export default[
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
