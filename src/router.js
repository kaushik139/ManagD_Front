import { createRouter,createWebHistory } from "vue-router";
import signUp from "./components/signUp.vue";
import logIn from "./components/logIn.vue";
import memberLogin from "./components/memberLogin.vue";
import memberSignup from "./components/memberSignup.vue";
import dashBoard from "./components/dashboard.vue";
import addMember from "./components/addMember.vue";
import profile from "./components/profile.vue";
import progress from "./components/progress.vue";
import dragThree from "./components/dragThree.vue";

const routes = [
    {
        name: 'dragThree',
        component: dragThree,
        path: '/drag'
    },
   
    {
        name:'signUp',
        component: signUp,
        path:'/'
    },
    {
        name: 'logIn',
        component: logIn,
        path: '/login'
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
   },
   {
    name:'profile',
    component: profile,
    path: '/profile'
   },
   {
    name:'progress',
    component: progress,
    path:'/progress'
   }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router