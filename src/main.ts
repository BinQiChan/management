
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store,key} from './store'
import * as ElIcons from '@element-plus/icons'
import * as ElementUI from 'element-plus'
import i18n from './i18n'
import { createPinia } from 'pinia'
import 'default-passive-events'
import { buttonStore } from './pinia/buttonStore' 


const app = createApp(App)
for(const name in ElIcons ) {
    app.component(name,(ElIcons as any)[name])
}
app.use(router).use(store,key).use(createPinia()).use(i18n).mount('#app')


const useButtonStore = buttonStore()

// 自定义指令,如果没有权限按钮无法看到
app.directive('btn',{
    // 当元素挂载dom
    mounted(el,binding) {
        
        // if(!store.state.buttonStore.buttonList.includes(binding.value)){
        //     el.parentNode.removeChild(el)
        // }

        if(!useButtonStore.buttonList.includes(binding.value)){
            el.parentNode.removeChild(el)
        }
    }
})



declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $Alert: (a:string)=>Promise<void>
        $Notify:any,
        $Confirm:(a:string)=>Promise<void>,
        $collapsed:boolean
    }
  }
  
app.config.globalProperties.$Alert = ElementUI.ElMessageBox.alert 
app.config.globalProperties.$Confirm = ElementUI.ElMessageBox.confirm
app.config.globalProperties.$Notify = ElementUI.ElNotification
app.config.globalProperties.$collapsed = true
app.config.globalProperties.ZZ = ElementUI.ElMessage
