<script setup lang="ts">
import type { GetWorkPlanResponse } from "../../../api"

defineProps<{ plan: GetWorkPlanResponse }>()

const emit = defineEmits<{
  (e: "uredi", plan: GetWorkPlanResponse): void
  (e: "izbriši", plan: GetWorkPlanResponse): void
}>()

const getIndicators = (value?: string) => {
  if (!value) return []
  return value
      .split(";")
      .map(i => i.trim())
      .filter(Boolean)
}
</script>

<template>
  <div
      class="
      group relative
      rounded-2xl
      border border-surface-border
      bg-surface-card
      hover:bg-surface-hover
      hover:border-primary-700/40
      transition-all duration-200
      shadow-sm hover:shadow-lg
      overflow-hidden
    "
  >

    <div class="p-6 space-y-6">

      <!-- HEADER -->
      <div class="flex items-start justify-between gap-4">

        <!-- TITLE BLOCK -->
        <div class="space-y-1">

          <p class="text-xs text-content-muted uppercase tracking-wide">
            Plan Rada
          </p>

          <h3 class="text-lg font-semibold text-content-primary leading-tight">
            {{ plan.domain }}
          </h3>

          <p class="text-sm text-primary-400 font-medium">
            {{ plan.unit }}
          </p>

        </div>

        <!-- ACTIONS (modern hover reveal) -->
        <div
            class="
            flex items-center gap-1
            opacity-0 group-hover:opacity-100
            transition
          "
        >

          <button
              @click="emit('edit', plan)"
              class="
              p-2 rounded-lg
              text-content-muted
              hover:text-primary-400
              hover:bg-primary-500/10
              transition
            "
              title="Uredi"
          >
            <i class="pi pi-pencil text-sm"></i>
          </button>

          <button
              @click="emit('izbriši', plan)"
              class="
              p-2 rounded-lg
              text-content-muted
              hover:text-danger-500
              hover:bg-danger-500/10
              transition
            "
              title="izbriši"
          >
            <i class="pi pi-trash text-sm"></i>
          </button>

        </div>
      </div>

      <!-- LEARNING OUTCOME -->
      <div
          class="
          rounded-xl
          border border-surface-border
          bg-surface-elevated
          p-4
        "
      >
        <p class="text-xs uppercase tracking-wide text-content-muted mb-2">
          Ishod učenja
        </p>

        <p class="text-sm text-content-secondary leading-relaxed">
          {{ plan.learningOutcome }}
        </p>
      </div>

      <!-- INDICATORS -->
      <div v-if="plan.indicator" class="space-y-2">

        <p class="text-xs uppercase tracking-wide text-content-muted">
          Indikatori
        </p>

        <div class="flex flex-wrap gap-2">

          <span
              v-for="(item, index) in getIndicators(plan.indicator)"
              :key="index"
              class="
              px-3 py-1.5 rounded-lg text-xs font-medium
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
</template>