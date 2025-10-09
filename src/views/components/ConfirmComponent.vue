<template>
    <AlertDialog :open="isOpen">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ title }}</AlertDialogTitle>
                <AlertDialogDescription> This action cannot be undone. </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="$emit('cancelAlert')"> Cancel </AlertDialogCancel>

                <AlertDialogAction :disabled="isDisabled" @click="$emit('submitCompanyStatus')">
                    <template v-if="mode == 'deactivate'">
                        <template v-if="isDisabled">
                            <Spinner />
                            Deactivating...
                        </template>
                        <template v-else>Deactivate</template>
                    </template>
                    <template v-else>
                        <template v-if="isDisabled">
                            <Spinner />
                            Activating...
                        </template>
                        <template v-else>Activate</template>
                    </template>
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
import { Spinner } from '@/components/ui/spinner'

type Props = {
    title: string
    isOpen: boolean
    isDisabled: boolean
    mode: string
}

const props = defineProps<Props>()

defineEmits(['cancelAlert', 'submitCompanyStatus'])
</script>
