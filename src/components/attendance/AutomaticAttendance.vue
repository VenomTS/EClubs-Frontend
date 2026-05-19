<script setup lang="ts">
import { computed } from "vue"
import QrcodeVue from "qrcode.vue"

const props = defineProps<{
  clubId: string
}>()

/* ---------------------------------
   FUTURE: session token goes here
---------------------------------- */
// later:
// const sessionToken = ref("...")
// QR will contain tokenized URL

const attendanceUrl = computed(() =>
    `${window.location.origin}/clubs/${props.clubId}/attendance`
)
</script>

<template>
  <div class="flex flex-col items-center justify-center py-6 space-y-6">

    <!-- TITLE -->
    <div class="text-center space-y-2">
      <i class="pi pi-qrcode text-4xl text-primary-500" />

      <h3 class="text-xl font-semibold text-content-primary">
        Automatic Attendance
      </h3>

      <p class="text-sm text-content-secondary max-w-md">
        Students scan this QR code using their phone camera.
        Attendance will be recorded automatically.
      </p>
    </div>

    <!-- QR CARD -->
    <div
        class="bg-white p-6 rounded-2xl shadow-xl border border-surface-border"
    >
      <QrcodeVue
          :value="attendanceUrl"
          :size="300"
          level="H"
      />
    </div>

    <!-- INFO PANEL -->
    <div
        class="bg-surface-card border border-surface-border
             rounded-xl px-5 py-3 text-sm text-content-secondary"
    >
      Waiting for students to scan…
    </div>

  </div>
</template>