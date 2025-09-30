import { defineStore } from 'pinia'
import api from '@/api'
import { toast } from 'vue-sonner'
interface User<TDepartment, TCompany> {
    name: string
    email: string
    department: TDepartment
    company: TCompany
}

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isSubmitting: false as boolean,
            isOpenDialog: false as boolean,
            user: [] as User<{ name: string }, { name: string }>[],
        }
    },
    actions: {
        async getUser() {
            try {
                const response = await api.get('/api/user/all')
                this.user = response.data.data

                return this.user
            } catch (error: any) {
                toast.error(error.response.data.message, { position: 'top-right' })
            }
        },
        async handleStoreUser() {
            try {
                // console.log('submitted')
                this.isSubmitting = true
                // this.isOpenDialog = false

                // setTimeout(() => {
                //     this.isSubmitting = false
                // }, 1000)
            } catch (error: any) {
                toast.error(error.response.data.message, { position: 'top-right' })
            }
        },
    },
})
