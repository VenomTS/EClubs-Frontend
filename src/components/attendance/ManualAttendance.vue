<script setup lang="ts">
import { reactive, watch, ref } from "vue"
import type { GetUserResponse } from "../../../api"
import type {
  AttendanceRecord,
  AttendanceStatus
} from "./AttendanceRecord.ts"

/* ---------------------------------
   PROPS
---------------------------------- */
const props = defineProps<{
  students: GetUserResponse[]
}>()

/* ---------------------------------
   DATE
---------------------------------- */
const selectedDate = ref<Date>(new Date())

const today = new Date()

/* ---------------------------------
   STATE
---------------------------------- */
const attendance = reactive<Record<string, AttendanceStatus>>({})

watch(
    () => props.students,
    (students) => {
      students.forEach(s => {
        if (!attendance[s.id!]) {
          attendance[s.id!] = "present"
        }
      })
    },
    { immediate: true }
)

/* ---------------------------------
   METHODS
---------------------------------- */
function markPresent(id: string) {
  attendance[id] = "present"
}

function markAbsent(id: string) {
  attendance[id] = "absent"
}

/* ---------------------------------
   EXPOSED DATA
---------------------------------- */
function getAttendance() {
  return {
    date: selectedDate.value,
    records: Object.entries(attendance).map(
        ([studentId, status]): AttendanceRecord => ({
          studentId,
          status
        })
    )
  }
}

defineExpose({
  getAttendance
})
</script>

<template>
  <div class="space-y-5">

    <!-- DATE PICKER -->
    <div
        class="p-4 rounded-xl border border-surface-border
             bg-surface-card space-y-2"
    >
      <label class="text-sm font-semibold text-content-primary">
        Datum odvijanja nastavne jedinice.
      </label>

      <p class="text-xs text-content-secondary">
        Odaberite dan odvijanja nastavne jedinice.
      </p>

      <DatePicker
          v-model="selectedDate"
          :maxDate="today"
          showIcon
          dateFormat="dd.mm.yy"
          class="w-full md:w-72"
      />
    </div>

    <!-- STUDENTS -->
    <div class="space-y-3">

      <div
          v-for="student in students"
          :key="student.id"
          class="
          flex items-center justify-between
          p-4 rounded-xl
          border border-surface-border
          bg-surface-card
        "
      >
        <!-- Student -->
        <div class="font-medium text-content-primary">
          {{ student.firstName }} {{ student.lastName }}
        </div>

        <!-- Attendance Buttons -->
        <div class="flex gap-2">

          <Button
              label="Present"
              icon="pi pi-check"
              :severity="
              attendance[student.id!] === 'present'
                ? 'success'
                : 'secondary'
            "
              @click="markPresent(student.id!)"
          />

          <Button
              label="Absent"
              icon="pi pi-times"
              :severity="
              attendance[student.id!] === 'absent'
                ? 'danger'
                : 'secondary'
            "
              @click="markAbsent(student.id!)"
          />

        </div>
      </div>

    </div>

  </div>
</template>