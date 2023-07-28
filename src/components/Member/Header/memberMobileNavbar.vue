<template>
  <div class="mobile-navbar">
    <div class="hamburger" @click="menuCollapse">
      <i class="fa-solid fa-bars"></i>
    </div>
    <div class="accounts accounts-mob">
      <span v-if="notifications.length" style="position: relative" class="active">
        <div><i class="fa-solid fa-bell"></i></div>
        <div
          style="
            height: 10px;
            width: 10px;
            display: inline;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            z-index: 999;
            top: -2px;
          "
        >
          {{ notifications.length }}
        </div>
        <div class="dropdown">
          <div v-for="(notification, idx) in notifications" :key="idx">
            <p @click="clearNotice(idx)">{{ notification }}</p>
          </div>
        </div>
      </span>
      <i v-else class="fa-solid fa-bell"></i>
      <div style="display: flex; align-items: center; gap: 5px">
        <span>Hi! {{ name }}!</span>
        <i class="fa-solid fa-right-from-bracket" @click="logout"></i>
      </div>
    </div>
    <div class="remove-navbar-content" id="nav-content">
      <button class="button-menu" @click="profile">Profile</button>
      <button class="button-menu" @click="member">Member Management</button>
      <button class="button-menu" @click="progress">Check Progress</button>
      <button class="button-menu" @click="dashboard">Dashboard</button>
      <button class="button-menu" @click="kanban">Kanban Board</button>
    </div>
  </div>
</template>

<style scoped>

.hamburger{
  display: relative;
  z-index: 999;
}
.accounts {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: end;
}

.accounts {
  font-size: 0.7rem;
}

@media only screen and (max-width: 993px) {
  .accounts-lg {
    display: none;
  }
}

.accounts-mob {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  right: 10px;
}

.button-menu {
  height: 7%;
  background-color: white;
  margin:5px;
  width:70%;
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

.mobile-navbar {
  display: flex;
  margin-top: 10px;
  flex-direction: row;
}

.mobile-navbar-content {
  display: flex;
  width: 95%;
  position:absolute;
  z-index: 9999;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

@media only screen and (min-width: 993px) {
  .mobile-navbar {
    display: none;
  }
}
.remove-navbar-content {
  display: none;
}

@media only screen and (min-width: 993px) {
  .accounts-mob {
    display: none;
  }
}


.dropdown{
  display:none;
  position: absolute;
  background-color: #504dff;
  color:white;
  padding:5px;
}

.active:hover:hover .dropdown{
  display: block;
}

.close {
  align-self: start;
  color: #504dff !important;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

.fa-bell {
  font-size: 1.4rem;
  color: #504dff;
}

.fa-right-from-bracket {
  font-size: 1.4rem;
  color: #504dff;
}

.fa-right-from-bracket:hover {
  cursor: pointer;
}
</style>

<script>
import axios from "axios";
export default {
  name: "MobileNavbar",
  props: ["name"],
  data() {
    return {
      notifications: [],
    };
  },
  methods: {
    profile() {
      this.$router.push({ name: "profile" });
    },
    progress() {
      this.$router.push({ name: "progress" });
    },
    kanban() {
      this.$router.push({ name: "orgKanban" });
    },
    dashboard() {
      this.$router.push({ name: "dashBoard" });
    },
    member() {
      this.$router.push({ name: "addMembers" });
    },
    logout() {
      localStorage.removeItem("email");
      localStorage.removeItem("phoneNo");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("orgId");
      this.$router.push({ name: "logIn" });
    },
    menuCollapse() {
      if (!this.menuCollapsed) {
        const menuBody = document.getElementById("nav-content");
        menuBody.classList.add("mobile-navbar-content");
        menuBody.classList.remove("remove-navbar-content");
        document.getElementsByClassName("hamburger")[0].innerHTML =
          '<i class="fa-solid fa-xmark"></i>';
        document.getElementsByClassName("accounts-mob")[0].style.display =
          "none";
      } else {
        const menuBody = document.getElementById("nav-content");
        menuBody.classList.remove("mobile-navbar-content");
        menuBody.classList.add("remove-navbar-content");
        document.getElementsByClassName("hamburger")[0].innerHTML =
          '<i class="fa-solid fa-bars" ></i>';
        document.getElementsByClassName("accounts-mob")[0].style.display =
          "flex";
      }
      this.menuCollapsed = !this.menuCollapsed;
    },
    async clearNotice(idx) {
      axios
        .post("https://managd-backend-server.onrender.com/clearNotification", {
          id: localStorage.getItem("id"),
          notification: idx,
          email: localStorage.getItem("email"),
          token: localStorage.getItem("token")
        })
        .then((res) => {
          this.notifications = res;
        });
    },
  },
  async mounted() {
    let token = localStorage.getItem("token");
    
    if (!token) {
      this.$router.push({ name: "signUp" });
    }
    axios
      .post("https://managd-backend-server.onrender.com/getNotificationsForMember", {
        id: localStorage.getItem("id"),
        token: token,
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        this.notifications = res.data.notifications;
        
      })
  },
};
</script>
