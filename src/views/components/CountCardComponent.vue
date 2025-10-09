<template>
    <Card>
        <CardContent>
            <div class="flex flex-row items-center justify-between">
                <p class="text-3xl font-bold mb-2">{{ count }}</p>
                <slot name="icon"></slot>
            </div>

            <p class="tracking-tight text-sm font-normal mt-2">Total {{ title }}</p>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

type Props = {
    count: number
    title: string
}

defineProps<Props>()
</script>
