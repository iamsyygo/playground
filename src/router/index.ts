import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '',
    children: []
  }
];
export const router = createRouter({
  history: createMemoryHistory(),
  routes
});
