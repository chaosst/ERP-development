import putInStorage from '@/main/warehouse/procurement/cgrk/putInStorage'
import putInStorageEdit from '@/main/warehouse/procurement/cgrk/putInStorageEdit'
import qckc from '@/main/warehouse/periodStart/qckc/qckcManage'
import qckcEdit from '@/main/warehouse/periodStart/qckc/qckcEdit'

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
  {
    name:"qckc",
    path: 'qckc',
    component: qckc,
    children:[
      {
        path: 'edit',
        component: qckcEdit,
      }
    ]
  },
]
