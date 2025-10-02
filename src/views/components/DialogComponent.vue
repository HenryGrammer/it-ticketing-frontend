<template>
    <Dialog :open="isOpen">
        <!-- <DialogTrigger as-child>
            <slot name="dialogTriggerBtn" />
        </DialogTrigger> -->

        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ title }}</DialogTitle>
            </DialogHeader>
            <slot name="form" />
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useUserStore } from '@/stores/user'

const props = defineProps<{
    title: string
    isOpen: boolean
}>()
</script>
