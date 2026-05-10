<script setup lang="ts">
defineProps<{
  qrValue: string
}>()
</script>

<template>
  <div
      class="flex flex-col items-center justify-center
           border border-surface-border
           rounded-xl p-5 space-y-4"
  >
    <h3 class="font-semibold text-content-primary">
      QR Code Check-In
    </h3>

    <div
        class="w-56 h-56 flex items-center justify-center
             bg-surface-100 rounded-lg"
    >
      <!-- Replace later with real QR component -->
      <img
          :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`"
          alt="QR Code"
      />
    </div>

    <p class="text-sm text-content-secondary text-center">
      Students scan to mark attendance.
    </p>
  </div>
</template>