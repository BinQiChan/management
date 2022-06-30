import {defineStore} from 'pinia'
import { UserType } from './type'
import { login, loginByToken } from '@/api/Auth'
import { ElMessage} from 'element-plus'
import 'element-plus/es/components/message/style/css'
import router from '@/router'
import {menuStore} from './menuStore'
import { buttonStore } from './buttonStore'

export interface AuthState {
    token: string,
    userInfo: UserType,
    roles: number[]
}

// 定义容器
export const authStore = defineStore('auth',{
    state: ():AuthState => ({ 
        token: '',
        userInfo: {
            avatar: '',
            username: '',
            roleName: '',
            status: 1
        },
        roles: []
     }),
    
     actions: {
        login(requestUser:API.loginForm) {
            login(requestUser).then(result => {
                this.userInfo = result.data
                this.roles.push(result.data.roleId)
                this.token = result.data.token
                localStorage.setItem('token', result.data.token)
            
                const useMenuStore = menuStore()
                useMenuStore.generateSystemMenus(result.data.permissions)
                const useButtonStore = buttonStore()
                useButtonStore.generateButtons(result.data.permissions)
                console.log(result);
                if (result.data.status) {
                    ElMessage({
                        message: '登录成功',
                        type: 'success',
                      })
                    router.push({ path: '/index' })
                }

            })   
        },

         // token登录
         loginByToken( token:string) {
            this.token = token
            loginByToken(token).then(result => {
                this.userInfo = result.data
                this.roles.push(result.data.roleId)
                localStorage.setItem('token', result.data.token)
               
                const useMenuStore = menuStore()
                useMenuStore.generateSystemMenus(result.data.permissions)
                const useButtonStore = buttonStore()
                useButtonStore.generateButtons(result.data.permissions)
                console.log(result)
                if (result.data.status) {
                    router.push({ path: '/index' })
                }
            }).catch(() => {
                localStorage.removeItem('token')
            })
        },

        changePermisson(permissions:string[]) {
            const useMenuStore = menuStore()
            useMenuStore.generateSystemMenus(permissions)
            const useButtonStore = buttonStore()
            useButtonStore.generateButtons(permissions)
        }
    }
})