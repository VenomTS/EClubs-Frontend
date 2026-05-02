<script setup lang="ts">
import { computed } from "vue"

import type { ClubWorkPlansResponse } from "../../../api"
import WorkPlanCard from "./WorkPlanCard.vue"

const props = defineProps<{ workPlans: ClubWorkPlansResponse[] | undefined}>()

const groupedPlans = computed(() => {
  const map = new Map<number, ClubWorkPlansResponse[]>()

  for (const plan of props.workPlans!) {
    if (!map.has(plan.domainNumber!)) {
      map.set(plan.domainNumber!, [])
    }
    map.get(plan.domainNumber!)!.push(plan)
  }

  return Array.from(map.entries()).sort(([a], [b]) => a - b)
})
</script>

<template>
  <div
      class="bg-surface-card border border-surface-border
           rounded-xl p-4 h-full flex flex-col"
  >

    <!-- HEADER -->
    <h3 class="text-sm font-medium text-content-primary shrink-0">
      All Work Plans
    </h3>

    <!-- EMPTY STATE -->
    <div
        v-if="workPlans!.length === 0"
        class="text-sm text-content-secondary mt-3"
    >
      No work plans found
    </div>

    <!-- ACCORDION -->
    <div v-else class="mt-3 flex-1 overflow-y-auto pr-2">

      <Accordion multiple>

        <AccordionPanel
            v-for="[domainNumber, plans] in groupedPlans"
            :key="domainNumber"
            :value="domainNumber"
        >

          <!-- HEADER -->
          <AccordionHeader>
            <div class="flex flex-col">
              <span class="text-sm font-medium text-content-primary">
                Domain {{ domainNumber }} - {{ plans[0]?.domain }}
              </span>

              <span class="text-xs text-content-muted">
                {{ plans.length }} work plan(s)
              </span>
            </div>
          </AccordionHeader>

          <!-- CONTENT -->
          <AccordionContent>
            <div class="space-y-3 pt-2">
              <WorkPlanCard
                  v-for="plan in plans"
                  :key="plan.domainNumber + '-' + plan.lessonNumber"
                  :plan="plan"
              />
            </div>
          </AccordionContent>

        </AccordionPanel>

      </Accordion>

    </div>
  </div>
</template>