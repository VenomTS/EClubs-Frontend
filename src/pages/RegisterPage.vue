<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useToast } from "primevue/usetoast"

import { AuthApi } from "../../api"

const firstName = ref("")
const lastName = ref("")
const email = ref("")
const password = ref("")
const role = ref("Student");

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
    errorMessage.value = "Sva polja su potrebna."
    return false
  }

  if (password.value.length < 6) {
    errorMessage.value = "Lozinka mora imati najmanje 6 znakova."
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
      password: password.value,
      isStudent: role.value === "Student"
    })

    toast.add({
      severity: "success",
      summary: "Nalog kreiran",
      detail: "Preusmjeravanje na prijavu...",
      life: 2000
    })

    setTimeout(() => {
      router.push("/login")
    }, 2500)

  } catch (error: any) {
    if (error?.response?.status === 409) {
      errorMessage.value = "Email već postoji."
    } else {
      errorMessage.value = "Registracija nije uspjela. Molimo pokušajte ponovo."
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
          Kreiraj Nalog
        </h1>

        <p class="text-content-secondary text-sm">
          Pridruži se i započni
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
      <form class="space-y-5" @submit.prevent="register">

        <!-- First Name -->
        <div class="flex flex-col gap-2">
          <label class="text-sm text-content-secondary">
            Ime
          </label>

          <InputText
              v-model="firstName"
              placeholder="David"
          />
        </div>

        <!-- Last Name -->
        <div class="flex flex-col gap-2">
          <label class="text-sm text-content-secondary">
            Prezime
          </label>

          <InputText
              v-model="lastName"
              placeholder="Kordik"
          />
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-2">
          <label class="text-sm text-content-secondary">
            Email
          </label>

          <InputText
              v-model="email"
              type="email"
              placeholder="you@email.com"
          />
        </div>

        <!-- ROLE -->
        <div class="flex flex-col gap-3">

          <label class="text-sm text-content-secondary">
            Vrsta Naloga
          </label>

          <div class="grid grid-cols-2 gap-3">

            <!-- STUDENT -->
            <label
                for="student"
                class="
          flex items-center gap-3
          p-4 rounded-xl cursor-pointer
          border transition-all duration-200
        "
                :class="
          role === 'Student'
            ? 'border-primary-500 bg-primary-500/10'
            : 'border-surface-border bg-surface-elevated hover:border-primary-500/40'
        "
            >
              <RadioButton
                  v-model="role"
                  inputId="student"
                  name="role"
                  value="Student"
              />

              <span class="flex flex-col gap-0.5">
                <span class="font-medium text-content-primary">
                  Učenik
                </span>

                <span class="text-xs text-content-secondary">
                  Pridruži se sekcijama
                </span>
              </span>
            </label>

            <!-- PROFESSOR -->
            <label
                for="professor"
                class="
          flex items-center gap-3
          p-4 rounded-xl cursor-pointer
          border transition-all duration-200
        "
                :class="
          role === 'Professor'
            ? 'border-primary-500 bg-primary-500/10'
            : 'border-surface-border bg-surface-elevated hover:border-primary-500/40'
        "
            >
              <RadioButton
                  v-model="role"
                  inputId="professor"
                  name="role"
                  value="Professor"
              />

              <span class="flex flex-col gap-0.5">
                <span class="font-medium text-content-primary">
                  Profesor
                </span>

                <span class="text-xs text-content-secondary">
                  Upravljaj sekcijama
                </span>
              </span>
            </label>

          </div>
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-2">
          <label class="text-sm text-content-secondary">
            Šifra
          </label>

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
            class="
              w-full
              bg-primary-500!
              border-none!
              hover:bg-primary-600!
              transition-all duration-200
            "
            :loading="loading"
        >
          Kreiraj Nalog
        </Button>

      </form>

      <!-- Footer -->
      <div class="text-center text-sm text-content-muted">

        Već imate nalog?

        <button
            type="button"
            @click="goToLogin"
            class="
              text-primary-400
              hover:text-primary-300
              ml-1
              font-medium
            "
        >
          Prijava
        </button>

      </div>
    </div>
  </div>
</template>