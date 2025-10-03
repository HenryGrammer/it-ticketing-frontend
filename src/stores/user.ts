import { defineStore } from 'pinia'
import api from '@/api'
import { toast } from 'vue-sonner'
import type { ServerOptions, Header } from 'vue3-easy-data-table'

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
    id: number
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
            isOpenCreateDialog: false as boolean,
            isOpenUpdateDialog: false as boolean,
            isConfirm: false as boolean,

            user: [] as User<{ name: string }, { name: string }>[],
            department: [] as Dropdown[],
            company: [] as Dropdown[],
            userForm: {} as UserForm,
            errors: {} as Error,
            isActivateOrDeactivate: '' as string,

            // DataTable
            tableHeader: [
                { text: 'Action', value: 'action' },
                { text: 'Name', value: 'name' },
                { text: 'Email', value: 'email' },
                { text: 'Company', value: 'company.name' },
                { text: 'Department', value: 'department.name' },
                { text: 'Status', value: 'status' },
            ] as Header[],
            loading: false as boolean,
            serverItemsLength: 0 as number,
            serverOptions: {
                page: 1,
                rowsPerPage: 10,
                sortType: 'desc',
                sortBy: 'id',
            } as ServerOptions,

            // Search
            searchField: [
                'name',
                'email',
                'department.name',
                'company.name',
                'status',
            ] as Array<string>,
            searchValue: '' as string,
        }
    },
    actions: {
        resetForm() {
            this.userForm.name = ''
            this.userForm.email = ''
            this.userForm.department = null
            this.userForm.company = null
            this.userForm.id = 0

            this.isOpenCreateDialog = true
        },
        closeDialog(action: string) {
            if (action == 'edit') {
                this.isOpenUpdateDialog = false
            } else {
                this.isOpenCreateDialog = false
            }
        },
        confirm(action: string, id: number) {
            if (action == 'isDeactivate') {
                this.isActivateOrDeactivate = 'deactivate'
                this.isConfirm = true
            } else if (action == 'isActivate') {
                this.isActivateOrDeactivate = 'activate'
                this.isConfirm = true
            } else {
                this.isConfirm = false
            }

            this.userForm.id = id
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
                        search: this.searchValue,
                    },
                })

                this.user = response.data.items.data
                this.company = response.data.companies
                this.department = response.data.departments
                this.serverItemsLength = response.data.items.total
            } catch (error: any) {
                toast.error(error.response.data.message, { position: 'top-right' })
            } finally {
                this.loading = false
            }
        },
        async handleStoreUser() {
            this.isSubmitting = true

            try {
                const response = await api.post('api/users/store', this.userForm)

                if (response.data.status == 'error') {
                    toast.error(response.data.msg, { position: 'top-right' })
                } else {
                    toast.success(response.data.message, { position: 'top-right' })
                    // this.isOpenDialog = false

                    this.userForm.name = ''
                    this.userForm.email = ''
                    this.userForm.company = null
                    this.userForm.department = null

                    await this.getUser()
                }
            } catch (error: any) {
                if (error.status != 422) {
                    toast.error(error.response.statusText, { position: 'top-right' })
                } else {
                    this.errors = error.response.data.errors
                }
            } finally {
                this.isSubmitting = false
            }
        },
        async handleEditUser(id: number) {
            try {
                const response = await api.get(`/api/users/edit/${id}`)
                const data = response.data

                this.userForm.name = data.user.name
                this.userForm.email = data.user.email
                this.userForm.company = data.user.company_id
                this.userForm.department = data.user.department_id
                this.userForm.id = data.user.id

                this.isOpenUpdateDialog = true
            } catch (error) {
                console.error()
            }
        },
        async handleUpdateUser(id: number) {
            this.isSubmitting = true

            try {
                const response = await api.post(`api/users/update/${id}`, this.userForm)
                const data = response.data
                if (data.status == 'error') {
                    toast.error(data.msg, { position: 'top-right' })
                } else {
                    toast.success(data.message, { position: 'top-right' })
                    this.isOpenUpdateDialog = false

                    await this.getUser()
                }
            } catch (error: any) {
                if (error.status != 422) {
                    toast.error(error.response.statusText, { position: 'top-right' })
                } else {
                    this.errors = error.response.data.errors
                }
            } finally {
                this.isSubmitting = false
            }
        },
        async handleDeactivateAccount(id: number) {
            try {
                this.isSubmitting = true

                const response = await api.post(`api/users/deactivate/${id}`)
                const data = response.data

                toast.success(data.message, { position: 'top-right' })
                this.confirm('close', id)

                this.getUser()
            } catch (error) {
            } finally {
                this.isSubmitting = false
            }
        },

        async handleActivateAccount(id: number) {
            try {
                this.isSubmitting = true

                const response = await api.post(`api/users/activate/${id}`)
                const data = response.data

                toast.success(data.message, { position: 'top-right' })
                this.confirm('close', id)

                this.getUser()
            } catch (error) {
            } finally {
                this.isSubmitting = false
            }
        },
    },
})
