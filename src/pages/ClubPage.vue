<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import {
  AttendancesApi,
  type ClubMessageResponse,
  ClubsApi, type ClubWorkPlansResponse, type GetAllAttendancesResponse,
  type GetClubByIdResponse, type GetDomainsResponse, WorkPlansApi,
} from "../../api";
import StreamTab from "../components/clubTabs/StreamTab.vue";
import WorkPlanTab from "../components/clubTabs/WorkPlanTab.vue";
import AttendanceTab from "../components/clubTabs/AttendanceTab.vue";

const clubsAPI = new ClubsApi();
const workPlansAPI = new WorkPlansApi();
const attendancesAPI = new AttendancesApi();
const route = useRoute();
const clubId = ref<string>("");

const club = ref<GetClubByIdResponse>({professor: {}});
const messages = ref<ClubMessageResponse[]>();
const workPlans = ref<ClubWorkPlansResponse[]>();
const domains = ref<GetDomainsResponse[]>();
const attendances = ref<GetAllAttendancesResponse[]>();

watch(
    () => route.params.clubId,
    async (newId, oldId) => {
      if (newId == oldId || Array.isArray(newId)) return;

      clubId.value = newId;

      const response = await clubsAPI.getClubById(newId);

      club.value = response.data;
      messages.value = club.value.messages;
      workPlans.value = club.value.workPlans;

      messages.value?.reverse();

      try
      {
        const attendancesResponse = await attendancesAPI.getAttendancesForClub(newId);

        attendances.value = attendancesResponse.data;
      }
      catch
      {
        console.log("Error pri fetching Attendances");
      }

      try
      {
        const domainsResponse = await workPlansAPI.getDomainsByClubId(newId);
        domains.value = domainsResponse.data;
      }
      catch
      {
        console.log("Error pri fetching domains");
      }
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
          {{ club.day }}
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
          Code: AAA-BBB
        </span>

      </div>
    </div>

    <div class="px-6 py-5">
      <Tabs value="stream">

        <TabList class="bg-surface-card border border-surface-border rounded-lg px-2">
          <Tab value="stream">Stream</Tab>
          <Tab value="workplans">WorkPlans</Tab>
          <Tab value="students">Students</Tab>
        </TabList>

        <TabPanels class="mt-4">

          <TabPanel value="stream">
            <StreamTab :clubId="clubId"/>
          </TabPanel>

          <TabPanel value="workplans">
            <WorkPlanTab :clubId="clubId"/>
          </TabPanel>

          <TabPanel value="students">
            <AttendanceTab
                :attendances="attendances"
            />
          </TabPanel>

        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>