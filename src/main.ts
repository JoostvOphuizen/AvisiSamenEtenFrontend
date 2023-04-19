import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import './assets/main.css'


const app = createApp(App)

app.use(router)

app.use(vue3GoogleLogin, {
    clientId: '803841872814-pv42lrb233jb0ct4pcksr3t464gcdu0f.apps.googleusercontent.com'
})

app.mount('#app')









