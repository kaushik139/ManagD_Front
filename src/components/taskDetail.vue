<template>
  <div class="dashboard-section">
    <div class="sections">
      <div class="left-col">
        <button class="button-menu" @click="profile">Profile</button>
        <button class="button-menu" @click="member">Add Member</button>
        <button class="button-menu">Check Progress</button>
        <button class="button-menu" @click="dashboard">Dashboard</button>
      </div>

      <div class="right-col">
        <div class="header" style="width: 100%">
          Managd - Member Task Details
        </div>

        <div class="mobile-navbar">
          <div class="hamburger" @click="menuCollapse">
            <i class="fa-solid fa-bars"></i>
          </div>
          <div class="accounts accounts-mob">
            <i class="fa-solid fa-bell"></i>
            <div style="display: flex; align-items: center; gap: 5px">
              <span>Hi! {{ organisation.name }}!</span>
              <i class="fa-solid fa-right-from-bracket" @click="logout"></i>
            </div>
          </div>
          <div class="remove-navbar-content" id="nav-content">
            <button class="button-menu">Profile</button>
            <button class="button-menu" @click="member">Add Member</button>
            <button class="button-menu">Check Progress</button>
            <button class="button-menu" @click="dashboard">Dashboard</button>
            <!-- <button class="button-menu">Close</button> -->
          </div>
        </div>
        <div class="row-one">
          <div class="search-sec">
            <input
              class="search"
              type="text"
              @change="searchResults"
              placeholder="Search"
            />
            <button class="search-button">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div class="accounts accounts-lg">
            <i class="fa-solid fa-bell"></i>
            <div style="display: flex; align-items: center; gap: 5px">
              <span>Hi! {{ organisation.name }}!</span>
              <i class="fa-solid fa-right-from-bracket" @click="logout"></i>
            </div>
          </div>
        </div>
        <div class="view-area">
          <div class="task-card">
            <h3>{{ task.title }}</h3>
            <p>{{ task.description }}</p>
            <progress :value="task.progress"></progress>
            <p>From {{ task.startDate }} to {{ task.endDate }}</p>
            <p><i class="fa-brands fa-github"></i>:</p>
            <p>Assigned to: {{ issue.assignee?.login }}</p>
            <p>Latest Pull Request (done 3 hours ago) by dev</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.task-card {
  background-color: white;
  min-height: 50%;
  width: 70%;
  margin-top: -10%;
  background-color: white;
  box-shadow: 0px 0px 10px gray;
  border-radius: 10px;
}
.mobile-navbar {
  display: flex;
  /* justify-content: space-around; */
  /* display: none; */
}

.mobile-navbar-content {
  display: flex;
  width: 100%;
  /* display: none; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

@media only screen and (min-width: 993px) {
  .accounts-mob {
    display: none;
  }
}
@media only screen and (min-width: 993px) {
  .mobile-navbar {
    display: none;
  }
}
.remove-navbar-content {
  display: none;
}
.header {
  background-color: black;
  color: white;
  font-family: "Inknut Antiqua", serif;
}

@media only screen and (max-width: 992px) {
  .right-col {
    width: 100%;
  }
}

.dialog {
  position: fixed;
  left: 20%;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.view-area {
  display: flex;
  width: 100%;
  height: 84.9%;
  /* min-height: 75vh; */
  /* background-color: blue; */
  /* gap:20px; */

  margin-top: 30px;
  justify-content: center;
  align-items: center;
  /* margin-left: 10px; */
  /* justify-content: center; */
}

