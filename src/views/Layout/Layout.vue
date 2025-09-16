<template>
    <SidebarProvider>
        <AppSidebar />
        <main class="w-screen max-w-screen">
            <Navbar />
            <slot />
        </main>
    </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarTrigger, SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '../components/AppSidebar.vue'
import Navbar from '../components/Navbar.vue'
</script>
