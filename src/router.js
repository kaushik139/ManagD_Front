import { createRouter,createWebHistory } from "vue-router";
import signUp from "./components/signUp.vue";
import logIn from "./components/logIn.vue";
import memberLogin from "./components/memberLogin.vue";
import memberSignup from "./components/memberSignup.vue";
import dashBoard from "./components/Organisation/DashBoard/dashboard.vue";
import profile from "./components/Organisation/Profile/profile.vue";
// import orgView from "./components/orgView.vue";
import progress from "./components/Organisation/Progress/progress.vue";
import dragThree from "./components/dragThree.vue";
import getTasksForOrganisation from "./components/allTasks.vue"
import taskDetail from "./components/Member/TaskDetail/taskDetail.vue"
import orgTaskDetail from "./components/Organisation/TaskDetail/taskDetail.vue"
import orgKanban from "./components/Organisation/Kanban Board/orgKanban.vue"
import memberKanban from "./components/Member/Kanban Board/memberKanban"
import memberManagement from "./components/Organisation/MemberManagement/memberManagement.vue"
// Member Imports
import memberDashboard from "./components/Member/Dashboard/memberDashboard.vue";
import memberProfile from "./components/Member/Profile/memberProfile.vue";
import memberProgress from "./components/Member/Progress/memberProgress.vue"
import organisationManagement from "./components/Member/Organisation Management/organisationManagement.vue"

import meetScheduler from  "./components/meetScheduler.vue"


import resetPassword from "./components/resetPasswordOrg.vue"
const routes = [
    {
        name: 'dragThree',
        component: dragThree,
        path: '/dragThree'
    },
   {
        name:'allTasksForMember',
        component: memberKanban,
        path:"/member/kanban"
   },
    {
        name:'signUp',
        component: signUp,
        path:'/'
    },
    {
        name:'memberProgress',
        component: memberProgress,
        path:'/memberProgress'
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
    path: '/organisation/dashboard'
   },
   {
    name: 'memberDashboard',
    component: memberDashboard,
    path: '/memberDashboard'
   },
   {
    name:'memberManagement',
    component: memberManagement,
    path: '/organisation/member/manage'
   },
   {
    name:'profile',
    component: profile,
    path: '/organisation/profile'
   },
   {
    name:'orgView',
    component: organisationManagement,
    path: '/member/organisation/manage'
   },
   {
    name:'memberProfile',
    component: memberProfile,
    path: '/memberProfile'
   },
   {
    name:'progress',
    component: progress,
    path:'/organisation/progress'
   },
   {
    name:'getTasksForOrganisation',
    component: getTasksForOrganisation,
    path:'/alltasks'
   },
   {
    name:'task',
    component: taskDetail,
    path:'/member/task/:id'
   },
   {
    name:'task',
    component: orgTaskDetail,
    path:'/organisation/task/:id'
   },
   {
    name:'orgKanban',
    component: orgKanban,
    path:'/organisation/kanban'
   },
   {
    name:'meet',
    component: meetScheduler,
    path:'/meet'
   },
   {
    name:'resetPasswordOrg',
    component: resetPassword,
    path:'/organisation/resetpassword'
   }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router