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
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 }
]

const periods = Array.from({ length: 8 }, (_, i) => ({
  label: `${i + 1}${["st","nd","rd"][i] || "th"} period`,
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
        Create Club
      </h2>

      <p class="text-sm text-content-secondary">
        Add a new extracurricular club
      </p>
    </div>

    <!-- Form -->
    <div class="space-y-5">

      <!-- Club Name -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-content-secondary">
          Club Name
        </label>

        <InputText
            v-model="clubName"
            placeholder="Chess Club..."
            class="w-full"
        />
      </div>

      <!-- Meeting Day Dropdown -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-content-secondary">
          Meeting Day
        </label>

        <Select
            v-model="meetingDay"
            :options="meetingDays"
            optionLabel="label"
            optionValue="value"
            placeholder="Select day"
            class="w-full"
        />
      </div>

      <!-- Period -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-content-secondary">
          School Period
        </label>

        <Select
            v-model="selectedPeriod"
            :options="periods"
            optionLabel="label"
            optionValue="value"
            placeholder="Select period"
            class="w-full"
        />
      </div>

      <!-- Validation -->
      <small
          v-if="submitted && !isValid"
          class="text-danger-500"
      >
        Please fill all fields.
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
          label="Create"
          :loading="loading"
          :disabled="loading"
          class="bg-primary-500! border-none!
               hover:bg-primary-600!"
          @click="submit"
      />
    </div>

  </BaseModal>
</template>