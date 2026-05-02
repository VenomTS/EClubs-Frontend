<script setup lang="ts">
import {computed, onMounted, ref} from "vue"

import {type ClubWorkPlansResponse, type GetDomainsResponse, WorkPlansApi} from "../../../api"
import WorkPlanCard from "./WorkPlanCard.vue"
import CreateWorkPlanModal from "../modals/CreateWorkPlanModal.vue";
import type {CreateWorkPlanPayload} from "../../interfaces/CreateWorkPlanModalData.ts";
import {useRoute} from "vue-router";

const workPlansAPI = new WorkPlansApi();

const route = useRoute();
const domains = ref<GetDomainsResponse[]>([]);

const props = defineProps<{
  workPlans: ClubWorkPlansResponse[] | undefined,
}>()

const showCreateWorkPlanModal = ref(false);

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

async function handleCreateWorkPlan(data: CreateWorkPlanPayload) {

  const clubId = route.params.clubId;
  if(Array.isArray(clubId)) return;

  const d = data.scheduledDate
  const formatted = d
      ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
      : null

  if(formatted == null) return;

  const response = await workPlansAPI.createWorkPlanForClub(clubId, {
    lessonUnit: data.lessonUnit,
    domain: data.domain,
    domainNumber: data.domainNumber,
    indicator: data.indicators,
    learningOutcome: data.learningOutcome,
    scheduledDate: formatted,
  });

  const workPlanResponse = response.data;

  props.workPlans?.push({
    id: workPlanResponse.id,
    domain: workPlanResponse.domain,
    domainNumber: workPlanResponse.domainNumber,
    indicator: workPlanResponse.indicator,
    learningOutcome: workPlanResponse.learningOutcome,
    lessonNumber: workPlanResponse.lessonNumber,
    lessonUnit: workPlanResponse.lessonUnit,
    realizationDate: null,
    status: workPlanResponse.status,
    scheduledDate: workPlanResponse.scheduledDate
  })
}

onMounted(async () => {
  const clubId = route.params.clubId;
  if(Array.isArray(clubId)) return;

  const response = await workPlansAPI.getDomainsByClubId(clubId);

  domains.value = response.data;
})
</script>

<template>
  <div
      class="bg-surface-card border border-surface-border
           rounded-xl p-4 h-full flex flex-col"
  >

    <!-- HEADER -->
    <div class="flex items-center justify-between shrink-0">
      <h3 class="text-sm font-medium text-content-primary">
        All Work Plans
      </h3>

      <Button
          label="Create Work Plan"
          icon="pi pi-plus"
          size="small"
          class="!bg-primary-500 !border-primary-600 hover:!bg-primary-600"
          @click="showCreateWorkPlanModal = true"
      />

      <CreateWorkPlanModal
          v-if="showCreateWorkPlanModal"
          :domains="domains"
          @close="showCreateWorkPlanModal = false"
          @create="data => handleCreateWorkPlan(data)"
      />
    </div>

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