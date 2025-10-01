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
            meta: {
                requiredAuth: true,
            },
        },
        {
            path: '/user',
            name: 'user',
            component: User,
            meta: {
                requiredAuth: true,
            },
        },
    ],
})

router.beforeEach((to, from) => {
    const user = localStorage.getItem('user')

    if (to.meta.requiredAuth && !user) {
        return { path: '/' }
    }

    if (!to.meta.requiredAuth && user) {
        return { path: '/home' }
    }
})

export default router
