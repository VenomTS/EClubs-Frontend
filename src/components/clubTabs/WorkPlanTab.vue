<script setup lang="ts">
import {computed, onMounted, ref} from "vue"

import CurrentWorkPlanPanel from "../workplans/CurrentWorkPlanPanel.vue";
import AllWorkPlansPanel from "../workplans/AllWorkPlansPanel.vue";
import {type GetAllWorkPlansByClubIdResponse, WorkPlansApi} from "../../../api";

const workPlansAPI = new WorkPlansApi();
const workPlans = ref<GetAllWorkPlansByClubIdResponse[]>([]);

const props = defineProps<{
  clubId: string
}>();

const isEmpty = computed(() => workPlans.value.length === 0)

onMounted(async () => {
  try {
    const response = await workPlansAPI.getWorkPlansForClub(props.clubId);
    workPlans.value = response.data;
  }
  catch(error) {}
})
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
        <CurrentWorkPlanPanel :club-id="props.clubId"/>
      </div>

      <!-- RIGHT (scrollable) -->
      <div class="h-full overflow-hidden">

        <div class="h-full overflow-y-auto pr-2 space-y-3">

          <AllWorkPlansPanel :clubId="props.clubId"/>

        </div>

      </div>

    </div>

  </div>
</template>