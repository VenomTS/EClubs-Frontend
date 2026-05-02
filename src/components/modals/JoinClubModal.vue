<script setup lang="ts">
import { ref, computed } from "vue"
import BaseModal from "./BaseModal.vue"

import InputText from "primevue/inputtext"
import Button from "primevue/button"

const emit = defineEmits(["close", "join"])

const joinCode = ref("")
const loading = ref(false)
const submitted = ref(false)

const isValid = computed(() =>
    joinCode.value.trim().length > 0
)

async function submit() {
  submitted.value = true

  if (!isValid.value) return

  loading.value = true

  await new Promise(r => setTimeout(r, 600))

  emit("join", joinCode.value.trim())

  loading.value = false
  emit("close")
}
</script>

<template>
  <BaseModal @close="$emit('close')">

    <!-- Header -->
    <div class="mb-6 space-y-1">
      <h2 class="text-xl font-semibold text-content-primary">
        Join Club
      </h2>

      <p class="text-sm text-content-secondary">
        Enter the club code provided by your professor.
      </p>
    </div>

    <!-- Form -->
    <div class="space-y-4">

      <div class="flex flex-col gap-2">
        <label class="text-sm text-content-secondary">
          Club Code
        </label>

        <InputText
            v-model="joinCode"
            placeholder="ABC-123"
            class="w-full"
            autofocus
            @keyup.enter="submit"
        />
      </div>

      <!-- Error only after submit -->
      <small
          v-if="submitted && !isValid"
          class="text-danger-500"
      >
        Code required.
      </small>

    </div>

    <!-- Footer -->
    <div
        class="flex justify-end gap-3 mt-8 pt-4
             border-t border-surface-border"
    >

      <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="$emit('close')"
      />

      <Button
          :label="loading ? 'Joining...' : 'Join'"
          :loading="loading"
          :disabled="loading"
          class="bg-primary-500! border-none!
               hover:bg-primary-600!"
          @click="submit"
      />

    </div>

  </BaseModal>
</template>