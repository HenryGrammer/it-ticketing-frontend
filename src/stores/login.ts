import { defineStore } from 'pinia'
import api from '@/api'
import { toast } from 'vue-sonner'

interface loginForm {
    email: string
    password: string
}

interface Error {
    email: string[]
    password: string[]
}

export const useLoginStore = defineStore('login', {
    state: () => {
        return {
            loginForm: {
                email: '',
                password: '',
            } as loginForm,
            errors: {} as Error,
            isDisabled: false as boolean,
        }
    },
    actions: {
        async login() {
            try {
                this.isDisabled = true
                await api.get('/sanctum/csrf-cookie')
                const response = await api.post('/api/login', this.loginForm)
                if (response.data.status == 400) {
                    toast.error(response.data.message, { position: 'top-right' })
                } else {
                    toast.success(response.data.message, { position: 'top-right' })
                }

                localStorage.setItem('user', response.data.user)
            } catch (error: any) {
                this.errors = error.response.data.errors
            } finally {
                this.isDisabled = false
            }
        },

        async logoutUser() {
            try {
                const response = await api.post('/api/logout')
                localStorage.removeItem('user')

                toast.success(response.data.message, { position: 'top-right' })
            } catch (error) {
                toast.error('Whoops! There as an error', { position: 'top-right' })
            }
        },
    },
})
