import { defineStore } from 'pinia'
import api from '@/api'
import { boolean } from 'zod/v4'

interface User {
    email: string
    password: string
}

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            // loginForm: {
            //     email: '',
            //     password: '',
            // } as loginForm,
            isSubmitting: false as boolean,
            isOpenDialog: false as boolean,
            user: [],
        }
    },
    actions: {
        async getUser() {
            try {
                const response = await api.get('/api/user/all')
            } catch (error) {
                console.error(error)
            }
        },
        async handleStoreUser() {
            try {
                // console.log('submitted')
                this.isSubmitting = true
                this.isOpenDialog = false

                setTimeout(() => {
                    this.isSubmitting = false
                }, 1000)
            } catch (error) {
                console.error(error)
            }
        },
    },
})
