<template>
    <div class="head">
      <div>
        <h1 class="first">Board</h1>
      </div>
      <div class="second">
        <img src="../assets/power.png" alt="Power" class="icon" />
        <img src="../assets/clock.png" alt="clock" class="icon" />
        <h4>{{ days }} days remaining</h4>
        <button id="blue">Complete sprint</button>
        <img src="../assets/more.png" alt="clock" class="icon" />
      </div>
    </div>
    <div class="head">
      <div class="first">
      <input type="search" placeholder="Search" id="search" />
      <img src="../assets/search.png" alt="search" id="search_icon" />
      <select name="Epic" class="drop">
        <option value="" disabled selected hidden>Epic</option>
        <option value="Option1">Option1</option>
        <option value="Option2">Option2</option>
        <option value="Option3">Option3</option>
        <option value="Option4">Option4</option>
      </select>
    </div>
    <div class="second">
        <h4>Group By</h4>
        <select name="Choices" class="drop">
        <option value="" disabled selected hidden>Choices</option>
        <option value="Option1">Option1</option>
        <option value="Option2">Option2</option>
        <option value="Option3">Option3</option>
        <option value="Option4">Option4</option>
      </select>

    </div>
    </div>
  </template>
  
  <script>
  // import HelloWorld from './components/HelloWorld.vue'
  
  export default {
    name: "dragBoardHead",
    data() {
      return {
        days: "X",
      };
    },
  };
  </script>
  
  <style scoped>
  .head {
    /* background: rgb(236, 140, 140); */
    margin: none;
    padding: 3px;
    display: grid;
    grid-template: 50px / 60% 40%;
  }
  .first {
    text-align: left;
    margin: 16px 0px 0px 15px;
  }
  .icon {
    height: 30px;
    width: 30px;
    margin: 19px 0px 0px 14px;
    padding-top: 0px;
  }
  .second {
    width: 100%;
    /* background-color: blue; */
    display: flex;
    justify-content: flex-end;
  }
  h4 {
    align-content: center;
    padding: 6px;
  }
  #blue {
    margin-top: 15px;
    background-color: rgb(24, 81, 238);
    border: none;
    border-radius: 3px;
    color: white;
  }
  #search {
    margin: 19px 0px 0px 14px;
    border-radius: 10px;
  }
  #search_icon{
    height: 30px;
    width: 30px;
    margin: 19px 0px -10px 14px;
    padding-top: 0px;
  }
  .drop{
    margin: 19px 0px 0px 14px;
    border-radius: 5px;
    height: 30px;
  }
  </style>
  