import { useLoginStore } from '@/stores/login'
import Login from '@/views/Auth/Login.vue'
import Company from '@/views/Company/Company.vue'
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
        {
            path: '/company',
            name: 'company',
            component: Company,
            meta: {
                requiredAuth: true,
            },
        },
    ],
})

router.beforeEach(async (to, from) => {
    const userStore = useLoginStore()

    if (!userStore.user) {
        await userStore.fetchUser()
    }

    if (to.meta.requiredAuth && !userStore.user) {
        return { path: '/' }
    }

    if (!to.meta.requiredAuth && userStore.user) {
        return { path: '/home' }
    }
})

export default router
