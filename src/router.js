import { createRouter,createWebHistory } from "vue-router";
import signUp from "./components/signUp.vue"

const routes = [
   
    {
        name:'signUp',
        component: signUp,
        path:'/'
    },
   
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router