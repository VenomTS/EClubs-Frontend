<template>
  <div class="page">
    <header class="header">
      <button class="hamburger" @click="hamburgerMenuClick">
        ☰ <!-- Emoji icon -->
      </button>
      <h1 class="title">WELCOME</h1>
    </header>

    <div class="classroom-grid">
      <button
          v-for="classroom in classrooms"
          :key="classroom.id"
          class="classroom-card"
          @click="classroomIconClick(classroom)">
        {{ classroom.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      classrooms: [
        { id: 1, name: "Test classroom 1" },
        { id: 2, name: "Test classroom 2" }
          //Easiest to be an array, will probably be changed if it doesn't work well
      ]
    };
  },


  methods: {

    //hamburger menu:
    hamburgerMenuClick() {
      //TODO
    },

    //club section button:
    classroomIconClick(classroom) {
      //TODO
      console.log("Clicked classroom:", classroom);
    }

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
  background: #8f8f8f;
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
  letter-spacing: 3px;
}

.hamburger {
  position: absolute;
  left: 20px;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
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
}
</style>