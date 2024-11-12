import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router';
import Dashboard from '@/pages/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Dashboard,
    children: []
  }
];
export const router = createRouter({
  history: createMemoryHistory(),
  routes
});
