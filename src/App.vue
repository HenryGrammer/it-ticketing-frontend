<script setup lang="ts">
import { Toaster, toast } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>

<template>
    <Toaster richColors />
    <RouterView />
</template>
