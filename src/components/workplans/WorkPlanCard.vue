<script setup lang="ts">
import type { ClubWorkPlansResponse } from "../../../api"

defineProps<{ plan: ClubWorkPlansResponse }>()

const emit = defineEmits<{
  (e: "edit", plan: ClubWorkPlansResponse): void
  (e: "delete", plan: ClubWorkPlansResponse): void
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
      class="group rounded-2xl border border-surface-border
           bg-surface-card/80 backdrop-blur
           hover:bg-surface-hover hover:border-primary-700/40
           transition-all duration-200 shadow-sm hover:shadow-md"
  >
    <div class="p-5 space-y-4">

      <!-- HEADER -->
      <div class="flex items-start justify-between gap-3">

        <!-- LEFT -->
        <div class="space-y-1">
          <p class="text-xs text-content-muted">
            Domain {{ plan.domainNumber }} · Lesson {{ plan.lessonNumber }}
          </p>

          <h3 class="text-sm font-semibold text-content-primary leading-snug">
            {{ plan.domain }}
          </h3>

          <p class="text-sm text-primary-400 font-medium">
            {{ plan.lessonUnit }}
          </p>
        </div>

        <!-- RIGHT ACTIONS -->
        <div class="flex items-center gap-2">

          <!-- EDIT -->
          <button
              @click="emit('edit', plan)"
              class="
        p-2 rounded-lg
        text-content-secondary
        border border-surface-border
        bg-surface-card
        hover:bg-primary-900/20
        hover:text-primary-300
        hover:border-primary-700/50
        transition-all
      "
              title="Edit"
          >
            <i class="pi pi-pencil text-sm"></i>
          </button>

          <!-- DELETE -->
          <button
              @click="emit('delete', plan)"
              class="
        p-2 rounded-lg
        text-content-secondary
        border border-surface-border
        bg-surface-card
        hover:bg-red-500/10
        hover:text-red-400
        hover:border-red-500/40
        transition-all
      "
              title="Delete"
          >
            <i class="pi pi-trash text-sm"></i>
          </button>

        </div>

      </div>

      <div class="h-px bg-surface-border/60" />

      <!-- OUTCOME -->
      <div class="space-y-1">
        <p class="text-xs uppercase tracking-wide text-content-muted">
          Learning Outcome
        </p>

        <p class="text-sm text-content-secondary leading-relaxed">
          {{ plan.learningOutcome }}
        </p>
      </div>

      <!-- INDICATORS -->
      <div v-if="plan.indicator" class="space-y-2 pt-2">

        <p class="text-xs uppercase tracking-wide text-content-muted">
          Indicators
        </p>

        <div class="flex flex-wrap gap-2">
          <span
              v-for="(item, index) in getIndicators(plan.indicator)"
              :key="index"
              class="
              px-2.5 py-1 rounded-full text-xs font-medium
              border border-primary-700/60
              text-primary-300
              bg-primary-900/20
              transition-all duration-150
              hover:bg-primary-900/40
              hover:border-primary-500
              hover:text-primary-200
              hover:shadow-sm
            "
          >
            {{ item }}
          </span>
        </div>

      </div>

    </div>
  </div>
</template>