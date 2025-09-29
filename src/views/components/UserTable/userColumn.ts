import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

interface User {
    name: string
    email: string
    department: string
    company: string
}

const userColumn: ColumnDef<User>[] = [
    {
        accessorKey: 'Name',
    },
    {
        accessorKey: 'Email',
    },
    // {
    //     accessorKey: 'Department',
    // },
    // {
    //     accessorKey: 'Company',
    // },
]

export default userColumn
