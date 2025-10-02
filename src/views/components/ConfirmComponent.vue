<template>
    <AlertDialog :open="userStore.isConfirm">
        <!-- <AlertDialogTrigger>Open</AlertDialogTrigger> -->
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ title }}</AlertDialogTitle>
                <AlertDialogDescription> This action cannot be undone. </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="userStore.confirm('closeDialog', userStore.userForm.id)"
                    >Cancel</AlertDialogCancel
                >
                <AlertDialogAction
                    :disabled="userStore.isSubmitting"
                    @click="userStore.handleDeactivateAccount(userStore.userForm.id)"
                    v-if="userStore.isActivateOrDeactivate == 'deactivate'"
                >
                    <template v-if="userStore.isSubmitting">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                        Please wait...
                    </template>
                    <template v-else> Deactivate </template>
                </AlertDialogAction>

                <AlertDialogAction
                    :disabled="userStore.isSubmitting"
                    @click="userStore.handleActivateAccount(userStore.userForm.id)"
                    v-else
                >
                    <template v-if="userStore.isSubmitting">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                        Please wait...
                    </template>
                    <template v-else> Activate </template>
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useUserStore } from '@/stores/user'
import { Loader2 } from 'lucide-vue-next'

const userStore = useUserStore()

defineProps<{
    title: string
}>()
</script>
