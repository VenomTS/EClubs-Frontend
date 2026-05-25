<script setup lang="ts">
import { computed, ref } from "vue"
import type {GetDomainsResponse, GetWorkPlanResponse} from "../../../api"

import WorkPlanCard from "../cards/WorkPlanCard.vue"
import CreateWorkPlanModal from "../modals/CreateWorkPlanModal.vue";

const props = defineProps<{
  workPlans: GetWorkPlanResponse[]
  domains: GetDomainsResponse[]
  clubId: string
}>()

const emit = defineEmits<{
  (e: "edit", plan: GetWorkPlanResponse): void
  (e: "delete", plan: GetWorkPlanResponse): void
  (e: "add"): void
}>()

const showCreateWorkPlanModal = ref(false);

/* ---------------- GROUP BY DOMAIN ---------------- */
const groupedPlans = computed(() => {
  const groups: Record<string, GetWorkPlanResponse[]> = {}

  for (const plan of props.workPlans) {
    const key = plan.domain || "Unknown"

    if (!groups[key]) {
      groups[key] = []
    }

    groups[key].push(plan)
  }

  return Object.entries(groups)
})

/* ---------------- ACCORDION STATE ---------------- */
const openDomain = ref<string | null>(null)

if (groupedPlans.value.length > 0) {
  openDomain.value = groupedPlans.value[0][0]
}

const toggle = (domain: string) => {
  openDomain.value = openDomain.value === domain ? null : domain
}
</script>

<template>
  <div class="space-y-5">

    <!-- HEADER -->
    <div class="flex items-center justify-between">

      <div>
        <h2 class="text-sm font-semibold text-content-primary">
          Svi planovi rada
        </h2>

        <p class="text-xs text-content-muted">
          Upravljanje planovima rada po predmetima
        </p>
      </div>

      <!-- ADD BUTTON (always visible) -->
      <Button
          icon="pi pi-plus"
          label="Add Work Plan"
          class="
          bg-primary-500!
          hover:bg-primary-600!
          border-none!
          text-white!
          font-medium
          px-4 py-2"
          @click="showCreateWorkPlanModal = true"
      />

      <CreateWorkPlanModal
          v-if="showCreateWorkPlanModal"
          :club-id="props.clubId"
          :domains="props.domains"
          @close="showCreateWorkPlanModal = false; emit('add')"
      />
    </div>

    <!-- EMPTY STATE -->
    <div
        v-if="!workPlans || workPlans.length === 0"
        class="
        bg-surface-card border border-surface-border
        rounded-2xl p-8 text-center
      "
    >
      <p class="text-sm text-content-secondary">
        Nema pronađenih planova rada.
      </p>

      <p class="text-xs text-content-muted mt-1">
        Kliknite na "Dodaj plan rada" da kreirate svoj prvi
      </p>
    </div>

    <!-- ACCORDION -->
    <div v-else class="space-y-3">

      <div
          v-for="[domain, plans] in groupedPlans"
          :key="domain"
          class="
          border border-surface-border
          rounded-2xl overflow-hidden
          bg-surface-card
        "
      >

        <!-- DOMAIN HEADER -->
        <button
            class="
            w-full flex items-center justify-between
            px-5 py-4
            bg-surface-elevated
            hover:bg-surface-hover
            transition
          "
            @click="toggle(domain)"
        >
          <div class="text-left">
            <h3 class="text-sm font-semibold text-content-primary">
              {{ domain }}
            </h3>

            <p class="text-xs text-content-muted mt-0.5">
              {{ plans.length }} work plan(s)
            </p>
          </div>

          <i
              class="pi text-content-muted transition-transform duration-200"
              :class="openDomain === domain ? 'pi-chevron-up' : 'pi-chevron-down'"
          />
        </button>

        <!-- CONTENT -->
        <div v-show="openDomain === domain" class="p-4 space-y-3">
          <WorkPlanCard
              v-for="plan in plans"
              :key="plan.id"
              :plan="plan"
              @edit="emit('edit', $event)"
              @delete="emit('delete', $event)"
          />
        </div>

      </div>

    </div>
  </div>
</template>