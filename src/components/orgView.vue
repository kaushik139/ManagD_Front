<template>
    <div class="profile">
        <div class="sections">
            <div class="left-col">
                <button class="button-menu" @click="profile">Profile</button>
                <button class="button-menu" @click="Oragnisations">
                    Organisations
                </button>
                <button class="button-menu">Check Progress</button>
                <button class="button-menu" @click="dashboard">Dashboard</button>
            </div>
            <div class="right-col">
                <div class="header" style="width: 100%">Managd - User Profile</div>

                <div class="mobile-navbar">
                    <div class="hamburger" @click="menuCollapse">
                        <i class="fa-solid fa-bars"></i>
                    </div>
                    <div class="accounts accounts-mob">
                        {{ notifications.length }}
                        <span v-if="notifications.length" style="position: relative">
                            <div><i class="fa-solid fa-bell"></i></div>
                            <div style="
                  height: 10px;
                  width: 10px;
                  display: inline;
                  background-color: red;
                  border-radius: 50%;
                  position: absolute;
                  z-index: 999;
                  top: -2px;
                ">
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
                            <span>Hi! {{ organisation.name }}!</span>
                            <i class="fa-solid fa-right-from-bracket" @click="logout"></i>
                        </div>
                    </div>
                    <div class="remove-navbar-content" id="nav-content">
                        <button class="button-menu">Profile</button>
                        <button class="button-menu" @click="member1">Organisations</button>
                        <button class="button-menu">Check Progress</button>
                        <button class="button-menu" @click="dashboard">Dashboard</button>
                        <!-- <button class="button-menu">Close</button> -->
                    </div>
                </div>
                <div class="row-one">
                    <div class="search-sec">
                        <input class="search" type="text" placeholder="Search" />
                        <button class="search-button">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <div class="accounts accounts-lg">
                        <span v-if="notifications.length" style="position: relative" class="active">
                            <div><i class="fa-solid fa-bell"></i></div>
                            <div style="
                  height: 15px;
                  width: 15px;
                  display: inline;
                  background-color: red;
                  border-radius: 50%;
                  position: absolute;
                  z-index: 999;
                  top: -2px;
                ">
                                {{ notifications.length }}
                            </div>
                            <div class="dropdown" style="
                  position: absolute;
                  width: 170px;
                  margin-left: -70px;
                  background-color: #504dff;
                  color: white;
                  padding: 2px;
                ">
                                <div v-for="(notification, idx) in notifications" :key="idx">
                                    <p @click="clearNotice(idx)">{{ notification }}</p>
                                </div>
                            </div>
                        </span>
                        <i v-else class="fa-solid fa-bell"></i>
                        <div style="display: flex; align-items: center; gap: 5px">
                            <span>Hi! {{ organisation.name }}!</span>
                            <i class="fa-solid fa-right-from-bracket" @click="logout"></i>
                        </div>
                    </div>
                </div>
                <div class="view-area">
                    <h2>Current Organisation:</h2>
                    <h4 v-if="this.orgId != 'null'">{{ currentOrganisation.name }}<br>
                        <img src="../assets/location.png" alt="location" class="icon">
                        {{ currentOrganisation.location }} <br>
                        <img src="../assets/telephone.png" alt="phone" class="icon">
                        +91
                        {{ currentOrganisation.phoneNo }} <br>
                        <img src="../assets/mail.png" alt="mail" class="icon">
                        {{ currentOrganisation.email }}
                    </h4>
                    <h4 v-else>You are not a Member of any Organisation Yet!</h4><br><br>
                    <button id="leave">Leave<img src="../assets/exit.png" alt="exit" class="icon"></button>
                    <br><br><br><br>
                    <h4>Invitations from Organisations:</h4>
                    <table id="table">
                        <th class="tableData">
                        <td>Name</td>
                        <td>E-mail</td>
                        <td>Accept</td>
                        <td>Reject</td>
                        </th>
                        <!-- <tr class="tableData">
                        <td>{{ pendingOrganisation.name }}</td>
                        <td>{{ pendingOrganisation.email }}</td>
                    </tr> -->
                        <tr v-for="(item) in pendingOrganisation" :key="item._id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td><i class="fa-duotone fa-square-check" style="--fa-primary-color: #005eff;
                         --fa-secondary-color: #005eff;"></i></td>
                            <td><i class="fa-duotone fa-square-xmark" style="--fa-primary-color: #01c60e; 
                            --fa-secondary-color: #01c60e;"></i></td>
                        </tr>

                    </table>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "orgView",
    components: {},
    data() {
        return {
            name: "",
            mail: "",
            pass: "",
            phone: "",
            members: "",
            member: {},
            currentOrganisation: {},
            pendingOrganisation: [],
            notifications: [],
            dialogOpen: false,
            organisation: {},
            token: localStorage.getItem("token"),
            id: localStorage.getItem("id"),
            orgId: "",
            pendingID: [],
        };
    },

    methods: {
        closed() {
            this.dialogOpen = false;
        },
        opened() {
            this.dialogOpen = true;
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
            this.$router.push({ name: "dragThree" });
        },

        profile() {
            this.$router.push({ name: "memberProfile" });
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

        getOrganisationDetails(ID, status) {
            axios
                .post("http://localhost:3000/getOrganisationDetails", {
                    unsanitisedId: ID,
                })
                .then((res) => {
                    if (res) {
                        if (status === "current") {
                            this.currentOrganisation = res.data;
                        }
                        else {
                            this.pendingOrganisation.push(res.data);
                            console.log(this.pendingOrganisation);
                        }

                    }
                });
        },

        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("id");
            localStorage.removeItem("orgId");
            this.$router.push({ name: "memberLogin" });
        },
    },
    async mounted() {
        if (!this.token) {
            this.$router.push({ name: "memberLogin" });
        }

        axios
            .post("http://localhost:3000/getMemberDetails", {
                id: localStorage.getItem("id"),
                token: localStorage.getItem("token"),
                email: localStorage.getItem("email"),
            })
            .then((res) => {
                this.notifications = res.data.member.notifications;
                this.organisation = res.data.member;
                this.orgId = res.data.member.orgId;
                localStorage.setItem("orgId", this.orgId);
                this.pendingID = res.data.member.pendingOrgId;
                // console.log("ID:" +this.pendingID);

                //   Checking for current Organisation
                if (this.orgId != 'null') {
                    this.getOrganisationDetails(this.orgId, "current");
                }

                //   Checking for Organisation Invitations
                if (this.pendingID != 'null') {
                    for (let i = 0; i < this.pendingID.length; i++) {
                        this.getOrganisationDetails(this.pendingID[i], "pending");
                    }
                }

            });

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

.icon {
    height: 18px;
    width: 18px;
    margin: 0px -3px -3px 0px;
}

#leave {
    border: none;
    border-radius: 40px;
    background-color: red;
    color: white;
    width: 150px;
    height: 30px;
    align-self: center;
}

#table {
    width: 100%;
}

.tableData {
    display: grid;
    grid-template-columns: 24% 48% 14% 14%;
    ;
}

/* .button-menu:focus {} */
</style>
