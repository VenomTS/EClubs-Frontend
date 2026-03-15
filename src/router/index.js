import { createRouter, createWebHistory } from "vue-router"

import Home from "../pages/Helloworld.vue"
import Clubs from "../components/Clubs.vue"
import Login from "../pages/LoginPage.vue"
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/clubs",
        name: "Clubs",
        component: Clubs
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router