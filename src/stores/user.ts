import { defineStore } from 'pinia'
import api from '@/api'
import { toast } from 'vue-sonner'
interface User {
    name: string
    email: string
    department: string
    company: string
}

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isSubmitting: false as boolean,
            isOpenDialog: false as boolean,
            user: [] as User[],
        }
    },
    actions: {
        async getUser() {
            try {
                const response = await api.get('/api/user/all')

                this.user = response.data
            } catch (error: any) {
                toast.error(error.response.data.message, { position: 'top-right' })
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
            } catch (error: any) {}
        },
    },
})
