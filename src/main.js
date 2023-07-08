import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import VueDatePicker from '@vuepic/vue-datepicker';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'



// createApp(App).use(router).mount('#app')
const app = createApp(App)
// eslint-disable-next-line vue/multi-word-component-names
app.component('dayGridPlugin', dayGridPlugin);
app.component('Calendar', Calendar);
app.component('VueDatePicker', VueDatePicker);
app.use(router)
app.mount('#app')

