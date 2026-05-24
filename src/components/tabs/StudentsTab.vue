<script setup lang="ts">
import {onMounted, ref} from "vue";

import StudentCard from "../cards/StudentCard.vue";
import type {GetUserResponse} from "../../../api";
import {useClubStore} from "../../stores/club.store.ts";
import {useUserStore} from "../../stores/user.store.ts";
import {useToast} from "primevue";

const props = defineProps<{
  clubId: string;
}>();

const students = ref<GetUserResponse[]>([]);
const loading = ref(false);
const clubStore = useClubStore();
const userStore = useUserStore();
const toast = useToast();

const loadStudents = async () => {
  try {
    loading.value = true;

    const response = await clubStore.getStudentsByClubId(props.clubId);

    if(response.success)
      students.value = response.data ?? [];

  } catch (error) {
    console.error("Failed to load students", error);
  } finally {
    loading.value = false;
  }
};

const handleRate = (student: GetUserResponse) => {
  console.log("Rate:", student.firstName);
};

const handleKick = async (student: GetUserResponse) => {
  const response = await clubStore.kickFromClub(props.clubId, { studentId: student.id });

  if(response.success) {
    toast.add({
      severity: "success",
      summary: "Kicked",
      detail: "You successfully kicked " + student.firstName + " " + student.lastName,
      life: 3000
    });
    await loadStudents();
  }
  else
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Could not kick the user",
      life: 3000
    })
};

const handleLeave = (student: GetUserResponse) => {
  console.log("Leave:", student.firstName);
}

onMounted(async () => {
  await loadStudents();
});
</script>

<template>
  <div class="space-y-5">

    <!-- HEADER -->
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-medium text-content-primary">
        Učenici
      </h2>

      <span class="text-xs text-content-secondary">
        Klikni na učenika da vidiš historiju
      </span>
    </div>

    <!-- LOADING -->
    <div
        v-if="loading"
        class="rounded-xl border border-surface-border bg-surface-card p-6 text-center"
    >
      <p class="text-sm text-content-secondary">
        Učitavanje učenika...
      </p>
    </div>

    <!-- EMPTY STATE -->
    <div
        v-else-if="students.length === 0"
        class="rounded-xl border border-surface-border bg-surface-card p-6 text-center"
    >
      <p class="text-sm text-content-secondary">
        Nema učenika
      </p>
    </div>

    <!-- STUDENT CARDS -->
    <div v-else class="space-y-4">
      <StudentCard
          v-if="userStore.hasRole('Professor')"
          v-for="student in students"
          :key="student.id"
          :user="student"
          :clubId="clubId"
          :isStudent="false"
          @rate="handleRate"
          @kick="handleKick"
      />

      <StudentCard
          v-else
          :club-id="clubId"
          :user="userStore.getUser()"
          :isStudent="true"
          @kick="handleLeave"
      />

    </div>

  </div>
</template>