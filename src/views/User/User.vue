<template>
    <Layout>
        <main class="p-5 h-screen bg-gray-50">
            <div class="grid grid-cols-4">
                <div class="grid-start-1">
                    <div class="rounded-xl border bg-card text-card-foreground shadow">
                        <div
                            class="gap-y-1.5 p-6 flex flex-row items-center justify-between space-y-0 pb-2"
                        >
                            <h3 class="tracking-tight text-sm font-medium">Total Users</h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                class="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path
                                    d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                                ></path>
                            </svg>
                        </div>
                        <div class="p-6 pt-0">
                            <div class="text-2xl font-bold">0</div>
                            <p class="text-xs text-muted-foreground">as of January 1970</p>
                        </div>
                    </div>
                </div>
            </div>
            <Card class="mt-5">
                <CardHeader>
                    <Button class="w-fit pointer-events-auto">
                        <Plus />
                        Create users
                    </Button>
                </CardHeader>
            </Card>
        </main>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '../Layout/Layout.vue'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'

// interface userData {
//     id: number
//     name: string
//     email: string
//     password: string
//     role: number
//     department_id: number
//     company_id: number
// }
</script>
