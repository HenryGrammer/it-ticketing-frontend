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
                            <div class="text-2xl font-bold">{{ userStore.serverItemsLength }}</div>
                            <p class="text-xs text-muted-foreground">as of January 1970</p>
                        </div>
                    </div>
                </div>
            </div>
            <Card class="mt-5">
                <CardHeader>
                    <p class="font-semibold [&:not(:first-child)]:mt-6">User Management</p>
                </CardHeader>

                <CardContent>
                    <div class="flex justify-between">
                        <Button @click="userStore.resetForm()">
                            <Plus />
                            Create users
                        </Button>

                        <DialogComponent
                            :title="'Edit User'"
                            :isOpen="userStore.isOpenCreateDialog"
                        >
                            <template #form>
                                <hr />
                                <form
                                    @submit.prevent="
                                        userStore.handleUpdateUser(userStore.userForm.id)
                                    "
                                >
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
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            @click="userStore.closeDialog('add')"
                                        >
                                            Close
                                        </Button>
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
                            </template>
                        </DialogComponent>

                        <div class="relative w-full max-w-sm items-center mb-3">
                            <Input
                                id="search"
                                type="search"
                                placeholder="Search..."
                                class="pl-10"
                                v-model="userStore.searchValue"
                                @input="userStore.getUser()"
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
                        v-model:server-options="userStore.serverOptions"
                        :server-items-length="userStore.serverItemsLength"
                        :loading="userStore.loading"
                        :headers="userStore.tableHeader"
                        :items="userStore.user"
                        :search-field="userStore.searchField"
                        :search-value="userStore.searchValue"
                    >
                        <template #item-action="{ id, status }">
                            <Button
                                type="button"
                                class="bg-yellow-500 hover:bg-yellow-600"
                                @click="userStore.handleEditUser(id)"
                            >
                                <SquarePen />
                            </Button>

                            <Button
                                type="button"
                                variant="destructive"
                                @click="userStore.confirm('isDeactivate', id)"
                                v-if="status == null"
                            >
                                <Trash />
                            </Button>

                            <Button
                                type="button"
                                class="bg-green-600 hover:bg-green-700"
                                @click="userStore.confirm('isActivate', id)"
                                v-else
                            >
                                <Check />
                            </Button>
                        </template>

                        <template #item-status="{ status }">
                            <Badge variant="destructive" v-if="status == 1">Inactive</Badge>
                            <Badge class="bg bg-green-700" v-else>Active</Badge>
                        </template>
                    </EasyDataTable>

                    <DialogComponent :title="'Edit User'" :isOpen="userStore.isOpenUpdateDialog">
                        <template #form>
                            <hr />
                            <form
                                @submit.prevent="userStore.handleUpdateUser(userStore.userForm.id)"
                            >
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
                                                        v-for="error in userStore.errors.company"
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
                                                        v-for="error in userStore.errors.department"
                                                    >
                                                        {{ error }}
                                                    </p>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    </FormField>
                                </Form>
                                <DialogFooter class="mt-4">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        @click="userStore.closeDialog('edit')"
                                    >
                                        Close
                                    </Button>
                                    <Button :disabled="userStore.isSubmitting">
                                        <Loader2
                                            class="w-4 h-4 mr-2 animate-spin"
                                            v-if="userStore.isSubmitting"
                                        />
                                        {{
                                            userStore.isSubmitting
                                                ? 'Updating...'
                                                : 'Update changes'
                                        }}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </template>
                    </DialogComponent>

                    <ConfirmComponent
                        :title="
                            userStore.isActivateOrDeactivate == 'deactivate'
                                ? 'Are you sure you want to deactivate this account?'
                                : 'Are you sure you want to activate this account?'
                        "
                    />
                </CardContent>
            </Card>
        </main>
    </Layout>
</template>

<script setup lang="ts">
// My Components
import Layout from '../Layout/Layout.vue'
import DialogComponent from '../components/DialogComponent.vue'

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
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { onMounted, ref, watch } from 'vue'
import { Search, Trash, SquarePen, Loader2, ChevronsUpDown, Check } from 'lucide-vue-next'
import FooterComponent from '../components/FooterComponent.vue'
import ConfirmComponent from '../components/ConfirmComponent.vue'

const userStore = useUserStore()

onMounted(async () => {
    await userStore.getUser()
})

watch(
    () => {
        userStore.serverOptions
    },
    () => {
        userStore.getUser()
    },
    { deep: true },
)
</script>
