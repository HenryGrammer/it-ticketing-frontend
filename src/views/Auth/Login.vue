<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
</script>

<template>
  <main class="h-screen lg:grid grid-cols-2 sm:grid grid-cols-1">
    <div class="col-start-1">
      <img src="@/assets/images/it.jpg" class="h-screen object-fill" />
    </div>
    <div class="col-start-2">
      <div class="bg-white h-screen flex flex-col items-center justify-center">
        <h1 class="text-2xl font-semibold tracking-tight">Welcome to Ticketing System</h1>
        <p class="text-muted-foreground text-sm">Please login to your account</p>
        <form action="" class="mt-5">
          <div class="mb-3"><Input type="email" placeholder="Email" class="w-100" /></div>
          <div class="mb-3">
            <Input type="password" placeholder="Password" class="w-100" />
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
