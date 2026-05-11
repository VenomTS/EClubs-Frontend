<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {useToast} from "primevue/usetoast";
//All UI library imports are in MAIN.JS

const router = useRouter();
const userRole = ref("professor"); //TODO: database connection
const showModal = ref(false);
const closeModal = () => {
  showModal.value = false;
}
const popUpMessage = (severity, summary, detail) => {
  toast.add({ severity, summary, detail, life: 3000 });
};
const toast = useToast();

const clubs = ref([
  { id: 1, name: "Test club 1",professor: "Tina Alibašić" },
  { id: 2, name: "Test club 2", professor: "Aida Arnautović" }
]);
const newClub = ref({
  name:"",
  day: "",
  start: "",
  end: ""
});
const roleList = ["professor", "student", "principal"];

//Values for handling new club inputs:
const startTimeInput = ref("");
const endTimeInput = ref("");
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//Role check for the add club button:
const displayAddButton = computed(() => userRole.value === roleList[0]);

//Handling time in new club inputs:
const formatTime = (type) => {
  let input = String(type === "start" ? startTimeInput.value : endTimeInput.value);
  input = input.replace(/\D/g, "").slice(0,4); //removes non-numbers
  if (input.length > 4)
    input=input.slice(0, 4)
  if (input.length >= 3)
  {
    input=input.slice(0,2)+":"+input.slice(2);
  }
  if (type === "start")
  {
    startTimeInput.value = input;
    newClub.value.start = input;
  }
  else
  {
    endTimeInput.value = input;
    newClub.value.end = input;
  }
}
const isValidTime = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59; //Ensures the time entered is valid
}

//Saving new club info:
const saveClub = async () => {
  if (!newClub.value.name || !newClub.value.day || !isValidTime(newClub.value.start) || !isValidTime(newClub.value.end))
  {
    popUpMessage("error", "Error", "Please ensure all inputs are valid!");
    console.log("Not saved!");
    return;
  }
  popUpMessage("success", "Saved", "Club created successfully");
  console.log("saved!");
  clubs.value.push({
    id: Date.now(),
    name: newClub.value.name,
  });
  closeModal();
}

const resetNewClubForm = () => {
  newClub.value = {
    name: "",
    day: "",
    start: "",
    end: "",
  }
  startTimeInput.value = "";
  endTimeInput.value = "";
}

const clubIconClick = (club) => { //
  router.push(`/clubpage`); // /${club.id}
};

const addClub = () => {
  showModal.value=true;
  resetNewClubForm();
};

</script>



<template>
  <Toast position="top-center" />
  <div class="min-h-screen bg-gray-50 p-8">

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
          v-for="club in clubs"
          :key="club.id"
          class="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

        <div class="h-40 bg-emerald-200 flex items-center justify-center">
          <span class="text-emerald-700 font-semibold text-4xl">
            {{ club.name }}
          </span>
        </div>

        <div class="p-5">

          <p class="text-gray-600 text-sm mb-4">
            {{ club.professor }}
          </p>

          <button
              @click="clubIconClick(club)"
              class="w-full bg-emerald-600 text-white py-2 rounded-xl font-bold hover:bg-emerald-700 transition">
            Open
          </button>
        </div>
      </div>

      <Button

          v-if="displayAddButton"
          @click="addClub"
          class="addClub-card"
      >
        <span class="plus">+</span>
      </Button>

    </div>
  </div>

  <Dialog
      v-model:visible="showModal"
      modal
      header="Create new classroom"
      :style="{ width: '25rem' }"
  >
    <div class="flex flex-col gap-4 py-3">
      <div>
        <label class="block text-sm font-medium mb-1">Club name:</label>
        <InputText v-model="newClub.name" placeholder="Name" class="w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Club time slot</label>
        <Dropdown v-model="newClub.day" :options="days" placeholder="Day" class="w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Starting time:</label>
        <InputText v-model="startTimeInput" placeholder="00:00" class="w-full" maxlength="5" @input="formatTime('start')" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Ending time:</label>
        <InputText v-model="endTimeInput" placeholder="00:00" class="w-full" maxlength="5" @input="formatTime('end')" />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button label="Cancel" severity="secondary" @click="showModal = false" />
        <Button label="Save" severity="primary" @click="saveClub" />
      </div>
    </template>
  </Dialog>

</template>



<!-- AI slop: -->
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.page {
  background: darkgray;
  min-height: 100vh;
}

/* GRID */

.clubRoom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 50px;
  padding: 60px;
  max-width: 1000px;
}

/* CLASSROOM CARD */

.addClub-card {
  height: 260px;
  border-radius: 45px !important;
  border: solid 5px rgba(0, 1, 0, 0.5) !important;
  font-size: 40px !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addClub-card:hover {
  transform: scale(1.03);
  color: white;
  border: none !important;
}

.plus {
  font-size: 60px;
  font-weight: bold;
}

/* POP ANIMATION */
@keyframes popup {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

</style>