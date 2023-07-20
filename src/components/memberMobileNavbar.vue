<template>
    <div class="mobile-navbar">
      <div class="hamburger" @click="menuCollapse">
        <i class="fa-solid fa-bars"></i>
      </div>
      <div class="accounts accounts-mob">
        <span v-if="notifications.length" style="position: relative">
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
  .accounts {
    display: flex;
    align-items: center;
    gap: 1rem;
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
  }
  
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
  
  .mobile-navbar {
    display: flex;
    margin-top: 10px;
  }
  
  .mobile-navbar-content {
    display: flex;
    width: 100%;
    position:relative;
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
        this.$router.push({ name: "/member/profile" });
      },
      progress() {
        this.$router.push({ name: "/member/progress" });
      },
      kanban() {
        this.$router.push({ name: "/member/orgKanban" });
      },
      dashboard() {
        this.$router.push({ name: "/member/dashBoard" });
      },
      member() {
        this.$router.push({ name: "/member/addMembers" });
      },
      logout() {
        localStorage.removeItem("orgId");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        // localStorage.removeItem("token");
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
          .post("http://localhost:3000/clearNotification", {
            id: localStorage.getItem("id"),
            notification: idx,
          })
          .then((res) => {
            this.notifications = res;
          });
      },
    },
    async mounted() {
      let token = localStorage.getItem("token");
      console.log("p");
      if (!token) {
        this.$router.push({ name: "signUp" });
      }
      axios
        .post("http://localhost:3000/getNotificationsForMember", {
          id: localStorage.getItem("id"),
          token: token,
          email: localStorage.getItem("email"),
        })
        .then((res) => {
          this.notifications = res.data.notifications;
          console.log("N", this.notifications);
        })
        .catch(() => {
          alert("Session Expired! Please relogin again.");
          localStorage.removeItem("email");
          localStorage.removeItem("id");
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          localStorage.removeItem("phoneNo");
          // localStorage.removeItem("email")
          this.$router.push({ name: "logIn" });
        });
    },
  };
  </script>
  