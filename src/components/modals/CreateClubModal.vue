<script setup lang="ts">
import { ref, computed } from "vue"
import BaseModal from "./BaseModal.vue"

import type {CreateClubModalData} from "../../interfaces/CreateClubModalData.ts";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "create", payload: CreateClubModalData): void;
}>();

const clubName = ref("")
const meetingDay = ref<number | null>(null)
const selectedPeriod = ref<number | null>(null)

const loading = ref(false)
const submitted = ref(false)

const meetingDays = [
  { label: "Ponedjeljak", value: 1 },
  { label: "Utorak", value: 2 },
  { label: "Srijeda", value: 3 },
  { label: "Četvrtak", value: 4 },
  { label: "Petak", value: 5 }
]

const periods = Array.from({ length: 8 }, (_, i) => ({
  label: `${i + 1}. Čas`,
  value: i + 1
}))

const isValid = computed(() =>
    clubName.value &&
    meetingDay.value &&
    selectedPeriod.value
)

function getTimeFromPeriod(period: number): [string, string]
{
  if(period == 1)
    return ["08:00", "08:45"];
  if(period == 2)
    return ["08:50", "09:35"];
  if(period == 3)
    return ["09:40", "10:25"];
  if(period == 4)
    return ["10:45", "11:30"];
  if(period == 5)
    return ["11:35", "12:20"];
  if(period == 6)
    return ["12:25", "13:10"];
  if(period == 7)
    return ["13:25", "14:10"];
  return ["14:15", "15:00"];
}

async function submit() {
  submitted.value = true

  if (!isValid.value) return

  loading.value = true

  await new Promise(r => setTimeout(r, 600))

  if(selectedPeriod.value == null) return;
  const [startTime, endTime] = getTimeFromPeriod(selectedPeriod.value);

  if(meetingDay.value == null)
    return;

  emit("create", {
    name: clubName.value,
    day: meetingDay.value,
    startTime: startTime,
    endTime: endTime,
  })

  loading.value = false
  emit("close")
}
</script>

<template>
  <BaseModal @close="$emit('close')">

    <!-- Header -->
    <div class="mb-6 space-y-1">
      <h2 class="text-xl font-semibold text-content-primary">
        Kreiraj Sekciju
      </h2>

      <p class="text-sm text-content-secondary">
        Dodaj novu sekciju
      </p>
    </div>

    <!-- Form -->
    <div class="space-y-5">

      <!-- Club Name -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-content-secondary">
          Ime Sekcije
        </label>

        <InputText
            v-model="clubName"
            placeholder="Šah klub..."
            class="w-full"
        />
      </div>

      <!-- Meeting Day Dropdown -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-content-secondary">
          Dan sasatajanja
        </label>

        <Select
            v-model="meetingDay"
            :options="meetingDays"
            optionLabel="label"
            optionValue="value"
            placeholder="Odaberi Dan"
            class="w-full"
        />
      </div>

      <!-- Period -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-content-secondary">
          Školski Čas
        </label>

        <Select
            v-model="selectedPeriod"
            :options="periods"
            optionLabel="label"
            optionValue="value"
            placeholder="Odaberi čas"
            class="w-full"
        />
      </div>

      <!-- Validation -->
      <small
          v-if="submitted && !isValid"
          class="text-danger-500"
      >
        Molimo popunite sva polja.
      </small>

    </div>

    <!-- Footer -->
    <div
        class="flex justify-end gap-3 mt-8 pt-4
             border-t border-surface-border"
    >
      <Button
          label="Poništi"
          severity="secondary"
          outlined
          @click="$emit('close')"
      />

      <Button
          label="Kreiraj"
          :loading="loading"
          :disabled="loading"
          class="bg-primary-500! border-none!
               hover:bg-primary-600!"
          @click="submit"
      />
    </div>

  </BaseModal>
</template>