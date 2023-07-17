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
    <!-- Location -->
    <input
      type="address"
      v-model="location"
      class="text"
      required
      placeholder="Enter Location"
    />
    <!-- Password -->
    <input
      type="password"
      v-model="pass"
      placeholder="Enter Password"
      required
      class="text"
    />
    <br />
    <br />
    <button id="b1" type="submit" v-on:click="signUp">Sign Up</button
    ><br /><br />Already a user? <a href="#" @click="login">Log In</a><br />
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
    };
  },

  methods: {
    login() {
      this.$router.push({ name: "memberLogin" });
    },
    signUp() {
      if (this.name && this.mail && this.pass && this.phone) {
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
            localStorage.setItem("orgId", response.data.orgId);
            if (this.message != "E-mail already Exists.")
              this.$router.push({ name: "login" });
          });
      } else {
        alert("Please fill the required details");
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("email");
    if (user) {
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
</style>
