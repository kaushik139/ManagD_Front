<template>
  <!-- <dragBoardHead/> -->
  <div id="container">
    <div class="centered" v-if="taskDialog">
      <!-- <button>X</button> -->
      <form class="form" @submit.prevent="submitForm">
        <div class="title">Add Task</div>
        <!-- <div class="subtitle">Let's create your account!</div> -->
        <div class="input-container ic1">
          <input id="firstname" class="input" type="text" placeholder=" " />
          <div class="cut cut-title"></div>
          <label for="firstname" class="placeholder">Title</label>
        </div>
        <div class="input-container ic1">
          <textarea
            id="firstname"
            class="input"
            type="text-area"
            rows="4"
            cols="50"
            placeholder=" "
          />
          <div class="cut"></div>
          <label for="firstname" class="placeholder">Description</label>
        </div>
        <div class="input-container ic1">
          <input id="firstname" class="input" type="text" placeholder=" " />
          <div class="cut cut-title" style="width: 55px"></div>
          <label for="firstname" class="placeholder">GitHub</label>
        </div>
        <div class="input-container ic2">
          <input id="lastname" class="input" type="date" placeholder=" " />
          <div class="cut"></div>
          <label for="lastname" class="placeholder">Start Date</label>
        </div>
        <div class="input-container ic2">
          <input id="lastname" class="input" type="date" placeholder=" " />
          <div class="cut"></div>
          <label for="lastname" class="placeholder">End Date</label>
        </div>
        <div class="input-container ic2">
          <select
            id="lastname"
            class="input"
            type="text"
            placeholder=" "
            @change="selectMember"
          >
            <option>Select</option>

            <option v-for="(member, index) in organisationMembers" :key="index">
              {{ member.email }}
            </option>
          </select>
          <div class="cut cut-members"></div>
          <label for="lastname" class="placeholder">Assigned Members</label>
        </div>
        <div
          class="avatar-row"
          style="color: black; max-height: 30px; overflow-y: auto"
        >
          <span class="avatar" v-for="(x, index) in addedMembers" :key="index"
            >{{ x }},</span
          >
        </div>
        <button type="submit" class="submit">Submit</button>
        <button @click="close">Close</button>
      </form>
    </div>
    <div
      class="box"
      @drop="onDrop($event, 1)"
      @dragover.prevent
      @dragenter.prevent
    >
      <h2>On Going</h2>
      <div
        v-for="(card, index) in listOne"
        :key="card._id"
        class="card"
        draggable="true"
        @dragstart="startDrag($event, index, card._id)"
      >
        <div class="card-text">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <!-- <progress :value="card.progress" max="100" data-label="10%">1%</progress> -->
          <div>
            <i class="fa-brands fa-github"></i>: <span>{{ card.github }}</span>
          </div>
          <div class="days">
            <span>{{ card.startDate.slice(0, 10).replace(/-/g, "/") }}</span>
            to
            <span>{{ card.endDate.slice(0, 10).replace(/-/g, "/") }}</span>
          </div>

          <p v-if="card.extension">
            {{ card.extension }}
          </p>
          <p style="margin-top: 10px">Created By: ADMIN</p>
          <div>
            Assigned to:
            <div style="margin-top: 10px">
              <p
                class="assignee-icon"
                v-for="(assigneed, index) in card.assignees"
                :key="index"
              >
                {{ assigneed[0] }}
              </p>
            </div>
          </div>
        </div>
        <!-- <br /> -->
      </div>

      <div class="card_Add" @click="AddTask(1)">
        <img src="../assets/plus.png" alt="plus" class="icon1" />
        <h4>Add Task</h4>
        <!-- <h5 v-if="message1" class="message1">Task Added Successfully!</h5> -->
        <!-- <h5 v-if="message5" class="message2">Please Fill all the Fields!</h5> -->
      </div>
      <!-- <div v-if="Show1" class="add">
        <input
          type="text"
          id="task_name"
          placeholder="Task Name"
          v-model="this.taskName1"
        />
        <textarea
          rows="3"
          id="task_description"
          placeholder="Task Description"
          v-model="this.taskDescription1"
        ></textarea>
        <br />
        <button type="submit" class="Button1" @click="confirm_task(1)">
          Submit
        </button>
        <button type="reset" class="Button1" @click="reset(1)">Reset</button>
        <button class="Button1" @click="cancel">Cancel</button>
      </div> -->
    </div>

    <div
      class="box"
      @drop="onDrop($event, 2)"
      @dragover.prevent
      @dragenter.prevent
    >
      <h2>On Going</h2>
      <div
        v-for="(card, index) in listTwo"
        :key="card._id"
        class="card"
        draggable="true"
        @dragstart="startDrag($event, index, card._id)"
      >
        <div class="card-text">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <!-- <progress :value="card.progress" max="100" data-label="10%">1%</progress> -->
          <div>
            <i class="fa-brands fa-github"></i>: <span>{{ card.github }}</span>
          </div>
          <div class="days">
            <span>{{ card.startDate.slice(0, 10).replace(/-/g, "/") }}</span>
            to
            <span>{{ card.endDate.slice(0, 10).replace(/-/g, "/") }}</span>
          </div>

          <p v-if="card.extension">
            {{ card.extension }}
          </p>
          <p style="margin-top: 10px">Created By: ADMIN</p>
          <div>
            Assigned to:
            <div style="margin-top: 10px">
              <p
                class="assignee-icon"
                v-for="(assigneed, index) in card.assignees"
                :key="index"
              >
                {{ assigneed[0] }}
              </p>
            </div>
          </div>
        </div>
        <!-- <br /> -->
      </div>

      <div class="card_Add" @click="AddTask(1)">
        <img src="../assets/plus.png" alt="plus" class="icon1" />
        <h4>Add Task</h4>
        <!-- <h5 v-if="message1" class="message1">Task Added Successfully!</h5> -->
        <!-- <h5 v-if="message5" class="message2">Please Fill all the Fields!</h5> -->
      </div>
      <!-- <div v-if="Show1" class="add">
        <input
          type="text"
          id="task_name"
          placeholder="Task Name"
          v-model="this.taskName1"
        />
        <textarea
          rows="3"
          id="task_description"
          placeholder="Task Description"
          v-model="this.taskDescription1"
        ></textarea>
        <br />
        <button type="submit" class="Button1" @click="confirm_task(1)">
          Submit
        </button>
        <button type="reset" class="Button1" @click="reset(1)">Reset</button>
        <button class="Button1" @click="cancel">Cancel</button>
      </div> -->
    </div>

    <div
      class="box"
      @drop="onDrop($event, 3)"
      @dragover.prevent
      @dragenter.prevent
    >
      <h2>On Going</h2>
      <div
        v-for="(card, index) in listThree"
        :key="card._id"
        class="card"
        draggable="true"
        @dragstart="startDrag($event, index, card._id)"
      >
        <div class="card-text">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <!-- <progress :value="card.progress" max="100" data-label="10%">1%</progress> -->
          <div>
            <i class="fa-brands fa-github"></i>: <span>{{ card.github }}</span>
          </div>
          <div class="days">
            <span>{{ card.startDate.slice(0, 10).replace(/-/g, "/") }}</span>
            to
            <span>{{ card.endDate.slice(0, 10).replace(/-/g, "/") }}</span>
          </div>

          <p v-if="card.extension">
            {{ card.extension }}
          </p>
          <p style="margin-top: 10px">Created By: ADMIN</p>
          <div>
            Assigned to:
            <div style="margin-top: 10px">
              <p
                class="assignee-icon"
                v-for="(assigneed, index) in card.assignees"
                :key="index"
              >
                {{ assigneed[0] }}
              </p>
            </div>
          </div>
        </div>
        <!-- <br /> -->
      </div>

      <div class="card_Add" @click="AddTask(1)">
        <img src="../assets/plus.png" alt="plus" class="icon1" />
        <h4>Add Task</h4>
      </div>
      <!-- <div v-if="Show1" class="add">
        <input
          type="text"
          id="task_name"
          placeholder="Task Name"
          v-model="this.taskName1"
        />
        <textarea
          rows="3"
          id="task_description"
          placeholder="Task Description"
          v-model="this.taskDescription1"
        ></textarea>
        <br />
        <button type="submit" class="Button1" @click="confirm_task(1)">
          Submit
        </button>
        <button type="reset" class="Button1" @click="reset(1)">Reset</button>
        <button class="Button1" @click="cancel">Cancel</button>
      </div> -->
    </div>

    <!-- <div
      class="box"
      @drop="onDrop($event, 4)"
      @dragover.prevent
      @dragenter.prevent
    >
      <h2>Box 4</h2>
      <div
        v-for="card in listFour"
        :key="card.id"
        class="card"
        draggable="true"
        @dragstart="startDrag($event, card.id)"
      >
        <h3>{{ card.name }}</h3>
        <br />
        {{ card.description }}
      </div>

      <div class="card_Add" @click="AddTask(4)">
        <img src="../assets/plus.png" alt="plus" class="icon1">
        <h4>Add Task</h4>
        <h5 v-if="message4" class="message1">Task Added Successfully!</h5>
        <h5 v-if="message8" class="message2">Please Fill all the Fields!</h5>
      </div>
      <div v-if="Show4" class="add">
        <input
          type="text"
          id="task_name"
          placeholder="Task Name"
          v-model="this.taskName4"
        />
        <textarea
          rows="3"
          id="task_description"
          placeholder="Task Description"
          v-model="this.taskDescription4"
        ></textarea>
        <br />
        <button type="submit" class="Button1" @click="confirm_task(4)">
          Submit
        </button>
        <button type="reset" class="Button1" @click="reset(4)">Reset</button>
        <button class="Button1" @click="cancel">Cancel</button>
      </div>
    </div> -->
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
// import dragBoardHead from './dragBoardHead.vue';

