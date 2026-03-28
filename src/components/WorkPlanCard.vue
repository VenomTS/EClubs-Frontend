<script setup lang="ts">

import type {ClubWorkPlansResponse} from "../../api";

defineProps<ClubWorkPlansResponse>();

function statusClass(status: number): string
{
  switch(status) {
    case 0:
      return 'bg-yellow-100 text-yellow-800';
    case 1:
      return 'bg-green-100 text-green-800';
    case 2:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

</script>
<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ title }}</h2>

      <p class="text-gray-600 mb-1"><span class="font-semibold text-gray-800">ID:</span> {{ id }}</p>
      <p class="text-gray-600 mb-1"><span class="font-semibold text-gray-800">Description:</span> {{ description || '(none)' }}</p>
      <p class="text-gray-600 mb-1"><span class="font-semibold text-gray-800">Note:</span> {{ note || '(none)' }}</p>
      <p class="text-gray-600 mb-1"><span class="font-semibold text-gray-800">Scheduled Date:</span> {{ scheduledDate }}</p>
      <p class="text-gray-600 mb-4"><span class="font-semibold text-gray-800">Realization Date:</span> {{ realizationDate || '(Not Realized)' }}</p>

      <span
          :class="statusClass(status || 0)"
          class="inline-block px-4 py-1 rounded-full font-semibold text-sm"
      >
        {{ status }}
      </span>
    </div>
  </div>
</template>