.view-area-right {
  background-color: #504dff;
  padding: 15px;
  color: white;
  font-weight: 800;
  border-radius: 15px;
  box-shadow: 0px 0px 10px gray;
  font-size: 14px;
}
.table {
  width: 60%;
}
table {
  border: 1px solid black;
  width: 100%;
  margin-top: 20px;
}
td {
  border: 1px solid black;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:nth-child(odd) {
  background-color: #dadada;
}

tr:nth-child(1) {
  background-color: white;
}

tr:hover {
  background-color: #504dff;
}
tr:nth-child(1):hover {
  background-color: white;
}
.accounts {
  display: flex;
  align-items: center;
  gap: 1rem;
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
.row-one {
  display: flex;
  margin-top: 4px;
  justify-content: end;
  gap: 70px;
  margin-right: 10px;
}
.fa-bell {
  font-size: 2rem;
  color: #504dff;
}

.fa-right-from-bracket {
  font-size: 2rem;
  color: #504dff;
}
.fa-right-from-bracket:hover {
  cursor: pointer;
}
.search-sec {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 992px) {
  .search-sec {
    width: 100%;
    margin-top: 10px;
    margin-left: 0;
    margin-right: 0;
  }
}

.search {
  height: 25px;
}
.search-button {
  height: 31px;
}

.dashboard-section {
  margin-top: -59.8px;
  /* margin-left:-10px; */
  /* margin-right: 10px; */

  padding: 0px !important;
}

.sections {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 98.5vh;
}

.left-col {
  width: 20%;
  height: 100%;
  /* border-radius: 10px; */
  background: #504dff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px;
  /* background-color: blue; */
}
.right-col {
  width: 80%;
  height: 100%;
  /* background-color: red; */
}

@media only screen and (max-width: 992px) {
  .sections {
    flex-direction: row;
    padding: 10px;
    gap: 15px;
  }

  .left-col {
    display: none;
    /* width:100%; */
  }

  .right-col {
    width: 100%;
  }

  .fa-bell {
    font-size: 1rem;
  }

  .fa-right-from-bracket {
    font-size: 1rem;
  }

  .accounts {
    font-size: 0.7rem;
  }

  .view-area {
    flex-direction: column;
  }

  .table {
    width: 100%;
  }
  .view-area-right {
    font-size: 12px;
    font-weight: 400;
    margin-top: 15px;
  }
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
  font-family: "Inknut Antiqua", serif;
}
.button-menu:hover {
  background-color: antiquewhite;
}

.button-menu:focus {
}
</style>
<script>
import axios from "axios";
export default {
  name: "DashBoard",
  data() {
    return {
      name: "",
      mail: "",
      pass: "",
      phone: "",
      members: "",
      currentMember: {},
      organisation: {},
      attributes: [],
      menuCollapsed: false,
      task: {},
      issue:{}
    };
  },

  methods: {
    profile() {
      this.$router.push({ name: "profile" });
    },

    searchResults(event) {
      console.log(event.value);
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
    dashboard() {
      this.$router.push({ name: "dashBoard" });
    },
    member() {
      this.$router.push({ name: "addMembers" });
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      this.$router.push({ name: "logIn" });
    },
    login() {
      this.$router.push({ name: "memberLogin" });
    },
    signUp() {
      if (this.name && this.mail && this.pass && this.phone) {
        axios
          .post("http://localhost:3000/memberSignup", {
            email: this.mail,
            name: this.name,
            password: this.pass,
            phoneNo: this.phone,
          })
          .then((response) => {
            this.message = response.data;
            alert(this.message);
            if (this.message != "E-mail already Exists.")
              this.$router.push({ name: "login" });
          });
      } else {
        alert("Please fill the required details");
      }
    },

    selectCurrentMember(x) {
      this.currentMember = this.members[x];
    },
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "signUp" });
    }

    const taskId = this.$route.params.id;
    axios
      .post("http://localhost:3000/getTask", {
        id: taskId,
      })
      .then((res) => {
        this.task = res.data.task;
        console.log(this.task);
        axios
          .post("http://localhost:3000/getGitHubIssueDetails", {
            username: this.task.githubUsername,
            repo: this.task.githubRepo,
            number: this.task.githubIssue,
          })
          .then((res)=>
          {this.issue=res.data
        console.log(this.issue)});
      });
  },
};
</script>
