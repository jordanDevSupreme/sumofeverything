import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Blog from '../components/Blog.vue';
import Shop from '../components/Shop.vue';
import Download from '../components/Download.vue';
import EntryDetail from '../components/EntryDetail.vue';
const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: Blog },
  { path: '/shop', component: Shop },
  { path: '/download', component: Download },
  {path: '/entry/:id', name: 'entryDetail', component: EntryDetail}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
