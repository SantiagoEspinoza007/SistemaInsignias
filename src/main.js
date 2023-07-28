import { createApp } from 'vue'
import App from './App.vue'
import { registerLicense } from '@syncfusion/ej2-base'

registerLicense("ORg4AjUWIQA/Gnt2V1hiQlRPfkBAWnxLflF1VWpTfl16d1FWESFaRnZdQV1kS3ZTf0RnW3xfcHRW")

//importar css
import './assets/css/app.css'

//importar router
import router from "./router";

const app = createApp(App)
    app.use(router)
    app.mount('#app')
