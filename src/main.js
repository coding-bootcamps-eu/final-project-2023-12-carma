import 'devextreme/dist/css/dx.light.css';
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

pinia.use(piniaPluginPersistedstate)

app.mount('#app')
