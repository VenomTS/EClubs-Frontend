<template>
  <div class="min-h-screen bg-gray-50 p-8">


    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      <div
          v-for="club in clubs"
          :key="club.id"
          class="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

        <div class="h-40 bg-emerald-200 flex items-center justify-center">
          <span class="text-emerald-700 font-semibold text-lg">
            {{ club.name }}
          </span>
        </div>

        <div class="p-5">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">
            {{ club.name }}
          </h2>

          <p class="text-gray-600 text-sm mb-4">
            {{ club.professor }}
          </p>

          <button
              class="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition">
            View Club
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const clubs = ref([
  {
    id: 1,
    name: "Coding Club",
    professor: "Neđad Kadić"
  },
  {
    id: 2,
    name: "Gaming Club",
    description: "Play games, join tournaments, and hang out with gamers."
  },
  {
    id: 3,
    name: "Art Club",
    description: "Express creativity through drawing, painting, and design."
  },
  {
    id: 4,
    name: "Fitness Club",
    description: "Stay active with workouts, challenges, and group training."
  }


]);
</script>