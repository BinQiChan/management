import Layout from '@/layout/index.vue'
import {RouteRecordRaw} from 'vue-router'


const userRouter:RouteRecordRaw = {
    path: '/user',
    redirect: '/user/manger',
    name: 'User',
    component:Layout,
    meta: {
      title: 'menus.wUserManger',
      icon:'UserFilled',
      permission: "system:user",
    },
    children: [
      {
        path: 'manger',
        name: 'UserManger',
        component:() => import('@/views/user/User.vue'),
        meta: {
          title: 'menus.wUserManger',
          icon:'UserFilled',
          permission: "system:user",
          index:1
        },
        
      },
    ],
  }

 export default userRouter