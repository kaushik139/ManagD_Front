<template>
  <div class="dashboard-section" :key="pageUpdateHelper">
    <div class="sections">
      <div class="left-col">
        <LeftCol :name="organisation.name"></LeftCol>
      </div>
      <div class="right-col">
        <div class="header" style="width: 100%">
          Managd - Organisation Dashboard
        </div>

        <div>
          <MobileNavbar :name="organisation.name"></MobileNavbar>
        </div>
        <div>
          <div>
            <Header :name="organisation.name"></Header>
          </div>
          <div class="view-area">
            <div>
              <h1>Add New Members</h1>
              <form @submit.prevent="submit($event)">
                <input required type="email" class="email" />
                <br />
                <button class="add" type="submit">Add</button>
              </form>

              <div style="height: auto; max-width: 100%" :key="componentKey">
                <h3>Members to add:</h3>
                <span v-for="(member, index) in selectedMembers" :key="index"
                  >{{ member }},</span
                >
              </div>
              <button v-if="selectedMembers.length" @click="sendInvites" class="members-send">
                Click to send invitations
              </button>
            </div>

            <div>
              <h1>Remove Members</h1>
              <form @submit.prevent="submitRemoves($event)">
                <input type="email" class="email" required/>
                <br /><button type="submit" class="add">Add</button>
              </form>

              <div style="height: auto; max-width: 100%">
                <h3>Members to remove:</h3>
                <span v-for="(member, index) in removedMembers" :key="index"
                  >{{ member }},</span
                >
              </div>
              <button v-if="removedMembers.length" @click="removeMember" class="members-send">
                Click to remove members
              </button>
            </div>
          </div>
          <h2>Current Members</h2>
          <div class="tab-div">
            <table class="table">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>ID</th>
                <th>
                  Tasks Count
                  <span style="position: absolute">
                    <!-- <i class="fa-solid fa-caret-up"></i>
                            <i class="fa-solid fa-caret-down"></i> -->
                  </span>
                </th>
              </tr>

              <tr v-for="member in members" :key="member._id">
                <td>{{ member.name }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.phoneNo }}</td>
                <td>{{ member._id }}</td>
                <td>{{ member.tasks.length }}</td>
              </tr>
            </table>
          </div>
          <!-- <ul>
<li style="list-style: none;" v-for="member in members" :key="member._id">{{member.name}}</li>
          </ul> -->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
tr:nth-child(even) {
  background-color: rgb(238, 238, 238);
}

td {
  padding: 10px;
}

.table {
  width: 80%;
  border-collapse: collapse;

}

th {
  border: 1px solid black;
  background-color: black;
  color: white;
}

.tab-div {
  width: 100%;
  display: flex;
  /* justify-content: center; */
  overflow:auto;

}

@media only screen and (min-width: 992px){
  .tab-div{
    justify-content:center;
  }
}
.members-send {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background-color: #8886f1;
  padding: 5px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 10px;
  color: white;
  font-weight: 800;
  font-family: "Nunito", sans-serif;
  font-size: 18px;
}

h3 {
  margin-bottom: -1px;
}

.add {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background-color: #8886f1;
  padding: 5px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 10px;
  color: white;
  font-weight: 800;
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  box-shadow: 0px 5px 5px #504dff;
  margin-bottom: 10px;
}

.email {
  height: 30px;
  width: 80%;
  outline: none;
  border: none;
  box-shadow: 0px 0px 10px gray;
  margin-bottom: 30px;
  border-radius: 15px;
  padding:5px;
  /* margin-bottom:-2px; */
}

@media only screen and (min-width: 993px) {
  .accounts-mob {
    display: none;
  }
}

.header {
  background-color: black;
  color: white;
}

@media only screen and (max-width: 992px) {
  .right-col {
    width: 100%;
  }
}
.header {
  background-color: black;
  color: white;
}

.view-area {
  display: flex;
  flex-direction: row;
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
  overflow-y: auto;
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

  .accounts {
    font-size: 0.7rem;
  }

  .view-area {
    flex-direction: column;
  }

  .view-area-right {
    font-size: 12px;
    font-weight: 400;
    margin-top: 15px;
  }
}

.button-menu:focus {
}
</style>
<script>
import axios from "axios";
import LeftCol from "../LeftCol/leftCol.vue";
import MobileNavbar from "../Header/mobileNavbar.vue";
import Header from "../Header/header.vue";
export default {
  name: "MemberManagement",
  data() {
    return {

      members: [],
      organisation: {},
      selectedMembers: [],
      removedMembers: [],
      pageUpdateHelper:false
    };
  },
  components: { LeftCol, MobileNavbar, Header },
  methods: {

    member() {
      this.$router.push({ name: "/addMember" });
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
    submitRemoves(event) {
      this.removedMembers.push(...[event.target[0].value]);
    },
    async removeMember() {
      axios
        .post("http://localhost:3000/removeMember", {
          id: this.organisation.id,
          email: this.organisation.email,
          token: localStorage.getItem("token"),
          memberList: this.removedMembers,
        })
        .then((res) => {
          if (res.status == 200) alert("Removed valid members!");
          this.pageUpdateHelper=!this.pageUpdateHelper;
          this.removedMembers=[];
          this.selectedMembers=[];
          axios
      .post("http://localhost:3000/getAllMembers", {
        id: localStorage.getItem("id"),
      })
      .then((res) => {
        this.members = res.data.members;
        console.log(this.members);
      });
        });
    },

    async sendInvites() {
      axios
        .post("http://localhost:3000/addMember", {
          id: this.organisation.id,
          email: this.organisation.email,
          token: localStorage.getItem("token"),
          memberList: this.selectedMembers,
        })
        .then((res) => {
          if (res.status == 200) alert("Sent invites to valid members!");
          this.pageUpdateHelper=!this.pageUpdateHelper
          this.selectedMembers=[]
          this.removedMembers=[]
        });
    },
    submit(event) {
      this.selectedMembers.push(...[event.target[0].value]);
      console.log(this.selectedMembers);
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
        console.log(this.members);
      });
  },
};
</script>