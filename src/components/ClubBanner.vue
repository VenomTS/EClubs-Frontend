<script setup>
import { ref } from "vue"

const club = ref({
  name: "Robotics Club",
  professor: "Neđad Kadić",
  students: "24",
  room: "12"
})

</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-5xl mt-4">

      <div class="relative h-30 md:h-56 rounded-2xl overflow-hidden shadow-lg">

        <div class="absolute inset-0 bg-linear-to-r from-emerald-600 to-emerald-900"></div>

        <div class="absolute inset-0 bg-black/10"></div>

        <div class="relative h-full flex flex-col justify-end p-6 text-white">
          <h1 class="text-2xl md:text-4xl font-bold">
            {{ club.name }}
          </h1>
          <p class="text-sm md:text-lg opacity-90">
            Professor: {{club.professor}}
          </p>
          <p class="text-xs md:text-sm opacity-75">
            {{club.students}} Students | Room {{ club.room }}
          </p>
        </div>
      </div>
    </div>
  </div>

</template>
