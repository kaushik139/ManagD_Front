<template>


    <div id="main">
      <h2>ManagD - Organisation Sign Up</h2>
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
      <!-- Location -->
      <input
        type="address"
        v-model="location"
        class="text"
        required
        placeholder="Enter Location"
      />
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
      <button id="b1" type="submit" v-on:click="getOTP">Sign Up</button
      >
      
      <form @submit.prevent="signUp" v-if="!otpHide">
        <input type="text" placeholder="Enter OTP"/>
        <button type="submit">Submit</button>
      </form>
      
      
      <br /><br />Already Registered? <a href="#" @click="login">Log In</a><br />
      Not an Organisation?<a href="#" @click="mSignUp">Member SignUp</a>

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
      phone: "",
      location: "",
      isPasswordVisible: false,
      isPasswordVisible2: false,
      noMatchPassword: false,
      otpHide:true
    };
  },

  methods: {
    // Redirect to login screen
    login() {
      this.$router.push({ name: "logIn" });
    },
    mSignUp() {
      this.$router.push({ name: "memberSignup" });
    },
    getOTP(){
      axios.post("http://localhost:3000/sendOTP",{email:this.mail}).then(()=>{
        this.otpHide=false;
      })
    },
    signUp(e) {
      console.log("E",e)
      // If all details are provided, then post the request to the server
      if (this.name && this.mail && this.pass && this.location && this.phone
      && this.pass == this.pass2) {
        axios
          .post("http://localhost:3000/addOrganisation", {
            email: this.mail,
            name: this.name,
            password: this.pass,
            phoneNo: this.phone,
            location: this.location,
            receivedOtp:e.target[0].value
          })
          .then((response) => {
            this.message = response.data;
            if(response.data.message==="401"){
              alert("Invalid OTP")
            }else{

              console.log(response)
              
                          if(response.data.message === 'Organisation already exists'){
alert("Email exists")
                            this.$router.push({ name: "login" });
                          }
              alert('Sign Up Successful! Welcome to ManagD!');
              localStorage.setItem('id',response.data.id);
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('email',response.data.email);
              localStorage.setItem('name',this.name);
              localStorage.setItem('phoneNo',this.phone);
              this.$router.push({"name":"dashboard"})
            }
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
    let token = localStorage.getItem("token"); //check if already logged in
    if (token) {
      this.$router.push({ name: "dashBoard" });
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