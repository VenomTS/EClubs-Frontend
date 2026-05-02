<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue"
import BaseModal from "./BaseModal.vue"

import type { GetDomainsResponse } from "../../../api"
import type { CreateWorkPlanPayload } from "../../interfaces/CreateWorkPlanModalData"

/* ---------------------------------
   Props / Emits
---------------------------------- */

const props = defineProps<{
  domains: GetDomainsResponse[]
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "create", payload: CreateWorkPlanPayload): void
}>()

/* ---------------------------------
   Date Bounds
---------------------------------- */

const today = new Date()
today.setHours(0, 0, 0, 0)

const minDate = new Date(today)
const maxDate = new Date(today)
maxDate.setFullYear(maxDate.getFullYear() + 1)

/* ---------------------------------
   UI State
---------------------------------- */

const loading = ref(false)
const submitted = ref(false)
const createNewDomain = ref(false)

/* ---------------------------------
   Form State
---------------------------------- */

const form = reactive({
  selectedDomain: null as GetDomainsResponse | null,
  newDomainName: "",
  newDomainNumber: null as number | null,
  lessonUnit: "",
  learningOutcome: "",
  indicators: [] as string[],
  scheduledDate: new Date(today) as Date | null
})

/* ---------------------------------
   Domain Helpers
---------------------------------- */

const domainOptions = computed(() =>
    props.domains.map((d) => ({
      label: `Domain ${d.domainNumber} - ${d.domain}`,
      value: d
    }))
)

const nextDomainNumber = computed(
    () => Math.max(0, ...props.domains.map((d) => d.domainNumber ?? 0)) + 1
)

/* ---------------------------------
   Toggle Behavior
---------------------------------- */

watch(
    createNewDomain,
    (isNew) => {
      if (isNew) {
        form.selectedDomain = null
        if (form.newDomainNumber === null) form.newDomainNumber = nextDomainNumber.value
        return
      }

      form.newDomainName = ""
      form.newDomainNumber = null
    },
    { immediate: true }
)

/* ---------------------------------
   Validation
---------------------------------- */

const normalizedIndicators = computed(() =>
    form.indicators.map((i) => i.trim()).filter(Boolean)
)

const fieldErrors = computed(() => {
  const errors: Record<string, string> = {}

  if (createNewDomain.value) {
    if (!form.newDomainName.trim()) {
      errors.newDomainName = "Domain name is required."
    }

    if (form.newDomainNumber === null || form.newDomainNumber < 1) {
      errors.newDomainNumber = "Domain number must be at least 1."
    }
  } else if (!form.selectedDomain) {
    errors.selectedDomain = "Please select a domain."
  }

  if (!form.lessonUnit.trim()) {
    errors.lessonUnit = "Lesson unit is required."
  }

  if (!form.learningOutcome.trim()) {
    errors.learningOutcome = "Learning outcome is required."
  }

  if (!form.scheduledDate) {
    errors.scheduledDate = "Scheduled date is required."
  }

  if (normalizedIndicators.value.length === 0) {
    errors.indicators = "Add at least one indicator."
  }

  return errors
})

const isValid = computed(() => Object.keys(fieldErrors.value).length === 0)

/* ---------------------------------
   Submit
---------------------------------- */

function resolveDomain() {
  if (createNewDomain.value) {
    if (!form.newDomainName.trim() || form.newDomainNumber === null || form.newDomainNumber < 1) {
      return null
    }

    return {
      domainNumber: form.newDomainNumber,
      domain: form.newDomainName.trim()
    }
  }

  return form.selectedDomain
}

