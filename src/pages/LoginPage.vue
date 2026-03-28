<script setup>

import Toast from 'primevue/toast';
import {useUserStore} from "../stores/userStore.js";
import {onMounted, ref} from "vue";
import {Role} from "../interfaces/Role.js";

import { useToast } from 'primevue/usetoast';

const toast = useToast();

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const userStore = useUserStore();

const mail= ref("")
const password= ref("")

async function login() {
  await userStore.login(mail.value, password.value);

  if(userStore.loginSuccessful === true)
    showGoodToast()
  else
    showBadToast()
}

function showGoodToast() {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Successfully logged in!',
    life: 3000
  });
}

function showBadToast() {
  toast.add({
    severity: 'error',
    summary: "Can't log in!",
    detail: 'Your login credentials do not match',
    life: 3000
  });
}
</script>
<template>
  <div class="min-h-screen flex pt-20 justify-center">

    <div class="p-8 rounded-xl shadow-md w-80">

      <h1 class="text-xl text-center text-emerald-500">
        Login</h1>

      <div class="flex flex-col gap-4">
        <input
            v-model="mail"
            type="email"
            placeholder="Email"
            class="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        />

        <input
            v-model="password"
            type="password"
            @keyup.enter="login"
            placeholder="Password"
            class="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        />
        <Toast/>
        <button
            class="bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-900 transition"
            @click="login"
        >
          Login
        </button>

      </div>

    </div>

  </div>
</template>