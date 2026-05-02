<script setup lang="ts">
import { useRouter } from "vue-router"
import type { GetAllClubsResponse } from "../../api"

const props = defineProps<GetAllClubsResponse>()
const router = useRouter()

function onClubClick() {
  router.push({
    name: "Club",
    params: { clubId: props.id }
  })
}
</script>

<template>
  <div
      @click="onClubClick"
      class="group relative cursor-pointer
           rounded-xl p-4
           bg-surface-card
           border border-surface-border
           hover:border-primary-500/40
           transition-all duration-200
           hover:-translate-y-0.5"
  >
    <!-- subtle glow on hover -->
    <div
        class="absolute inset-0 rounded-xl opacity-0
             group-hover:opacity-100 transition-opacity duration-300
             bg-linear-to-r from-primary-500/10 to-secondary-500/10 blur-xl"
    />

    <!-- content -->
    <div class="relative flex flex-col gap-3">

      <!-- top row -->
      <div class="flex items-start justify-between gap-3">

        <!-- title -->
        <h2 class="text-base font-semibold text-content-primary line-clamp-1">
          {{ name }}
        </h2>

      </div>

      <!-- professor -->
      <div class="flex items-center justify-between">

        <span class="text-xs text-content-muted">
          Professor
        </span>

        <span
            class="text-xs px-2 py-1 rounded-full
                 bg-surface-hover
                 text-primary-300
                 border border-surface-border"
        >
          {{ professor.firstName }} {{ professor.lastName }}
        </span>

      </div>

      <!-- footer hint -->
      <div class="text-xs text-content-muted pt-1 opacity-70 group-hover:opacity-100 transition">
        View details →
      </div>

    </div>
  </div>
</template>