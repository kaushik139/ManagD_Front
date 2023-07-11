<template>
    <div class="dashboard-section">

        <div class="sections">
            <div class="left-col">
                <button class="button-menu">Profile</button>
                <button class="button-menu" @click="member">Add Member</button>
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
                    <div style="overflow-x:auto;" class="table">
                        <div style="width: 100%;">Current Members</div>
                        
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                            <tr v-for="(member,index) in members" :key="member._id" @click="selectCurrentMember(index)">
                                <td>{{member.name}}</td>
                                <td><a href="mailto:{{ member.email }}">{{member.email}}</a></td>
                            </tr>
                            
                        </table>

                    </div>
                    <div class="view-area-right">
                        <div>
                            <h3>Member Details</h3>
                        </div>
                        <div>
                            <p>Name: {{ currentMember.name }}</p>
                            <p>Email: {{ currentMember.email }}</p>
                            <p>Phone Number: {{ currentMember.phoneNo }}</p>
                            <!-- <p>Tasks: {{ currentMember.phoneNo }}</p> -->
                        </div>
                    </div>

                </div>

            <h3>Calendar</h3>
            <VCalendar expanded :attributes='attributes'/>

            </div>

        </div>
        <!-- <div style="width:150px;height:200px;"> -->
            <!-- <VCalendar /> -->


        <!-- </div> -->
    </div>
  </template>
    <style scoped>
    .header{
        background-color: black;
        color:white;
    }
    .dialog{
        position:fixed;
        left: 20%;
        top: 50%;
        -ms-transform: translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
    .view-area{
        display: flex;
        width:100%;
        /* gap:20px; */
        margin-top: 30px;
        justify-content: space-around;
        /* margin-left: 10px; */
        /* justify-content: center; */
    }

    .view-area-right{
        background-color: #504DFF;
        padding:15px;
        color:white;
        font-weight: 800;
        border-radius: 15px;
        box-shadow: 0px 0px 10px gray;
        font-size:14px;
    }
    .table{
        width:60%;

    }
    table{
        border:1px solid black;
        width: 100%;
        margin-top: 20px;
    }
    td{
        border:1px solid black;
    }
    tr:nth-child(even) {
        background-color: #F2F2F2;
    }
    tr:nth-child(odd) {
        background-color: #DADADA;
    }

    tr:nth-child(1){
        background-color: white;
    }

    tr:hover{
        background-color: #504DFF;
    }
    tr:nth-child(1):hover{
        background-color: white;

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
    name: "DashBoard",
    data() {
      return {
        name: "",
        mail: "",
        pass: "",
        phone:'',
        members:"",
        currentMember:{},
        organisation:{},
        attributes: []
      };
    },
  
    methods: {
        dashboard(){
            this.$router.push({name:'dashBoard'})
        },
        member(){
            this.$router.push({name:'addMembers'})
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

      selectCurrentMember(x){
        this.currentMember = this.members[x];
      }
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
        
        axios.post("http://localhost:3000/getAllMembers",{
            id:localStorage.getItem("id")
        }).then((res)=>{
            this.members = res.data.members;
            this.currentMember = this.members[0];
        })

        axios.post("http://localhost:3000/getTasksForOrganisation", {
            id: localStorage.getItem("id")
        }).then((res)=>{
            this.calendar = res.data.tasks;
            let cnt=0;
            
            let sample = []
            for(var x in this.calendar){
                console.log(this.calendar[x])
                const startAttribute = {
                    key: x,
                    content:'yellow',
                    // dot:true,
                    popover:{
                        label:this.calendar[x]._id
                    },
                    dates: new Date(this.calendar[x].startDate),
                    order: 20-cnt
                }
                cnt++;
                const endAttribute = {
                    key: x+cnt+100,
                    content:'green',
                    // dot:true,
                    popover:{
                        label:this.calendar[x].orgId

                    },
                    dates: new Date(this.calendar[x].endDate),
                    order:20-cnt
                }
                cnt++
                sample.push(startAttribute)
                sample.push(endAttribute)
            }
            this.attributes = [...sample]
            console.log(sample)
            console.log(this.attributes)

            
//             {

// key: 'today',

// content: 'red', 

// dot: true,

// popover:  {
//     label:"HELLo"
// },
// dates: new Date(),
// order: 0
// }
        })
    },
  };
  </script>
  
