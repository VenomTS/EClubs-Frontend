<script setup lang="ts">
import { ref, computed } from "vue"
import BaseModal from "./BaseModal.vue"
import {useClubStore} from "../../stores/club.store.ts";
import {useUserStore} from "../../stores/user.store.ts";
import {useToast} from "primevue";

const emit = defineEmits(["close", "join"])

const rawCode = ref("")
const loading = ref(false)
const submitted = ref(false)

const clubStore = useClubStore()
const userStore = useUserStore()
const toast = useToast()

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

  // emit CLEAN value (no dash)
  const response = await clubStore.joinClub({studentId: userStore.userId, code: rawCode.value});

  loading.value = false

  if(!response.success) {
    if(response.status === 404)
      toast.add({
        severity: "error",
        summary: "Error", // PREVEDI
        detail: "Invalid Code",
        life: 3000,
      });
    else
      toast.add({
        severity: "warning",
        summary: "Warning", // PREVEDI
        detail: "Already a member",
        life: 3000,
      });
    return;
  }

  toast.add({
    severity: "success",
    summary: "Success", // PREVEDI
    detail: "Successfully joined the club",
    life: 3000,
  });

  await new Promise(r => setTimeout(r, 600))

  emit("join")
  emit("close")
}
</script>

<template>
  <BaseModal @close="$emit('close')">

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
      Kod mora biti tačno 6 znakova dug.
    </small>

    <!-- Footer -->
    <div
        class="flex justify-end gap-3 mt-8 pt-4 border-t border-surface-border"
    >
      <Button
          label="Poništi"
          severity="secondary"
          outlined
          @click="$emit('close')"
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