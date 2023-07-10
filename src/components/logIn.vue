<template>
    <div id="main">
      <h2>Log In</h2>
      <!-- E-mail -->
      <input type="text" v-model="mail" placeholder="Enter E-mail" class="text" /><br>
      <!-- Password -->
      <input type="password" v-model="pass" placeholder="Enter Password" class="text" />
      <br />
      <br />
      <button id="b1" type="submit" v-on:click="logIn">Log In</button><br><br>Not a user?
      <a href="#" @click="signup">Sign Up</a><br />
    </div>
  </template>


  <script>
  import axios from "axios";
  export default {
    name: "SignUp",
    data() {
      return {
        name: "",
        mail: "",
        pass: "",
        phone:'',
        userType: "user",
      };
    },
  
    methods: {
      signup() {
        this.$router.push({ name: "signUp" });
      },
      login() {
      if(this.mail=== '' || this.pass === ''){
        alert(`Please fill all the fields.`)
      }
      else{
        axios.post("http://localhost:3300/verification", {
          email: this.mail,
          password: this.pass,
        })
        .then((response) => {
          if (response.data === "Valid user") {
            alert("Login Successful");
            localStorage.setItem("user-mail",this.mail);
            this.$router.push({ name: "homePage" });
          } else {
            alert(response.data);
          }
        })
        .catch(error => console.log(error));
        var reslt= "";
        axios
      .get(`http://localhost:3300/users/${this.mail}`)
      .then((response) => {
        console.log(response.data)
        reslt = response.data;
        console.log(reslt.role)
        localStorage.setItem('user-role',reslt.role)
      });
      }
    // const role = reslt.role;
    // localStorage.setItem("user-role", role);
    },
    },
    mounted() {
      let user = localStorage.getItem("user-mail");
      if (user) {
        this.$router.push({ name: "homePage" });
      }
    },
  };
  </script>
  
  <style scoped>
  a{
    text-decoration: none;
    color: rgb(3, 66, 120);
  }
  a:hover{
    color: red;
  }
  h3 {
    margin-bottom: 0px;
  }
  #main {
    border: solid 1.5px rgb(59, 59, 247);
    border-radius: 10px;
    padding: 15px;
    margin: auto;
    margin-top: 50px;
    max-width: 300px;
    max-height: 600px;
    /* background: rgb(185, 203, 248); */
  }
  #b1 {
    width: 150px;
    background: rgb(246, 247, 252);
    color: rgba(18, 1, 255, 0.991);
    border: none;
  }
  #b1:hover{
    color: red;
  }
  .text{
    height: 40px;
    width: 250px;
    border-radius: 7px;
    border: solid 1px ;
    margin: 10px;
  }
  </style>