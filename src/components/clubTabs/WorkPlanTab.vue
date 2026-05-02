<script setup lang="ts">
import { computed } from "vue"

import CurrentWorkPlanPanel from "../workplans/CurrentWorkPlanPanel.vue";
import AllWorkPlansPanel from "../workplans/AllWorkPlansPanel.vue";
import type {ClubWorkPlansResponse, GetCurrentWorkPlanResponse} from "../../../api";

const props = defineProps<{
  allWorkPlans: ClubWorkPlansResponse[] | undefined
  currentWorkPlan: GetCurrentWorkPlanResponse | undefined
}>();

const isEmpty = computed(() =>
    !props.currentWorkPlan || props.allWorkPlans?.length === 0
)
</script>

<template>
  <div class="space-y-4">

    <!-- EMPTY STATE -->
    <div
        v-if="isEmpty"
        class="bg-surface-card border border-surface-border
             rounded-xl p-8 text-center space-y-4"
    >
      <p class="text-sm text-content-secondary">
        No work plans available
      </p>

      <Button
          label="Import Workplans"
          icon="pi pi-upload"
          class="bg-primary-500! border-none!
               hover:bg-primary-600!"
      />
    </div>

    <!-- WORK PLAN LAYOUT -->
    <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-20rem)]"
    >

      <!-- LEFT -->
      <div class="h-full">
        <CurrentWorkPlanPanel
            v-if="props.currentWorkPlan"
            :workPlan="props.currentWorkPlan"
        />
      </div>

      <!-- RIGHT (scrollable) -->
      <div class="h-full overflow-hidden">

        <div class="h-full overflow-y-auto pr-2 space-y-3">

          <AllWorkPlansPanel
              :workPlans="props.allWorkPlans"
          />

        </div>

      </div>

    </div>

  </div>
</template>