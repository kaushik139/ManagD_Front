import { createRouter,createWebHistory } from "vue-router";
import signUp from "./components/signUp.vue";
import logIn from "./components/logIn.vue";

const routes = [
   
    {
        name:'signUp',
        component: signUp,
        path:'/'
    },
    {
        name: 'logIn',
        component: logIn,
        path: '/logIn'
    },
   
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router