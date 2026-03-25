<template>
  <div class="page">
    <header class="header">
      <button class="hamburger" @click="hamburgerMenuClick">
        ☰ <!--Emoji icon-->
      </button>
      <h1 class="title">E-CLUBS</h1>
    </header>

    <div class="classroom-grid">
      <button
          v-for="classroom in displayedClassrooms"
          :key="classroom.id"
          class="classroom-card"
          @click="handleClick(classroom)"
      >
        <span v-if="classroom.isAdd" class="plus">+</span>
        <span v-else>{{ classroom.name }}</span>
      </button>
    </div>
  </div>

  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h2>Create a new classroom</h2>
        <button class="close" @click="closeModal">X</button>
      </div>

      <div class="modal-body">
        <label>Classroom name</label>
        <input v-model="newClassroom.name" type="text" placeholder="Name" />
        <label>Class time slot</label>
        <select v-model="newClassroom.day">
          <option disabled value="">Day</option>
          <option v-for="d in days" :key="d">{{d}}</option>
        </select>

        <input type="text" placeholder="Starting time (00:00)" v-model="startTimeInput" @input="formatTime('start')" />
        <input type="text" placeholder="Ending time (00:00)" v-model="endTimeInput" @input="formatTime('end')" />
      </div>

      <div class="modal-footer">
        <button class="save" @click="saveClassroom">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userRole = ref("professor");
const showModal = ref(false);
const closeModal = () => {
  showModal.value = false;
}
const errorMessage = ref("");
errorMessage.value = "Error: please ensure all inputs are valid!";

const classrooms = ref([
  { id: 1, name: "Test classroom 1" },
  { id: 2, name: "Test classroom 2" }
]);
const newClassroom = ref({
  name:"",
  day: "",
  start: "",
  end: ""
});
//Values for handling new classroom inputs:
const startTimeInput = ref("");
const endTimeInput = ref("");
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//Classroom spanning::
const displayedClassrooms = computed(() => {
  if (userRole.value === "professor")
  {
    return [
      ...classrooms.value,
      { id: "addClassroom", name: "ADD CLASSROOM", isAdd: true }
    ];
  }
  return classrooms.value;
});
//Handling time in new classroom inputs:
const formatTime = (type) => {
  let input = String(type === "start" ? startTimeInput.value : endTimeInput.value);
  input = input.replace(/\D/g, "").slice(0,4); //removes non-numbers
  if (input.length >= 3)
    {
      input=input.slice(0,2)+":"+input.slice(2);
    }
    if (type === "start")
    {
      startTimeInput.value = input;
      newClassroom.value.start = input;
    }
    else
    {
      endTimeInput.value = input;
      newClassroom.value.end = input;
    }
  }

  const isValidTime = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59; //Ensures the time entered is valid
  }

  const saveClassroom = async () => {
  if (!newClassroom.value.name || !newClassroom.value.day || !isValidTime(newClassroom.value.start) || !isValidTime(newClassroom.value.end))
  {
    alert(errorMessage.value);
    return;
  }

  classrooms.value.push({
    id: Date.now(),
    name: newClassroom.value.name,
  })
    closeModal();
}

const resetNewClassroomForm = () => {
  newClassroom.value = {
    name: "",
    day: "",
    start: "",
    end: "",
  }
  startTimeInput.value = "";
  endTimeInput.value = "";
}

const hamburgerMenuClick = () => {
  //TODO
};

const classroomIconClick = () => {
  router.push(`/clubpage`); // /${classroom.id}
};

const onAddClassroom = () => {
  showModal.value=true;
  resetNewClassroomForm();
};

const handleClick = (classroom) => {
  if (classroom.isAdd)
  {
    onAddClassroom();
  }
  else
  {
    classroomIconClick(classroom);
  }
};
</script>


<!-- AI slop: -->
<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.page {
  background: #e6e6e6;
  min-height: 100vh;
}

/* HEADER */

.header {
  background: blue;
  height: 70px;
  display: flex;
  align-items: center;
  position: relative;
}

.title {
  width: 100%;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: white;
  letter-spacing: 3px;
}

.hamburger {
  position: absolute;
  left: 20px;
  font-size: 28px;
  background: none;
  color: white;
  border: solid white;
  cursor: pointer;
}

.hamburger:hover {
  transform: scale(1.1);
}

/* GRID */

.classroom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 50px;
  padding: 60px;
  max-width: 1000px;
}

/* CLASSROOM CARD */

.classroom-card {
  height: 260px;
  background: #8f8f8f;
  border-radius: 35px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.15s, box-shadow 0.15s;
}

.classroom-card:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  color: white;
}

.plus {
  font-size: 48px;
  font-weight: bold;
}

/* DARK BACKGROUND OVERLAY */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
}

/* ACTUAL POPUP WINDOW */
.modal {
  width: 420px;
  max-width: 90%;

  background: #dcdcdc;
  border-radius: 20px;

  box-shadow: 0 10px 30px rgba(0,0,0,0.4);

  padding: 20px;

  animation: popup 0.2s ease-out;
}

/* HEADER */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 20px;
  font-weight: bold;
}

/* CLOSE BUTTON */
.close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

/* BODY */
.modal-body {
  margin-top: 15px;

  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* INPUTS */
.modal-body input,
.modal-body select {
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #333;
}

/* FOOTER */
.modal-footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

/* SAVE BUTTON */
.save {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: #bfbfbf;
  cursor: pointer;
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