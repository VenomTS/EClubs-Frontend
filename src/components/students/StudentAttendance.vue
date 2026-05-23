<script setup lang="ts">
import { ref, computed } from "vue"
import Button from "primevue/button"
import type { GetAttendanceResponse } from "../../../api"

const props = defineProps<{
  data: GetAttendanceResponse
}>()

const emit = defineEmits(["rate"])

const expanded = ref(false)

const fullName = computed(
    () => `${props.data.student.firstName} ${props.data.student.lastName}`
)

/* 🇪🇺 European Date Format */
const formatDate = (date: string) => {
  const d = new Date(date)
  return d.toLocaleDateString("en-GB")
}

/* Status Metadata */
const statusMeta = (status: number | string) => {
  if (status === 0 || status === "Present")
    return {
      label: "Prisutan",
      class: "text-green-400 border-green-400/30 bg-green-400/10"
    }

  if (status === 1 || status === "Absent")
    return {
      label: "Odsutan",
      class: "text-red-400 border-red-400/30 bg-red-400/10"
    }

  if (status === 2 || status === "Unrealized")
    return {
      label: "Nerealizovano",
      class: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
    }

  return { label: "Nepoznato", class: "" }
}

function rateStudent(e: Event) {
  e.stopPropagation() // 🚨 prevent expand toggle
  emit("rate", props.data.student)
}
</script>

<template>
  <div
      class="group
           bg-surface-card
           border border-surface-border
           rounded-2xl
           transition-all duration-200
           hover:shadow-lg
           hover:border-primary-400/40
           overflow-hidden"
  >
    <!-- HEADER -->
    <button
        class="w-full flex items-center justify-between
             px-5 py-4 text-left hover:bg-surface-hover transition"
        @click="expanded = !expanded"
    >
      <div class="flex items-center gap-4">

        <!-- Avatar -->
        <div
            class="w-10 h-10 rounded-full
                 bg-primary-500/15 text-primary-400
                 flex items-center justify-center
                 font-semibold"
        >
          {{ data.student.firstName![0] }}{{ data.student.lastName![0] }}
        </div>

        <!-- Name -->
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-content-primary">
            {{ fullName }}
          </span>

          <span class="text-xs text-content-secondary">
            Kliklni da vidiš prisustvo
          </span>
        </div>
      </div>

      <!-- RIGHT SIDE ACTIONS -->
      <div class="flex items-center gap-2">

        <!-- Rate Student Button -->
        <Button
            size="small"
            icon="pi pi-star"
            label="Rate"
            class="
        bg-primary-500/15!
        text-primary-400!
        border-none!
        hover:bg-primary-500/25!
        transition
        font-medium
      "
            @click="rateStudent"
        />

        <!-- Chevron -->
        <i
            class="pi text-content-secondary transition-all duration-200"
            :class="expanded
        ? 'pi-chevron-down rotate-180 text-primary-400'
        : 'pi-chevron-down'"
        />
      </div>
    </button>

    <!-- Divider -->
    <div
        class="h-px bg-surface-border transition-opacity"
        :class="expanded ? 'opacity-100' : 'opacity-0'"
    />

    <!-- EXPANDABLE CONTENT -->
    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-2"
        leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="expanded" class="px-5 py-4 space-y-3">

        <div
            v-if="data.attendanceHistory.length === 0"
            class="text-sm text-content-secondary"
        >
          Nema informacija o prisustvu.
        </div>

        <div v-else class="space-y-2">

          <div
              v-for="entry in data.attendanceHistory"
              :key="entry.date"
              class="flex items-center justify-between
                   rounded-xl
                   border border-surface-border
                   px-4 py-3
                   hover:bg-surface-hover transition"
          >
            <span class="text-sm text-content-primary">
              {{ formatDate(entry.date!) }}
            </span>

            <span
                class="text-xs font-medium
                     px-2.5 py-1 rounded-full border"
                :class="statusMeta(entry.status!).class"
            >
              {{ statusMeta(entry.status!).label }}
            </span>
          </div>

        </div>
      </div>
    </Transition>
  </div>
</template>