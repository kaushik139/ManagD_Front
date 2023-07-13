<template>
    <div class="profile">

        <div class="sections">
            <div class="left-col">
                <button class="button-menu">Profile</button>
                <button class="button-menu" @click="member">Add Member</button>
                <button class="button-menu">Check Progress</button>
                <button class="button-menu" @click="dashboard">Dashboard</button>

            </div>
            <div class="right-col">

                <div class="header" style="width:100%">Managd - Organisation Dashboard</div>

                <div class="mobile-navbar">
                    <div class="hamburger" @click="menuCollapse"><i class="fa-solid fa-bars"></i></div>
                    <div class="accounts accounts-mob">
                        {{ notifications.length }}
                        <span v-if="notifications.length" style="position: relative;" >
                            <div ><i class="fa-solid fa-bell" ></i></div>
                            <div style="height: 10px; width:10px; display:inline; background-color: red; border-radius: 50%;position:  absolute; z-index:999; top:-2px">{{ notifications.length }}</div>
                            <div class="dropdown">
                                <div v-for="(notification,idx) in notifications" :key="idx">
                                    <p @click="clearNotice(idx)">{{ notification }}</p>
                                </div>
                            </div>
                        </span>
                        <i v-else class="fa-solid fa-bell "></i>
                        <div style="display: flex; align-items: center; gap:5px">
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
                        <input class="search" type="text" placeholder="Search">
                        <button class="search-button"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                    <div class="accounts accounts-lg">
                        <span v-if="notifications.length" style="position: relative;" class="active">
                            <div ><i class="fa-solid fa-bell " ></i></div>
                            <div style="height: 15px; width:15px; display:inline; background-color: red; border-radius: 50%;position:  absolute; z-index:999; top:-2px">{{ notifications.length }}</div>
                            <div class="dropdown" style="position: absolute; width: 170px; margin-left: -70px; background-color: #504DFF; color:white;padding: 2px;">
                                <div v-for="(notification,idx) in notifications" :key="idx">
                                    <p @click="clearNotice(idx)">{{ notification }}</p>
                                </div>
                            </div>
                        </span>
                        <i v-else class="fa-solid fa-bell "></i>
                        <div style="display: flex; align-items: center; gap:5px">
                            <span>Hi! {{ organisation.name }}!</span>
                            <i class="fa-solid fa-right-from-bracket" @click="logout"></i>
                        </div>
                    </div>
                </div>
                <div class="view-area">

                    <div>
                        <h3>Organisation Profile</h3>
                        <button class="edit-btn" @click="opened"><span>Edit</span></button>
                    </div>
                    <div class="dialog-container" v-if="dialogOpen">
                        <dialog id="dialog" >
                            <editForm></editForm>
                            <button @click="closed" className="close"><i class="fa-solid fa-circle-xmark"></i></button>
                            <!-- <h4>Edit Profile</h4>
                            <form @submit="editProfile">
                                <label for="name">Name: </label>
                                <input type="text" id="name" :value="organisation.name"/>
                                <br/>
                                <label for="phone">Phone No: </label>
                                <input type="text" id="phone" :value="organisation.phoneNo"/>

                            </form> -->
                        </dialog>
                    </div>
                    <div>
                        <p>Name: {{ organisation.name }} </p>
                        <p>Phone Number: {{ organisation.phoneNo }}</p>
                        <p>Email: {{ organisation.email }}</p>
                        <p>Location: {{ organisation.location }}</p>
                    </div>

                    <div>Current Members</div>
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
.edit-btn{
    align-self: start;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    background-color: #6c6afe;
    color:white;
    font-weight:bold;
    padding-left:2rem;
    padding-right:2rem;
    padding-top: 0.4rem;
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
    padding-bottom: 0.4rem;
    border-radius: 10px;
    box-shadow: 0px 0px 5px gray;
    
}

.edit-btn:hover{
    box-shadow: none;

}

#dialog{
    background-color: #fff;
  border-radius: 4.2px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2);
}
.dialog-container{
    position: relative;
    display: flex;
    flex-direction: row;
    margin-top: -40px;
}
.dropdown{
    display: none;
}

