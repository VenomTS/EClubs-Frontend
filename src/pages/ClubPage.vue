<script setup lang="ts">

import {ref, watch} from "vue";
import {
  type ClubMessageResponse, ClubMessagesApi,
  type ClubProfessorResponse,
  ClubsApi,
  type ClubWorkPlansResponse,
  type GetClubByIdResponse
} from "../../api";

import {useRoute} from "vue-router";
import Stream from "../components/Stream.vue";
import WorkPlanCard from "../components/WorkPlanCard.vue";

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

const clubsApi = new ClubsApi();
const club = ref<GetClubByIdResponse>();
const messages = ref<ClubMessageResponse[]>();
const professor = ref<ClubProfessorResponse>();
const workPlans = ref<ClubWorkPlansResponse[]>();

const route = useRoute();

watch(
    () => route.params.clubId,
    async (newId, oldId) => {
      if(newId == oldId || Array.isArray(newId)) return;

      const response = await clubsApi.getClubById(newId);

      club.value = response.data;
      messages.value = club.value.messages;
      professor.value = club.value.professor;
      workPlans.value = club.value.workPlans;
    },
    { immediate: true }
);

</script>

<template>

  <div class="card">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Stream</Tab>
        <Tab value="1">Work Plan</Tab>
        <Tab value="2">Attendance</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <p class="m-0">
            <Stream :messages="messages || []"/>
          </p>
        </TabPanel>
        <TabPanel value="1">
          <p class="m-0">
            <WorkPlanCard
                v-for="workPlan in workPlans"
                :id="workPlan.id"
                :description="workPlan.description"
                :note="workPlan.note"
                :scheduledDate="workPlan.scheduledDate"
                :realizationDate="workPlan.realizationDate"
                :status="workPlan.status"
            />
          </p>
        </TabPanel>
        <TabPanel value="2">
          <p class="m-0">
            Treci Header
          </p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>

</template>

<style>
:root{
  --p-tabs-tablist-border-color: white !important;
  --p-tabs-tablist-border-width: 0 0 50px 0   !important;
}
.p-tablist-tab-list{
  background-color: white !important;
  gap:1rem;
  justify-content: center;
}

.p-tab{
  color: black !important;
  font-weight: 100 !important;

}
.p-tab:hover{color:green !important;}
.p-tabpanels{background-color:white !important;}
.m-0{color:black !important;}
.p-tablist-tab:hover {
  color: #059669;
  background-color: #ecfdf5;
}
.p-tablist-tab{
  color: #059669 !important;
}
.p-tablist-tab-list{
  background-color: white !important;
}

.p-tab.p-tab-active
{
  color: #059669 !important;
}
</style>