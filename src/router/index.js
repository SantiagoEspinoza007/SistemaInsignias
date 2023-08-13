import { createRouter, createWebHistory } from "vue-router";
import cHome from '../pages/master/cHome'
import fidelizacion from '../pages/fidelizacion'
import usabilidad from '../pages/usabilidad'
import publicidad from "@/pages/publicidad.vue";
import insignias from "@/pages/insignias.vue";

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
        name: 'Publicidad',
        path: '/publicidad',
        component: publicidad
    },
    {
        name: 'Insignias',
        path: '/insignias',
        component: insignias
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