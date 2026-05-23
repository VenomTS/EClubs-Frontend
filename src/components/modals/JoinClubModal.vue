<script setup lang="ts">
import { ref, computed } from "vue"
import BaseModal from "./BaseModal.vue"

const emit = defineEmits(["zatvori", "Pridruži se"])

const rawCode = ref("")
const loading = ref(false)
const submitted = ref(false)

/* -----------------------------
   FORMAT (XXX-XXX)
------------------------------*/
const formattedCode = computed({
  get: () => {
    const clean = rawCode.value

    if (clean.length <= 3) return clean
    return clean.slice(0, 3) + "-" + clean.slice(3, 6)
  },

  set: (val: string) => {
    // 1. remove everything except letters/numbers
    let clean = val.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()

    // 2. enforce MAX 6 characters
    clean = clean.slice(0, 6)

    rawCode.value = clean
  }
})

/* -----------------------------
   VALIDATION
------------------------------*/
const isValid = computed(() =>
    rawCode.value.length === 6
)

/* -----------------------------
   SUBMIT
------------------------------*/
async function submit() {
  submitted.value = true

  if (!isValid.value) return

  loading.value = true

  await new Promise(r => setTimeout(r, 600))

  // emit CLEAN value (no dash)
  emit("Pridruži se", rawCode.value)

  loading.value = false
  emit("zatvori")
}
</script>

<template>
  <BaseModal @close="$emit('zatvori')">

    <!-- Header -->
    <div class="mb-6 space-y-1">
      <h2 class="text-xl font-semibold text-content-primary">
        Pridruži se sekciji
      </h2>

      <p class="text-sm text-content-secondary">
        Unesi kod od 6 znakova.
      </p>
    </div>

    <!-- Input -->
    <div class="flex flex-col gap-2">
      <label class="text-sm text-content-secondary">
        Kod sekcije
      </label>

      <InputText
          v-model="formattedCode"
          placeholder="ABC-123"
          class="w-full tracking-widest uppercase"
          maxlength="7"
          autofocus
          @keyup.enter="submit"
      />
    </div>

    <!-- Error -->
    <small
        v-if="submitted && !isValid"
        class="text-danger-500"
    >
      Kod mora biti tačno 6 znakova.
    </small>

    <!-- Footer -->
    <div
        class="flex justify-end gap-3 mt-8 pt-4 border-t border-surface-border"
    >
      <Button
          label="Poništi"
          severity="secondary"
          outlined
          @click="$emit('zatvori')"
      />

      <Button
          :label="loading ? 'Pridruživanje...' : 'Pridruži se'"
          :loading="loading"
          :disabled="loading"
          class="bg-primary-500! border-none! hover:bg-primary-600!"
          @click="submit"
      />
    </div>

  </BaseModal>
</template>