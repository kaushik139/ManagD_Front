<template>
  <div id="main">
    <h2>Member Sign Up</h2>
    <!-- Name -->
    <input
      type="text"
      v-model="name"
      placeholder="Enter Name"
      class="text"
      required
    /><br />
    <!-- E-mail -->
    <input
      type="text"
      v-model="mail"
      placeholder="Enter E-mail"
      class="text"
      required
    /><br />
    <!-- phone -->
    <input
      type="tel"
      v-model="phone"
      placeholder="Enter Phone No"
      required
      class="text"
      pattern="[6-9]{1}[0-9]{9}"
    /><br />
    <!-- Password 1 -->
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
    <!-- Password 2 -->
    <input v-if="this.isPasswordVisible2 == false"
      type="password"
      v-model="pass2"
      placeholder="Re-enter Password"
      required
      class="text"/>
      <input 
      v-if="this.isPasswordVisible2 == true"
      type="test"
      v-model="pass2"
      placeholder="Re-enter Password"
      required
      class="text"/>
      <i v-if="this.isPasswordVisible2 == false" 
    @click="this.isPasswordVisible2 = !this.isPasswordVisible2" id="eyeOpen"
      class="fa-solid fa-eye" style="color: #504dff;"></i>
    <i v-if="this.isPasswordVisible2 == true" 
    @click="this.isPasswordVisible2 = !this.isPasswordVisible2" id="eyeClose"
    class="fa-solid fa-eye-slash" style="color: #504dff;"></i>
    <br>
    <h6 v-show="this.noMatchPassword == true" id="matcher">
      Passwords do not Match! Please re-enter Password!</h6>
    <br />
    <button id="b1" type="submit" v-on:click="signUp">Sign Up</button
    ><br /><br />Already a user? <a href="#" @click="login">Log In</a><br />
    For Organisations <a href="#" @click="oSignUp">Organisation SignUp</a>
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
      pass2: "",
      phone: "",
      isPasswordVisible: '',
      isPasswordVisible2: '',
      noMatchPassword: false,
    };
  },

  methods: {
    login() {
      this.$router.push({ name: "memberLogin" });
    },
    oSignUp(){
      this.$router.push({name: "signUp"})
    },
    signUp() {
      if (this.name && this.mail && this.pass && this.phone && 
      this.pass == this.pass2) {
        axios
          .post("http://localhost:3000/memberSignup", {
            email: this.mail,
            name: this.name,
            password: this.pass,
            phoneNo: this.phone,
          })
          .then((response) => {
            this.message = response.data;
            alert("Sign Up Successful! Welcome to ManagD");
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("name",response.data.name);
            localStorage.setItem("phoneNo",response.data.phoneNo);
            if(response.data.orgId == 'null'){
              localStorage.setItem("orgId", 1);
            }
            else{
              localStorage.setItem("orgId", response.data.orgId);
            }
            if (this.message != "E-mail already Exists.")
              this.$router.push({ name: "memberDashboard" });
          });
         } 
         else if(this.pass != this.pass2){
          this.noMatchPassword = true;
          this.pass2 = "";
         }
         else {
        alert("Please fill the required details");
      }
    },
  },
  mounted() {
  
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
  /* background: rgb(185, 203, 248); */
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
  align-self: center;
  position: relative;
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
#matcher{
  color: red;
  margin: 0px 0px -20px 0px;
}
</style>