.close{
    align-self: start;
    color: #504DFF !important;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

.active:hover .dropdown{
    display: inline;
}

.fa-circle{
    background-color:red;
    height: 10px;
    width: 10px;
    /* border-radius: 100%; */
}
.member-table{
    display: flex;
    justify-content: center;
    overflow-x: auto;
}
table{
    width: 80%;
}
tr:nth-child(even){background-color: #f2f2f2;}
tr:hover {background-color: #ddd;}
th{
    background-color: #504DFF;
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

@media only screen and (min-width:993px) {
    .accounts-mob {
        display: none;
    }
}

@media only screen and (min-width:993px) {
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

@media only screen and (max-width:992px) {
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

@media only screen and (max-width:993px) {
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
    color: #504DFF;
}

.fa-right-from-bracket {
    font-size: 2rem;
    color: #504DFF;
}

.fa-right-from-bracket:hover {
    cursor: pointer;
}

.search-sec {
    display: flex;
    justify-content: center;
    align-items: center;
}

@media only screen and (max-width:992px) {
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
    height: 98.50vh;
}

.left-col {
    width: 20%;
    height: 100%;
    /* border-radius: 10px; */
    background: #504DFF;
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

dialog{
    border:none;
    outline:none;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
}

.button-menu:focus {}
</style>
<script>
import axios from "axios";
import editForm from  "./editForm.vue";
export default {
    name: "OrgProfile",
    components:{
        editForm
    },
    data() {
        return {
            name: "",
            mail: "",
            pass: "",
            phone: '',
            members: "",
            organisation: {},
            currentMembers:[],
            notifications:[],
            dialogOpen:false

        };
    },

    methods: {
        closed(){
            this.dialogOpen=false;
        },
        opened(){
            this.dialogOpen=true
            console.log(this.dialogOpen)
        },
        member(){
            this.$router.push({name:'addMembers'})

        },
        menuCollapse() {
            if (!this.menuCollapsed) {
                const menuBody = document.getElementById("nav-content")
                menuBody.classList.add('mobile-navbar-content');
                menuBody.classList.remove('remove-navbar-content');
                document.getElementsByClassName("hamburger")[0].innerHTML = '<i class="fa-solid fa-xmark"></i>';
                document.getElementsByClassName("accounts-mob")[0].style.display = "none";

            } else {
                const menuBody = document.getElementById("nav-content")
                menuBody.classList.remove('mobile-navbar-content');
                menuBody.classList.add('remove-navbar-content');
                document.getElementsByClassName("hamburger")[0].innerHTML = '<i class="fa-solid fa-bars" ></i>';
                document.getElementsByClassName("accounts-mob")[0].style.display = "flex";

            }
            this.menuCollapsed = !this.menuCollapsed;
        },
        dashboard() {
            this.$router.push({ name: "dashBoard" })
        },

        async clearNotice(idx){
            axios.post("http://localhost:3000/clearNotification",{
                id:localStorage.getItem('id'),
                notification:idx
            }).then((res)=>{
                this.notifications=res;
            })
        },

        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("id");
            this.$router.push({ name: "logIn" })
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
                        if (this.message != 'E-mail already Exists.')
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
        axios.post("http://localhost:3000/getOrganisationDetails",{
            unsanitisedId:localStorage.getItem("id")
        })
        .then((res)=>{
            this.organisation=res.data;
            console.log(this.organisation._id)
        })  

        console.log(localStorage.getItem('id'))

        axios.post("http://localhost:3000/getAllMembers",{
            id: localStorage.getItem('id')
        })
        .then((res)=>{
            this.currentMembers=res.data.members;
            console.log(this.currentMembers)
        })
        console.log({token})
        axios.post("http://localhost:3000/getNotificationsForOrganisation",{
            id:localStorage.getItem('id'),
            token: token,
            email: localStorage.getItem('email')
        })
        .then((res)=>{
            this.notifications = res.data.notifications;
            console.log(this.notifications)
        }).catch(()=>{
            alert("Session Expired! Please relogin again.");
            localStorage.removeItem("email")
            localStorage.removeItem("id")
            localStorage.removeItem("token")
            localStorage.removeItem("name")
            localStorage.removeItem("phoneNo")
            // localStorage.removeItem("email")
            this.$router.push({name:"logIn"})
        })


    },
};
</script>
  
