import { createApp } from 'vue'
import App from './App.vue'


//importar css
import './assets/css/app.css'

import router from "./router";

const app = createApp(App)
    app.use(router)
    app.mount('#app')
