<script lang="ts" setup>
import { ref } from "vue"

import {AuthApi} from "../../api";
import {useRouter} from "vue-router";
import {useToast} from "primevue";
import {useUserStore} from "../stores/userStore.ts";

const email = ref("")
const password = ref("")
const loading = ref(false)

const errorMessage = ref<string | null>(null)

const userStore = useUserStore();

const authAPI = new AuthApi();
const router = useRouter();
const toast = useToast();

/* =============================
   VALIDATION
============================= */

const validate = (): boolean => {
  if (!email.value || !password.value) {
    errorMessage.value = "Email and password are required."
    return false
  }

  errorMessage.value = null
  return true
}

/* =============================
   LOGIN
============================= */

const login = async () => {
  if (!validate()) return

  loading.value = true
  errorMessage.value = null

  try
  {
    await authAPI.loginUser({ mail: email.value, password: password.value });
    await userStore.refreshUser();

    console.log("USER: ", userStore.user);
    console.log("LOGGED: ", userStore.isLoggedIn);

    toast.add({
      severity: "success",
      summary: "Login Successful",
      detail: "Redirecting to clubs...",
      life: 2000
    })

    setTimeout(async () => {
      await router.push("/")
    }, 2500)
  }
  catch(error: any)
  {
    errorMessage.value = "Unexpected error occurred";
    if(error?.response?.status === 401)
      errorMessage.value = "Invalid email or password";
  }
  finally
  {
    loading.value = false;
  }
}

/* =============================
   REGISTER NAVIGATION
============================= */
const goToRegister = () =>
{
  router.push("/register")
}
</script>

<template>
  <div
      class="min-h-screen flex items-center justify-center
           bg-surface-background text-content-primary
           px-6"
  >
    <!-- Glow Background -->
    <div
        class="absolute inset-0 bg-linear-to-br
             from-primary-900/20 via-transparent to-secondary-600/20
             blur-3xl opacity-40"
    />

    <!-- Card -->
    <div
        class="relative w-full max-w-md
             bg-surface-card
             border border-surface-border
             rounded-2xl
             shadow-2xl
             p-8 space-y-6"
    >
      <!-- Logo / Title -->
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold text-primary-400">
          Welcome Back
        </h1>

        <p class="text-content-secondary text-sm">
          Sign in to continue
        </p>
      </div>

      <!-- ERROR MESSAGE -->
      <Message
          v-if="errorMessage"
          severity="error"
          :closable="false"
          class="w-full"
      >
        {{ errorMessage }}
      </Message>

      <!-- FORM -->
      <form
          class="space-y-5"
          @submit.prevent="login"
      >
        <!-- Email -->
        <div class="flex flex-col gap-2">
          <label class="text-content-secondary text-sm">
            Email
          </label>

          <InputText
              v-model="email"
              type="email"
              placeholder="you@email.com"
              class="w-full"
          />
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-2">
          <label class="text-content-secondary text-sm">
            Password
          </label>

          <Password
              v-model="password"
              :feedback="false"
              toggleMask
              placeholder="••••••••"
              inputClass="w-full"
              class="w-full"
          />
        </div>

        <!-- Login Button -->
        <Button
            type="submit"
            class="w-full bg-primary-500! border-none!
                 hover:bg-primary-600!
                 transition-all duration-200"
            :disabled="loading"
        >
          <span v-if="!loading">Login</span>

          <ProgressSpinner
              v-else
              style="width:20px;height:20px"
              strokeWidth="6"
          />
        </Button>
      </form>

      <!-- Footer -->
      <div class="text-center text-sm text-content-muted space-y-2">
        <div>
          Forgot password?
          <a
              href="#"
              class="text-primary-400 hover:text-primary-300 ml-1"
          >
            Reset here
          </a>
        </div>

        <!-- REGISTER LINK -->
        <div>
          Don’t have an account?
          <button
              type="button"
              @click="goToRegister"
              class="text-primary-400 hover:text-primary-300 ml-1 font-medium"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
</template>