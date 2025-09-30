<template>
    <Layout>
        <main class="p-5 h-screen bg-gray-50">
            <div class="grid grid-cols-4">
                <div class="grid-start-1">
                    <div class="rounded-xl border bg-card text-card-foreground shadow">
                        <div
                            class="gap-y-1.5 p-6 flex flex-row items-center justify-between space-y-0 pb-2"
                        >
                            <h3 class="tracking-tight text-sm font-medium">Total Users</h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                class="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path
                                    d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                                ></path>
                            </svg>
                        </div>
                        <div class="p-6 pt-0">
                            <div class="text-2xl font-bold">0</div>
                            <p class="text-xs text-muted-foreground">as of January 1970</p>
                        </div>
                    </div>
                </div>
            </div>
            <Card class="mt-5 px-3">
                <CardHeader>
                    <div>
                        <Dialog v-model:open="userStore.isOpenDialog">
                            <DialogTrigger>
                                <Button>
                                    <Plus />
                                    Create users
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add new user</DialogTitle>
                                </DialogHeader>
                                <hr />
                                <form @submit.prevent="userStore.handleStoreUser()">
                                    <Form>
                                        <FormField name="myForm">
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter name"
                                                        v-model="userStore.userForm.name"
                                                    />
                                                    <div v-if="userStore.errors.name">
                                                        <p
                                                            class="text-red-500 text-xs"
                                                            v-for="error in userStore.errors.name"
                                                        >
                                                            {{ error }}
                                                        </p>
                                                    </div>
                                                </FormControl>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter email"
                                                        v-model="userStore.userForm.email"
                                                    />
                                                    <div v-if="userStore.errors.email">
                                                        <p
                                                            class="text-red-500 text-xs"
                                                            v-for="error in userStore.errors.email"
                                                        >
                                                            {{ error }}
                                                        </p>
                                                    </div>
                                                </FormControl>
                                                <FormLabel>Company</FormLabel>
                                                <FormControl>
                                                    <Select v-model="userStore.userForm.company">
                                                        <SelectTrigger class="w-full">
                                                            <SelectValue
                                                                placeholder="Select a company"
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent class="w-full" side="bottom">
                                                            <SelectGroup>
                                                                <SelectItem
                                                                    :value="company.id"
                                                                    :key="company.id"
                                                                    v-for="company in userStore.company"
                                                                >
                                                                    {{ company.code }}
                                                                </SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <div v-if="userStore.errors.company">
                                                        <p
                                                            class="text-red-500 text-xs"
                                                            v-for="error in userStore.errors
                                                                .company"
                                                        >
                                                            {{ error }}
                                                        </p>
                                                    </div>
                                                </FormControl>
                                                <FormLabel>Department</FormLabel>
                                                <FormControl>
                                                    <Select v-model="userStore.userForm.department">
                                                        <SelectTrigger class="w-full">
                                                            <SelectValue
                                                                placeholder="Select a department"
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent class="w-full" side="bottom">
                                                            <SelectGroup>
                                                                <SelectItem
                                                                    :value="department.id"
                                                                    :key="department.id"
                                                                    v-for="department in userStore.department"
                                                                >
                                                                    {{ department.code }}
                                                                </SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <div v-if="userStore.errors.department">
                                                        <p
                                                            class="text-red-500 text-xs"
                                                            v-for="error in userStore.errors
                                                                .department"
                                                        >
                                                            {{ error }}
                                                        </p>
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        </FormField>
                                    </Form>
                                    <DialogFooter class="mt-4">
                                        <Button :disabled="userStore.isSubmitting">
                                            <Loader2
                                                class="w-4 h-4 mr-2 animate-spin"
                                                v-if="userStore.isSubmitting"
                                            />
                                            {{
                                                userStore.isSubmitting
                                                    ? 'Saving...'
                                                    : 'Save changes'
                                            }}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>

                <div class="flex flex-row">
                    <div class="relative w-full max-w-sm items-center">
                        <Input
                            id="search"
                            type="search"
                            v-model="searchValue"
                            placeholder="Search..."
                            class="pl-10"
                        />
                        <span
                            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
                        >
                            <Search class="size-6 text-muted-foreground" />
                        </span>
                    </div>
                </div>

                <EasyDataTable
                    border-cell
                    buttons-pagination
                    theme-color="#212121"
                    :headers="headers"
                    :items="userStore.user"
                    :search-field="searchField"
                    :search-value="searchValue"
                >
                    <template #item-action>
                        <Button type="button" variant="destructive"><Trash /></Button>
                        <Button type="button"><SquarePen /></Button>
                    </template>
                </EasyDataTable>
            </Card>
        </main>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '../Layout/Layout.vue'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form/'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import type { Header, Item } from 'vue3-easy-data-table'
import { Search, Trash, SquarePen, Loader2, ChevronsUpDown, Check } from 'lucide-vue-next'

const userStore = useUserStore()

onMounted(async () => {
    await userStore.getUser()
})

const searchField = ref<Array<string>>(['name', 'email', 'company.name', 'department.name'])
const searchValue = ref<string>('')

const headers: Header[] = [
    { text: 'Action', value: 'action' },
    { text: 'Name', value: 'name' },
    { text: 'Email', value: 'email' },
    { text: 'Company', value: 'company.name' },
    { text: 'Department', value: 'department.name' },
]

const value = ref<(typeof userStore.company)[0]>()
</script>
