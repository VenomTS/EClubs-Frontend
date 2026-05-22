<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute , useRouter } from "vue-router";

import {
  ClubsApi, type GetClubResponse
} from "../../api";
import StreamTab from "../components/tabs/StreamTab.vue";
import WorkPlanTab from "../components/tabs/WorkPlanTab.vue";
import AttendanceTab from "../components/tabs/AttendanceTab.vue";

const clubsAPI = new ClubsApi();
const route = useRoute();
const clubId = ref<string>("");
const router = useRouter();

const club = ref<GetClubResponse>({professor: {}});

const formattedCode = ref<string>("");

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
          Code: {{ formattedCode }}
        </span>
        <button
            @click="router.back()"
            class="ml-auto flex items-center gap-2 px-4 py-2 rounded-md bg-surface-hover border border-surface-border text-content-primary hover:bg-surface-card transition"
        >
          <i class="pi pi-arrow-left"></i>
          Nazad
        </button>


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
            <AttendanceTab :clubId="clubId" :isOnlyStudent="false"/>
          </TabPanel>

        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>