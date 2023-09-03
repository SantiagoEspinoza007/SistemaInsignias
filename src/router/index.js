import { createRouter, createWebHistory } from "vue-router";
import cHome from '../pages/master/cHome'
import fidelizacion from '../pages/fidelizacion'
import usabilidad from '../pages/usabilidad'
import administrador from "@/pages/administrador.vue";

const routes = [
    {
        name: 'ClippHome',
        path: '/',
        component: cHome
    },
    {
        name: 'Fidelizacion',
        path: '/fidelizacion',
        component: fidelizacion
    },
    {
        name: 'Usabilidad',
        path: '/usabilidad',
        component: usabilidad
    },
    {
        name: 'Administrador',
        path: '/administrador',
        component: administrador
    },
];

const router = Router();
export default router;
function Router(){
    const router = new createRouter({
       history: createWebHistory(),
       routes,
    });
    return router;
}