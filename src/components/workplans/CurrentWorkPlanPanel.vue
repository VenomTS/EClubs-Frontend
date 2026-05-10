<script setup lang="ts">
import {
  type GetCurrentWorkPlanResponse,
  WorkPlansApi
} from "../../../api"

import Button from "primevue/button"
import { onMounted, ref } from "vue"

const props = defineProps<{
  clubId: string
}>()

const emit = defineEmits<{
  (e: "save", payload: {
    workPlanId: string
  }): void
}>()

const workPlan = ref<GetCurrentWorkPlanResponse>({})
const workPlansAPI = new WorkPlansApi()

const getIndicators = (value?: string) => {
  if (!value) return []
  return value.split(";").map(i => i.trim()).filter(Boolean)
}

onMounted(async () => {
  try {
    const response = await workPlansAPI.getCurrentWorkPlan(props.clubId)
    workPlan.value = response.data
  } catch (error) {}
})

function handleSave() {
  emit("save", {
    workPlanId: workPlan.value.id!,
  })
}
</script>

<template>
  <div
      class="bg-surface-card border border-surface-border
           rounded-2xl p-4 space-y-4
           hover:bg-surface-hover/30 transition"
  >

    <!-- HEADER -->
    <div class="flex items-center justify-between">

      <div class="flex items-center gap-2">
        <i class="pi pi-book text-primary-400 text-sm"></i>

        <h3 class="text-sm font-semibold text-primary-400">
          Current Work Plan
        </h3>
      </div>

      <!-- ACTION BUTTON -->
      <Button
          label="Save & Attendance"
          icon="pi pi-check"
          size="small"
          class="bg-primary-500! border-none!
               hover:bg-primary-600!
               text-content-primary px-3 py-1 text-xs"
          @click="handleSave"
      />
    </div>

    <!-- MAIN INFO GRID -->
    <div class="grid grid-cols-2 gap-3 text-sm">

      <!-- DOMAIN NUMBER -->
      <div class="p-3 rounded-xl bg-surface-hover border border-surface-border">
        <p class="text-xs text-content-secondary">Domain No.</p>
        <p class="text-content-primary font-medium">
          {{ workPlan.domainNumber }}
        </p>
      </div>

      <!-- DOMAIN -->
      <div class="p-3 rounded-xl bg-surface-hover border border-surface-border">
        <p class="text-xs text-content-secondary">Domain</p>
        <p class="text-content-primary font-medium">
          {{ workPlan.domain }}
        </p>
      </div>

      <!-- LESSON NUMBER -->
      <div class="p-3 rounded-xl bg-surface-hover border border-surface-border">
        <p class="text-xs text-content-secondary">Lesson No.</p>
        <p class="text-content-primary font-medium">
          {{ workPlan.lessonNumber }}
        </p>
      </div>

      <!-- LESSON UNIT -->
      <div class="p-3 rounded-xl bg-surface-hover border border-surface-border">
        <p class="text-xs text-content-secondary">Lesson Unit</p>
        <p class="text-content-primary font-medium">
          {{ workPlan.lessonUnit }}
        </p>
      </div>

    </div>

    <!-- LEARNING OUTCOME -->
    <div class="p-3 rounded-xl bg-surface-hover border border-surface-border">
      <p class="text-xs text-content-secondary mb-1">
        Learning Outcome
      </p>

      <p class="text-content-primary text-sm leading-relaxed">
        {{ workPlan.learningOutcome }}
      </p>
    </div>

    <!-- INDICATORS -->
    <div>
      <p class="text-xs text-content-secondary mb-2">
        Indicators
      </p>

      <div class="flex flex-wrap gap-2">

        <span
            v-for="(indicator, idx) in getIndicators(workPlan.indicator)"
            :key="idx"
            class="px-2 py-1 text-xs rounded-md
                 bg-primary-500/10
                 border border-primary-500/20
                 text-primary-400"
        >
          {{ indicator }}
        </span>

      </div>
    </div>

  </div>
</template>