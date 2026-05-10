<script setup lang="ts">
import { onMounted, ref } from "vue"
import BaseModal from "../BaseModal.vue"

import ManualAttendancePanel from "./ManualAttendancePanel.vue"
import QRAttendancePanel from "./QRAttendancePanel.vue"

import {AttendancesApi, type GetStudentByClubIdResponse} from "../../../../api"
import type { Student } from "./Student.ts"

const props = defineProps<{
  studentsData: GetStudentByClubIdResponse[],
  clubId: string,
  currentWorkPlanId: string,
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

/* -------------------- */
/* State                */
/* -------------------- */

const loading = ref(false)
const students = ref<Student[]>([])
const qrValue = ref("attendance-session-123")

const attendanceApi = new AttendancesApi();

/* -------------------- */
/* Mode Switch          */
/* -------------------- */

type AttendanceMode = "manual" | "automatic"

const mode = ref<AttendanceMode>("manual")

const modeOptions = [
  { label: "Manual", value: "manual" },
  { label: "Automatic", value: "automatic" }
]

/* -------------------- */
/* Init students        */
/* -------------------- */

onMounted(() => {
  students.value = props.studentsData.map(student => ({
    id: student.id!,
    name: student.firstName + " " + student.lastName,
    present: true,
  }))
})

/* -------------------- */
/* Save                 */
/* -------------------- */

async function save() {
  loading.value = true

  students.value.forEach(student => {
    console.log("Checking student: " + student);
    if(student.present)
      attendanceApi.markStudentPresent(props.clubId, { workPlanId: props.currentWorkPlanId, studentId: student.id})
  })

  await attendanceApi.concludeAttendanceTaking(props.clubId);

  loading.value = false
  emit("close")
}
</script>

<template>
  <BaseModal @close="$emit('close')">

    <!-- Header -->
    <div class="mb-6 space-y-1">
      <h2 class="text-xl font-semibold text-content-primary">
        Take Attendance
      </h2>

      <p class="text-sm text-content-secondary">
        Mark attendance manually or using QR code
      </p>
    </div>

    <!-- MODE SWITCH -->
    <div class="flex justify-center mb-6">
      <SelectButton
          v-model="mode"
          :options="modeOptions"
          optionLabel="label"
          optionValue="value"
      />
    </div>

    <!-- PANELS -->
    <div class="min-h-105">

      <!-- MANUAL -->
      <ManualAttendancePanel
          v-if="mode === 'manual'"
          :students="students"
      />

      <!-- AUTOMATIC (QR) -->
      <QRAttendancePanel
          v-else
          :qrValue="qrValue"
      />

    </div>

    <!-- FOOTER -->
    <div
        class="flex justify-end gap-3 mt-8 pt-4
             border-t border-surface-border"
    >
      <Button
          label="Cancel"
          severity="secondary"
          outlined
          @click="$emit('close')"
      />

      <Button
          label="Save"
          :loading="loading"
          :disabled="loading"
          class="bg-primary-500! border-none!
               hover:bg-primary-600!"
          @click="save"
      />
    </div>

  </BaseModal>
</template>