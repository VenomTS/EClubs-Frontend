import { createApp } from 'vue'
import './style.css'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';


const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.mount('#app')
