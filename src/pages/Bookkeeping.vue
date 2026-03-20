<template>
  <div class="wrap">
    <!-- Header -->
    <div class="row mb-8">
      <div>
        <h2 class="title">Bookkeeping & Reports</h2>
        <p class="sub">Generate reports and send feedback to director</p>
      </div>
      <div class="flex gap-3">
        <button class="btn-out">Send Feedback</button>

        <!-- Ovaj button bi trebalo da kad se pritisne, izvuce iz workplan sve sto je u todo i njihove stateove
        i bookkeeping data da uzme i generise report na osnovu nekih given constraints iili uputa. -->
        <button class="btn">Generate Report</button>
      </div>
    </div>

    <!--Statistics-->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div v-for="s in stats" :key="s.lbl" class="card">
        <p class="text-sm font-medium text-gray-500">{{ s.lbl }}</p>
        <p class="text-3xl font-bold mt-2">{{ s.val }}</p>
      </div>
    </div>

    <div class="card p-0 overflow-hidden mt-8">
      <div class="row bg-gray-50 border-b border-gray-200 px-6 py-4">
        <h3 class="font-semibold">Reports</h3>
        <select class="input w-auto py-1 bg-white">
          <option>March 2026</option>
          <option>February 2026</option>
        </select>
      </div>

      <div class="p-6 space-y-3">
        <div v-for="r in docs" :key="r.id" class="row border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
          <div>
            <h4 class="font-medium">{{ r.title }}</h4>
            <p class="text-xs text-gray-500 mt-1">Period: {{ r.period }}</p>
          </div>
          <button class="btn-out h-8 px-3 text-xs">Download</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Bookkeeping state
const stats = ref([
  { lbl: "Total Classes", val: "48" },
  { lbl: "Attendance", val: "87%" },
  { lbl: "Activities", val: "24" },
  { lbl: "Reports", val: "8" }
]);

const docs = ref([
  { id: 1, title: "Attendance Summary - March 2026", period: "March 2026" },
  { id: 2, title: "Student Performance - Q1", period: "Q1 2026" },
  { id: 3, title: "Teaching Activities - February", period: "February 2026" }
]);
</script>