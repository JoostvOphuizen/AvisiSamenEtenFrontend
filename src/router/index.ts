import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import VoorkeurView from '../views/VoorkeurView.vue'
import RestaurantView from "@/views/RestaurantView.vue";
import GroepView from "@/views/GroepView.vue";
import MaakGroepView from "@/views/MaakGroepView.vue";

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: VoorkeurView
    },
    {
      path: '/restaurant?id=:id',
      name: 'restaurant',
      component: RestaurantView
    },
    {
      path: '/groep',
      name: 'groep',
      component: GroepView
    },
    {
      path: '/maakgroep',
      name: 'maak groep',
      component: MaakGroepView
    }
  ]
})

export default router
