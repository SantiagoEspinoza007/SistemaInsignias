import { createRouter, createWebHistory } from "vue-router";
import cHome from '../pages/master/cHome'
import fidelizacion from '../pages/fidelizacion'
import usabilidad from '../pages/usabilidad'

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
    }
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