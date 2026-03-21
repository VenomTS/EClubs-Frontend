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

</template>
