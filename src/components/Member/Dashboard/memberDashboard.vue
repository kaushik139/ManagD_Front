<template>
  <div class="dashboard-section">
    <div class="sections">
      <div class="left-col">
        <MemberLeftCol></MemberLeftCol>
      </div>

      <div class="right-col">
        <div class="header" style="width: 100%">Managd - User Dashboard</div>

        <div class="mobile-navbar">
          <memberMobileNavbar></memberMobileNavbar>
        </div>
        <div class="row-one">
          <MemberHeader></MemberHeader>
        </div>
        <div class="view-area">
          <div class="top_area">
            <div v-if="onGoingTasks.length" class="view-area-left">
              <h3  style="color: #504dff">
                Onging Tasks
              </h3>              
              <!-- <div class="scroll"> -->
              <table v-if="this.onGoingTasks.length">
                <tr>
                  <th style="width: 15%"><u>Name</u></th>
                  <th style="width: 65%"><u>Description</u></th>
                  <th style="width: 20%"><u>End Date</u></th>
                </tr>
                <tr v-for="(tasks, index) in onGoingTasks" :key="index">
                  <td>{{ tasks.title }}</td>
                  <td>{{ tasks.description }}</td>
                  <td>{{ tasks.endDate }}</td>
                </tr>
              </table>
            </div>
            <div class="view-area-left2" v-else>
            <h2  style="color: #504dff">No Ongoing Tasks!</h2>
          </div>
            <div class="view-area-right">
              <div>
                <h3>User Details</h3>
              </div>
              <div>
                <p>
                  Name:
                  <span style="text-transform: uppercase">{{
                    member.name
                  }}</span>
                </p>
                <p>Email: {{ member.email }}</p>
                <p>Phone Number: {{ member.phoneNo }}</p>
                <!-- <p>Tasks: {{ currentMember.phoneNo }}</p> -->
              </div>
            </div>
          </div>
        </div>
        <!-- </div> -->
        <br />
        <h3>Calendar</h3>
        <VCalendar expanded :attributes="attributes" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import memberMobileNavbar from "../Header/memberMobileNavbar.vue";
import MemberHeader from "../Header/memberHeader.vue";
import MemberLeftCol from "../LeftCol/memberLeftCol.vue";
export default {
  name: "memberDashboard",
  components: {
    memberMobileNavbar,
    MemberHeader,
    MemberLeftCol,
  },
  data() {
    return {
      name: "",
      mail: "",
      pass: "",
      phone: "",
      members: "",
      currentMember: {},
      member: {},
      attributes: [],
      menuCollapsed: false,
      orgId: "",
      onGoingTasks: [],
    };
  },

  methods: {
    profile() {
      this.$router.push({ name: "memberProfile" });
    },
    progress() {
      this.$router.push({ name: "progress" });
    },
    searchResults() {
      // console.log(event.value);
    },
    orgView() {
      this.$router.push({ name: "orgView" });
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
      this.$router.push({ name: "memberDashboard" });
    },
    logout() {
      localStorage.removeItem("email");
      localStorage.removeItem("phoneNo");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      this.$router.push({ name: "logIn" });
    },
    selectCurrentMember(x) {
      this.currentMember = this.members[x];
    },
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "memberLogin" });
    }
    this.member = {
      name: localStorage.getItem("name"),
      id: localStorage.getItem("id"),
      email: localStorage.getItem("email"),
      phoneNo: localStorage.getItem("phoneNo"),
    };
   

    axios
      .post("http://localhost:3000/getMemberTasks", {
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        this.calendar = res.data.taskList;
        let cnt = 0;
        // console.log(res.data.taskList);
        // console.log(this.calendar);
        let sample = [];

        for (let i = 0; i < this.calendar.length; i++) {
          if (this.calendar[i].status == "Ongoing") {
            let kimetsu = this.calendar[i];
            let no_yiba = new Date(kimetsu.endDate).toLocaleDateString();
            kimetsu.endDate = no_yiba;
            // this.onGoingTasks.push(this.calendar[i]);
            this.onGoingTasks.push(kimetsu);
          }
          // console.log(this.calendar[i].status);
          // console.log(i);
        }

        for (var x in this.calendar) {
          //   console.log(this.calendar[x]);
          const startAttribute = {
            key: x,
            content: "yellow",
            popover: {
              label: this.calendar[x].title,
            },
            dates: new Date(this.calendar[x].startDate),
            order: 20 - cnt,
          };
          cnt++;
          const decideColor =
            new Date(this.calendar[x].endDate).getTime() < new Date().getTime();
          const endAttribute = {
            key: x + cnt + 100,
            content:
              this.calendar[x].status === "Completed"
                ? "green"
                : this.calendar[x].status === "Ongoing"
                ? decideColor
                  ? "red"
                  : "blue"
                : "orange",
            // dot:true,
            popover: {
              label: this.calendar[x].title,
            },
            dates: new Date(this.calendar[x].endDate),
            order: 20 - cnt,
          };
          cnt++;
          sample.push(startAttribute);
          sample.push(endAttribute);
        }
        this.attributes = [...sample];
      });
  },
};
</script>

