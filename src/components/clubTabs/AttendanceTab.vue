<script setup lang="ts">
import StudentAttendance from "../students/StudentAttendance.vue"
import type { GetAllAttendancesResponse } from "../../../api"

defineProps<{
  attendances: GetAllAttendancesResponse[] | undefined
}>()
</script>

<template>
  <div class="space-y-5">

    <!-- HEADER -->
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-medium text-content-primary">
        Student Attendance
      </h2>

      <span class="text-xs text-content-secondary">
        Click a student to view history
      </span>
    </div>

    <!-- EMPTY STATE -->
    <div
        v-if="!attendances || attendances.length === 0"
        class="bg-surface-card border border-surface-border
               rounded-xl p-6 text-center"
    >
      <p class="text-sm text-content-secondary">
        No attendance records available
      </p>
    </div>

    <!-- STUDENT CARDS -->
    <div v-else class="space-y-3">

      <StudentAttendance
          v-for="student in attendances"
          :key="student.student.firstName! + student.student.lastName"
          :data="student"
      />

    </div>

  </div>
</template>