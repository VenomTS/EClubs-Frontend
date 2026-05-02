import HomePage from "./pages/HomePage.vue"
import ClubPage from "./pages/ClubPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import RegisterPage from "./pages/RegisterPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import {useUserStore} from "./stores/userStore.ts";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: LoginPage
    },
    {
        path: "/register",
        name: "Register",
        component: RegisterPage
    },
    {
        path: '/',
        name: "Home",
        component: HomePage,
        meta: { requiresAuth: true },
    },
    {
        path: '/clubs/:clubId',
        name: "Club",
        component: ClubPage,
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    const userStore = useUserStore();

    await userStore.init();

    if(to.meta.requiresAuth && !userStore.isLoggedIn)
        return { name: "Login" };
});

export default router;
