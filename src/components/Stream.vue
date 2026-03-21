<script setup>

</script>

<template>
  <!--Pravljenje posta na streamu samo ako je user Profesor-->
<div class="flex justify-center mt-2">
  <div class="rounded-2xl shadow p-4 mr-4 w-236">
    <div class="flex gap-3">
      <div class="w-10 h-10 rounded-full bg-gray-300"></div>

      <input
          type="text"
          placeholder="Share something with your class..."
          class="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"/>
    </div>
  </div>

  <div class="flex h-10 mt-4">
    <button
        class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm">
      Post</button>
  </div>
</div>

  <div class="flex justify-center">
    <div class="border-3 border-b-emerald-500 rounded-2xl w-5xl mt-4 h-auto p-2">
      <div class="flex gap-4">
        <div class="shrink-0">
          <div class="w-10 h-10 ml-8 rounded-full bg-gray-300"></div>
          <p class="mt-2 text-sm font-light">{Professor_Name}</p>
        </div>

        <div class="flex-1">
          <p class="text-gray-700 text-left pr-10">Example of an announcement made by professor.</p>
        </div>
      </div>
    </div>
  </div>


</template>
