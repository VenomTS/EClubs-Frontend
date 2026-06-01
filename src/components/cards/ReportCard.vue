<script setup lang="ts">
import { computed } from "vue"
import type { GetReportsResponse } from "../../../api"
import UserIcon from "../reusables/UserIcon.vue";

/* ---------------------------------
   PROPS
---------------------------------- */
const props = defineProps<{
  report: GetReportsResponse
}>()

/* ---------------------------------
   HELPERS
---------------------------------- */
const professorName = computed(() => {
  const p = props.report.professor

  if (!p) return "Unknown Professor"

  return `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim()
})

const professorInitials = computed(() => {
  const p = props.report.professor

  if(!p) return "NN"

  return `${p.firstName?.at(0) ?? "N"}${p.lastName?.at(0) ?? "N"}`.trim()
})

const presentStudents = computed(() => {
  return props.report.present
      ?.split(";")
      .map(s => s.trim())
      .filter(Boolean) ?? []
})

const absentStudents = computed(() => {
  return props.report.absent
      ?.split(";")
      .map(s => s.trim())
      .filter(Boolean) ?? []
})

const formattedDate = computed(() => {
  if (!props.report.date) return "—"

  return new Date(props.report.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
})
</script>

<template>
  <Card
      class="
        overflow-hidden
        border border-surface-border
        bg-surface-card
        rounded-3xl
        shadow-sm
        hover:shadow-lg
        transition-all duration-300
      "
  >
    <template #content>

      <div class="p-6 space-y-6">

        <!-- HEADER -->
        <div
            class="
              flex flex-col lg:flex-row
              lg:items-start lg:justify-between
              gap-5
            "
        >
          <!-- LEFT -->
          <div class="space-y-3">

            <!-- LABEL -->
            <div
                class="
                  inline-flex items-center gap-2
                  px-3 py-1 rounded-full
                  bg-primary-500/10
                  border border-primary-500/20
                  text-primary-400
                  text-xs font-semibold uppercase tracking-wide
                "
            >
              <i class="pi pi-book" />
              Club Session Report
            </div>

            <!-- DOMAIN -->
            <div>
              <p class="text-xs text-content-secondary uppercase tracking-wide">
                Domain
              </p>

              <h2 class="text-2xl font-bold text-content-primary">
                {{ report.workPlan?.domain }}
              </h2>
            </div>

            <!-- UNIT -->
            <div>
              <p class="text-xs text-content-secondary uppercase tracking-wide">
                Unit
              </p>

              <p class="text-lg font-medium text-primary-400">
                {{ report.workPlan?.unit }}
              </p>
            </div>
          </div>

          <!-- RIGHT -->
          <div
              class="
                bg-surface-hover/70
                border border-surface-border
                rounded-2xl
                p-4
                min-w-65
                space-y-3
              "
          >
            <div class="flex items-center gap-3">
              <UserIcon :initials="professorInitials" />
<!--              <div-->
<!--                  class="-->
<!--                    w-11 h-11 rounded-full-->
<!--                    bg-primary-500/20-->
<!--                    flex items-center justify-center-->
<!--                    text-primary-400 font-semibold-->
<!--                  "-->
<!--              >-->
<!--                {{ professorName.charAt(0) }}-->
<!--              </div>-->

              <div>
                <p class="text-xs text-content-secondary">
                  Professor
                </p>

                <p class="font-medium text-content-primary">
                  {{ professorName }}
                </p>
              </div>
            </div>

            <Divider class="my-2!" />

            <div class="flex items-center justify-between">
              <span class="text-content-secondary text-sm">
                Session Date
              </span>

              <span class="font-medium text-content-primary">
                {{ formattedDate }}
              </span>
            </div>
          </div>
        </div>

        <!-- STATS -->
        <div
            class="
              grid grid-cols-1 md:grid-cols-2 gap-4
            "
        >
          <!-- PRESENT -->
          <div
              class="
                rounded-2xl
                border border-success-500/20
                bg-success-500/10
                p-5
              "
          >
            <div class="flex items-center justify-between">

              <div>
                <p class="text-sm text-content-secondary">
                  Present Students
                </p>

                <h3 class="text-4xl font-bold text-success-500 mt-1">
                  {{ report.presentCount ?? 0 }}
                </h3>
              </div>

              <div
                  class="
                    w-14 h-14 rounded-2xl
                    bg-success-500/20
                    flex items-center justify-center
                  "
              >
                <i class="pi pi-check text-2xl text-success-500" />
              </div>

            </div>
          </div>

          <!-- ABSENT -->
          <div
              class="
                rounded-2xl
                border border-danger-500/20
                bg-danger-500/10
                p-5
              "
          >
            <div class="flex items-center justify-between">

              <div>
                <p class="text-sm text-content-secondary">
                  Absent Students
                </p>

                <h3 class="text-4xl font-bold text-danger-500 mt-1">
                  {{ report.absentCount ?? 0 }}
                </h3>
              </div>

              <div
                  class="
                    w-14 h-14 rounded-2xl
                    bg-danger-500/20
                    flex items-center justify-center
                  "
              >
                <i class="pi pi-times text-2xl text-danger-500" />
              </div>

            </div>
          </div>
        </div>

        <!-- STUDENT LISTS -->
        <div
            class="
              grid grid-cols-1 xl:grid-cols-2
              gap-5
            "
        >
          <!-- PRESENT LIST -->
          <div
              class="
                rounded-2xl
                border border-surface-border
                bg-surface-hover/40
                p-5
                space-y-4
              "
          >
            <div class="flex items-center gap-2">
              <i class="pi pi-check-circle text-success-500 text-lg" />

              <h3 class="font-semibold text-content-primary">
                Present Students
              </h3>
            </div>

            <div
                v-if="presentStudents.length"
                class="flex flex-wrap gap-2"
            >
              <Tag
                  v-for="student in presentStudents"
                  :key="student"
                  :value="student"
                  severity="success"
                  rounded
              />
            </div>

            <p
                v-else
                class="text-sm text-content-secondary"
            >
              No present students recorded.
            </p>
          </div>

          <!-- ABSENT LIST -->
          <div
              class="
                rounded-2xl
                border border-surface-border
                bg-surface-hover/40
                p-5
                space-y-4
              "
          >
            <div class="flex items-center gap-2">
              <i class="pi pi-times-circle text-danger-500 text-lg" />

              <h3 class="font-semibold text-content-primary">
                Absent Students
              </h3>
            </div>

            <div
                v-if="absentStudents.length"
                class="flex flex-wrap gap-2"
            >
              <Tag
                  v-for="student in absentStudents"
                  :key="student"
                  :value="student"
                  severity="danger"
                  rounded
              />
            </div>

            <p
                v-else
                class="text-sm text-content-secondary"
            >
              No absent students recorded.
            </p>
          </div>
        </div>

      </div>

    </template>
  </Card>
</template>