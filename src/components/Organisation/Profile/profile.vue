<template>
  <div class="profile">
    <div class="sections">
      <div class="left-col">
       <LeftCol :name="organisation.name"></LeftCol>
      </div>
      <div class="right-col">
        <div class="header" style="width: 100%">
          Managd - Organisation Profile
        </div>
        <div>
          <MobileNavbar :name="organisation.name"></MobileNavbar>
        </div>
        <div>

          <Header :name="organisation.name"></Header>
        </div>
        <div class="view-area">
          <div>
            <h3>{{ organisation.name }}'s Profile</h3>
          </div>
          <div class="dialog-container" v-if="dialogOpen">
            <dialog id="dialog">
              <editForm></editForm>
              <button @click="closed" className="close">
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </dialog>
          </div>
          <div style="display: flex; flex-direction:column; align-items: center; margin-top: -10px; margin-bottom: 10px;">
            <div class="org-detail-p">Name: {{ organisation.name }}</div>
            <div class="org-detail-p">Phone Number: {{ organisation.phoneNo }}</div>
            <div class="org-detail-p">Email: {{ organisation.email }}</div>
            <div class="org-detail-p">Location: {{ organisation.location }}</div>
            <div><button class="edit-btn" @click="opened"><span>Edit</span></button></div>
        </div>

          <h3>Current Members</h3>
          <div class="member-table">
            <table>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>ID</th>
              </tr>
              <tr v-for="member in currentMembers" :key="member.id">
                <td>{{ member.name }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.phoneNo }}</td>
                <td>{{ member._id }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.org-detail-p{
    background-color: #f2f2f2;
    padding: 10px;
    margin:10px;
    border-radius: 20px;
    font-size: 16px;
    width: fit-content;
    text-align: left;
    padding-left: 30px;
    padding-right: 30px;
    box-shadow: 0px 0px 5px gray;
}

table{
  border-collapse: collapse;
}
.edit-btn {
  align-self: start;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background-color: #6c6afe;
  color: white;
  font-weight: bold;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  border-radius: 10px;
  box-shadow: 0px 0px 5px gray;
}

.edit-btn:hover {
  box-shadow: none;
}

#dialog {
  background-color: #fff;
  border-radius: 4.2px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2);
}
.dialog-container {
  position: relative;
  display: flex;
  flex-direction: row;
  margin-top: -40px;
}
.dropdown {
  display: none;
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

.active:hover .dropdown {
  display: inline;
}

.fa-circle {
  background-color: red;
  height: 10px;
  width: 10px;
  /* border-radius: 100%; */
}
.member-table {
  display: flex;
  justify-content: center;
  overflow-x: auto;
}
table {
  width: 80%;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #ddd;
}
th {
  background-color: #504dff;
  color: white;
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
  flex-direction: column;
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

.profile {
  margin-top: -59.8px;
  font-family: "Nunito", sans-serif !important;
  font-weight: 400;
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


dialog {
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}


</style>
<script>
import axios from "axios";
import editForm from "../../Shared/EditForm/editForm.vue";
import LeftCol from "../LeftCol/leftCol.vue";
import MobileNavbar from "../Header/mobileNavbar.vue";
import Header from "../Header/header.vue";
export default {
  name: "OrgProfile",
  components: {
    editForm,
    LeftCol,
    MobileNavbar,
    Header
},
  data() {
    return {
      name: "",
      mail: "",
      pass: "",
      phone: "",
      members: "",
      organisation: {},
      currentMembers: [],
      notifications: [],
      dialogOpen: false,
    };
  },

  methods: {
    profile(){
        this.$router.push({name:'profile'})
    },
    progress(){
        this.$router.push({name:'progress'})
    },
    closed() {
      this.dialogOpen = false;
    },
    opened() {
      this.dialogOpen = true;
      console.log(this.dialogOpen);
    },
    member() {
      this.$router.push({ name: "addMembers" });
    },

    dashboard() {
      this.$router.push({ name: "dashBoard" });
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
  },
  async mounted() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "signUp" });
    }
    axios
      .post("http://localhost:3000/getOrganisationDetails", {
        unsanitisedId: localStorage.getItem("id"),
      })
      .then((res) => {
        this.organisation = res.data;
        console.log(this.organisation._id);
      });

    console.log(localStorage.getItem("id"));

    axios
      .post("http://localhost:3000/getAllMembers", {
        id: localStorage.getItem("id"),
      })
      .then((res) => {
        this.currentMembers = res.data.members;
        console.log(this.currentMembers);
      });
    console.log({ token });

  },
};
</script>
