<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

import ReportCard from "../cards/ReportCard.vue"

import type { GetReportsResponse } from "../../../api"
import {useReportsStore} from "../../stores/reports.store.ts";

/* ---------------------------------
   PROPS
---------------------------------- */
const props = defineProps<{
  clubId: string
}>()

/* ---------------------------------
   STORE
---------------------------------- */
const reportsStore = useReportsStore()

/* ---------------------------------
   STATE
---------------------------------- */
const loading = ref(true)
const reports = ref<GetReportsResponse[]>([])

/* ---------------------------------
   LOAD REPORTS
---------------------------------- */
const loadReports = async () => {
  loading.value = true

  const result = await reportsStore.getReportsByClubId(
      props.clubId
  )

  if (result.success) {
    reports.value = (result.data ?? []).sort(
        (a, b) =>
            new Date(b.date ?? 0).getTime() -
            new Date(a.date ?? 0).getTime()
    )
  } else {
    reports.value = []
  }

  loading.value = false
}

/* ---------------------------------
   STATS
---------------------------------- */
const totalReports = computed(() => reports.value.length)

/* ---------------------------------
   INIT
---------------------------------- */
onMounted(loadReports)
</script>

<template>
  <div class="space-y-6">

    <!-- HEADER -->
    <div
        class="
          flex flex-col lg:flex-row
          lg:items-center lg:justify-between
          gap-5
        "
    >
      <!-- TITLE -->
      <div class="space-y-1">

        <h1 class="text-3xl font-bold text-content-primary">
          Attendance Reports
        </h1>

        <p class="text-content-secondary">
          Review attendance history and session summaries
        </p>
      </div>

      <!-- STATS -->
      <div
          class="
      flex w-full lg:w-auto
    "
      >
        <div
            class="
        bg-surface-card
        border border-surface-border
        rounded-2xl
        px-6 py-4
        min-w-36
        text-center
      "
        >
          <p class="text-xs text-content-secondary uppercase tracking-wide">
            Total Reports
          </p>

          <h3 class="text-3xl font-bold text-primary-400 mt-1">
            {{ totalReports }}
          </h3>
        </div>
      </div>
    </div>

    <!-- LOADING -->
    <div
        v-if="loading"
        class="
          bg-surface-card
          border border-surface-border
          rounded-2xl
          p-10
          flex flex-col items-center justify-center
          gap-4
        "
    >
      <i class="pi pi-spin pi-spinner text-4xl text-primary-500" />

      <p class="text-content-secondary">
        Loading reports...
      </p>
    </div>

    <!-- EMPTY -->
    <div
        v-else-if="reports.length === 0"
        class="
          bg-surface-card
          border border-surface-border
          rounded-3xl
          p-14
          text-center
          space-y-5
        "
    >
      <div
          class="
            w-20 h-20 mx-auto
            rounded-full
            bg-surface-hover
            flex items-center justify-center
          "
      >
        <i class="pi pi-chart-bar text-4xl text-content-secondary" />
      </div>

      <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-content-primary">
          No Reports Yet
        </h2>

        <p class="text-content-secondary max-w-md mx-auto">
          Attendance reports will appear here once attendance
          has been recorded for club sessions.
        </p>
      </div>
    </div>

    <!-- REPORTS -->
    <div
        v-else
        class="
          grid grid-cols-1
          2xl:grid-cols-2
          gap-6
        "
    >
      <ReportCard
          v-for="report in reports"
          :key="report.id"
          :report="report"
      />
    </div>

  </div>
</template>