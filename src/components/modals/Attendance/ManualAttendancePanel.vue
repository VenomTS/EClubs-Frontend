<script setup lang="ts">

import type {Student} from "./Student.ts";

const props = defineProps<{
  students: Student[]
}>()

function markPresent(student: Student) {
  student.present = true
}

function markAbsent(student: Student) {
  student.present = false
}
</script>

<template>
  <div
      class="flex flex-col border border-surface-border
           rounded-xl p-5 space-y-4"
  >
    <h3 class="font-semibold text-content-primary">
      Manual Attendance
    </h3>

    <div class="space-y-3 max-h-87.5 overflow-y-auto">

      <div
          v-for="student in props.students"
          :key="student.id"
          class="flex items-center justify-between
               p-3 rounded-lg bg-surface-50"
      >
        <span>{{ student.name }}</span>

        <div class="flex gap-2">
          <Button
              label="Present"
              size="small"
              :severity="student.present ? 'success' : 'secondary'"
              @click="markPresent(student)"
          />

          <Button
              label="Absent"
              size="small"
              :severity="!student.present ? 'danger' : 'secondary'"
              @click="markAbsent(student)"
          />
        </div>

      </div>

    </div>
  </div>
</template>