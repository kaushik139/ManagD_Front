<template>
  <div id="main">
    <h2>Member Log In</h2>
    <!-- E-mail -->
    <input
      type="text"
      v-model="mail"
      placeholder="Enter E-mail"
      class="text"
    /><br />
    <!-- Password -->
    <input
      v-if="this.isPasswordVisible == false"
      type="password"
      v-model="pass"
      placeholder="Enter Password"
      class="text"
    />
    <input
      v-if="this.isPasswordVisible == true"
      type="text"
      v-model="pass"
      placeholder="Enter Password"
      class="text"
    />

    <i v-if="this.isPasswordVisible == false" 
    @click="this.isPasswordVisible = !this.isPasswordVisible" id="eyeOpen"
      class="fa-solid fa-eye" style="color: #504dff"></i>
    <i v-if="this.isPasswordVisible == true" 
    @click="this.isPasswordVisible = !this.isPasswordVisible" id="eyeClose"
    class="fa-solid fa-eye-slash" style="color: #504dff;"></i>
    <br />
    <br />
    
    <button id="b1" type="submit" v-on:click="login">Log In</button>
      <p style="font-size: 14px;">Forgot Password? <span id="forgot" @click="forgot">Click here</span></p>
    <p style="font-size: 14px;">
      Not a user? <a href="#" @click="signup">Sign Up</a>

    </p>
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
      userType: "user",
      isPasswordVisible: false,
    };
  },

  methods: {
    forgot(){
      this.$router.push({name:"resetPasswordMember"})
    },
    signup() {
      this.$router.push({ name: "memberSignup" });
    },
    login() {
      if (this.mail === "" || this.pass === "") {
        alert(`Please fill all the fields.`);
      } else {
        axios
          .post("https://managd-backend-server.onrender.com/memberLogin", {
            email: this.mail,
            password: this.pass,
          })
          .then((response) => {
            if (response.status === 200) {
              alert("Login Successful");
              localStorage.setItem("email", response.data.email);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("id", response.data.id);
              localStorage.setItem("name", response.data.name);
              localStorage.setItem("phoneNo", response.data.phoneNo);
              
              if(response.data.orgId == 'null'){
                
              localStorage.setItem("orgId", 1);
            }
            else{
              localStorage.setItem("orgId", response.data.orgId);
            }
              this.$router.push({ name: "memberDashboard" });
            } else {
              alert(response.data);
            }
          })
          .catch(() => {
            alert("ERROR");
            
          });
      }
    },
  },
  mounted() {
    // let user = localStorage.getItem("user-mail");
    // if (!user) {
    //   this.$router.push({ name: "memberLogin" });
    // }
  },
};
</script>

<style scoped>
#forgot{
  color:blue;
  cursor: pointer;

}
#forgot:hover{
  color:#504dff;
  text-decoration: underline;
}
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
</style>