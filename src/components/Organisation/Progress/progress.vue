<template>
  <div class="profile">
    <div class="sections">
      <div class="left-col">
     <LeftCol :name="organisation.name"></LeftCol>
      </div>
      <div class="right-col" style="overflow-y: scroll">
        <div class="header" style="width: 100%">
          Managd - Organisation Dashboard
        </div>

        <div>
          <MobileNavbar :name="organisation.name"></MobileNavbar>
        </div>
        <div>
         <Header :name="organisation.name"></Header>
        </div>
        <div style="width: 1%">
          <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
        </div>
        <select class="selecter" @change="selecterchange($event)">
          <option>Showing the overall progress</option>
          <option
            v-for="(member, index) in membersList"
            :key="member._id"
            :value="index"
          >
            {{ member.name }}
          </option>
        </select>
        <div
          class="view-area"
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
          "
        >
          <div class="chart-area">
            <div>
              <Line id="my-line-id" :options="lineOptions" :data="lineData" :key="comp" />
            </div>
            <div>
              <Line id="my-lin" :options="lineOptions" :data="lineData2" :key="hlt"/>
            </div>
          </div>
          <div class="chart-area">
            <div>
              <Line id="my-lin" :options="lineOptions" :data="lineData3" :key="ong"/>
            </div>
            <div>
              <Line id="my-lin" :options="lineOptions" :data="lineData4" :key="del"/>
            </div>
          </div>
          <div style="width:100%" class="chart-area">
            <div>
              <Line id="my-lin" :options="lineOptions" :data="lineData5" :key="comp"/>
            </div>
          </div>
        </div>

        <div
          class="view-area"
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            max-width: 100%;
          "
        >
          <div style="width: 1%; display: none">
            <Pie id="my-pie-id" :options="pieOptions" :data="pieData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* .chart-area div{
  width:50%;
} */

.selecter {
  height: 35px;
  outline: none;
  border: none;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 5px rgb(208, 208, 208);
  padding: 5px;
  border-radius: 10px;
  /* margin-bottom: 10px; */
  margin-top: 20px;
}
.chart-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.chart-area div {
  width: 50%;
}

