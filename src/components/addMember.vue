<template>
    <div class="dashboard-section">

        <div class="sections">
            <div class="left-col">
                <button class="button-menu">Profile</button>
                <button class="button-menu">Add Member</button>
                <button class="button-menu">Check Progress</button>
                <button class="button-menu" @click="dashboard">Dashboard</button>
                <button class="button-menu">Option</button>

            </div>
            <div class="right-col">
                <div class="header">Managd</div>
                <div class="row-one">
                    <div class="search-sec">
                        <input class="search" type="text" placeholder="Search">
                        <button class="search-button"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                    <div class="accounts">
                        <i class="fa-solid fa-bell "></i>
                        <div style="display: flex; align-items: center; gap:5px">
                            <span>Hi! {{organisation.name}}!</span>
                            <i class="fa-solid fa-right-from-bracket" @click="logout"></i>
                        </div>
                    </div>
                </div>
                <div class="view-area">
                    <div>
                        <h1>Add New Members</h1>
                        <form @submit.prevent="submit($event)">
                            <input type="email"/>
                            <button type="submit">Add</button>
                        </form>

                        <div style="height: auto; max-width: 100%;" :key="componentKey">Members to add:
                            <span v-for="(member,index) in selectedMembers" :key="index">{{ member }},</span>
                        </div>
                        <button @click="sendInvites">Click to send invitations</button>
                    </div>

                    <div>
                        <h1>Remove Members</h1>
                        <form @submit.prevent="submitRemoves($event)">
                            <input type="email"/>
                            <button type="submit">Add</button>
                        </form>

                        <div style="height: auto; max-width: 100%;">Members to remove:
                            <span v-for="(member,index) in removedMembers" :key="index">{{ member }},</span>
                        </div>
                        <button @click="removeMember">Click to remove members</button>
                    </div>



                </div>
            </div>
        </div>
    </div>
  </template>
    <style scoped>
    .header{
        background-color: black;
        color:white;
    }

    .view-area{
        display: flex;
        flex-direction: column;
        width:100%;
        /* gap:20px; */
        margin-top: 30px;
        justify-content: space-around;
        /* margin-left: 10px; */
        /* justify-content: center; */
    }

  
    .accounts{
        display: flex;
        align-items: center;
        gap:1rem;
    }
        .row-one{
            display: flex;
            margin-top: 4px;
            justify-content: end;
            gap: 70px;
            margin-right: 10px;

        }
        .fa-bell{
            font-size: 2rem;
            color:#504DFF;
        }

        .fa-right-from-bracket{
            font-size: 2rem;
            color: #504DFF;
        }
        .fa-right-from-bracket:hover{
            cursor: pointer;
        }
        .search-sec{
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .search{
            height: 25px;
        }
        .search-button{
            height: 31px;
        }

        .dashboard-section{
            margin-top: -59.8px;
            /* margin-left:-10px; */
            /* margin-right: 10px; */

            padding: 0px !important;

        }

        .sections{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            height:98.50vh;
        }
        .left-col{
            width:20%;
            height: 100%;
            /* border-radius: 10px; */
            background: #504DFF;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            padding: 10px;
            /* background-color: blue; */
        }
        .right-col{
            width: 80%;
            height: 100%;
            /* background-color: red; */
        }

        .button-menu{
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
        .button-menu:hover{
            background-color: antiquewhite;
            
        }

        .button-menu:focus{
        }
    </style>
  <script>
  import axios from "axios";
  export default {
    name: "AddMembers",
    data() {
      return {
        name: "",
        mail: "",
        pass: "",
        phone:'',
        members:"",
        organisation:{},
        selectedMembers:[],
        removedMembers:[]


      };
    },
  
    methods: {
        submitRemoves(event){
            this.removedMembers.push(...[event.target[0].value])
        },

        async removeMember(){
            axios.post('http://localhost:3000/removeMember',{
                id:this.organisation.id,
                email: this.organisation.email,
                token: localStorage.getItem("token"),
                memberList: this.removedMembers
            }).then((res)=>{
                if(res.status==200)
                    alert("Removed valid members!")
            })
        },
        dashboard(){
            this.$router.push({name:"dashBoard"})
        },
        async sendInvites(){
            axios.post('http://localhost:3000/addMember',{
                id:this.organisation.id,
                email: this.organisation.email,
                token: localStorage.getItem("token"),
                memberList: this.selectedMembers
            }).then((res)=>{
                if(res.status==200)
                    alert("Sent invites to valid members!")
            })
        },
        submit(event){
            this.selectedMembers.push(...[event.target[0].value])
            console.log(this.selectedMembers)
        },
        logout(){
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("id");
            this.$router.push({name:"logIn"})
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
              phoneNo:this.phone,

            })
            .then((response) => {
              this.message = response.data;
              alert(this.message);
              if(this.message != 'E-mail already Exists.')
                  this.$router.push({ name: "login" });
            });
        } else {
          alert("Please fill the required details");
        }
      },


    },
    mounted() {
        let token = localStorage.getItem("token");
        if(!token){
            this.$router.push({ name: "signUp" });
        }
        this.organisation = {
            name: localStorage.getItem("name"),
            id: localStorage.getItem("id"),
            email: localStorage.getItem("email"),
            phoneNo: localStorage.getItem("phoneNo"),

        }

    },
  };
  </script>
  
