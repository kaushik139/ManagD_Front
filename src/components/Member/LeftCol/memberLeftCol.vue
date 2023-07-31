<template>
  <button class="button-menu" @click="profile">Profile</button>
  <button class="button-menu" @click="org">Organisation Management</button>
  <button class="button-menu" @click="progress">Check Progress</button>
  <button class="button-menu" @click="dashboard">Dashboard</button>
  <button class="button-menu" @click="kanban">Kanban Board</button>

</template>
  <script>
export default {
  name: "LeftCol",
  methods: {
    profile() {
      this.$router.push({ name: "memberProfile" });
    },
    progress() {
      this.$router.push({ name: "memberProgress" });
    },
    kanban() {
      this.$router.push({ name: "memberKanban" });
    },
    dashboard() {
      this.$router.push({ name: "memberDashboard" });
    },
    org() {
      this.$router.push({ name: "organisationManagement" });
    },
    logout() {
      localStorage.removeItem("orgId");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      // localStorage.removeItem("token");
      this.$router.push({ name: "memberLogin" });
    },
  },
};
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