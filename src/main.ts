import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

import './assets/main.css'


const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId: '677713096748-q92ovvf77ohrugdfsntmf25uiaqbf45q.apps.googleusercontent.com'
})


app.use(router)

app.mount('#app')
