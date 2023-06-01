import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import VoorkeurView from '../views/VoorkeurView.vue';
import RestaurantView from '@/views/RestaurantView.vue';
import GroepView from '@/views/GroepView.vue';
import MaakGroepView from '@/views/MaakGroepView.vue';
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
      path: '/link',
      name: 'link',
      component: LinkCreateView,
      meta: { requiresAuth: true },
    },
    {
      path: '/link?token=:token',
      name: 'link-token',
      component: LinkView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isLoggedIn;
  const redirectUrl = localStorage.getItem('redirectUrl');

  if (!isAuthenticated && to.path !== '/login') {
    localStorage.setItem('redirectUrl', to.fullPath);
    next('/login');
  } else if (isAuthenticated && redirectUrl) {
    localStorage.removeItem('redirectUrl');
    next(redirectUrl);
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  const specificPageName = 'link-token'; 
  const desiredPage = '/'; 

  if (from.name === specificPageName && to.name !== specificPageName) {
    router.replace(desiredPage);
  }
});

export default router;
