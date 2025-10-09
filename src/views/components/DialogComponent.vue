<template>
    <Dialog :open="isOpenModal">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ title }}</DialogTitle>
            </DialogHeader>
            <hr />
            <slot name="form" />
            <DialogFooter>
                <DialogClose>
                    <ButtonComponent
                        buttonTitle="Close"
                        variant="secondary"
                        @click="$emit('closeModal')"
                    />
                </DialogClose>

                <ButtonComponent
                    :disabled="isSubmitting"
                    type="submit"
                    :buttonTitle="isSubmitting ? 'Submitting...' : 'Submit'"
                    @click="$emit('submit')"
                >
                    <template v-slot:icon v-if="isSubmitting">
                        <Spinner />
                    </template>
                </ButtonComponent>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
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
import ButtonComponent from './ButtonComponent.vue'
import Spinner from '@/components/ui/spinner/Spinner.vue'

type Props = {
    title: string
    isOpenModal: boolean
    isSubmitting: boolean
}

defineProps<Props>()

const emit = defineEmits(['closeModal', 'submit'])
</script>
