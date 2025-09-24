import { defineStore } from 'pinia'
import api from '@/api'
import axios from 'axios'

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
            alertMessage: '' as string,
        }
    },
    actions: {
        async login() {
            try {
                await api.get('/sanctum/csrf-cookie')
                const response = await api.post('/api/login', this.loginForm)

                if (response.data.status == 400) {
                    this.alertMessage = response.data.message
                }
            } catch (error: any) {
                this.errors = error.response.data.errors
            }
        },
        async logoutUser() {
            try {
                // const response = await api.post('/api/logout')
                // console.log(response.data)
                console.log('asdaddasdasd')
            } catch (error) {
                console.error(error)
            }
        },
    },
})
