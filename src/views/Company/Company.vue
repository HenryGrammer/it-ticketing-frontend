<template>
    <Layout>
        <main class="p-5 h-screen bg-gray-50">
            <div class="grid grid-cols-4">
                <div class="grid-start-1">
                    <div class="rounded-xl border bg-card text-card-foreground shadow">
                        <div
                            class="gap-y-1.5 p-6 flex flex-row items-center justify-between space-y-0 pb-2"
                        >
                            <h3 class="tracking-tight text-sm font-medium">Total Company</h3>
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
            <Card class="mt-5">
                <CardHeader>
                    <p class="font-semibold [&:not(:first-child)]:mt-6">Companies</p>
                </CardHeader>

                <CardContent>
                    <div class="flex justify-between">
                        <Button @click="companyStore.addBtnDialog()">
                            <Plus />
                            Create companies
                        </Button>

                        <DialogComponent
                            :title="'Add new company'"
                            :isOpen="companyStore.isOpenCreateDialog"
                        >
                            <template #form>
                                <hr />
                                <form @submit.prevent="companyStore.handleStoreCompany()">
                                    <Form>
                                        <FormField name="myForm">
                                            <FormItem>
                                                <FormLabel>Code</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter code"
                                                        v-model="companyStore.companyForm.code"
                                                    />
                                                    <div v-if="companyStore.formError.code">
                                                        <p
                                                            class="text-red-500 text-xs"
                                                            v-for="error in companyStore.formError
                                                                .code"
                                                        >
                                                            {{ error }}
                                                        </p>
                                                    </div>
                                                </FormControl>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter name"
                                                        v-model="companyStore.companyForm.name"
                                                    />
                                                    <div v-if="companyStore.formError.name">
                                                        <p
                                                            class="text-red-500 text-xs"
                                                            v-for="error in companyStore.formError
                                                                .name"
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
                                            @click="companyStore.closeBtnDialog()"
                                        >
                                            Close
                                        </Button>
                                        <Button :disabled="companyStore.isSubmitting">
                                            <Loader2
                                                class="w-4 h-4 mr-2 animate-spin"
                                                v-if="companyStore.isSubmitting"
                                            />
                                            {{
                                                companyStore.isSubmitting
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
                                v-model="companyStore.searchValue"
                                @input="companyStore.handleGetCompany()"
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
                        v-model:server-options="companyStore.serverOptions"
                        :server-items-length="companyStore.serverItemsLength"
                        :loading="companyStore.loading"
                        :headers="companyStore.tableHeader"
                        :items="companyStore.company"
                        :search-field="companyStore.searchField"
                        :search-value="companyStore.searchValue"
                    >
                        <template #item-action="{ id, status }">
                            <Button
                                type="button"
                                class="bg-yellow-500 hover:bg-yellow-600"
                                @click="companyStore.handleEditCompany(id)"
                            >
                                <SquarePen />
                            </Button>

                            <!-- <Button
                                type="button"
                                variant="destructive"
                                @click="userStore.confirm('isDeactivate', id)"
                                v-if="status == null"
                            >
                                <Trash />
                            </Button> -->

                            <!-- <Button
                                type="button"
                                class="bg-green-600 hover:bg-green-700"
                                @click="userStore.confirm('isActivate', id)"
                                v-else
                            >
                                <Check />
                            </Button> -->
                        </template>

                        <!-- <template #item-status="{ status }">
                            <Badge variant="destructive" v-if="status == 1">Inactive</Badge>
                            <Badge class="bg bg-green-700" v-else>Active</Badge>
                        </template> -->
                    </EasyDataTable>

                    <DialogComponent
                        :title="'Edit Company'"
                        :isOpen="companyStore.isOpenUpdateDialog"
                    >
                        <template #form>
                            <hr />
                            <form
                                @submit.prevent="
                                    companyStore.handleUpdateCompany(companyStore.companyForm.id)
                                "
                            >
                                <Form>
                                    <FormField name="myForm">
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter code"
                                                    v-model="companyStore.companyForm.code"
                                                />
                                                <div v-if="companyStore.formError.code">
                                                    <p
                                                        class="text-red-500 text-xs"
                                                        v-for="error in companyStore.formError.code"
                                                    >
                                                        {{ error }}
                                                    </p>
                                                </div>
                                            </FormControl>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter name"
                                                    v-model="companyStore.companyForm.name"
                                                />
                                                <div v-if="companyStore.formError.name">
                                                    <p
                                                        class="text-red-500 text-xs"
                                                        v-for="error in companyStore.formError.name"
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
                                        @click="companyStore.closeUpdateBtnDialog()"
                                    >
                                        Close
                                    </Button>
                                    <Button :disabled="companyStore.isSubmitting">
                                        <Loader2
                                            class="w-4 h-4 mr-2 animate-spin"
                                            v-if="companyStore.isSubmitting"
                                        />
                                        {{
                                            companyStore.isSubmitting
                                                ? 'Updating...'
                                                : 'Update changes'
                                        }}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </template>
                    </DialogComponent>

                    <!-- <ConfirmComponent
                        :title="
                            userStore.isActivateOrDeactivate == 'deactivate'
                                ? 'Are you sure you want to deactivate this account?'
                                : 'Are you sure you want to activate this account?'
                        "
                    /> -->
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
import useCompanyStore from '@/stores/company'

const companyStore = useCompanyStore()

onMounted(async () => {
    await companyStore.handleGetCompany()
})

watch(
    () => {
        // userStore.serverOptions
    },
    () => {
        // userStore.getUser()
    },
    { deep: true },
)
</script>
