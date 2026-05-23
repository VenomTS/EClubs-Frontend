<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import {useWorkPlansStore} from "../../stores/workplans.store.ts";

import type {GetDomainsResponse, GetWorkPlanResponse} from "../../../api"
import CurrentWorkPlanTab from "../workplans/CurrentWorkPlanTab.vue";
import AllWorkPlansTab from "../workplans/AllWorkPlansTab.vue";
import CreateWorkPlanModal from "../modals/CreateWorkPlanModal.vue";
import TakeAttendanceModal from "../modals/TakeAttendanceModal.vue";

const route = useRoute()
const workPlansStore = useWorkPlansStore()

const clubId = route.params.clubId as string

const fileUploadRef = ref();

const showCreateWorkPlanModal = ref<boolean>(false);
const showTakeAttendanceModal = ref<boolean>(false);

/* ---------------- STATE (OWNED HERE) ---------------- */
const workPlans = ref<GetWorkPlanResponse[]>([])
const currentWorkPlan = ref<GetWorkPlanResponse | null>(null)
const domains = ref<GetDomainsResponse[]>([])

const tab = ref<"current" | "all">("current")

const loading = ref(true)

const tabs = [
  {
    label: 'Current Work Plan',
    value: 'current',
    icon: 'pi pi-bolt'
  },
  {
    label: 'All Work Plans',
    value: 'all',
    icon: 'pi pi-list'
  }
]

/* ---------------- EMPTY STATE ---------------- */
const hasWorkPlans = computed(() => workPlans.value.length > 0)

/* ---------------- LOAD ---------------- */
const loadData = async () => {

  loading.value = true

  try {
    const [allResult, currentResult, domainsResult] = await Promise.all([
        workPlansStore.getWorkPlansByClubId(clubId),
        workPlansStore.getCurrentWorkPlan(clubId),
        workPlansStore.getDomainsByClubId(clubId),
    ])

    if (allResult.success) {
      workPlans.value = allResult.data ?? []
    } else {
      workPlans.value = []
    }

    if (currentResult.success) {
      currentWorkPlan.value = currentResult.data ?? null
    } else {
      // 404 is expected → no current plan
      currentWorkPlan.value = null
    }

    if(domainsResult.success) {
      domains.value = domainsResult.data ?? []
    } else {
      domains.value = []
    }

  } finally {
    loading.value = false
  }
}

/* -------------- UPLOAD ---------------- */

const onUpload = async (event: any) => {
  const file = event.files[0]

  if (!file) return

  await workPlansStore.uploadWorkPlan(clubId, file);

  loadData()
}

/* ---------------- INIT ---------------- */
onMounted(loadData)
</script>

<template>
  <div class="space-y-5">

    <!-- LOADING -->
    <div
        v-if="loading"
        class="text-content-muted text-sm"
    >
      Loading work plans...
    </div>

    <!-- EMPTY STATE -->
    <div
        v-else-if="!hasWorkPlans"
        class="bg-surface-card border border-surface-border
             rounded-2xl p-10 text-center space-y-6"
    >
      <p class="text-content-secondary text-sm">
        No work plans available
      </p>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">

        <FileUpload
            ref="fileUploadRef"
            mode="basic"
            name="file"
            chooseLabel="Import Work Plans"
            chooseIcon="pi pi-upload"
            customUpload
            :auto="true"
            @uploader="onUpload"
            class="p-button p-component
           bg-primary-500!
           border-none!
           hover:bg-primary-600!
           text-content-primary
           rounded-xl!"
        />

        <Button
            label="Add Work Plan"
            icon="pi pi-plus"
            severity="secondary"
            outlined
            class="border-surface-border!
                 hover:border-primary-500!
                 hover:text-primary-400!"
            @click="showCreateWorkPlanModal = true"
        />

        <CreateWorkPlanModal
            v-if="showCreateWorkPlanModal"
            :club-id="clubId"
            :domains="domains"
            @close="showCreateWorkPlanModal = false; loadData()"
        />

      </div>
    </div>

    <!-- MAIN UI -->
    <div v-else class="space-y-4">

      <!-- TOGGLE -->
      <SelectButton
          v-model="tab"
          :options="tabs"
          optionLabel="label"
          optionValue="value"
      />

      <!-- CURRENT -->
      <div v-if="tab === 'current'">
        <CurrentWorkPlanTab
            :work-plan="currentWorkPlan"
            :club-id="clubId"
            @attendance="showTakeAttendanceModal = true"
        />

        <TakeAttendanceModal
            :clubId="clubId"
            v-if="showTakeAttendanceModal"
            @close="showTakeAttendanceModal = false"
        />
      </div>

      <!-- ALL -->
      <div v-else>
        <AllWorkPlansTab
            :work-plans="workPlans"
            :domains="domains"
            :club-id="clubId"
            @add="loadData"
        />
      </div>

    </div>

  </div>
</template>

