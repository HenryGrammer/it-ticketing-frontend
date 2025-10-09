<template>
    <Layout>
        <main class="p-5 h-screen bg-gray-50">
            <div class="grid grid-cols-4 gap-2">
                <div class="grid-start-1">
                    <CountCardComponent :count="companyStore.serverItemsLength" title="Company">
                        <template v-slot:icon>
                            <Building2 />
                        </template>
                    </CountCardComponent>
                </div>
                <div class="grid-start-2"></div>
            </div>
            <Card class="mt-5">
                <CardHeader>
                    <p class="font-semibold [&:not(:first-child)]:mt-6">Companies</p>
                </CardHeader>

                <CardContent>
                    <div class="flex justify-between">
                        <ButtonComponent
                            buttonTitle="Create company"
                            @click="companyStore.openModal"
                        >
                            <template v-slot:icon>
                                <Plus />
                            </template>
                        </ButtonComponent>

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
                            <ButtonComponent
                                buttonTitle="Edit company"
                                class="bg-yellow-500 hover:bg-yellow-600"
                                @click="companyStore.handleEditCompany(id)"
                            >
                                <template v-slot:icon>
                                    <SquarePen />
                                </template>
                            </ButtonComponent>

                            <ButtonComponent
                                buttonTitle="Deactivate"
                                variant="destructive"
                                @click="companyStore.openDeactivation(id)"
                                v-if="status == null"
                            >
                                <template v-slot:icon>
                                    <Trash />
                                </template>
                            </ButtonComponent>

                            <ButtonComponent
                                buttonTitle="Activate"
                                class="bg-green-600 hover:bg-green-700"
                                @click="companyStore.openActivation(id)"
                                v-else
                            >
                                <template v-slot:icon>
                                    <Check />
                                </template>
                            </ButtonComponent>
                        </template>

                        <template #item-status="{ status }">
                            <Badge variant="destructive" v-if="status == 'deactivate'"
                                >Inactive</Badge
                            >
                            <Badge class="bg bg-green-700" v-else>Active</Badge>
                        </template>
                    </EasyDataTable>
                </CardContent>

                <DialogComponent
                    :title="companyStore.mode == 'create' ? 'Add new company' : 'Edit company'"
                    :isOpenModal="companyStore.showModal"
                    @closeModal="companyStore.showModal = false"
                    @submit="submitAction()"
                    :isSubmitting="companyStore.isSubmitting"
                >
                    <template v-slot:form>
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
                    </template>
                </DialogComponent>

                <ConfirmComponent
                    :title="
                        companyStore.mode == 'deactivate'
                            ? 'Are you sure you want to deactivate'
                            : 'Are you sure you want to activate'
                    "
                    :isOpen="companyStore.showAlert"
                    @cancelAlert="companyStore.showAlert = false"
                    :isDisabled="companyStore.isSubmitting"
                    :mode="companyStore.mode"
                    @submitCompanyStatus="handleCompanyStatus()"
                />
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
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form/'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { computed, onMounted, ref, watch } from 'vue'
import {
    Search,
    Trash,
    SquarePen,
    Loader2,
    ChevronsUpDown,
    Check,
    Plus,
    Building2,
} from 'lucide-vue-next'
import ConfirmComponent from '../components/ConfirmComponent.vue'
import useCompanyStore from '@/stores/company'
import ButtonComponent from '../components/ButtonComponent.vue'
import CountCardComponent from '../components/CountCardComponent.vue'

const companyStore = useCompanyStore()

onMounted(async () => {
    await companyStore.handleGetCompany()
})

watch(
    () => {
        companyStore.serverOptions
    },
    () => {
        companyStore.handleGetCompany()
    },
    { deep: true },
)
const submitAction = computed(() => {
    return companyStore.mode === 'create'
        ? async () => await companyStore.handleStoreCompany()
        : async () => await companyStore.handleUpdateCompany(companyStore.companyForm.id)
})

const handleCompanyStatus = computed(() => {
    return companyStore.mode === 'deactivate'
        ? async () => await companyStore.handleDeactivation(companyStore.companyForm.id)
        : async () => await companyStore.handleActivation(companyStore.companyForm.id)
})
</script>
