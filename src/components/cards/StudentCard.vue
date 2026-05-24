<script setup lang="ts">
import { computed, ref } from 'vue';
import type { GetAttendanceResponse, GetUserResponse } from "../../../api";

import { useAttendanceStore } from "../../stores/attendances.store.ts";

import UserIcon from "../reusables/UserIcon.vue";

const props = defineProps<{
  clubId: string;
  user: GetUserResponse;
  isStudent: boolean;
}>();

const emit = defineEmits<{
  rate: [student: GetUserResponse];
  kick: [student: GetUserResponse];
}>();

const expanded = ref(false);
const loading = ref(false);

const attendanceStore = useAttendanceStore();

const attendance = ref<GetAttendanceResponse | null>(null);
const loadedOnce = ref(false);

const fullName = computed(() => {
  return `${props.user.firstName} ${props.user.lastName}`;
});

const presentCount = computed(() => {
  if (!attendance.value) return 0;

  return attendance.value.attendanceHistory.filter(
      (item) => item.status === 'Present'
  ).length;
});

const attendancePercentage = computed(() => {
  if (!attendance.value?.attendanceHistory.length) return 0;

  return Math.round(
      (presentCount.value / attendance.value.attendanceHistory.length) * 100
  );
});

const initials = computed(() => {
  return `${props.user.firstName?.[0] ?? ''}${props.user.lastName?.[0] ?? ''}`;
});

const formatDate = (date?: string) => {
  if (!date) return 'Unknown Date';

  return new Date(date).toLocaleDateString();
};

const onRate = () => {
  emit('rate', props.user);
};

const onKick = () => {
  emit('kick', props.user);
};

const toggleExpand = async () => {
  expanded.value = !expanded.value;

  if (expanded.value && !loadedOnce.value) {
    await loadAttendance();
  }
};

const loadAttendance = async () => {
  try {
    loading.value = true;

    const response = await attendanceStore.getUserAttendancesByClubId(
        props.clubId,
        props.user.id!
    );

    if (response.success) {
      attendance.value = response.data ?? null;
    }

    loadedOnce.value = true;
  } catch (error) {
    console.error('Failed to load attendance', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
      class="group overflow-hidden rounded-3xl border border-surface-border bg-surface-card shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-2xl"
  >
    <!-- Header -->
    <div class="relative p-5 sm:p-6">
      <!-- Glow effect -->
      <div
          class="absolute inset-0 bg-linear-to-br from-primary-500/10 via-transparent to-secondary-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div
          class="relative flex cursor-pointer flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          @click="toggleExpand"
      >
        <!-- Student Info -->
        <div class="flex items-center gap-4">
          <UserIcon :initials="initials" />

          <h2 class="text-lg font-semibold text-content-primary sm:text-xl">
            {{ fullName }}
          </h2>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center gap-2">

          <!-- Only show Rate for admins/teachers -->
          <Button
              v-if="!isStudent"
              label="Rate"
              icon="pi pi-star"
              severity="success"
              class="border-0 bg-primary-500 hover:bg-primary-600"
              @click.stop="onRate"
          />

          <!-- Dynamic Leave / Kick button -->
          <Button
              :label="isStudent ? 'Leave' : 'Kick'"
              :icon="isStudent ? 'pi pi-sign-out' : 'pi pi-times'"
              severity="danger"
              outlined
              class="border-danger-500 text-danger-500 hover:bg-danger-500 hover:text-white"
              @click.stop="onKick"
          />
        </div>
      </div>
    </div>

    <!-- Expandable Content -->
    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-[500px] opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="max-h-[500px] opacity-100"
        leave-to-class="max-h-0 opacity-0"
    >
      <div
          v-if="expanded"
          class="border-t border-surface-border bg-surface-elevated/70"
      >
        <div class="p-5 sm:p-6">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h3 class="text-base font-semibold text-content-primary">
                Attendance Overview
              </h3>
            </div>

            <Tag
                v-if="attendance"
                :value="`${presentCount}/${attendance.attendanceHistory.length} Present`"
                severity="success"
            />
          </div>

          <!-- Loading State -->
          <div
              v-if="loading"
              class="flex items-center gap-3 rounded-2xl border border-surface-border bg-surface-card p-4"
          >
            <ProgressSpinner
                style="width: 28px; height: 28px"
                strokeWidth="6"
                animationDuration="1s"
            />

            <div>
              <p class="font-medium text-content-primary">
                Loading attendance...
              </p>

              <p class="text-sm text-content-muted">
                Fetching latest attendance data
              </p>
            </div>
          </div>

          <!-- Attendance Data -->
          <div
              v-else-if="attendance"
              class="space-y-4"
          >
            <div
                class="rounded-2xl border border-surface-border bg-surface-card p-5"
            >
              <div class="mb-4 flex items-center justify-between">
                <div>
                  <h4 class="text-base font-semibold text-content-primary">
                    Attendance History
                  </h4>

                  <p class="mt-1 text-sm text-content-muted">
                    Recent attendance records
                  </p>
                </div>

                <div class="text-right">
                  <p class="text-sm text-content-secondary">
                    Presence Rate
                  </p>

                  <p class="text-xl font-bold text-primary-400">
                    {{ attendancePercentage }}%
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <div
                    v-for="(item, index) in attendance.attendanceHistory"
                    :key="index"
                    class="flex items-center justify-between rounded-xl border border-surface-border bg-surface-elevated px-4 py-3"
                >
                  <div>
                    <p class="font-medium text-content-primary">
                      {{ formatDate(item.date) }}
                    </p>
                  </div>

                  <Tag
                      :value="item.status === 'Present' ? 'Prisutan' : 'Odsutan'"
                      :severity="item.status === 'Present' ? 'success' : 'danger'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>