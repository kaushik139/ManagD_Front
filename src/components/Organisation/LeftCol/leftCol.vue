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
      this.$router.push({name:"profile"})
    },
    progress(){
      this.$router.push({name:"progress"})
    },
    kanban(){
      this.$router.push({name:"orgKanban"})
    },
    dashboard() {
      this.$router.push({ name: "dashBoard" });
    },
    member() {
      this.$router.push({ name: "memberManagement" });
    },
    logout() {
      localStorage.removeItem("email");
      localStorage.removeItem("phoneNo");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
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
  box-shadow: 5px 5px 5px 0px #2d2b94;

}

.button-menu:hover {
  height: 7%;
  background-color: #211efa;
  color: white;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border-radius: 10px;
  transition: 0.6s;
  font-weight: 700;
  font-family: "Nunito", sans-serif !important;
  box-shadow: 5px 5px 5px 0px #2d2b94;
}
</style>