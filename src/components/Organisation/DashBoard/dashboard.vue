<template>
  <div class="dashboard-section">
    <div class="sections">
      <div class="left-col">
        <LeftCol></LeftCol>
      </div>

      <div class="right-col">
        <div class="header" style="width: 100%">
          Managd - Organisation Dashboard
        </div>
        <div>
          <MobileNavbar :name="organisation.name"></MobileNavbar>
        </div>
        <div>
<Header :name="organisation.name"></Header>
        </div>
        <div class="view-area">
          <div style="overflow-x: auto" class="table">
            <div style="width: 100%">Current Members</div>

            <table style="border-radius: 10px">
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
              <tr
                v-for="(member, index) in members"
                :key="member._id"
                @click="selectCurrentMember(index)"
              >
                <td>{{ member.name }}</td>
                <td>
                  <a href="mailto:{{ member.email }}">{{ member.email }}</a>
                </td>
              </tr>
            </table>
          </div>
          <div class="view-area-right">
            <div>
              <h3>Organisation Details</h3>
            </div>
            <div>
              <p>Name: {{ organisation.name }}</p>
              <p>Email: {{ organisation.email }}</p>
              <p>Phone Number: {{ organisation.phoneNo }}</p>
              <!-- <p>Tasks: {{ currentMember.phoneNo }}</p> -->
            </div>
          </div>
        </div>

        <h3>Calendar</h3>
        <VCalendar expanded :attributes="attributes" />
      </div>
    </div>
  </div>
</template>
<style scoped>

table{
  border-collapse: collapse;
  border-radius: 10px;
}


@media only screen and (min-width: 993px) {
  .accounts-mob {
    display: none;
  }
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


</style>
<script>
import LeftCol from "../LeftCol/leftCol.vue";

import axios from "axios";
import MobileNavbar from "../Header/mobileNavbar.vue";
import Header from "../Header/header.vue";
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
        };


    },
    components:{ LeftCol, MobileNavbar, Header },
    methods: {
        kanban() {
            this.$router.push({ name: "orgKanban" });
        },
        profile() {
            this.$router.push({ name: "profile" });
        },
        progress() {
            this.$router.push({ name: "progress" });
        },
        searchResults(event) {
            console.log(event.value);
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
            this.$router.push({ name: "logIn" });
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
        this.organisation = {
            name: localStorage.getItem("name"),
            id: localStorage.getItem("id"),
            email: localStorage.getItem("email"),
            phoneNo: localStorage.getItem("phoneNo"),
        };
        axios
            .post("http://localhost:3000/getAllMembers", {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            email: localStorage.getItem("email")
        })
            .then((res) => {
            this.members = res.data.members;
            this.currentMember = this.members[0];
        });
        axios
            .post("http://localhost:3000/getTasksForOrganisation", {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            email: localStorage.getItem("email")
        })
            .then((res) => {
            this.calendar = res.data.tasks;
            let cnt = 0;
            console.log(this.calendar);
            let sample = [];
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
                const decideColor = new Date(this.calendar[x].endDate).getTime() < new Date().getTime();
                const endAttribute = {
                    key: x + cnt + 100,
                    content: this.calendar[x].status === "Completed"
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
