import Login from '@/views/Auth/Login.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User/User.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/user',
            name: 'user',
            component: User,
        },
    ],
})

export default router
