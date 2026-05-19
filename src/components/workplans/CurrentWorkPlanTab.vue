<script setup lang="ts">
import {computed} from "vue"
import type { GetWorkPlanResponse } from "../../../api"

const props = defineProps<{
  workPlan: GetWorkPlanResponse | null
  clubId: string
}>()

const emit = defineEmits<{
  (e: "edit", plan: GetWorkPlanResponse): void
  (e: "attendance"): void
}>()

const hasPlan = computed(() => !!props.workPlan)

const indicators = computed(() => {
  if (!props.workPlan?.indicator) return []

  return props.workPlan.indicator
      .split(";")
      .map(i => i.trim())
      .filter(Boolean)
})
</script>

<template>
  <div class="space-y-4">

    <!-- EMPTY STATE -->
    <div
        v-if="!hasPlan"
        class="
        bg-surface-card border border-surface-border
        rounded-2xl p-10 text-center space-y-3
      "
    >
      <p class="text-content-secondary text-sm font-medium">
        No current work plan available
      </p>

      <p class="text-xs text-content-muted">
        A work plan must be created or selected before taking attendance.
      </p>
    </div>

    <!-- MAIN CARD -->
    <div
        v-else
        class="
        bg-surface-card border border-surface-border
        rounded-2xl shadow-sm overflow-hidden
      "
    >

      <!-- HEADER -->
      <div class="p-6 border-b border-surface-border bg-surface-elevated">

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <!-- TITLE -->
          <div class="space-y-1">
            <p class="text-xs text-content-muted uppercase tracking-wide">
              Current Work Plan
            </p>

            <h2 class="text-lg font-semibold text-content-primary">
              {{ workPlan?.domain }}
            </h2>

            <p class="text-sm text-primary-400 font-medium">
              {{ workPlan?.unit }}
            </p>
          </div>

          <!-- ACTIONS (EDIT LEFT, ATTENDANCE RIGHT) -->
          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

            <!-- EDIT (SECONDARY) -->
            <Button
                icon="pi pi-pencil"
                label="Edit"
                severity="secondary"
                outlined
                class="
          border-surface-border!
          hover:border-primary-500!
          hover:text-primary-400!
          w-full sm:w-auto
        "
                @click="emit('edit', workPlan!)"
            />

            <!-- TAKE ATTENDANCE (PRIMARY) -->
            <Button
                icon="pi pi-check-circle"
                label="Take Attendance"
                class="
          bg-primary-500!
          hover:bg-primary-600!
          border-none!
          text-white!
          text-base
          font-semibold
          px-6 py-3
          shadow-md
          hover:shadow-lg
          transition-all
          w-full sm:w-auto
        "
                @click="emit('attendance')"
            />

          </div>
        </div>

        <!-- HELP TEXT -->
        <p class="text-xs text-content-muted mt-3">
          Click “Take Attendance” when students are present in class
        </p>
      </div>

      <!-- BODY -->
      <div class="p-6 space-y-6">

        <!-- LEARNING OUTCOME -->
        <div
            class="
            bg-surface-elevated
            border border-surface-border
            rounded-xl p-4
          "
        >
          <p class="text-xs text-content-muted uppercase mb-2">
            Learning Outcome
          </p>

          <p class="text-sm text-content-secondary leading-relaxed">
            {{ workPlan?.learningOutcome }}
          </p>
        </div>

        <!-- INDICATORS -->
        <div v-if="indicators.length > 0" class="space-y-2">

          <p class="text-xs text-content-muted uppercase">
            Indicators
          </p>

          <div class="flex flex-wrap gap-2">

            <span
                v-for="(item, i) in indicators"
                :key="i"
                class="
                px-3 py-1.5 text-xs font-medium
                rounded-lg
                border border-primary-500/20
                bg-primary-500/10
                text-primary-400
                hover:bg-primary-500/20
                transition
              "
            >
              {{ item }}
            </span>

          </div>
        </div>

      </div>

    </div>
  </div>
</template>