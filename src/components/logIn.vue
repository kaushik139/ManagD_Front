<template>
    <div id="main">
      <h2>Log In</h2>
      <!-- E-mail -->
      <input type="text" v-model="mail" placeholder="Enter E-mail" class="text" /><br>
      <!-- Password -->
      <input type="password" v-model="pass" placeholder="Enter Password" class="text" />
      <br />
      <br />
      <button id="b1" type="submit" v-on:click="login">Log In</button><br><br>Not a user?
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
        console.log('HERE')
        axios.post("http://localhost:3000/loginOrganisation", {
          email: this.mail,
          password: this.pass,
        })
        .then((response) => {
          console.log(response.status)
          if (response.status===200) {
            alert("Login Successful");
            console.log(response)
            localStorage.setItem("email",response.data.email);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("id",response.data.id);
            localStorage.setItem("name",response.data.name);
            localStorage.setItem("phoneNo",response.data.phoneNo);
            this.$router.push({ name: "dashBoard" });
          } else {
            console.log(response.status)
            alert(response.data);
          }
        })
        .catch(error => 
          {
            alert("ERROR");
            console.log(error)
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