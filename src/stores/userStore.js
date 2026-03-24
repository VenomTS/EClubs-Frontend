import axios from "axios";
import {defineStore} from "pinia";
import {reactive} from "vue";

export const useUserStore = defineStore('users', () => {

    const user = reactive({
        token: null,
        id: null,
        firstName: null,
        lastName: null,
        roles: []
    });

    // function hasRole(role) {
    //     return user.roles.includes(role);
    // }

    function parseToken() {
        //use jwt-decode
    }

    async function login(email, password) {
        const options = {
            method: 'POST',
            url: 'https://109.237.45.118:8080/api/Auth/login',
            headers: {'Content-Type': 'application/json'},
            data: {mail: email, password: password}
        };

        try {
            const { data } = await axios.request(options);

            user.token = data["token"];
            parseToken()
        } catch (error) {
            console.error(error);
        }
    }

    return { user, login };
})