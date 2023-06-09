import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import store from './store'

import './assets/main.css'



createApp(App)
    .use(vue3GoogleLogin, {clientId: ''})
    .use(router)
    .use(store)
    .mount('#app')
