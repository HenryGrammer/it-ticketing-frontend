<template>
    <SidebarProvider>
        <AppSidebar />
        <main class="w-screen max-w-screen">
            <Card class="rounded-none p-0 py-2">
                <SidebarTrigger />
            </Card>
            <slot />
        </main>
    </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarTrigger, SidebarProvider } from '@/components/ui/sidebar'
import { Card } from '@/components/ui/card'
import AppSidebar from '../components/AppSidebar.vue'
</script>
