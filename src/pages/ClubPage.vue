<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import { useRoute  } from "vue-router";

import {
  ClubsApi, type GetClubResponse
} from "../../api";
import StreamTab from "../components/tabs/StreamTab.vue";
import WorkPlanTab from "../components/tabs/WorkPlanTab.vue";
import {useUserStore} from "../stores/user.store.ts";
import StudentsTab from "../components/tabs/StudentsTab.vue";
import ReportTab from "../components/tabs/ReportTab.vue";

const clubsAPI = new ClubsApi();
const userStore = useUserStore();
const route = useRoute();
const clubId = ref<string>("");

const club = ref<GetClubResponse>({professor: {}});

const formattedCode = ref<string>("");

const translateClubDay = computed(() => {
  switch(club.value.day)
  {
    case "Monday":
      return "Ponedjeljak";
    case "Tuesday":
      return "Utorak";
    case "Wednesday":
      return "Srijeda";
    case "Thursday":
      return "Četvrtak";
    case "Friday":
      return "Petak";
  }
})

watch(
    () => route.params.clubId,
    async (newId, oldId) => {
      if (newId == oldId || Array.isArray(newId)) return;

      clubId.value = newId;

      const response = await clubsAPI.getClubById(newId);

      club.value = response.data;
      const code = club.value.code;
      formattedCode.value = code?.slice(0, 3) + '-' + code?.slice(3, 6);
    },
    { immediate: true }
);
</script>

<template>
  <div class="min-h-screen bg-surface-background text-content-primary">
    <div class="border-b border-surface-border bg-surface-card px-6 py-4 space-y-2">
      <h1 class="text-2xl font-semibold text-primary-400">
        {{ club.name }}
      </h1>

      <div class="flex flex-wrap items-center gap-3 text-xs text-content-secondary">

        <!-- DAY -->
        <span class="flex items-center gap-1 px-2 py-1 rounded-md bg-surface-hover border border-surface-border">
          <i class="pi pi-calendar text-xs"></i>
          {{ translateClubDay }}
        </span>

        <!-- TIME RANGE -->
        <span class="flex items-center gap-1 px-2 py-1 rounded-md bg-surface-hover border border-surface-border">
          <i class="pi pi-clock text-xs"></i>
          {{ club.startTime?.slice(0, 5) }} - {{ club.endTime?.slice(0, 5) }}
        </span>

        <!-- PROFESSOR -->
        <span class="flex items-center gap-1 px-2 py-1 rounded-md bg-surface-hover border border-surface-border">
          <i class="pi pi-user text-xs"></i>
          {{ club.professor?.firstName }} {{ club.professor?.lastName }}
        </span>

        <!-- CODE -->
        <span
            class="flex items-center gap-1 px-2 py-1 rounded-md bg-primary-500/10 border border-primary-500/30 text-primary-400 font-medium"
        >
          <i class="pi pi-key text-xs"></i>
          Code: {{ formattedCode }}
        </span>

      </div>
    </div>

    <div class="px-6 py-5">
      <Tabs value="stream">

        <TabList class="bg-surface-card border border-surface-border rounded-lg px-2">
          <Tab value="stream">Strim</Tab>
          <Tab value="workplans" v-if="userStore.hasRole('Professor')">Plan Rada</Tab>
          <Tab value="students">Učenici</Tab>
          <Tab value="reports" v-if="!userStore.hasRole('Student')">Reports</Tab>
        </TabList>

        <TabPanels class="mt-4">

          <TabPanel value="stream">
            <StreamTab :clubId="clubId"/>
          </TabPanel>

          <TabPanel value="workplans">
            <WorkPlanTab :clubId="clubId"/>
          </TabPanel>

          <TabPanel value="students">
            <StudentsTab :club-id="clubId"/>
          </TabPanel>

          <TabPanel value="reports">
            <ReportTab :club-id="clubId"/>
          </TabPanel>

        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>