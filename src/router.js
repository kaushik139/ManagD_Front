import { createRouter,createWebHistory } from "vue-router";
import signUp from "./components/signUp.vue";
import logIn from "./components/logIn.vue";
import memberLogin from "./components/memberLogin.vue";
import memberSignup from "./components/memberSignup.vue";
import dashBoard from "./components/dashboard.vue";
import addMember from "./components/addMember.vue";

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
   {
        name: 'memberLogin',
        component: memberLogin,
        path: '/memberLogin'
   },
   {
    name: 'memberSignup',
    component: memberSignup,
    path: '/memberSignup'
   },
   {
    name: 'dashBoard',
    component: dashBoard,
    path: '/dashBoard'
   },
   {
    name:'addMembers',
    component: addMember,
    path: '/addMember'
   }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router