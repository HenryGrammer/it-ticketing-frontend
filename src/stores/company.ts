import { defineStore } from 'pinia'
import type { ServerOptions, Header } from 'vue3-easy-data-table'
import api from '@/api'
import { toast } from 'vue-sonner'

interface Company {
    name: string
    id: number
    code: string
}

interface CompanyForm {
    id: null | number
    name: string
    code: string
}

interface Error {
    code?: Array<string>
    name?: Array<string>
}

const useCompanyStore = defineStore('company', {
    state: () => {
        return {
            company: [] as Array<Company>,
            companyForm: {} as CompanyForm,
            formError: {} as Error,
            isSubmitting: false as boolean,
            showModal: false as boolean,
            showAlert: false as boolean,
            mode: '' as string,

            // DataTable
            tableHeader: [
                { text: 'Action', value: 'action' },
                { text: 'Code', value: 'code' },
                { text: 'Name', value: 'name' },
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
        openModal() {
            this.mode = 'create'
            this.showModal = true

            this.companyForm.code = ''
            this.companyForm.name = ''
            this.formError = {}
        },
        openDeactivation(id: number) {
            this.mode = 'deactivate'
            this.showAlert = true
            this.companyForm.id = id
        },
        openActivation(id: number) {
            this.mode = 'activate'
            this.showAlert = true
            this.companyForm.id = id
        },
        async handleGetCompany() {
            try {
                this.loading = true

                const response = await api.get('api/companies/all', {
                    params: {
                        page: this.serverOptions.page,
                        limit: this.serverOptions.rowsPerPage,
                        sortType: this.serverOptions.sortType,
                        sortBy: this.serverOptions.sortBy,
                        search: this.searchValue,
                    },
                })
                const data = response.data

                this.company = data.items.data
                this.serverItemsLength = response.data.items.total
            } catch (error: any) {
                toast.error(error.response.data.message, { position: 'top-right' })
            } finally {
                this.loading = false
            }
        },
        async handleStoreCompany() {
            try {
                this.isSubmitting = true

                const response = await api.post('/api/companies/store', this.companyForm)
                const data = response.data

                if (data.status == 'error') {
                    toast.error(data.msg, { position: 'top-right' })
                } else {
                    toast.success(data.message, { position: 'top-right' })

                    this.companyForm.code = ''
                    this.companyForm.name = ''
                    this.showModal = false

                    await this.handleGetCompany()
                }
            } catch (error: any) {
                const response = error.response.data
                this.formError = response.errors
            } finally {
                this.isSubmitting = false
            }
        },
        async handleEditCompany(id: number) {
            try {
                this.showModal = true
                const response = await api.get(`/api/companies/edit/${id}`)
                const data = response.data.company

                this.companyForm.code = data.code
                this.companyForm.name = data.name
                this.companyForm.id = data.id
                this.mode = 'edit'
                this.formError = {}
            } catch (error) {}
        },
        async handleUpdateCompany(id: number | null) {
            try {
                this.isSubmitting = true

                const response = await api.post(`/api/companies/update/${id}`, this.companyForm)
                const data = response.data
                toast.success(data.message, { position: 'top-right' })

                this.showModal = false

                await this.handleGetCompany()
            } catch (error: any) {
                this.formError = error.response.data.errors
            } finally {
                this.isSubmitting = false
            }
        },
        async handleDeactivation(id: number | null) {
            try {
                this.isSubmitting = true
                const response = await api.post(`/api/companies/deactivate/${id}`)
                const data = response.data

                this.showAlert = false

                toast.success(data.message, { position: 'top-right' })
                await this.handleGetCompany()
            } catch (error) {
                console.error(error)
            } finally {
                this.isSubmitting = false
            }
        },
        async handleActivation(id: number | null) {
            try {
                this.isSubmitting = true
                const response = await api.post(`/api/companies/activate/${id}`)
                const data = response.data

                this.showAlert = false

                toast.success(data.message, { position: 'top-right' })
                await this.handleGetCompany()
            } catch (error) {
                console.error(error)
            } finally {
                this.isSubmitting = false
            }
        },
    },
})

export default useCompanyStore