<style scoped>


/* width */
::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #504dff;
  border-radius: 15px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #504dff;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2a27d1;
}

table {
  width: 100%;
  height: 80px;
  padding: 5px;
  border: none;
  background: white;
  color: black;
}
th {
  margin: 10px;
  box-shadow: 1px 1px 1px 1px #2d2b94;
  background: #504dff;
  border-radius: 10px 2px 10px 2px;
  color: white;
}

tr {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #dadada;
}

tr:hover {
  background-color: #504dff;
  color: white;
}

td {
  border-radius: 10px;
  border: none;
}

.top_area {
  display: flex;
  gap: 4%;
  min-width: 90%;
  justify-content: center;
}
.view-area-left {
  padding: 15px;
  color: white;
  font-weight: 800;
  border-radius: 15px;
  font-size: 14px;
  min-width: 60%;
  height: 150px;
  width: 60%;
  overflow-y: scroll;
  box-shadow: 10px 10px 10px 0px #2d2b94;
  background: white;
  /* margin-right: 300px; */
  margin-left: 20px;
}

.view-area-left2 {
  padding: 15px;
  color: white;
  font-weight: 800;
  border-radius: 15px;
  font-size: 14px;
  min-width: 50%;
  height: 150px;
  width: 60%;
  box-shadow: 10px 10px 10px 0px #2d2b94;
  background: white;
  /* margin-right: 300px; */
  margin-left: 20px;
}
.view-area-right {
  background-color: #504dff;
  padding: 15px;
  color: white;
  font-weight: 800;
  border-radius: 15px;
  box-shadow: 10px 10px 10px 0px #2d2b94;
  font-size: 14px;
  height: 150px;
  width: 25%;
  min-width: 25%;
  /* margin-left: 700px; */
  /* margin-top: -180px;   */
}

/* .table {
  width: 60%;
}
table {
  border: 1px solid black;
  margin-top: 20px;
} */
/* tr:nth-child(even) {
  background-color: #504dff;
}
tr:nth-child(odd) {
  background-color: #dadada;
} */

/* tr:nth-child(1) {
  background-color: white;
} */

/* tr:nth-child(1):hover {
  background-color: white;
} */

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
  font-weight: 900;
  font-family: "Nunito", sans-serif !important;
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
  /* gap:20px; */
  margin-top: 30px;
  justify-content: space-around;
  /* margin-left: 10px; */
  /* justify-content: center; */
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
  font-weight: 400;
  font-family: "Nunito", sans-serif !important;

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
  background: #504dff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px;
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
  font-weight: 700;
  font-family: "Nunito", sans-serif !important;
}
.button-menu:hover {
  background-color: antiquewhite;
}

.button-menu:focus {
}
</style>
 