@media only screen and (max-width: 993px) {
  .chart-area div {
    width: 100%;
  }

  .chart-area {
    flex-direction: column;
    width: 100%;
  }
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



dialog {
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
}

.button-menu:focus {
}
</style>
<script>
import axios from "axios";
import { Bar, Line, Pie } from "vue-chartjs";
import LeftCol from "../LeftCol/leftCol.vue";
import MobileNavbar from "../Header/mobileNavbar.vue";
import Header from "../Header/header.vue";
import {
  Chart as ChartJS,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// import CanvasJSChart from '@canvasjs/vue-charts';

import { PointElement, LineElement } from "chart.js";
ChartJS.register(
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "OrgProfile",
  components: { Bar, Line, Pie, LeftCol, MobileNavbar, Header },
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
      membersList: [],
      comp:false,
      hlt:false,
      del:false,
      ong:false,
      //   months:[0,0,0,0,0,0,20,0,0,0,0,0],

      options: {
        theme: "light2",
        animationEnabled: true,
        title: {
          text: "Visitors By Channel",
        },
        data: [
          {
            type: "pie",
            indexLabel: "{label} (#percent%)",
            yValueFormatString: "#,##0",
            toolTipContent:
              "<span style='\"'color: {color};'\"'>{label}</span> {y}(#percent%)",
            dataPoints: [
              { label: "Organic Traffic", y: 130631 },
              { label: "Direct", y: 28874 },
              { label: "Referral", y: 15467 },
              { label: "Social", y: 10543 },
              { label: "Email", y: 5613 },
              { label: "Others", y: 8492 },
            ],
          },
        ],
      },
      styleOptions: {
        width: "100%",
        height: "360px",
      },

      chartData: {
        labels: ["January", "February", "March"],
        datasets: [{ data: [40, 20, 12] }],
      },
      chartOptions: {
        responsive: true,
      },
      lineData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Total Tasks Completed",
            backgroundColor: "limegreen",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      lineOptions: {
        responsive: true,
      },
      lineData2: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Total Tasks Halted",
            backgroundColor: "yellow",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      lineData3: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Total Tasks Ongoing",
            backgroundColor: "blue",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      lineData4: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Total Tasks Delayed",
            backgroundColor: "red",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      lineData5: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Total Tasks Completed",
            backgroundColor: "limegreen",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
            label: "Total Tasks Halted",
            backgroundColor: "yellow",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
            label: "Total Tasks Delayed",
            backgroundColor: "red",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
            label: "Total Tasks Ongoing",
            backgroundColor: "blue",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      pieData: {
        labels: [""],
        datasets: [
          {
            backgroundColor: ["blue", "green"],
            data: ["1", "2"],
          },
        ],
      },
      pieOptions: {
        responsive: true,
      },
    };
  },

  methods: {
    selecterchange(e) {

      
      const member = this.membersList[e.target.value];
      
      const taskArray = [];
      member.tasks.map((x) => {
        
        axios
          .post("https://managd-backend-server.onrender.com/getTask", {
            id: x,
            token: localStorage.getItem("token"),
        email: localStorage.getItem("email")
          })
          .then((res) => {
            taskArray.push(res);
            const onGoing = [];
            const completed = [];
            const halted = [];
            const delayed = [];
            for (var i = 0; i < taskArray.length; i++) {
              if (taskArray[i].data.task.status === "Ongoing") {
                onGoing.push(taskArray[i]);
              } else if (taskArray[i].data.task.status === "Completed") {
                completed.push(taskArray[i]);
              } else if (taskArray[i].data.task.status === "Halted") {
                halted.push(taskArray[i]);
              } else {
                delayed.push(taskArray[i]);
              }
            }

            // console.
            // log({onGoing:onGoing})
            
            const monthComplete = new Map();
            const monthHalted = new Map();
            const monthOngoing = new Map();
            const monthDelayed = new Map();
            completed.map((x) => {
              
              if (!monthComplete.get(new Date(x.data.task.endDate).getMonth())) {
                monthComplete.set(new Date(x.data.task.endDate).getMonth(), 1);
              } else {
                const value =
                  monthComplete.get(new Date(x.data.task.endDate).getMonth()) + 1;
                
                monthComplete.set(new Date(x.data.task.endDate).getMonth(), value);
              }
            });

            onGoing.map((x) => {
              if (!monthOngoing.get(new Date(x.data.task.endDate).getMonth())) {
                monthOngoing.set(new Date(x.data.task.endDate).getMonth(), 1);
              } else {
                const value =
                  monthOngoing.get(new Date(x.data.task.endDate).getMonth()) + 1;
                monthOngoing.set(new Date(x.data.task.endDate).getMonth(), value);
              }
            });

            halted.map((x) => {
              if (!monthHalted.get(new Date(x.data.task.endDate).getMonth())) {
                monthHalted.set(new Date(x.data.task.endDate).getMonth(), 1);
              } else {
                const value =
                  monthHalted.get(new Date(x.data.task.endDate).getMonth()) + 1;
                monthHalted.set(new Date(x.data.task.endDate).getMonth(), value);
              }
            });

            delayed.map((x) => {
              if (!monthDelayed.get(new Date(x.data.task.endDate).getMonth())) {
                monthDelayed.set(new Date(x.data.task.endDate).getMonth(), 1);
              } else {
                const value =
                  monthDelayed.get(new Date(x.data.task.endDate).getMonth()) + 1;
                monthDelayed.set(new Date(x.data.task.endDate).getMonth(), value);
              }
            });

            

            monthComplete.forEach((value, key) => {
              this.lineData.datasets[0].data[key] = value;
              this.lineData5.datasets[0].data[key] = value;
            });

            

            monthHalted.forEach((value, key) => {
              this.lineData2.datasets[0].data[key] = value;
              this.lineData5.datasets[1].data[key] = value;
            });
            monthOngoing.forEach((value, key) => {
              this.lineData3.datasets[0].data[key] = value;
              this.lineData5.datasets[2].data[key] = value;
            });
            monthDelayed.forEach((value, key) => {
              this.lineData4.datasets[0].data[key] = value;
              this.lineData5.datasets[3].data[key] = value;
            });

            
            this.comp=!this.comp;
            this.hlt=!this.hlt;
            this.del=!this.del;
            this.ong=!this.ong;
            // 
          });
      });
    },
    closed() {
      this.dialogOpen = false;
    },
    opened() {
      this.dialogOpen = true;
      
    },
    member() {
      this.$router.push({ name: "addMembers" });
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

    async clearNotice(idx) {
      axios
        .post("https://managd-backend-server.onrender.com/clearNotification", {
          id: localStorage.getItem("id"),
          notification: idx,
          token: localStorage.getItem("token"),
        email: localStorage.getItem("email")
        })
        .then((res) => {
          this.notifications = res;
        });
    },
  },
  async mounted() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "signUp" });
    }

    axios
      .post("https://managd-backend-server.onrender.com/getTasksForOrganisation", {
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        email:localStorage.getItem("email")
      })
      .then((res) => {
        
        const monthComplete = new Map();
        const monthHalted = new Map();
        const monthOngoing = new Map();
        const monthDelayed = new Map();
        const assignedMembers = new Map();

        res.data.tasks.map((x) => {
          if (x.status === "Completed") {
            
            if (!monthComplete.get(new Date(x.endDate).getMonth())) {
              monthComplete.set(new Date(x.endDate).getMonth(), 1);
            } else {
              const value =
                monthComplete.get(new Date(x.endDate).getMonth()) + 1;
              
              monthComplete.set(new Date(x.endDate).getMonth(), value);
            }
          } else if (x.status === "Halted") {
            
            if (!monthHalted.get(new Date(x.endDate).getMonth())) {
              monthHalted.set(new Date(x.endDate).getMonth(), 1);
            } else {
              const value = monthHalted.get(new Date(x.endDate).getMonth()) + 1;
              monthHalted.set(new Date(x.endDate).getMonth(), value);
            }
          } else if (x.status === "Ongoing") {
            if (!monthOngoing.get(new Date(x.endDate).getMonth())) {
              monthOngoing.set(new Date(x.endDate).getMonth(), 1);
            } else {
              const value =
                monthOngoing.get(new Date(x.endDate).getMonth()) + 1;
              monthOngoing.set(new Date(x.endDate).getMonth(), value);
            }
          } else if (x.status === "Delayed") {
            if (!monthDelayed.get(new Date(x.endDate).getMonth())) {
              monthDelayed.set(new Date(x.endDate).getMonth(), 1);
            } else {
              const value =
                monthDelayed.get(new Date(x.endDate).getMonth()) + 1;
              monthDelayed.set(new Date(x.endDate).getMonth(), value);
            }
          }
          
          for (var j = 0; j < x.assignees.length; j++) {
            if (assignedMembers.get(x.assignees[j])) {
              const current = assignedMembers.get(x.assignees[j]);
              // 
              assignedMembers.set(x.assignees[j], [...current, x.title]);
            } else {
              assignedMembers.set(x.assignees[j], x.title);
            }
          }
        });
        monthComplete.forEach((value, key) => {
          this.lineData.datasets[0].data[key] = value;
          this.lineData5.datasets[0].data[key] = value;
        });

        monthHalted.forEach((value, key) => {
          this.lineData2.datasets[0].data[key] = value;
          this.lineData5.datasets[1].data[key] = value;
        });
        monthOngoing.forEach((value, key) => {
          this.lineData3.datasets[0].data[key] = value;
          this.lineData5.datasets[2].data[key] = value;
        });
        monthDelayed.forEach((value, key) => {
          this.lineData4.datasets[0].data[key] = value;
          this.lineData5.datasets[3].data[key] = value;
        });

        this.comp=!this.comp;
            this.hlt=!this.hlt;
            this.del=!this.del;
            this.ong=!this.ong;

        

        // assignedMembers.forEach((value, key) => {
        //   this.pieData.labels.push(key);
        //   this.pieData.datasets[0].data.push(value);
        // });

        // for(let i = 0; i <res.data.tasks.length;i++){
        //     var task = res.data.tasks[i];
        //     var assigned = task.assignees;
        //     for(let j=0;j<assigned.length;j++){
        //         if(assignedMembers.get(assigned[j])){
        //             const current = assignedMembers.get(assigned[j]);
        //             // 
        //             assignedMembers.set(assigned[j],[...current,res.data.tasks[i].title]);
        //         }
        //         else{
        //             assignedMembers.set(assigned[j],[res.data.tasks[i].title]);

        //         }
        //     }
        //     
        // }
      });

    // const dat=[]
    //     const obj={
    //         backgroundColor:[],
    //         data:[]
    //     }
    //     assignedMembers.forEach((value,key)=>{
    //         this.pieData.labels.push(key);
    //         const color='#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    //         obj.backgroundColor.push(color);
    //         obj.data.push(value.length);

    //         // 
    //         // const data = this.pieData.datasets[0].data;
    //         // 
    //         // this.pieData.datasets[0].data.push(1)
    //         // dat.push(value.length)
    //         
    //     })
    //     
    //     this.pieData.datasets[0]=obj
    //     
    //     // for(var i=0;i<)
    //     // this.pieData.datasets[0].data = [...this.pieData.datasets[0].data,...dat]

    //   });

    //   axios.post("https://managd-backend-server.onrender.com/getTasksForOrganisation",{
    //     id:localStorage.getItem('id')
    //   }).then((res)=>{
    //     const assignedMembers = new Map();
    //     for(let i = 0; i <res.data.tasks.length;i++){
    //         var task = res.data.tasks[i];
    //         var assigned = task.assignees;
    //         for(let j=0;j<assigned.length;j++){
    //             if(assignedMembers.get(assigned[j])){
    //                 const current = assignedMembers.get(assigned[j]);
    //                 // 
    //                 assignedMembers.set(assigned[j],[...current,res.data.tasks[i].title]);
    //             }
    //             else{
    //                 assignedMembers.set(assigned[j],[res.data.tasks[i].title]);

    //             }
    //         }
    //     }
    //     // const dat=[]
    //     const obj={
    //         backgroundColor:[],
    //         data:[]
    //     }
    //     assignedMembers.forEach((value,key)=>{
    //         this.pieData.labels.push(key);
    //         const color='#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    //         obj.backgroundColor.push(color);
    //         obj.data.push(value.length);
    //         // 
    //         // const data = this.pieData.datasets[0].data;
    //         // 
    //         // this.pieData.datasets[0].data.push(1)
    //         // dat.push(value.length)
    //         
    //     })

    //     this.pieData.datasets[0]=obj
    //     // for(var i=0;i<)
    //     // this.pieData.datasets[0].data = [...this.pieData.datasets[0].data,...dat]

    //     
    //   })

    axios
      .post("https://managd-backend-server.onrender.com/getAllMembers", {
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email")
      })
      .then((res) => {
        
        this.membersList = res.data.members;
        // 
      });

    axios
      .post("https://managd-backend-server.onrender.com/getOrganisationDetails", {
        unsanitisedId: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email")
      })
      .then((res) => {
        this.organisation = res.data;
        
      });

    

    axios
      .post("https://managd-backend-server.onrender.com/getAllMembers", {
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email")
      })
      .then((res) => {
        this.currentMembers = res.data.members;
        
      });
    
    axios
      .post("https://managd-backend-server.onrender.com/getNotificationsForOrganisation", {
        id: localStorage.getItem("id"),
        token: token,
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        this.notifications = res.data.notifications;
        
      })
      .catch(() => {
        alert("Session Expired! Please relogin again.");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("phoneNo");
        // localStorage.removeItem("email")
        this.$router.push({ name: "logIn" });
      });
  },
};
</script>
