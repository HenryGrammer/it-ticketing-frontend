import { defineStore } from 'pinia'
import api from '@/api'
import { toast } from 'vue-sonner'
import type { ServerOptions, Header } from 'vue3-easy-data-table'
import { ref } from 'vue'

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
    department: number | null
    company: number | null
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

            // DataTable
            tableHeader: [
                { text: 'Action', value: 'action' },
                { text: 'Name', value: 'name' },
                { text: 'Email', value: 'email' },
                { text: 'Company', value: 'company.name' },
                { text: 'Department', value: 'department.name' },
            ] as Header[],
            loading: false as boolean,
            serverItemsLength: 0 as number,
            serverOptions: {
                page: 1,
                rowsPerPage: 10,
                sortType: 'desc',
                sortBy: 'id',
            } as ServerOptions,
        }
    },
    actions: {
        resetForm() {
            this.userForm.name = ''
            this.userForm.email = ''
            this.userForm.department = null
            this.userForm.company = null
        },
        async getUser() {
            this.loading = true

            try {
                const response = await api.get('/api/users/all', {
                    params: {
                        page: this.serverOptions.page,
                        limit: this.serverOptions.rowsPerPage,
                        sortType: this.serverOptions.sortType,
                        sortBy: this.serverOptions.sortBy,
                    },
                })

                this.user = response.data.items.data
                this.company = response.data.companies
                this.department = response.data.departments
                this.serverItemsLength = response.data.items.total
            } catch (error) {
                console.error(error)
            } finally {
                this.loading = false
            }
        },
        async handleStoreUser() {
            try {
                this.isSubmitting = true

                const response = await api.post('api/users/store', this.userForm)

                if (response.data.status == 'error') {
                    toast.error(response.data.msg, { position: 'top-right' })
                } else {
                    toast.success(response.data.message, { position: 'top-right' })
                    this.isOpenDialog = false

                    this.userForm.name = ''
                    this.userForm.name = ''
                    this.userForm.name = ''
                    this.userForm.name = ''

                    await this.getUser()
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
