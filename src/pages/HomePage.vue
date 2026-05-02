<script setup lang="ts">
import { onMounted, ref } from "vue"
import { ClubsApi, type GetAllClubsResponse } from "../../api"
import ClubCard from "../components/ClubCard.vue"
import { useUserStore } from "../stores/userStore"
import CreateClubModal from "../components/modals/CreateClubModal.vue";
import JoinClubModal from "../components/modals/JoinClubModal.vue";
import type {CreateClubModalData} from "../interfaces/CreateClubModalData.ts";

const clubsApi = new ClubsApi()
const clubs = ref<GetAllClubsResponse[]>([])
const loading = ref(true)

const userStore = useUserStore()

const showCreateModal = ref(false)
const showJoinModal = ref(false)

const hasRole = (role: string): boolean =>
{
  return userStore.hasRole(role);
}

const createClub = async (clubData: CreateClubModalData) => {
  try
  {
    const userId = userStore.userId;
    await clubsApi.createClub({
      name: clubData.name,
      professorId: userId,
      day: clubData.day,
      startTime: clubData.startTime,
      endTime: clubData.endTime,
    });

    await fetchClubs();
  }
  catch
  {
    console.log("Something went wrong");
  }

}

const fetchClubs = async () =>
{
  const userId = userStore.userId;
  const response = await clubsApi.getClubsForUser(userId)

  clubs.value = response.data
}

onMounted(async () => {
  try {
    await fetchClubs();
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-surface-background text-content-primary p-8">

    <!-- Header -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      <div>
        <h1 class="text-3xl font-bold text-primary-400">
          My School Clubs
        </h1>

        <p class="text-content-secondary mt-1">
          Explore and manage your enrolled clubs
        </p>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="flex gap-3">

        <!-- Professor Button -->
        <Button
            v-if="hasRole('Professor')"
            icon="pi pi-plus"
            label="Create Club"
            class="bg-primary-500! border-none!
           hover:bg-primary-600!
           text-content-primary!
           font-medium rounded-lg px-4 py-2
           shadow-sm hover:shadow-md
           transition-all duration-200"
            @click="showCreateModal = true"
        />

        <!-- Student Button -->
        <Button
            v-if="hasRole('Student')"
            icon="pi pi-key"
            label="Join Club"
            class="bg-secondary-500! border-none!
           hover:bg-secondary-600!
           text-content-primary!
           font-medium rounded-lg px-4 py-2
           shadow-sm hover:shadow-md
           transition-all duration-200"
            @click="showJoinModal = true"
        />

      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-content-muted">
      Loading clubs...
    </div>

    <!-- Empty State -->
    <div
        v-else-if="clubs.length === 0"
        class="text-center py-20 text-content-muted"
    >
      <p class="text-lg">No clubs found</p>
      <p class="text-sm">You are not enrolled in any clubs yet</p>
    </div>

    <!-- Clubs Grid -->
    <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <ClubCard
          v-for="club in clubs"
          :key="club.id"
          :id="club.id"
          :name="club.name"
          :professor="club.professor"
      />
    </div>

    <CreateClubModal
        v-if="showCreateModal"
        @close="showCreateModal = false"
        @create="data => createClub(data)"
    />

    <JoinClubModal
        v-if="showJoinModal"
        @close="showJoinModal = false"
        @join="code => console.log('join club', code)"
    />
  </div>
</template>