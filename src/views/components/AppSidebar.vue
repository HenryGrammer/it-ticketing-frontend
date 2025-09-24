<template>
    <Sidebar collapsible="icon">
        <SidebarContent>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton class="h-full">
                                    <Avatar class="ml-0 w-6">
                                        <AvatarImage src="@/assets/images/user.png" />
                                        <AvatarFallback>IT</AvatarFallback>
                                    </Avatar>
                                    <div class="flex flex-col">
                                        <p class="ml-2 truncate font-semibold text-md">
                                            Administrator
                                        </p>
                                        <p class="ml-2 truncate font-light text-xs">
                                            Administrator
                                        </p>
                                    </div>
                                    <ChevronDown class="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-[--bits-dropdown-menu-anchor-width]">
                                <DropdownMenuItem>
                                    <span>Change Password</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>
                                        <button type="button" @click="loginStore.logoutUser()">
                                            Logout
                                        </button>
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="menu in menus" :key="menu.title">
                            <Collapsible class="group/collapsible">
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton asChild>
                                        <a :href="menu.url">
                                            <component :is="menu.icon" />
                                            <span>{{ menu.title }}</span>
                                            <ChevronRight
                                                v-if="menu.submenus?.length"
                                                class="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90"
                                            />
                                        </a>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub
                                        v-for="submenu in menu.submenus"
                                        :key="submenu.title"
                                    >
                                        <a :href="submenu.url">
                                            <span>{{ submenu.title }}</span>
                                        </a>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
</template>

<script setup lang="ts">
import {
    SidebarContent,
    Sidebar,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarHeader,
} from '@/components/ui/sidebar'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Home, Settings, User, ChevronDown, Lock, ChevronRight } from 'lucide-vue-next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRoute, useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login'

const loginStore = useLoginStore()

const menus = [
    {
        title: 'Home',
        url: 'home',
        icon: Home,
    },
    {
        title: 'Settings',
        url: '#',
        icon: Settings,
        submenus: [
            {
                title: 'Users',
                url: 'user',
            },
        ],
    },
]

const router = useRouter()
const goTo = (link: string) => {
    router.push(link)
}
</script>
