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
        <span v-if="classroom.isAdd" class="plus">+<br></span>
        <span v-else>{{ classroom.name }}</span>
      </button>
    </div>
  </div>
</template>


<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "App",

  setup() {
    const router = useRouter();

    //I was told composition API would be somewhat different from React but oh well...
    const userRole = ref("professor");

    //Still keeping the following logic the same for now
    const classrooms = ref([
      { id: 1, name: "Test classroom 1" },
      { id: 2, name: "Test classroom 2" }
    ]);
    const displayedClassrooms = computed(() => {
      if (userRole.value === "professor")
      {
        return [
          ...classrooms.value, { id: "addClassroom", name: "ADD CLASSROOM", isAdd: true }
        ];
      }
      return classrooms.value;
    });



    const hamburgerMenuClick = () => {
      // TODO
    };

    const classroomIconClick = (classroom) => {
      router.push(`/classrooms/${classroom.id}`);
    };

    const onAddClassroom = () => {
      // TODO
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

    //needed in order to be visible to template:
    return {
      displayedClassrooms,
      hamburgerMenuClick,
      handleClick
    };
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
</style>