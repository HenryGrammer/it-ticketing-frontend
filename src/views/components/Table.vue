<template>
    <DataTable />
</template>

<script setup lang="ts">
interface TableHeader {
    text: string
    value: string
    sortable?: boolean
}

defineProps<tableHeader>()
</script>
