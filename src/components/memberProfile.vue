<template>
  <div class="profile">
    <div class="sections">
      <div class="left-col">
        <MemberLeftCol></MemberLeftCol>
      </div>
      <div class="right-col">
        <div class="header" style="width: 100%">Managd - User Profile</div>
        <div>
          <MemberMobileNavbar></MemberMobileNavbar>
        </div>
        <div>
          <MemberHeader :name="'Albert'"></MemberHeader>
        </div>
        <div class="view-area">
          <div>
            <h3>Member Profile</h3>
            <button class="edit-btn" @click="opened"><span>Edit</span></button>
          </div>
          <div class="dialog-container" v-if="dialogOpen">
            <dialog id="dialog">
              <editForm />
              <button @click="closed" className="close">
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </dialog>
          </div>
          <div>
            <p>Name: {{ organisation.name }}</p>
            <p>Phone Number: {{ organisation.phoneNo }}</p>
            <p>Email: {{ organisation.email }}</p>
            <!-- <p>Location: {{ organisation.location }}</p> -->
          </div>

          <div>Current Organisation:</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import editForm from "./editForm.vue";
import MemberMobileNavbar from "./memberMobileNavbar.vue";
import MemberHeader from "./memberHeader.vue";
import MemberLeftCol from "./memberLeftCol.vue";
export default {
  name: "memberProfile",
  components: {
    editForm,
    MemberMobileNavbar,
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
      member: {},
      currentOrganisation: [],
      notifications: [],
      dialogOpen: false,
      organisation: {},
      token: localStorage.getItem("token"),
      id: localStorage.getItem("id"),
    };
  },

  methods: {
    closed() {
      this.dialogOpen = false;
    },
    opened() {
      this.dialogOpen = true;
    },

    async clearNotice(idx) {
      axios
        .post("http://localhost:3000/clearNotification", {
          id: localStorage.getItem("id"),
          notification: idx,
        })
        .then((res) => {
          this.notifications = res.data.notifications;
        });
    },
    Oragnisations() {
      this.$router.push({ name: "orgView" });
    },
  },
  async mounted() {
    axios
      .post("http://localhost:3000/getMemberDetails", {
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        this.notifications = res.data.member.notifications;
        this.organisation = res.data.member;
      });
    //   .catch(() => {
    //     alert("Session Expired! Please relogin again.");
    //     localStorage.removeItem("email");
    //     localStorage.removeItem("id");
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("name");
    //     localStorage.removeItem("phoneNo");
    //     this.$router.push({ name: "memberLogin" });
    //   });
  },
};
</script>

<style scoped>
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
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
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

.profile {
  margin-top: -59.8px;
  /* margin-left:-10px; */
  /* margin-right: 10px; */
  /* font-family: 'Inknut Antiqua', serif; */
  /* font-size:14px; */
  /* line-height: 1.8; */
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
}

.button-menu:hover {
  background-color: antiquewhite;
}

dialog {
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}

/* .button-menu:focus {} */
</style>
