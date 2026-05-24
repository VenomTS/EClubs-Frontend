<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Menu from 'primevue/menu'

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


const menu = ref()
const items = [

  {
    label: 'Odjavi se',
    icon: 'pi pi-sign-out',
    command: () => {
      userStore.logout?.()
      router.push('/login')
    }
  }
]
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

/* ---------------- LIFECYCLE ---------------- */
onMounted(fetchClubs)
</script>

<template>
  <div class="min-h-screen bg-surface-background text-content-primary p-8">

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">

      <div>
        <h1 class="text-3xl font-bold text-primary-400">
          Moje Sekcije
        </h1>

        <p class="text-content-secondary mt-1">
          Istražite i upravljajte svojim vannastavnim aktivnostima
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

        <div class="relative">
          <button
              @click="menu.toggle($event)"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-hover border border-surface-border hover:bg-surface-card transition"
          >
            <i class="pi pi-user text-content-primary"></i>
          </button>

          <Menu ref="menu" :model="items" popup />
        </div>

      </div>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-content-muted">
      Učitavanje sekcije...
    </div>

    <!-- EMPTY STATE -->
    <div
        v-else-if="clubs.length === 0"
        class="text-center py-24"
    >
      <p class="text-lg text-content-secondary">
        Nema sekcija
      </p>
      <p class="text-content-muted text-sm mt-1">
        Pridruži se ili kreiraj svoj prvi klub
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
        @join="fetchClubs"
    />

  </div>
</template>