<script setup lang="ts">
import AppHeader from "./components/reusables/AppHeader.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface-background text-content-primary">
    <!-- Global header -->
    <AppHeader />

    <!-- Page content -->
    <main class="flex-1">
      <router-view />
      <Toast />
    </main>
  </div>
</template>
