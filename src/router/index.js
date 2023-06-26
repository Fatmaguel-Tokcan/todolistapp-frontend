import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateList from "@/views/CreateList";
import List from "@/views/List";
import SearchTodo from "@/views/SearchTodo";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/createList',
    name: 'createList',
    component: CreateList
  },
  {
    path: '/list',
    name: 'list',
    component: List
  },
  {
    path: '/search',
    name: 'search',
    component: SearchTodo
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
