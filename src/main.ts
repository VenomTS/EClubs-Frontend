import { createApp } from 'vue'
import './style.css'
import "primeicons/primeicons.css"
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/material'

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import Toast from 'primevue/toast'
import Select from 'primevue/select'
import Tabs from "primevue/tabs"
import TabList from "primevue/tablist"
import Tab from "primevue/tab"
import TabPanels from "primevue/tabpanels"
import TabPanel from "primevue/tabpanel"
import Tag from "primevue/tag"
import Chip from "primevue/chip"
import Accordion from "primevue/accordion"
import AccordionPanel from "primevue/accordionpanel"
import AccordionHeader from "primevue/accordionheader"
import AccordionContent from "primevue/accordioncontent"
import {DatePicker, InputChips, InputNumber, SelectButton, Textarea, ToastService} from "primevue";
import router from "./router.ts";
import {pinia} from "./pinia.ts";
import {useUserStore} from "./stores/userStore.ts";

document.documentElement.classList.add("dark")

async function bootstrap()
{
    const app = createApp(App);

    app.use(pinia);
    app.use(router);
    app.use(PrimeVue, { theme: { preset: Aura, options: { darkModeSelector: '.dark' } }});
    app.use(ToastService);

    const userStore = useUserStore();
    await userStore.init();

    app.component('Card', Card)
    app.component('InputText', InputText)
    app.component('Password', Password)
    app.component('Button', Button)
    app.component('Message', Message)
    app.component('Toast', Toast)
    app.component("ProgressSpinner", ProgressSpinner);
    app.component("Dropdown", Select);
    app.component("Select", Select);
    app.component("Tabs", Tabs);
    app.component("TabPanel", TabPanel);
    app.component("TabList", TabList);
    app.component("Tab", Tab);
    app.component("TabPanels", TabPanels);
    app.component("Tag", Tag);
    app.component("Chip", Chip);
    app.component("Accordion", Accordion);
    app.component("AccordionPanel", AccordionPanel);
    app.component("AccordionHeader", AccordionHeader);
    app.component("AccordionContent", AccordionContent);
    app.component("InputNumber", InputNumber);
    app.component("Textarea", Textarea);
    app.component("InputChips", InputChips);
    app.component("DatePicker", DatePicker);
    app.component("SelectButton", SelectButton);


    app.mount('#app');
}

bootstrap();
