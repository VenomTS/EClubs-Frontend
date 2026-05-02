<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useToast } from "primevue/usetoast"

import { AuthApi } from "../../api"

const firstName = ref("")
const lastName = ref("")
const email = ref("")
const password = ref("")

const loading = ref(false)
const errorMessage = ref<string | null>(null)

const router = useRouter()
const toast = useToast()
const authAPI = new AuthApi()

/* =============================
   VALIDATION
============================= */

const validate = (): boolean => {
  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    errorMessage.value = "All fields are required."
    return false
  }

  if (password.value.length < 6) {
    errorMessage.value = "Password must be at least 6 characters."
    return false
  }

  errorMessage.value = null
  return true
}

/* =============================
   REGISTER
============================= */

const register = async () => {
  if (!validate()) return

  loading.value = true
  errorMessage.value = null

  try {
    await authAPI.registerUser({
      firstName: firstName.value,
      lastName: lastName.value,
      mail: email.value,
      password: password.value
    })

    toast.add({
      severity: "success",
      summary: "Account Created",
      detail: "Redirecting to login...",
      life: 2000
    })

    setTimeout(() => {
      router.push("/login")
    }, 2500)

  } catch (error: any) {
    if (error?.response?.status === 409) {
      errorMessage.value = "Email already exists."
    } else {
      errorMessage.value = "Registration failed. Please try again."
    }
  } finally {
    loading.value = false
  }
}

/* =============================
   NAVIGATION
============================= */

const goToLogin = () => {
  router.push("/login")
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
      <!-- Title -->
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold text-primary-400">
          Create Account
        </h1>

        <p class="text-content-secondary text-sm">
          Join us and get started
        </p>
      </div>

      <!-- Error -->
      <Message
          v-if="errorMessage"
          severity="error"
          :closable="false"
      >
        {{ errorMessage }}
      </Message>

      <!-- FORM -->
      <form class="space-y-4" @submit.prevent="register">

        <!-- First Name -->
        <div class="flex flex-col gap-2">
          <label class="text-sm text-content-secondary">First Name</label>
          <InputText v-model="firstName" placeholder="John" />
        </div>

        <!-- Last Name -->
        <div class="flex flex-col gap-2">
          <label class="text-sm text-content-secondary">Last Name</label>
          <InputText v-model="lastName" placeholder="Doe" />
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-2">
          <label class="text-sm text-content-secondary">Email</label>
          <InputText v-model="email" type="email" placeholder="you@email.com" />
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-2">
          <label class="text-sm text-content-secondary">Password</label>
          <Password
              v-model="password"
              :feedback="true"
              toggleMask
              inputClass="w-full"
          />
        </div>

        <!-- Button -->
        <Button
            type="submit"
            class="w-full bg-primary-500! border-none!
                 hover:bg-primary-600!
                 transition-all duration-200"
            :loading="loading"
        >
          Create Account
        </Button>
      </form>

      <!-- Footer -->
      <div class="text-center text-sm text-content-muted">
        Already have an account?
        <button
            type="button"
            @click="goToLogin"
            class="text-primary-400 hover:text-primary-300 ml-1 font-medium"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>