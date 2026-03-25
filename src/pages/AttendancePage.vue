<template>
  <div class="w-full flex justify-center">
    <div class="w-5xl mt-4">

      <div class="relative h-30 md:h-56 rounded-2xl overflow-hidden shadow-lg">

        <div class="absolute inset-0 bg-linear-to-r from-emerald-600 to-emerald-900"></div>

        <div class="absolute inset-0 bg-black/10"></div>

        <div class="relative h-full flex flex-col justify-end p-6 text-white">
          <h1 class="text-2xl md:text-4xl font-bold">
            {{ club.name }}
          </h1>
          <p class="text-sm md:text-lg opacity-90">
            Professor: {{club.professor}}
          </p>
          <p class="text-xs md:text-sm opacity-75">
            {{getNumberOfStudents()}} Students | Room {{ club.room }}
          </p>
        </div>
      </div>
    </div>
  </div>


      <!-- STUDENT LIST -->
      <div class="students-container">
        <div
            v-for="student in sortStudents"
            :key="student.id"
            class="student-card"
        >
        <span class="student-name">
          {{ student.name }}
        </span>

          <span class="absence">Absence:
          {{ student.absence }}
        </span>
        </div>
      </div>




</template>


<script setup>
import {computed, ref} from "vue";

const club = ref({
  name: "Club 1",
  students: "4",
})

const students = ref([
  {id: 1, name: "Student 1", absence: 3},
  {id: 2, name: "Student 2", absence: 0},
  {id: 3, name: "Student 3", absence: 0},
  {id: 4, name: "Student 4", absence: 1},
])
const getNumberOfStudents = () => {
  return Object.keys(students).length - 1;
}

const sortStudents = computed(() => {
  return [...students.value].sort((a, b) => a.name.localeCompare(b.name))
  //localeCompare - compares two strings based on language settings (returns negative value = before, positive = after, 0 = strings are equal)
})


</script>


<!--AI slop:-->
<style scoped>

/* STUDENT LIST */
.students-container {
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  align-self: center;
  gap: 20px;
  padding: 60px;
  flex-direction: column;
  max-width: 800px;
}

/* STUDENT CARD */
.student-card {
  background: #d9d9d9;
  border-radius: 15px;
  height: 100px;
  width: 600px;

  padding: 20px 25px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  font-size: 18px;

  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

/* NAME */
.student-name {
  font-weight: 500;
}

/* ATTENDANCE */
.absence {
  font-weight: bold;
  font-size: 20px;
}

</style>