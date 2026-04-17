import { createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/item/:id',
    name: 'itemDetail',
    // route level code-splitting
    component: Detail

  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

