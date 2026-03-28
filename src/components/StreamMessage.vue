<script setup lang="ts">

import type {ClubMessageResponse} from "../../api";

defineProps<ClubMessageResponse>();

function formatDateTime(isoString: string)
{
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

</script>

<template>
  <div
      class="border-b-4 border-emerald-700 rounded-2xl w-full max-w-3xl p-4 bg-white shadow">
    <div class="flex gap-4 max-w-full">

      <div class="shrink-0 text-center">
        <div class="w-10 h-10 rounded-full bg-emerald-500 ml-5 text-white flex items-center justify-center font-bold">
          {{ sender.firstName.charAt(0).toUpperCase() }}
        </div>
        <p class="mt-2 text-sm font-light">{{ sender.firstName }} {{ sender.lastName }}</p>
      </div>

      <div class="flex-1 min-w-0 relative flex flex-col justify-between">
        <p class="text-gray-800 text-left wrap-break-word whitespace-pre-wrap">
          {{ content }}
        </p>
        <p class="text-xs text-gray-500 mt-auto">
          {{ formatDateTime(sentAt || "")}}
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>