import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import VoorkeurView from '../views/VoorkeurView.vue';
import RestaurantView from '@/views/RestaurantView.vue';
import GroepView from '@/views/GroepView.vue';
import MaakGroepView from '@/views/MaakGroepView.vue';
import LinkView from '@/views/LinkView.vue';
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
      path: '/link/:token',
      name: 'link-token',
      component: LinkView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isLoggedIn;
  const redirectUrl = localStorage.getItem('redirectUrl');

  console.log('isAuthenticated', isAuthenticated);
  console.log('redirectUrl', redirectUrl);
  console.log('to.path', to.path);
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


export default router;
