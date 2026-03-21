<script setup>

</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-5xl mt-4">

      <div class="relative h-30 md:h-56 rounded-2xl overflow-hidden shadow-lg">

        <div class="absolute inset-0 bg-linear-to-r from-emerald-600 to-emerald-900"></div>

        <div class="absolute inset-0 bg-black/10"></div>

        <div class="relative h-full flex flex-col justify-end p-6 text-white">
          <h1 class="text-2xl md:text-4xl font-bold">
            {Club_Name}
          </h1>
          <p class="text-sm md:text-lg opacity-90">
            Professor: {Professor_Name}
          </p>
          <p class="text-xs md:text-sm opacity-75">
            {Students_Number} Students | Room {Room_Number}
          </p>
        </div>
      </div>
    </div>
  </div>

</template>
