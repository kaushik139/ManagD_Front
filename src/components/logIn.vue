<template>
  <div id="main">
    <h2>Organisation Log In</h2>
    <!-- E-mail -->
    <input
      type="text"
      v-model="mail"
      placeholder="Enter E-mail"
      class="text"
    /><br />
 <!-- Password -->
 <input v-if="this.isPasswordVisible == false"
      type="password"
      v-model="pass"
      placeholder="Enter Password"
      required
      class="text"/>
      <input 
      v-if="this.isPasswordVisible == true"
      type="test"
      v-model="pass"
      placeholder="Enter Password"
      required
      class="text"/>
      <i v-if="this.isPasswordVisible == false" 
    @click="this.isPasswordVisible = !this.isPasswordVisible" id="eyeOpen"
      class="fa-solid fa-eye" style="color: #504dff"></i>
    <i v-if="this.isPasswordVisible == true" 
    @click="this.isPasswordVisible = !this.isPasswordVisible" id="eyeClose"
    class="fa-solid fa-eye-slash" style="color: #504dff;"></i>
    <br />
    <br />
    <button id="b1" type="submit" v-on:click="login">Log In</button
    ><br /><br />Not a user? <a href="#" @click="signup">Sign Up</a><br />
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
      isPasswordVisible: false,
    };
  },

  methods: {
    signup() {
      this.$router.push({ name: "signUp" });
    },
    login() {
      if (this.mail === "" || this.pass === "") {
        alert(`Please fill all the fields.`);
      } else {
        axios
          .post("http://localhost:3000/loginOrganisation", {
            email: this.mail,
            password: this.pass,
          })
          .then((response) => {
            // console.log(response.status);
            if (response.status === 200) {
              localStorage.setItem("email", response.data.email);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("id", response.data.id);
              localStorage.setItem("name", response.data.name);
              localStorage.setItem("phoneNo", response.data.phoneNo);
              alert("Login Successful!");
              this.$router.push({ name: "dashBoard" });
            } else {
              alert(response.data.message);
            }
          })
          .catch(() => {
            alert("No Organisation Found");
          });
      }
    },
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$router.push({ name: "homePage" });
    }
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgb(3, 66, 120);
}
a:hover {
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
#b1:hover {
  color: red;
}
.text {
  height: 40px;
  width: 250px;
  border-radius: 7px;
  border: solid 1px;
  margin: 10px;
}
#eyeOpen{
  margin: 24px 0px 0px -45px;
  z-index: 999;
  position:absolute;
}
#eyeClose{
  margin: 24px 0px 0px -45px;
  z-index: 999;
  position:absolute;
}
</style>
