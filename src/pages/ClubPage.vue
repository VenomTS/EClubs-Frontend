<script setup>
import Stream from "../components/Stream.vue"
import Banner from "../components/ClubBanner.vue"
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

</script>

<template>
  <Banner/>
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
              Prvi Header
            </p>
          </TabPanel>
          <TabPanel value="1">
            <p class="m-0">
              Drugi Header
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
.p-tablist-tab-{
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