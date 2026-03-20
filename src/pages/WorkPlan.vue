<template>
  <div class="wrap">
    <!-- Header -->
    <div class="row mb-8">
      <div>
        <h2 class="title">Work Plan</h2>
        <p class="sub">Plan and track your teaching activities</p>
      </div>
      <button @click="open()" class="btn">+ Add Activity</button>
    </div>

    <!-- Activity List -->
    <div class="space-y-10">
      <div v-for="(tasks, mth) in byMth" :key="mth">
        <h3 class="font-semibold text-lg mb-4">{{ mth }} 2026</h3>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div v-for="t in tasks" :key="t.id" class="card flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div class="row items-start">
                <div class="flex gap-3">
                  <!-- Status Checkbox -->
                  <button @click="flip(t.id)" class="mt-1 text-xl">
                    <span v-if="t.status === 'completed'" class="text-blue-600">☑</span>
                    <span v-else class="text-gray-300 hover:text-gray-500">☐</span>
                  </button>

                  <!-- Activity Details -->
                  <div>
                    <h4 class="font-medium">{{ t.title }}</h4>
                    <p class="text-sm text-gray-500">{{ t.course }}</p>
                    <span class="badge" :class="color(t.status)">{{ t.status }}</span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-2">
                  <button @click="open(t)" class="icon-btn">✎</button>
                  <button @click="del(t.id)" class="icon-red">✕</button>
                </div>
              </div>
              <p class="text-sm text-gray-600 mt-6">{{ t.desc }}</p>
            </div>
            <div class="text-sm text-gray-500 mt-6">
              Due: {{ new Date(t.due).toLocaleDateString() }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="show" class="modal-bg">
      <div class="modal">
        <h2 class="font-bold text-xl mb-4">{{ edit ? "Edit" : "New" }} Activity</h2>
        <div class="space-y-4">
          <input v-model="form.title" placeholder="Title" class="input" />
          <input v-model="form.course" placeholder="Course" class="input" />
          <textarea v-model="form.desc" placeholder="Description" rows="3" class="input"></textarea>
          <input v-model="form.due" type="date" class="input" />

          <div class="flex justify-end gap-2 mt-6">
            <button @click="close()" class="btn-out">Cancel</button>
            <button @click="save()" class="btn">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// State
const list = ref([
  { id: 1, title: "Midterm Prep", desc: "Write questions", due: "2026-03-20", course: "Algorithms", status: "in-progress", mth: "March" },
  { id: 2, title: "Assignment Review", desc: "Grade submissions", due: "2026-03-18", course: "Data Structures", status: "planned", mth: "March" }
]);
const show = ref(false);
const edit = ref(null);
const form = reactive({ title: "", desc: "", due: "", course: "" });

// Computed grouping
const byMth = computed(() => {
  return list.value.reduce((acc, t) => {
    if (!acc[t.mth]) acc[t.mth] = [];
    acc[t.mth].push(t);
    return acc;
  }, {});
});

// Form Actions
const open = (t = null) => {
  if (t) {
    edit.value = t;
    Object.assign(form, { title: t.title, desc: t.desc, due: t.due, course: t.course });
  } else {
    edit.value = null;
    Object.assign(form, { title: "", desc: "", due: "", course: "" });
  }
  show.value = true;
};

const close = () => { show.value = false; };

const save = () => {
  if (!form.title || !form.due) return;
  const mth = new Date(form.due).toLocaleString('default', { month: 'long' });

  if (edit.value) {
    const i = list.value.findIndex(x => x.id === edit.value.id);
    list.value[i] = { ...list.value[i], ...form, mth };
  } else {
    list.value.push({ id: Date.now(), ...form, status: "planned", mth });
  }
  close();
};

const del = (id) => { list.value = list.value.filter(x => x.id !== id); };

// Status and Color utilities
const flip = (id) => {
  const t = list.value.find(x => x.id === id);
  if (t) {
    const map = { "planned": "in-progress", "in-progress": "completed", "completed": "planned" };
    t.status = map[t.status];
  }
};

const color = (s) => {
  if (s === 'completed') return 'b-done';
  if (s === 'in-progress') return 'b-prog';
  return 'b-plan';
};
</script>