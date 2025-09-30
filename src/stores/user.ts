import { defineStore } from 'pinia'
import api from '@/api'
import { toast } from 'vue-sonner'
interface User<TDepartment, TCompany> {
    name: string
    email: string
    department: TDepartment
    company: TCompany
}

interface Dropdown {
    id: number
    code: string
}

interface UserForm {
    name: string
    email: string
    department: number
    company: number
}

interface Error {
    name: Array<string>
    email: Array<string>
    department: Array<string>
    company: Array<string>
}

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isSubmitting: false as boolean,
            isOpenDialog: false as boolean,
            user: [] as User<{ name: string }, { name: string }>[],
            department: [] as Dropdown[],
            company: [] as Dropdown[],
            userForm: {} as UserForm,
            errors: {} as Error,
        }
    },
    actions: {
        async getUser() {
            try {
                const response = await api.get('/api/user/all')

                this.user = response.data.data
                this.company = response.data.companies
                this.department = response.data.departments
            } catch (error: any) {
                toast.error(error.response.data.message, { position: 'top-right' })
            }
        },
        async handleStoreUser() {
            try {
                this.isSubmitting = true

                const response = await api.post('api/user/store', this.userForm)

                if (response.data.status == 'error') {
                    toast.error(response.data.msg, { position: 'top-right' })
                } else {
                    toast.success(response.data.message, { position: 'top-right' })
                    this.isOpenDialog = false
                }
            } catch (error: any) {
                if (error.status != 422) {
                    toast.error(error.response.statusText, { position: 'top-right' })
                } else {
                    this.errors = error.response.data.errors
                }
            } finally {
                // this.isOpenDialog = false
                this.isSubmitting = false
            }
        },
    },
})
