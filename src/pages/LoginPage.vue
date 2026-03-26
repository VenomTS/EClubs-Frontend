<script setup>

import Toast from 'primevue/toast';
import {useUserStore} from "../stores/userStore.js";
import {onMounted, ref} from "vue";
import {Role} from "../interfaces/Role.js";
import Alert from "../components/Alert.vue";

import { useToast } from 'primevue/usetoast';

const toast = useToast();

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const userStore = useUserStore();

const mail= ref("")
const password= ref("")

const status= ref()

async function login() {
  await userStore.login(mail.value, password.value);
  status.value = userStore.loginSuccessful.value;
}

function showGoodToast() {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Data saved successfully!',
    life: 3000
  });
}

function testRole()
{
  const isDirector = userStore.hasRole(Role.Director)
  const isAdmin = userStore.hasRole(Role.Admin)

  console.log(isDirector, isAdmin)
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center">

    <div class="p-8 rounded-xl shadow-md w-80">

      <h1 class="text-xl text-center text-emerald-500">
        Login</h1>

      <div class="flex flex-col gap-4">
        <Alert v-if="status" message="Testing message" type="error" />
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
        <button
            class="bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-900 transition"
            @click="login"
        >
          Login
        </button>

        <Toast />
        <Button label="Show" @click="showGoodToast"> Hello World </Button>

      </div>

    </div>

  </div>
</template>