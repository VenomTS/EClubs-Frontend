import { createRouter, createWebHistory } from "vue-router"

import Home from "../pages/HelloWorld.vue"
import ClubList from "../pages/ClubList.vue"
import Login from "../pages/LoginPage.vue"
import WorkPlan from '../pages/WorkPlan.vue'
import Bookkeeping from "../pages/Bookkeeping.vue";
import ClubPage from "../pages/ClubPage.vue"
import AttendancePage from "../pages/AttendancePage.vue";
import HomePage from "../pages/HomePage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/clubs",
        name: "Clubs",
        component: ClubList
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
    },
    {
        path: "/attendance",
        name: "AttendancePage",
        component: AttendancePage
    },
    {
        path: "/home",
        name: "HomePage",
        component: HomePage
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router