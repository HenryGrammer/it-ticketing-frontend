<template>
    <AlertDialog :open="isOpen">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ title }}</AlertDialogTitle>
                <AlertDialogDescription> This action cannot be undone. </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click=""> Cancel </AlertDialogCancel>
                <AlertDialogAction>
                    <!-- <template v-if="">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                        Please wait...
                    </template>
                    <template v-else> Deactivate </template> -->
                </AlertDialogAction>

                <!-- <AlertDialogAction>
                    <template v-if="userStore.isSubmitting">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                        Please wait...
                    </template>
                    <template v-else> Activate </template>
                </AlertDialogAction> -->
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
import { Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps<{
    title: string
    isOpen: boolean
}>()
</script>
