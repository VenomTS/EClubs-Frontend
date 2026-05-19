<script setup lang="ts">
import { onMounted, ref } from "vue"
import BaseModal from "./BaseModal.vue"
import { useClubStore } from "../../stores/club.store.ts"

import type { GetUserResponse } from "../../../api"
import ManualAttendance from "../attendance/ManualAttendance.vue";
import AutomaticAttendance from "../attendance/AutomaticAttendance.vue";
import {useAttendanceStore} from "../../stores/attendances.store.ts";

/* ---------------------------------
   PROPS
---------------------------------- */
const props = defineProps<{
  clubId: string
}>()

/* ---------------------------------
   EMITS
---------------------------------- */
const emit = defineEmits<{
  (e: "close"): void
}>()

/* ---------------------------------
   STORE
---------------------------------- */
const clubStore = useClubStore()
const attendanceStore = useAttendanceStore()

/* ---------------------------------
   STATE
---------------------------------- */
const students = ref<GetUserResponse[]>([])
const mode = ref<"manual" | "automatic">("manual")

const manualAttendanceRef = ref<InstanceType<typeof ManualAttendance> | null>(null)

/* ---------------------------------
   FUNCTIONS
---------------------------------- */
const handleAttendance = async () => {

  // Do this if professor is doing it manually
  if(mode.value === "manual") {
    const attendance = manualAttendanceRef.value?.getAttendance()

    console.log(attendance)

    if(attendance === undefined)
      return;

    console.log(attendance.date); // Date Fri May 01 2026 00:00:00 GMT+0200 (Central European Summer Time)

    const date = attendance.date.toLocaleDateString("en-CA");
    console.log(date) // 2026-04-30

    for(const att of attendance.records) {
      await attendanceStore.markAttendance(props.clubId, { studentId: att.studentId, date: date, status: att.status === "present" ? 0 : 1 });
    }
    emit("close");
    return;
  }



  // Do this if not

}

/* ---------------------------------
   LOAD STUDENTS
---------------------------------- */
onMounted(async () => {
  const result = await clubStore.getStudentsByClubId(props.clubId)

  if (result.success) {
    students.value = result.data
  } else {
    console.error(
        `Failed to load students (${result.status})`,
        result.message
    )
  }
})
</script>

<template>
  <BaseModal @close="emit('close')">

    <div class="space-y-6">

      <!-- HEADER -->
      <header class="text-center space-y-2">
        <h2 class="text-xl font-semibold text-content-primary">
          Take Attendance
        </h2>

        <p class="text-sm text-content-secondary">
          Choose how you want to record attendance.
        </p>
      </header>

      <!-- MODE SWITCH -->
      <section class="flex justify-center">

        <div
            class="
            flex
            bg-surface-card
            border border-surface-border
            rounded-2xl
            p-1
            shadow-sm
          "
        >
          <!-- MANUAL -->
          <button
              @click="mode = 'manual'"
              :class="[
              'px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2',
              mode === 'manual'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-content-secondary hover:bg-surface-hover'
            ]"
          >
            <i class="pi pi-user-edit" />
            Manual
          </button>

          <!-- AUTOMATIC -->
          <button
              @click="mode = 'automatic'"
              :class="[
              'px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2',
              mode === 'automatic'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-content-secondary hover:bg-surface-hover'
            ]"
          >
            <i class="pi pi-bolt" />
            Automatic
          </button>
        </div>

      </section>

      <!-- CONTENT -->
      <section class="border-t border-surface-border pt-6">
        <ManualAttendance
          v-if="mode === 'manual'"
          :students="students"
          ref="manualAttendanceRef"
        />

        <AutomaticAttendance
            v-else
            :clubId="props.clubId"
        />

      </section>

      <!-- FOOTER -->
      <footer class="flex justify-end gap-2 pt-4 border-t border-surface-border">

        <Button
            label="Close"
            icon="pi pi-times"
            outlined
            severity="secondary"
            @click="emit('close')"
        />

        <Button
            label="Save"
            icon="pi pi-check"
            severity="success"
            @click="handleAttendance"
        />
      </footer>

    </div>

  </BaseModal>
</template>