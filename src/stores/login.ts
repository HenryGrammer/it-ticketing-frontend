import { defineStore } from 'pinia'
import api from '@/api'

interface loginForm {
    email: string
    password: string
}

export const useLoginStore = defineStore('login', {
    state: () => {
        return {
            loginForm: {
                email: '',
                password: '',
            } as loginForm,
        }
    },
    actions: {
        async login() {
            try {
                const response = await api.post('login', this.loginForm)

                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        },
    },
})
