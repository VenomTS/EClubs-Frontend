<script setup>

import {useUserStore} from "../stores/userStore.js";
import {ref} from "vue";

const userStore = useUserStore();

const mail= ref("")
const password= ref("")

function login() {
  userStore.login(mail.value, password.value);
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center">

    <div class="p-8 rounded-xl shadow-md w-80">

      <h1 class="text-xl text-center text-blue-800">
        Login</h1>

      <div class="flex flex-col gap-4">
        <input
            v-model="mail"
            type="email"
            placeholder="Email"
            class="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />

        <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />

        <button
            class="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-900 transition"
            @click="login"
        >
          Login
        </button>

      </div>

    </div>

  </div>
</template>