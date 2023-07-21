import { createApp } from 'vue'
import App from './App.vue'

//importar css
import './assets/css/app.css'

//importar router
import router from "./router";

const app = createApp(App)
    app.use(router)
    app.mount('#app')
