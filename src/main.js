import { createApp } from 'vue'
import './style.css'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import PrimeVue from 'primevue/config';
import Aura from "@primevue/themes/aura";
import ToastService from 'primevue/toastservice';
import Toast from "primevue/toast";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import SplitButton from 'primevue/splitbutton';



const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'none', //Note: Disables dark mode globally to prevent dark/light conflicts in library-provided utilities
            cssLayer: false
        }
    }
});
app.use(ToastService);
app.component('Toast', Toast);
app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('SplitButton', SplitButton);
app.mount('#app')
