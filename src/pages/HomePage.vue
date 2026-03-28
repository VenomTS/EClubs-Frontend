<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ClubsApi, type GetAllClubsResponse} from "../../api";
import ClubCard from "../components/ClubCard.vue";

const clubsApi = new ClubsApi();
const clubs = ref<GetAllClubsResponse[]>([]);

onMounted(async () => {
  let response = await clubsApi.getClubsForUser("019d0d1a-ddb9-723e-9695-0ae7dce00bb9");

  clubs.value = response.data;
  console.log(clubs.value);

})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ClubCard
            v-for="club in clubs"
            :key="club.id"
            :id="club.id"
            :name="club.name"
            :professor="club.professor"
        />
    </div>
  </div>
</template>
