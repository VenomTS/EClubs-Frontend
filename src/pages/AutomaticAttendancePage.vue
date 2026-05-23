<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

import { useAttendanceStore } from "../stores/attendances.store"
import { useUserStore } from "../stores/user.store"

/* ---------------------------------
   STORES
---------------------------------- */
const attendanceStore = useAttendanceStore()
const userStore = useUserStore()

/* ---------------------------------
   ROUTER
---------------------------------- */
const route = useRoute()
const router = useRouter()

/* ---------------------------------
   STATE
---------------------------------- */
const loading = ref(true)
const success = ref(false)
const error = ref(false)
const message = ref("Marking attendance...")

/* ---------------------------------
   HELPERS
---------------------------------- */
const redirectBack = () => {
  // go back if possible, otherwise fallback
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push("/") // fallback route
  }
}

/* ---------------------------------
   MAIN FLOW
---------------------------------- */
onMounted(async () => {
  try {
    const clubId = route.params.clubId as string
    const studentId = userStore.userId

    if (!clubId || !studentId) {
      throw new Error("Nedostaju obavezni podaci")
    }

    const result = await attendanceStore.markPresent(
        clubId,
        { studentId }
    )

    loading.value = false

    if (result.success) {
      success.value = true
      message.value = "Prisustvo uspješno zabiilježeno!"
    } else {
      throw new Error("Evidentiranje prisustva nije uspjelo")
    }

  } catch (e) {
    loading.value = false
    error.value = true
    message.value = "Nije moguće evidentirati prisustvo."
  }

  /* DELAY BEFORE REDIRECT */
  setTimeout(() => {
    redirectBack()
  }, 3000) // 3 seconds
})
</script>

<template>
  <div
      class="
      min-h-screen
      flex
      items-center
      justify-center
      bg-surface-ground
      p-6
      text-center
    "
  >
    <div
        class="
        max-w-md
        w-full
        bg-surface-card
        rounded-3xl
        shadow-lg
        border border-surface-border
        p-10
        space-y-6
      "
    >
      <!-- LOADING -->
      <div v-if="loading" class="space-y-4">

        <i class="pi pi-spin pi-spinner text-5xl text-primary-500" />

        <h2 class="text-xl font-semibold">
          Molimo sačekajte...
        </h2>

        <p class="text-content-secondary">
          Bilježimo vaše prisustvo.
        </p>
      </div>

      <!-- SUCCESS -->
      <div v-else-if="success" class="space-y-4">

        <i class="pi pi-check-circle text-6xl text-green-500" />

        <h2 class="text-2xl font-semibold">
          Prisustvo zabilježeno
        </h2>

        <p class="text-content-secondary">
          {{ message }}
        </p>

        <p class="text-sm text-content-secondary">
          Povratak na prethodnu stranicu...
        </p>
      </div>

      <!-- ERROR -->
      <div v-else class="space-y-4">

        <i class="pi pi-times-circle text-6xl text-red-500" />

        <h2 class="text-2xl font-semibold">
          Nešto nije uredu
        </h2>

        <p class="text-content-secondary">
          {{ message }}
        </p>

        <p class="text-sm text-content-secondary">
          Povratak na prethodnu stranicu...
        </p>
      </div>

    </div>
  </div>
</template>