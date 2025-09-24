<template>
    <main class="h-screen grid grid-cols-2">
        <div class="col-start-1">
            <img src="@/assets/images/it.jpg" class="h-screen object-fill" />
        </div>
        <div class="col-start-2">
            <div class="bg-white h-screen flex flex-col items-center justify-center">
                <h1 class="text-2xl font-semibold tracking-tight">Welcome to Ticketing System</h1>
                <p class="text-muted-foreground text-sm">Please login to your account</p>
                <Alert variant="destructive" class="my-4 w-fit" v-if="loginStore.alertMessage">
                    <AlertCircle class="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {{ loginStore.alertMessage }}
                    </AlertDescription>
                </Alert>
                <form @submit.prevent="loginStore.login()" class="mt-5">
                    <div class="mb-3">
                        <Input
                            type="email"
                            placeholder="Email"
                            class="w-100"
                            autocomplete="email"
                            v-model="loginStore.loginForm.email"
                        />

                        <template v-if="loginStore.errors.email && loginStore.errors.email.length">
                            <p
                                class="text-red-500 font-semibold text-xs ml-2"
                                v-for="error in loginStore.errors.email"
                            >
                                {{ error }}
                            </p>
                        </template>
                    </div>
                    <div class="mb-3">
                        <Input
                            type="password"
                            placeholder="Password"
                            class="w-100"
                            autocomplete="current-password"
                            v-model="loginStore.loginForm.password"
                        />
                        <template
                            v-if="loginStore.errors.password && loginStore.errors.password.length"
                        >
                            <p
                                class="text-red-500 font-semibold text-xs ml-2"
                                v-for="error in loginStore.errors.password"
                            >
                                {{ error }}
                            </p>
                        </template>
                        <p class="text-sm p-1 text-muted-foreground text-right">
                            <a href="#">Forgot Password</a>
                        </p>
                    </div>
                    <div class="mb-3">
                        <Button type="submit" placeholder="Password" class="w-100">Login</Button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLoginStore } from '@/stores/login'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-vue-next'

const loginStore = useLoginStore()
</script>
