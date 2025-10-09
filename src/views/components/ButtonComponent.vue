<template>
    <Button :variant="variant">
        <slot name="icon"></slot>
        {{ buttonTitle }}
    </Button>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'

type BtnVariant =
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined

type Props = {
    buttonTitle: string
    variant?: BtnVariant
}

defineProps<Props>()
</script>
