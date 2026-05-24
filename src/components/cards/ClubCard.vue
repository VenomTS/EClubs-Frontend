<script setup lang="ts">
import { computed } from 'vue'
import type {GetClubResponse} from "../../../api";
import UserIcon from "../Reusables/UserIcon.vue";

const props = defineProps<{
  club: GetClubResponse
}>()

const emit = defineEmits<{
  (e: 'select', club: GetClubResponse): void
}>()

const formattedCode = computed(() => props.club.code?.slice(0, 3) + '-' + props.club.code?.slice(3, 6))

const professorFullName = computed(
    () =>
        `${props.club.professor!.firstName} ${props.club.professor!.lastName}`
)

const initials = computed(() => {
  return `${props.club.professor!.firstName?.[0] ?? ''}${props.club.professor!.lastName?.[0] ?? ''}`;
});

const handleClick = () => {
  emit('select', props.club)
}
</script>

<template>
  <div
      role="button"
      tabindex="0"
      @click="handleClick"
      @keyup.enter="handleClick"
      class="
      group
      cursor-pointer
      bg-surface-card
      border border-surface-border
      rounded-2xl
      p-5
      transition-all duration-300
      hover:bg-surface-hover
      hover:border-primary-600/40
      hover:shadow-lg
      focus:outline-none
      focus:ring-2
      focus:ring-primary-500/40
    "
  >
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div>
        <h3
            class="
            text-lg font-semibold
            text-content-primary
            group-hover:text-primary-400
            transition-colors
          "
        >
          {{ club.name }}
        </h3>

        <p class="text-sm text-content-muted mt-1">
          Code: {{ formattedCode }}
        </p>
      </div>

      <!-- Type Badge -->
      <span
          class="
          text-xs font-medium
          px-3 py-1 rounded-full
          bg-primary-500/15
          text-primary-400
          border border-primary-500/20
        "
      >
        Sekcija
      </span>
    </div>

    <!-- Divider -->
    <Divider class="bg-surface-border" />

    <!-- Professor -->
    <div class="flex items-center gap-3">
      <UserIcon :initials="initials" />
      <div>
        <p class="text-sm text-content-secondary">
          Profesor
        </p>

        <p class="text-sm font-medium text-content-primary">
          {{ professorFullName }}
        </p>
      </div>
    </div>
  </div>
</template>