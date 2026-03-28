<script setup lang="ts">

import {type GetAllClubsResponse} from "../../api";
import {useRouter} from "vue-router";

const props = defineProps<GetAllClubsResponse>();

const router = useRouter();

function onClubClick()
{
  router.push({
    name: "Club",
    params: { clubId: props.id }
  })
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
    <div class="h-40 bg-emerald-200 flex items-center justify-center">
      <span class="text-emerald-700 font-semibold text-lg">
        {{ name }}
      </span>
    </div>

    <div class="p-5">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">
        {{ name }}
      </h2>

      <p class="text-gray-600 text-sm mb-4">
        {{ professor.firstName }} {{ professor.lastName }}
      </p>

      <button
          @click="onClubClick"
          class="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition">
        View Club
      </button>
    </div>
  </div>
</template>