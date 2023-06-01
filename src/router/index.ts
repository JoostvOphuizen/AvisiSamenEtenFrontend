import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import VoorkeurView from '../views/VoorkeurView.vue'
import RestaurantView from "@/views/RestaurantView.vue";
import GroepView from "@/views/GroepView.vue";
import MaakGroepView from "@/views/MaakGroepView.vue";
import AllRestaurantsView from "@/views/AllRestaurantsView.vue";
import ReviewView from "@/views/ReviewView.vue";
import LinkView from '@/views/LinkView.vue';
import LinkCreateView from '@/views/LinkCreateView.vue';
import store from '@/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: true },
    },
    {
      path: '/voorkeur',
      name: 'voorkeur',
      component: VoorkeurView,
      meta: { requiresAuth: true },
    },
    {
      path: '/restaurant',
      name: 'restaurant',
      component: RestaurantView,
      props: (route) => ({ restaurant_id: route.query.restaurant_id }),
      meta: { requiresAuth: true },
    },
    {
      path: '/groep',
      name: 'groep',
      component: GroepView,
      meta: { requiresAuth: true },
    },
    {
      path: '/maakgroep',
      name: 'maak groep',
      component: MaakGroepView,
      meta: { requiresAuth: true },
    },
    {
      path: '/allrestaurants',
      name: 'alle restauranten',
      component: AllRestaurantsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/review',
      name: 'review',
      component: ReviewView,
      props: (route) => ({ id: route.query.id }),
      meta: { requiresAuth: true },
    },
    {
      path: '/createlink',
      name: 'link',
      component: LinkCreateView,
      meta: { requiresAuth: true },
    },
    {
      path: '/link',
      name: 'link-token',
      component: LinkView,
      meta: { requiresAuth: true },
      props: (route) => ({ token: route.query.token }),
    },
    {
      path: '/allrestaurants',
      name: 'alle restauranten',
      component: AllRestaurantsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/review',
      name: 'review',
      component: ReviewView,
      meta: { requiresAuth: true },
      props: (route) => ({ id: route.query.id })
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log("from:",from.name);
  console.log("to:",to.name);
  const isAuthenticated = store.getters.isLoggedIn;
  const redirectUrl = localStorage.getItem('redirectUrl');

  if (!isAuthenticated && to.path !== '/login') {
    localStorage.setItem('redirectUrl', to.fullPath);
    next('/login');
  } else if (isAuthenticated && redirectUrl) {
    localStorage.removeItem('redirectUrl');
    next(redirectUrl);
  } else {
    if(from.name === 'link-token' && to.name === 'link') {
      next('/');
      return;
    }
    next();
  }
});


export default router;
