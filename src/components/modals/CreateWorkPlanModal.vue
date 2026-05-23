<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import BaseModal from "./BaseModal.vue"

import type { GetDomainsResponse } from "../../../api"
import { useWorkPlansStore } from "../../stores/workplans.store"

const props = defineProps<{
  clubId: string
  domains: GetDomainsResponse[]
}>()

const emit = defineEmits<{
  (e: "zatvori"): void
}>()

const workPlansStore = useWorkPlansStore()

/* ---------------------------------
   UI STATE
---------------------------------- */
const submitting = ref(false)
const submitted = ref(false)
const createNewDomain = ref(false)

/* ---------------------------------
   FORM
---------------------------------- */
const form = reactive({
  selectedDomain: "",
  newDomain: "",
  unit: "",
  learningOutcome: "",
  indicators: [] as string[]
})

/* ---------------------------------
   RESOLVED VALUES
---------------------------------- */
const resolvedDomain = computed(() =>
    createNewDomain.value
        ? form.newDomain.trim()
        : form.selectedDomain
)

const normalizedIndicators = computed(() =>
    form.indicators.map(i => i.trim()).filter(Boolean)
)

/* ---------------------------------
   VALIDATION
---------------------------------- */
const errors = computed(() => {
  const e: Record<string, string> = {}

  if (!resolvedDomain.value)
    e.domain = "Domena je obavezna."

  if (!form.unit.trim())
    e.unit = "Jedinica je obavezna."

  if (!form.learningOutcome.trim())
    e.learningOutcome = "Ishod učenja je obavezan."

  if (normalizedIndicators.value.length === 0)
    e.indicators = "Dodaj bar jedan indikator."

  return e
})

const isValid = computed(() =>
    Object.keys(errors.value).length === 0
)

/* ---------------------------------
   SUBMIT
---------------------------------- */
const submit = async () => {
  submitted.value = true
  if (!isValid.value || submitting.value) return

  submitting.value = true

  const result = await workPlansStore.createWorkPlan(props.clubId, {
    domain: resolvedDomain.value,
    unit: form.unit.trim(),
    learningOutcome: form.learningOutcome.trim(),
    indicator: normalizedIndicators.value.join(";")
  })

  submitting.value = false

  if (result.success) {
    emit("zatvori")
  }
}
</script>

<template>
  <BaseModal @close="emit('zatvori')">

    <div class="space-y-6">

      <!-- HEADER -->
      <header>
        <h2 class="text-xl font-semibold text-content-primary">
          Kreiraj Plan Rada
        </h2>

        <p class="text-sm text-content-secondary">
          Odaberi postojeću domenu ili kreiraj novu.
        </p>
      </header>

      <!-- DOMAIN -->
      <section class="space-y-2">

        <div class="flex justify-between items-center">
          <label class="text-sm font-medium text-content-primary">
            Domena
          </label>

          <Button
              size="small"
              text
              icon="pi pi-plus"
              :label="createNewDomain ? 'Use existing' : 'New domain'"
              class="text-primary-500"
              @click="createNewDomain = !createNewDomain"
          />
        </div>

        <!-- EXISTING -->
        <Select
            v-if="!createNewDomain"
            v-model="form.selectedDomain"
            :options="domains"
            optionLabel="domena"
            optionValue="domena"
            placeholder="Odaberi domenu"
            class="w-full"
            :invalid="submitted && !!errors.domain"
        />

        <!-- NEW -->
        <InputText
            v-else
            v-model="form.newDomain"
            placeholder="Unesi novu domenu"
            class="w-full"
            :invalid="submitted && !!errors.domain"
        />

        <small v-if="submitted && errors.domain" class="text-red-500">
          {{ errors.domain }}
        </small>

      </section>

      <!-- UNIT -->
      <section class="space-y-2">
        <label class="text-sm font-medium text-content-primary">
          Unit
        </label>

        <InputText
            v-model="form.unit"
            placeholder="Frakcije"
            class="w-full"
            :invalid="submitted && !!errors.unit"
        />

        <small v-if="submitted && errors.unit" class="text-red-500">
          {{ errors.unit }}
        </small>
      </section>

      <!-- LEARNING OUTCOME -->
      <section class="space-y-2">
        <label class="text-sm font-medium text-content-primary">
          Learning Outcome
        </label>

        <InputText
            v-model="form.learningOutcome"
            placeholder="Studenti razumiju frakcije"
            class="w-full"
            :invalid="submitted && !!errors.learningOutcome"
        />

        <small v-if="submitted && errors.learningOutcome" class="text-red-500">
          {{ errors.learningOutcome }}
        </small>
      </section>

      <!-- INDICATORS -->
      <section class="space-y-2">
        <label class="text-sm font-medium text-content-primary">
          Indikatori
        </label>

        <InputChips
            v-model="form.indicators"
            placeholder="Pritisnite Enter za dodavanje indikatora"
            class="w-full"
            :invalid="submitted && !!errors.indicators"
        />

        <small v-if="submitted && errors.indicators" class="text-red-500">
          {{ errors.indicators }}
        </small>
      </section>

      <!-- FOOTER -->
      <footer class="flex justify-end gap-3 border-t border-surface-border pt-5">

        <Button
            label="Poništi"
            outlined
            severity="secondary"
            :disabled="submitting"
            @click="emit('zatvori')"
        />

        <Button
            label="Kreiraj Plan Rada"
            icon="pi pi-check"
            :loading="submitting"
            :disabled="!isValid"
            class="bg-primary-500 border-primary-600 hover:bg-primary-600"
            @click="submit"
        />

      </footer>

    </div>

  </BaseModal>
</template>