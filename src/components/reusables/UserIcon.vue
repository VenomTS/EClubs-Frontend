<script setup lang="ts">

defineProps<{
  initials: string
}>();

</script>

<template>
  <div
      class="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-0 from-primary-500 to-secondary-500 text-lg font-bold text-white shadow-lg"
  >
    {{ initials }}
  </div>
</template>

<style scoped>

</style>