import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Datepicker from 'vue3-datepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


createApp(App).use(router).mount('#app')
// eslint-disable-next-line vue/multi-word-component-names
App.component('Datepicker', Datepicker)
App.use(router)
App.mount('#app')

