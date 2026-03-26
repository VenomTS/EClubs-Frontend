import axios from "axios";
import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import { jwtDecode } from "jwt-decode";
import { Role } from "/src/interfaces/Role.js"

export const useUserStore = defineStore('users', () => {

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const user = reactive({
        token: null,
        id: null,
        firstName: null,
        lastName: null,
        roles: []
    });

    const loginSuccessful = ref(null)

    function hasRole(role) {
        return user.roles.values().some(userRole => userRole.name === role.name);
    }

    function parseToken() {
        if (!user.token) return;
        try{
            const decoded=jwtDecode(user.token);
            user.id= decoded.sub;
            user.firstName=decoded.given_name;
            user.lastName=decoded.family_name;

            const roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

            user.roles = [];

            if(typeof roles === "string") {
                if(roles === Role.Student.name)
                    user.roles.push(Role.Student)
                else if(roles === Role.Professor.name)
                    user.roles.push(Role.Professor)
                else if(roles === Role.Director.name)
                    user.roles.push(Role.Director)
                else if(roles === Role.Admin.name)
                    user.roles.push(Role.Admin)
            }
            else
            {
                roles.forEach(role => {
                    if(role === Role.Student.name)
                        user.roles.push(Role.Student)
                    else if(role === Role.Professor.name)
                        user.roles.push(Role.Professor)
                    else if(role === Role.Director.name)
                        user.roles.push(Role.Director)
                    else if(role === Role.Admin.name)
                        user.roles.push(Role.Admin)
                });
            }

            console.log(user);

        }
        catch (error) {
            console.error("Token parsing failed:", error);
        }
    }

    async function login(email, password) {
        const options = {
            method: 'POST',
            url: `${BASE_URL}/Auth/login`,
            headers: {'Content-Type': 'application/json'},
            data: {mail: email, password: password}
        };

        try {
            const { data } = await axios.request(options);

            user.token = data["token"];
            parseToken()
            loginSuccessful.value = true;
        } catch (error) {
            loginSuccessful.value = false;
        }
    }

    return { user, login, hasRole, loginSuccessful };
}, { persist: true });