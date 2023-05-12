import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import VoorkeurView from '../views/VoorkeurView.vue'
import GroepView from '../views/GroepView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/voorkeur',
      name: 'voorkeur',
      component: VoorkeurView
    },
    {
      path: '/groep',
      name: 'groep',
      component: GroepView
    }
  ]
})

export default router