async function submit() {
  submitted.value = true
  if (loading.value || !isValid.value) return

  const domain = resolveDomain()
  if (!domain || !form.scheduledDate) return

  loading.value = true
  try {
    const payload: CreateWorkPlanPayload = {
      domainNumber: domain.domainNumber!,
      domain: domain.domain!,
      lessonUnit: form.lessonUnit.trim(),
      learningOutcome: form.learningOutcome.trim(),
      indicators: normalizedIndicators.value.join(";"),
      scheduledDate: form.scheduledDate
    }

    emit("create", payload)
    emit("close")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BaseModal @close="emit('close')">
    <div class="space-y-6">
      <!-- Header -->
      <header>
        <h2 class="text-xl font-semibold text-content-primary">Create Work Plan</h2>
        <p class="mt-1 text-sm text-content-secondary">
          Define curriculum domain, learning outcomes, indicators, and schedule.
        </p>
      </header>

      <!-- Domain -->
      <section class="space-y-2">
        <div class="flex items-center justify-between gap-3">
          <label class="text-sm font-medium text-content-primary">Domain</label>

          <Button
              size="small"
              text
              icon="pi pi-plus"
              :label="createNewDomain ? 'Use existing' : 'New domain'"
              class="!text-primary-500"
              @click="createNewDomain = !createNewDomain"
          />
        </div>

        <Select
            v-if="!createNewDomain"
            v-model="form.selectedDomain"
            :options="domainOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select domain"
            class="w-full"
            :invalid="submitted && !!fieldErrors.selectedDomain"
        />

        <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_7rem]">
          <InputText
              v-model="form.newDomainName"
              placeholder="Domain name"
              class="w-full"
              :invalid="submitted && !!fieldErrors.newDomainName"
          />

          <InputNumber
              v-model="form.newDomainNumber"
              :min="1"
              :useGrouping="false"
              showButtons
              buttonLayout="vertical"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              inputClass="text-center"
              class="w-full"
              :invalid="submitted && !!fieldErrors.newDomainNumber"
          />
        </div>

        <small
            v-if="submitted && (fieldErrors.selectedDomain || fieldErrors.newDomainName || fieldErrors.newDomainNumber)"
            class="text-red-500"
        >
          {{
            fieldErrors.selectedDomain ||
            fieldErrors.newDomainName ||
            fieldErrors.newDomainNumber
          }}
        </small>
      </section>

      <!-- Lesson Unit -->
      <section class="space-y-2">
        <label class="text-sm font-medium text-content-primary">Lesson Unit</label>
        <InputText
            v-model="form.lessonUnit"
            placeholder="Introduction to Fractions"
            class="w-full"
            :invalid="submitted && !!fieldErrors.lessonUnit"
        />
        <small v-if="submitted && fieldErrors.lessonUnit" class="text-red-500">
          {{ fieldErrors.lessonUnit }}
        </small>
      </section>

      <!-- Learning Outcome -->
      <section class="space-y-2">
        <label class="text-sm font-medium text-content-primary">Learning Outcome</label>
        <InputText
            v-model="form.learningOutcome"
            placeholder="Students understand fraction representation"
            class="w-full"
            :invalid="submitted && !!fieldErrors.learningOutcome"
        />
        <small v-if="submitted && fieldErrors.learningOutcome" class="text-red-500">
          {{ fieldErrors.learningOutcome }}
        </small>
      </section>

      <!-- Scheduled Date -->
      <section class="space-y-2">
        <label class="text-sm font-medium text-content-primary">Scheduled Date</label>
        <DatePicker
            v-model="form.scheduledDate"
            :minDate="minDate"
            :maxDate="maxDate"
            showIcon
            dateFormat="dd.mm.yy"
            class="w-full"
            :invalid="submitted && !!fieldErrors.scheduledDate"
        />
        <small v-if="submitted && fieldErrors.scheduledDate" class="text-red-500">
          {{ fieldErrors.scheduledDate }}
        </small>
      </section>

      <!-- Indicators -->
      <section class="space-y-2">
        <label class="text-sm font-medium text-content-primary">Indicators</label>
        <InputChips
            v-model="form.indicators"
            placeholder="Press Enter to add indicator"
            class="w-full"
            :invalid="submitted && !!fieldErrors.indicators"
        />
        <small v-if="submitted && fieldErrors.indicators" class="text-red-500">
          {{ fieldErrors.indicators }}
        </small>
      </section>

      <!-- Footer -->
      <footer class="flex justify-end gap-3 border-t border-surface-border pt-5">
        <Button
            label="Cancel"
            severity="secondary"
            outlined
            :disabled="loading"
            @click="emit('close')"
        />
        <Button
            label="Create Work Plan"
            icon="pi pi-check"
            :loading="loading"
            :disabled="loading || !isValid"
            class="!border-primary-600 !bg-primary-500 hover:!bg-primary-600"
            @click="submit"
        />
      </footer>
    </div>
  </BaseModal>
</template>