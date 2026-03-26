<script setup>
defineProps({
  message: String,
  type: {
    type: String,
    default: "error"
  }
});
</script>

<template>
  <div
      v-if="message"
      class="p-3 rounded-lg text-sm font-medium"
      :class="{
      'bg-red-100 text-red-600 border border-red-400': type === 'error',
      'bg-green-100 text-green-600 border border-green-400': type === 'success',
      'bg-blue-100 text-blue-600 border border-blue-400': type === 'info'
    }"
  >
    {{ message }}
  </div>
</template>