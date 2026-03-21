import { createRouter, createWebHistory } from "vue-router"

import Home from "../pages/HelloWorld.vue"
import Clubs from "../components/Clubs.vue"
import Login from "../pages/LoginPage.vue"
import WorkPlan from '../pages/WorkPlan.vue'
import Bookkeeping from "../pages/Bookkeeping.vue";
import ClubPage from "../pages/ClubPage.vue"

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
    },
    {
        path: "/work-plan",
        name: "WorkPlan",
        component: WorkPlan
    },
    {
        path: "/bookkeeping",
        name: "Bookkeeping",
        component: Bookkeeping
    },
    {
        path: "/clubpage",
        name: "ClubPage",
        component: ClubPage
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router