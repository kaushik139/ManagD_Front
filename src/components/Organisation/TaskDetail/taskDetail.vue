<template>
    <div class="dashboard-section">
      <div class="sections">
        <div class="left-col">
          <LeftCol></LeftCol>
        </div>
  
        <div class="right-col">
          <div class="header" style="width: 100%">
            Managd - Organisation Task Details
          </div>
          <div>
            <MobileNavbar :name="organisation.name"></MobileNavbar>
          </div>
          <div>
            <div>
              <Header :name="organisation.name"></Header>
            </div>
            <div class="view-area">
              <div class="task-card">
                <div style="position: relative">
                  <div class="ribbon" :style="{ color: timeColor }">
                    {{ timeText }}
                  </div>
                </div>
  
                <form @submit.prevent="editSubmit">
                  <div class="edit-form">
                    <div>
                      <label for="title">Title</label>
                      <input type="text" id="title" :value="task.title" />
                    </div>
  
                    <div>
                      <label for="description">Description</label>
                      <input
                        type="text"
                        id="description"
                        :value="task.description"
                      />
                    </div>
  
                    <div>
                      <label for="progress">Progress</label>
                      <input
                        type="number"
                        id="progress"
                        :value="task.progress"
                        min="0"
                        max="99"
                      />
                    </div>
  
                    <div>
                      <label for="startDate">Start Date</label>
                      <input
                        type="date"
                        id="startDate"
                        :value="new Date(task.startDate)"
                      />
                    </div>
  
                    <div>
                      <label for="endDate">End Date</label>
                      <input
                        type="date"
                        id="endDate"
                        :value="new Date(task.endDate)"
                      />
                    </div>
  
                    <div>
                      <div
                        class="list-head"
                        style="margin-top: 0; width: fit-content"
                      >
                        Assigned Members
                        <i
                          @click="displayList"
                          class="arrow fa-solid fa-angle-up"
                        ></i>
                      </div>
                      <ul class="ul-assignees">
                        <li
                          class="list-item-assignees"
                          v-for="(member, index) in this.task.assignees"
                          :key="index"
                        >
                          <div style="display: flex">
                            {{ member
                            }}<i
                              class="fa-solid fa-trash"
                              @click="trashed(index)"
                            ></i>
                          </div>
                        </li>
                      </ul>
                    </div>
  
                    <div>
                      <label for="add-member">Assign Member</label>
                      <select name="" id="add-member">
                        <option value="">Select</option>
                        <option v-for="(member, index) in members" :key="index">
                          {{ member }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <button type="submit">Update</button>
                </form>
  
                <button @click="checkPR">{{!githubPrs?'Check PRs for this issue':'Close'}}</button>
                
                <!-- <p>Assigned to: {{ issue.assignee?.login }}</p> -->
                <div>
                  <select v-if="githubPrs" :key="selecterUpdate" @change="selectPR($event)" >
                    <option v-for="(pr, index) in prs" :key="pr.id" :value="index">
                      {{ pr.title }}
                    </option>
                  </select>
  
                </div>
                <div v-if="selectedPR.user" :key="selectorUpdate">
                  <h4>PR Details</h4>
                  <p>By: {{ selectedPR.user.login }}</p>
                  <p>At: {{ new Date(selectedPR.updated_at) }}</p>
                  <a href="{{ selectedPR.html_url }}">link to PR</a>
                </div>
                <button @click="showIframe">Schedule Meet</button>
              </div>
              <div style="display: none">
                <MeetScheduler></MeetScheduler>
              </div>
              <div class="dg" v-if="iframeDisplay">
                <iframe src="https://calendly.com/chrysaor07"> </iframe>
                <div @click="closeIframe">CLOSE</div>
                <!-- <a href='#' onclick='this.parentNode.parentNode.removeChild(this.parentNode)'>Close</a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <style scoped>
  
  button, input[type="submit"], input[type="reset"] {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    background-color: #504dff;
    color: white;
    padding: 8px 15px 8px 15px;
    border-radius: 5px;
    display: block;
    margin:0 auto;
    margin-top:10px;
  }
  .ul-assignees {
    list-style-type: none;
    display: none;
    flex-direction: column;
    padding: 0;
    margin: 0;
    line-height: 1;
  }
  
  .list-head {
  }
  
  .list-head:hover .ul-assignees {
    display: block;
    color: red;
  }
  .edit-form {
    display: flex;
    flex-wrap: wrap;
  }
  
  .edit-form div {
    width: 40%;
    margin: 20px;
  }
  .ribbon {
    position: absolute;
    margin-top: 30px;
    font-weight: 900;
    margin-left: -20px;
    transform: rotate(-60deg);
  }
  
  .dg {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* margin-top:100px; */
    top: 70px;
    /* width: 100%; */
    /* position: absolute; */
    /* background-color: red; */
    position: absolute;
  }
  
  iframe {
    height: 400px;
    width: 600px;
  }
  .task-card {
    /* display: none; */
    background-color: white;
    min-height: 50%;
    width: 70%;
    /* margin-top: -10%; */
    background-color: white;
    box-shadow: 0px 0px 7px gray;
    padding: 20px;
    border-radius: 10px;
    display: relative;
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
    font-family: "Inknut Antiqua", serif;
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
    flex-direction: column;
    position: relative;
    /* height: 84.9%; */
    /* min-height: 75vh; */
    /* background-color: blue; */
    /* gap:20px; */
  
    margin-top: 30px;
    justify-content: center;
    align-items: center;
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
    font-family: "Inknut Antiqua", serif;
  }
  .button-menu:hover {
    background-color: antiquewhite;
  }
  
  .button-menu:focus {
  }
  </style>
  <script>
  import axios from "axios";
  import LeftCol from "../LeftCol/leftCol.vue";
  import MobileNavbar from "../Header/mobileNavbar.vue";
  import Header from "../Header/header.vue";
  import MeetScheduler from "../../meetScheduler.vue";
  export default {
    name: "DashBoard",
    components: {
      LeftCol,
      MobileNavbar,
      Header,
      MeetScheduler,
    },
    data() {
      return {
        name: "",
        mail: "",
        pass: "",
        phone: "",
        currentMember: {},
        organisation: {},
        attributes: [],
        menuCollapsed: false,
        task: {},
        issue: {},
        iframeDisplay: false,
        timeColor: "green",
        timeText: "Complete",
        boxShadow: " 0px 0px 10px blue",
        prs: [],
        selectorUpdate: 0,
        selectedPR: {},
        displayLst: false,
        members: [],
        githubPrs:false
      };
    },
  
    methods: {
      trashed(index) {
        this.task.assignees.splice(index, 1);
        console.log(this.task);
      },
      displayList() {
        let listHead =
          document.getElementsByClassName("list-head")[0].firstElementChild;
        let list = document.getElementsByClassName("ul-assignees")[0];
        if (!this.displayLst) {
          listHead.classList.add("fa-angle-down");
          listHead.classList.remove("fa-angle-up");
          list.style.display = "flex";
        } else {
          listHead.classList.remove("fa-angle-down");
          listHead.classList.add("fa-angle-up");
          list.style.display = "none";
        }
        this.displayLst = !this.displayLst;
      },
      async checkPR() {
        this.githubPrs=!this.githubPrs
        axios
          .post("http://localhost:3000/getGitHubPrs", {
            username: this.task.githubUsername,
            repo: this.task.githubRepo,
            number: this.task.githubIssue,
            email: localStorage.getItem("email"),
            token: localStorage.getItem("token"),
          })
          .then((res) => {
            this.prs = res.data;
            this.selectorUpdate++;
            // console.log(res.data.json())
          });
      },
      async editSubmit(e) {
        const toEdit = {
          title: e.target[0].value,
          description: e.target[1].value,
          progress: e.target[2].value,
          startDate: e.target[3].value,
          endDate: e.target[4].value,
          assignees: this.task.assignees,
        };
        if (e.target[5].value) {
          toEdit.assignees.push(e.target[5].value);
        }
        console.log(toEdit);
        axios.post("http://localhost:3000/editTask", {
          id: this.$route.params.id,
          email: localStorage.getItem("email"),
          token: localStorage.getItem("token"),
          toEdit,
        });
      },
      async selectPR(event) {
        console.log(event.target.value);
        this.selectedPR = this.prs[event.target.value];
      },
      showIframe() {
        this.iframeDisplay = true;
      },
      closeIframe() {
        this.iframeDisplay = false;
      },
      handleFocusOut() {
        console.log("hererererer");
      },
      profile() {
        this.$router.push({ name: "profile" });
      },
  
      searchResults(event) {
        console.log(event.value);
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
      member() {
        this.$router.push({ name: "addMembers" });
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
  
      const taskId = this.$route.params.id;
      axios
        .post("http://localhost:3000/getTask", {
          id: taskId,
          email: localStorage.getItem("email"),
          token: localStorage.getItem("token"),
        })
        .then((res) => {
          this.task = res.data.task;
          if (this.task.status === "Ongoing") {
            if (new Date(this.task.endDate).getTime() > new Date().getTime) {
              this.timeColor = "red";
              this.timeText = "Delay";
              this.boxShadow = "0px 0px 10px red";
            } else {
              this.timeColor = "blue";
              this.timeText = "Ongoing";
              this.boxShadow = "0px 0px 10px blue";
            }
          } else if (this.task.status === "Halted") {
            this.timeColor = "yellow";
            this.timeText = "Halted";
            this.boxShadow = "0px 0px 10px yellow";
          } else if (this.task.status === "Completed") {
            this.timeColor = "green";
            this.timeText = "Completed";
            this.boxShadow = "0px 0px 10px green";
          }
          console.log(this.task);
  
  
          axios
            .post("http://localhost:3000/getAllMembers", {
              id: localStorage.getItem("orgId"),
              email: localStorage.getItem("email"),
              token: localStorage.getItem("token"),
            })
            .then((res) => {
              for(let i=0;i<res.data.members.length;i++){
                if(!this.task.assignees.includes(res.data.members[i].email)){
                  this.members.push(res.data.members[i].email);
                }
              }
            });
  
  
  
          axios
            .post("http://localhost:3000/getGitHubIssueDetails", {
              username: this.task.githubUsername,
              repo: this.task.githubRepo,
              number: this.task.githubIssue,
              token: localStorage.getItem("token"),
              email: localStorage.getItem("email"),
            })
            .then((res) => {
              this.issue = res.data;
              console.log(this.issue);
            });
  
  
        });
  
    },
  };
  </script>
  