export default {
  name: "dragThree",
  components: {
    // dragBoardHead,
  },
  props: {},
  data() {
    return {
      Show1: false,
      Show2: false,
      Show3: false,
      Show4: false,
      message1: false,
      message2: false,
      message3: false,
      message4: false,
      message5: false,
      message6: false,
      message7: false,
      message8: false,
      taskName1: "",
      taskDescription1: "",
      taskName2: "",
      taskDescription2: "",
      taskName3: "",
      taskDescription3: "",
      taskName4: "",
      taskDescription4: "",
      boxNo: "",
      cardID: "",
      id: "",
      list: [],
      box: ref([]),
      dragOptions: {
        animation: 400,
        group: "box1",
        handle: ".card",
      },
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      assignedMembers: [],
      organisationMembers: [],
      addedMembers: [],
      taskDialog: false,
    };
  },
  methods: {
    close() {
      this.taskDialog = false;
    },
    selectMember(e) {
      if (e.target.value === "Select") return;
      this.addedMembers.push(e.target.value);
      this.organisationMembers = this.organisationMembers.filter((x) => {
        // 
        return x.email !== e.target.value;
      });

      // 

      // this.organisationMembers.splice(1)
    },

    submitForm(e) {
      axios
        .post("https://managd-backend-server.onrender.com/addTask", {
          title: e.target[0].value,
          description: e.target[1].value,
          githubUsername: e.target[2].value,
          githubRepo: e.target[3].value,
          startDate: e.target[4].value,
          endDate: e.target[5].value,
          assignees: this.addedMembers,
          orgId: localStorage.getItem("orgId"),
          createdBy: localStorage.getItem("id"),
          status: "Ongoing",
          progress: 0,
        })
        .then((res) => {
          alert(res);
          this.taskDialog = false;
        });
    },
    Test() {
      // 
    },

    AddTask(list) {
      this.taskDialog = true;
      if (list === 1) {
        this.Show1 = true;
        this.Show2 = false;
        this.Show3 = false;
        this.Show4 = false;
      } else if (list === 2) {
        this.Show2 = true;
        this.Show1 = false;
        this.Show3 = false;
        this.Show4 = false;
      } else if (list === 3) {
        this.Show3 = true;
        this.Show2 = false;
        this.Show1 = false;
        this.Show4 = false;
      } else if (list === 4) {
        this.Show4 = true;
        this.Show2 = false;
        this.Show3 = false;
        this.Show1 = false;
      }
    },

    // confirm_task(list) {
    //   if (list === 1) {
    //     if (this.taskName1 && this.taskDescription1) {
    //       const newCard = {
    //         id: crypto.randomUUID(),
    //         name: this.taskName1,
    //         description: this.taskDescription1,
    //         list: 1,
    //       };
    //       this.box.push(newCard);
    //       this.Show1 = false;
    //       this.reset(1);
    //       this.message1 = true;
    //       setTimeout(() => {
    //         this.message1 = false;
    //       }, 1000);
    //     } else {
    //       this.message5 = true;
    //       setTimeout(() => {
    //         this.message5 = false;
    //       }, 3000);
    //     }
    //   } else if (list === 2) {
    //     if (this.taskName2 && this.taskDescription2) {
    //       const newCard = {
    //         id: crypto.randomUUID(),
    //         name: this.taskName2,
    //         description: this.taskDescription2,
    //         list: 2,
    //       };
    //       this.box.push(newCard);

    //       this.Show2 = false;
    //       this.reset(2);
    //       this.message2 = true;
    //       setTimeout(() => {
    //         this.message2 = false;
    //       }, 1000);
    //     } else {
    //       this.message6 = true;
    //       setTimeout(() => {
    //         this.message6 = false;
    //       }, 3000);
    //     }
    //   } else if (list === 3) {
    //     if (this.taskName3 && this.taskDescription3) {
    //       const newCard = {
    //         id: crypto.randomUUID(),
    //         name: this.taskName3,
    //         description: this.taskDescription3,
    //         list: 3,
    //       };
    //       this.box.push(newCard);

    //       this.Show3 = false;
    //       this.reset(3);
    //       this.message3 = true;
    //       setTimeout(() => {
    //         this.message3 = false;
    //       }, 1000);
    //     } else {
    //       this.message7 = true;
    //       setTimeout(() => {
    //         this.message7 = false;
    //       }, 3000);
    //     }
    //   } else if (list === 4) {
    //     if (this.taskName4 && this.taskDescription4) {
    //       const newCard = {
    //         id: crypto.randomUUID(),
    //         name: this.taskName4,
    //         description: this.taskDescription4,
    //         list: 4,
    //       };
    //       this.box.push(newCard);

    //       this.Show4 = false;
    //       this.reset(4);
    //       this.message4 = true;
    //       setTimeout(() => {
    //         this.message4 = false;
    //       }, 1000);
    //     } else {
    //       this.message8 = true;
    //       setTimeout(() => {
    //         this.message8 = false;
    //       }, 3000);
    //     }
    //   }
    // },

    // reset(list) {
    //   if (list === 1) {
    //     this.taskName1 = "";
    //     this.taskDescription1 = "";
    //   } else if (list === 2) {
    //     this.taskName2 = "";
    //     this.taskDescription2 = "";
    //   } else if (list === 3) {
    //     this.taskName3 = "";
    //     this.taskDescription3 = "";
    //   } else if (list === 4) {
    //     this.taskName4 = "";
    //     this.taskDescription4 = "";
    //   }
    // },

    // cancel() {
    //   this.Show1 = false;
    //   this.Show2 = false;
    //   this.Show3 = false;
    //   this.Show4 = false;
    //   this.taskName1 = "";
    //   this.taskDescription1 = "";
    //   this.taskName2 = "";
    //   this.taskDescription2 = "";
    //   this.taskName3 = "";
    //   this.taskDescription3 = "";
    //   this.taskName4 = "";
    //   this.taskDescription4 = "";
    // },

    startDrag(evt, card, status) {
      // 
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("cardID", status);
      // 
      // 
      // 
    },

    onDrop(evt, list) {
      // 
      const cardID = evt.dataTransfer.getData("cardID");
      // const card = this.box.find((card) => card.id === cardID);
      // card.status = list;
      // 
      const updatedStatus =
        list === 1 ? "Ongoing" : list === 2 ? "Halted" : "Completed";
      axios
        .post("https://managd-backend-server.onrender.com/editTask", {
          id: cardID,
          toEdit: {
            status: updatedStatus,
          },
        })
        .then(() => {
          this.$router.go();
          // 
        });
      // 

      // switch(list)
      // 
    },
  },

  mounted() {
    axios
      .post("https://managd-backend-server.onrender.com/getAllMembers", {
        id: localStorage.getItem("orgId"),
      })
      .then((res) => {
        this.organisationMembers = res.data.members;
        // 
      });

    axios
      .post("https://managd-backend-server.onrender.com/getMemberTasks", {
        id: localStorage.getItem("id"),
      })
      .then((res) => {
        this.box = res.data.taskList;
        // 
        // this.confirm_task(this.list)
      });
  },
  computed: {
    listOne() {
      return this.box
        .filter((item) => item.status === "Ongoing")
        .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    },
    listTwo() {
      return this.box.filter((item) => item.status === "Halted");
    },
    listThree() {
      return this.box.filter((item) => item.status === "Completed");
    },
    listFour() {
      return this.box.filter((item) => item.list === 4);
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #9ec5fe;
  border: 3px solid blue;
  /* border-radius: 7px; */
  min-height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 1;
  padding-bottom: 20px;
}

.assignee-root {
  display: flex;
  justify-content: center;
  align-self: center;
  flex-direction: row;
}

.assignee-icon {
  color: black;
  background-color: green;
  /* padding: 5px; */
  height: 20px;
  width: 20px !important;
  border-radius: 50%;
  /* margin:10px; */
  display: inline-block;
  margin: 2px;
}

.days {
  margin-top: 5px;
}

progress {
  height: 12px;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 70%;
  /* border-radius: 7px;  */
  /* width: 80%; */
  /* height: 22px; */
  /* margin-left: -11.5%; */
  /* box-shadow: 1px 1px 4px rgba( 0, 0, 0, 0.2 ); */
}
progress::-webkit-progress-bar {
  background-color: red;
  /* border-radius: 7px; */
}
progress::-webkit-progress-value {
  background-color: greenyellow;
  border-radius: 7px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  /* box-shadow: 1px 1px 5px 3px rgba( 255, 0, 0, 0.8 ); */
}
progress::-moz-progress-bar {
  /* style rules */
}
progress:before {
  content: attr(data-label);
  font-size: 0.8em;
  vertical-align: 0;

  /*Position text over the progress bar */
  position: absolute;
  left: 0;
  right: 0;
}
.card-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-text p {
  margin-top: -2px;
}
.avatar-row {
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  margin-top: 10px;
}

.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  width: 50%;
  height: auto;
  background-color: rgb(248, 249, 250);
  box-shadow: 0px 0px 8px gray;
}

.title {
  color: #000;
  font-family: sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 10px;
}

.subtitle {
  color: #000;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.input-container {
  min-height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 20px;
}

.ic2 {
  margin-top: 20px;
}

.input {
  background-color: rgb(207, 207, 207);
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: black;
  font-size: 14px;
  min-height: 50px;
  position: relative;
  outline: 0;
  padding: 2px 10px 0;
  width: 100%;
}

.cut {
  background-color: rgb(248, 249, 250);
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-members {
  width: 120px;
}

.cut-title {
  width: 40px;
}

.cut-short {
  width: 50px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.placeholder {
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #504dff;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  /* // outline: 0; */
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
}

#container {
  margin-top: 5%;
  justify-content: center;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  align-items: flex-start;
}
.box {
  border-radius: 7px;
  text-align: center;
  margin: 5px;
  background-color: #504dff !important;
  color: white;
}

.card_Add {
  background-color: #9ec5fe;
  border: 3px solid #504dff;
  border-top: none;
  border-radius: 7px;
  /* display: grid; */
  /* grid-template-columns: 30% 70%; */
  height: 40px;
  justify-content: left;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.card_Add:hover {
  cursor: pointer;
  background-color: #87b1f0;
}
.message1 {
  color: rgb(0, 26, 255);
}
.message2 {
  color: red;
}
.icon1 {
  height: 30px;
  width: 30px;
  margin: 8px 0px 0px 14px;
  padding-top: 0px;
}
h4 {
  padding: 0px;
  text-align: left;
  margin-top: 14px;
}
</style>
