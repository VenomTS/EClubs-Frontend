import HomePage from "./pages/HomePage.vue"
import ClubPage from "./pages/ClubPage.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    { path: '/', name: "Home", component: HomePage },
    { path: '/clubs/:clubId', name: "Club", component: ClubPage },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

