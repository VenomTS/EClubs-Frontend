<script setup>
import { ref, computed } from "vue"

const user = ref({
  name: "Kiki",
  id: "",
  role:"professor"
})

const isProfessor = computed(() => user.value.role === "professor")

const newPost = ref("")
const posts = ref([])

const addPost = () => {
  if (!newPost.value.trim()) return

  posts.value.unshift({
    id: Date.now(),
    author: user.value.name,
    content: newPost.value,
    time: new Date().toLocaleString()
  })

  newPost.value = ""
}
</script>

<template>
  <!-- CREATE POST (samo profesor)-->
  <div v-if="isProfessor" class="flex justify-center mt-2">

    <div class="rounded-2xl shadow p-4 mr-4 w-full max-w-3xl">
      <div class="flex gap-3">

        <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
          {{ user.name.charAt(0) }}
        </div>

        <textarea
            v-model="newPost"
            @keyup.enter.exact.prevent="addPost"
            placeholder="Share something with your class..."
            rows="2"
            class="flex-1 bg-gray-100 rounded-xl px-4 py-2 outline-none resize-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </div>

    <div class="flex h-10 mt-4">
      <button
          @click="addPost"
          class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm">
        Post
      </button>
    </div>
  </div>

  <div class="flex flex-col items-center mt-4 gap-4">

    <div
        v-for="post in posts"
        :key="post.id"
        class="border-b-4 border-emerald-700 rounded-2xl w-full max-w-3xl p-4 bg-white shadow"
    >
      <div class="flex gap-4 max-w-full">

        <div class="shrink-0 text-center">
          <div class="w-10 h-10 rounded-full bg-emerald-500 ml-5 text-white flex items-center justify-center font-bold">
            {{ post.author.charAt(0) }}
          </div>
          <p class="mt-2 text-sm font-light">{{ post.author }}</p>
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-gray-800 text-left break-words whitespace-pre-wrap">
            {{ post.content }}
          </p>
          <p class="text-xs text-gray-500 mt-2">
            {{ post.time }}
          </p>
        </div>

      </div>
    </div>

  </div>
</template>