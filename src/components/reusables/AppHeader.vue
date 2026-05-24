<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue'

import { useUserStore } from "../../stores/user.store.ts"

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

// ✅ Correct PrimeVue menu instance type
const menu = ref<Menu | null>(null)

const user = computed(() => userStore.getUser())

const fullName = computed(() => {
  const u = user.value
  return u ? `${u.firstName} ${u.lastName}` : 'User'
})

function goBack() {
  router.back()
}

function goHome() {
  router.push('/')
}

function logout() {
  userStore.logout()
  router.push('/login')
}

const hideHeader = computed(() =>
    ['/login', '/register'].includes(route.path)
)

const canGoBack = computed(() =>
    route.path !== '/' && window.history.length > 2
)

// ✅ PrimeVue uses MouseEvent
const toggleMenu = (event: MouseEvent) => {
  menu.value?.toggle(event)
}

const profileItems = [
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => logout()
  }
]
</script>

<template>
  <header
      v-if="!hideHeader"
      class="w-full flex items-center justify-between px-4 py-3 bg-surface-card border-b border-surface-border"
  >

    <!-- LEFT -->
    <div class="flex items-center gap-2">

      <Button
          v-if="canGoBack"
          icon="pi pi-arrow-left"
          label="Back"
          @click="goBack"
          severity="secondary"
          text
          class="text-secondary-500!
         border border-secondary-500!
         bg-transparent!
         hover:bg-secondary-500!
         hover:text-white!
         hover:border-secondary-600!
         transition px-3 py-2 rounded-lg shadow-sm"
      />

      <Button
          label="Clubs"
          icon="pi pi-home"
          @click="goHome"
          class="!bg-primary-600
         !text-white
         !border !border-primary-700
         hover:!bg-primary-700
         hover:!border-primary-800
         shadow-sm
         hover:shadow-md
         transition px-4 py-2 rounded-lg"
      />
    </div>

    <!-- RIGHT -->
    <div class="flex items-center gap-3">

      <div class="hidden sm:flex items-center gap-2">
        <Avatar
            icon="pi pi-user"
            shape="circle"
            class="bg-surface-hover text-content-primary"
        />

        <div class="flex flex-col leading-tight">
          <span class="text-content-primary text-sm font-medium">
            {{ fullName }}
          </span>
          <span class="text-content-muted text-xs">
            Profile
          </span>
        </div>
      </div>

      <Button
          icon="pi pi-ellipsis-v"
          text
          severity="secondary"
          @click="toggleMenu"
      />

      <Menu ref="menu" :model="profileItems" popup />
    </div>
  </header>
</template>