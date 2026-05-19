<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import ClubCard from '../components/cards/ClubCard.vue'
import CreateClubModal from '../components/modals/CreateClubModal.vue'
import JoinClubModal from '../components/modals/JoinClubModal.vue'

import { useUserStore } from '../stores/user.store'
import { useClubStore } from '../stores/club.store'

import type { GetClubResponse } from '../../api'
import type { CreateClubModalData } from '../interfaces/CreateClubModalData'

/* ---------------- STORES ---------------- */
const router = useRouter()
const userStore = useUserStore()
const clubStore = useClubStore()

/* ---------------- LOCAL STATE ---------------- */
const clubs = ref<GetClubResponse[]>([])
const loading = ref(true)

const showCreateModal = ref(false)
const showJoinModal = ref(false)

/* ---------------- PERMISSIONS ---------------- */
const hasRole = (role: string) =>
    userStore.hasRole(role)

/* ---------------- DATA ---------------- */
const fetchClubs = async () => {
  loading.value = true

  const result = await clubStore.getClubsByUserId(
      userStore.userId
  )

  if (result.success) {
    clubs.value = result.data ?? []
  } else {
    console.error(result.message)
    clubs.value = []
  }

  loading.value = false
}

/* ---------------- ACTIONS ---------------- */

const handleClubSelect = (club: GetClubResponse) => {
  router.push(`/clubs/${club.id}`)
}

const handleCreateClub = async (data: CreateClubModalData) => {
  const result = await clubStore.createClub({
    name: data.name,
    professorId: userStore.userId,
    day: data.day,
    startTime: data.startTime,
    endTime: data.endTime,
  })

  if (result.success) {
    showCreateModal.value = false
    await fetchClubs()
  } else {
    console.error(result.message)
  }
}

const handleJoinClub = async (code: string) => {
  console.log("Join Club: " + code);
}

/* ---------------- LIFECYCLE ---------------- */
onMounted(fetchClubs)
</script>

<template>
  <div class="min-h-screen bg-surface-background text-content-primary p-8">

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">

      <div>
        <h1 class="text-3xl font-bold text-primary-400">
          My School Clubs
        </h1>

        <p class="text-content-secondary mt-1">
          Explore and manage your extracurricular activities
        </p>
      </div>

      <!-- ACTIONS -->
      <div class="flex gap-3">

        <Button
            v-if="hasRole('Professor')"
            icon="pi pi-plus"
            label="Create Club"
            class="bg-primary-500! hover:bg-primary-600!
                 border-none! text-content-primary!"
            @click="showCreateModal = true"
        />

        <Button
            v-if="hasRole('Student')"
            icon="pi pi-key"
            label="Join Club"
            class="bg-secondary-500! hover:bg-secondary-600!
                 border-none! text-content-primary!"
            @click="showJoinModal = true"
        />

      </div>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-content-muted">
      Loading clubs...
    </div>

    <!-- EMPTY STATE -->
    <div
        v-else-if="clubs.length === 0"
        class="text-center py-24"
    >
      <p class="text-lg text-content-secondary">
        No clubs yet
      </p>
      <p class="text-content-muted text-sm mt-1">
        Join or create your first club
      </p>
    </div>

    <!-- CLUB GRID -->
    <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      <ClubCard
          v-for="club in clubs"
          :key="club.id"
          :club="club"
          @select="handleClubSelect"
      />
    </div>

    <!-- MODALS -->
    <CreateClubModal
        v-if="showCreateModal"
        @close="showCreateModal = false"
        @create="handleCreateClub"
    />

    <JoinClubModal
        v-if="showJoinModal"
        @close="showJoinModal = false"
        @join="code => handleJoinClub(code)"
    />

  </div>
</template>