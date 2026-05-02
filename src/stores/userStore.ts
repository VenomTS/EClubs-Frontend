import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserModel } from "../interfaces/UserModel.ts";
import { AuthApi } from "../../api";

const authAPI = new AuthApi();

export const useUserStore = defineStore("user", () => {

    /* ---------------------------------- */
    /* State                              */
    /* ---------------------------------- */

    const initialized = ref(false);
    const initializing = ref<Promise<void> | null>(null);

    const user = ref<UserModel | null>(null);


    /* ---------------------------------- */
    /* Computed                           */
    /* ---------------------------------- */

    const isLoggedIn = computed(() =>
        initialized.value && user.value !== null
    );

    const userId = computed(() =>
        user.value?.id ?? ""
    );


    /* ---------------------------------- */
    /* Actions                            */
    /* ---------------------------------- */

    async function init(): Promise<void> {

        // already initialized
        if (initialized.value) return;

        // prevent parallel /me calls
        if (initializing.value)
            return initializing.value;

        initializing.value = (async () => {
            try {
                const { data } = await authAPI.getMe();

                if (
                    data?.id &&
                    data?.firstName &&
                    data?.lastName &&
                    data?.roles
                ) {
                    user.value = {
                        id: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        roles: data.roles
                    };
                } else {
                    user.value = null;
                }
            }
            catch {
                // not authenticated
                user.value = null;
            }
            finally {
                initialized.value = true;
                initializing.value = null;
            }
        })();

        return initializing.value;
    }


    async function refreshUser() {
        // force reload user
        initialized.value = false;
        await init();
    }


    function logout() {
        user.value = null;
        initialized.value = true;
    }


    function hasRole(role: string): boolean {
        return user.value?.roles.includes(role) ?? false;
    }


    /* ---------------------------------- */

    return {
        // state
        user,

        // computed
        isLoggedIn,
        userId,

        // actions
        init,
        refreshUser,
        logout,
        hasRole
    };
});

// import { defineStore } from "pinia";
// import {computed, ref} from "vue";
// import type {UserModel} from "../interfaces/UserModel.ts";
// import {AuthApi} from "../../api";
//
// const authAPI = new AuthApi();
//
// export const useUserStore = defineStore("users", () =>
// {
//     const initialized = ref(false);
//     const user = ref<UserModel | null>(null);
//
//     const isLoggedIn = computed(() => initialized.value && user.value !== null);
//
//     function hasRole(role: string): boolean
//     {
//         if(!isLoggedIn.value) return false;
//
//         if(user.value === null) return false;
//
//         return user.value.roles.includes(role);
//     }
//
//     async function getUserId(): Promise<string>
//     {
//         if(!isLoggedIn.value)
//             await init();
//
//         if(user.value == null)
//             return "";
//         return user.value.id;
//     }
//
//     async function init()
//     {
//         if(initialized.value) return;
//
//         try
//         {
//             const response = await authAPI.getMe();
//
//             const id = response.data.id;
//             const firstName = response.data.firstName;
//             const lastName = response.data.lastName;
//             const roles = response.data.roles;
//
//             if(id == null || firstName == null || lastName == null || roles == null)
//                 return;
//
//             user.value = {
//                 id: id,
//                 firstName: firstName,
//                 lastName: lastName,
//                 roles: roles,
//             }
//         }
//         catch
//         {
//             user.value = null;
//         }
//         finally
//         {
//             initialized.value = true;
//         }
//     }
//
//     return { isLoggedIn, init, getUserId, hasRole, user }
// });