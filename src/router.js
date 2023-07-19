import { createRouter,createWebHistory } from "vue-router";
import signUp from "./components/signUp.vue";
import logIn from "./components/logIn.vue";
import memberLogin from "./components/memberLogin.vue";
import memberSignup from "./components/memberSignup.vue";
import dashBoard from "./components/dashboard.vue";
import addMember from "./components/addMember.vue";
import profile from "./components/profile.vue";
import memberProfile from "./components/memberProfile.vue";
import orgView from "./components/orgView.vue";
import progress from "./components/progress.vue";
import dragThree from "./components/dragThree.vue";
import getTasksForOrganisation from "./components/allTasks.vue"
import taskDetail from "./components/taskDetail.vue"

const routes = [
    {
        name: 'dragThree',
        component: dragThree,
        path: '/dragThree'
    },
   
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
   },
   {
    name:'profile',
    component: profile,
    path: '/profile'
   },
   {
    name:'orgView',
    component: orgView,
    path: '/orgView'
   },
   {
    name:'memberProfile',
    component: memberProfile,
    path: '/memberProfile'
   },
   {
    name:'progress',
    component: progress,
    path:'/progress'
   },
   {
    name:'getTasksForOrganisation',
    component: getTasksForOrganisation,
    path:'/alltasks'
   },
   {
    name:'task',
    component: taskDetail,
    path:'/task/:id'
   }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router