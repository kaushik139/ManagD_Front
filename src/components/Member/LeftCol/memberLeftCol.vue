<template>

    <button class="button-menu" @click="profile">Profile</button>
    <button class="button-menu" @click="member">Member Management</button>
    <button class="button-menu" @click="progress">Check Progress</button>
    <button class="button-menu" @click="dashboard">Dashboard</button>
    <button class="button-menu" @click="kanban">Kanban Board</button>
  
  
  </template>
  <script>
  
  export default{
    name:"LeftCol",
    methods:{
      profile(){
        this.$router.push({name:"memberProfile"})
      },
      progress(){
        this.$router.push({name:"memberProgress"})
      },
      kanban(){
        this.$router.push({name:"allTasksForMember"})
      },
      dashboard() {
        this.$router.push({ name: "memberDashboard" });
      },
      member() {
        this.$router.push({ name: "orgView" });
      },
      logout() {
        localStorage.removeItem("orgId");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        // localStorage.removeItem("token");
        this.$router.push({ name: "logIn" });
      },
    }
  }
  
  </script>
  
  <style scoped>
  
  .button-menu {
    height: 7%;
    background-color: white;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    border-radius: 10px;
    transition: 0.6s;
    font-weight: 700;
    font-family: "Nunito", sans-serif !important;
  }
  
  </style>