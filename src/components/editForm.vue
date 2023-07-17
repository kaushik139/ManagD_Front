<template>

    <div class="container">
        <form @submit="changed">
            <div class="row">
                <h4>Edit Profile</h4>
                <div class="input-group input-group-icon"><input type="text" :value="organisation.name" />
                    <div class="input-icon"><i class="fa fa-user"></i></div>
                </div>
                <div class="input-group input-group-icon"><input type="email" placeholder="Email Adress" :value="organisation.email"/>
                    <div class="input-icon"><i class="fa fa-envelope"></i></div>
                </div>
                <div class="input-group input-group-icon"><input type="tel" placeholder="Telephone" :value="organisation.phoneNo"/>
                    <div class="input-icon"><i class="fa-solid fa-phone"></i></div>
                </div>
                <div class="input-group input-group-icon"><input type="text" placeholder="Location" :value="organisation.location"/>
                    <div class="input-icon"><i class="fa-solid fa-location-dot"></i></div>
                </div>
                <div class="input-group input-group-icon"><input type="password" placeholder="Password" />
                    <div class="input-icon"><i class="fa fa-key"></i></div>
                </div>
                <button type="submit">Submit</button>

            </div>
        </form>

    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "editForm",
    data() {
        return {
            name:'',
            email:'',
            phoneNo:'',
            location:'',
            organisation: {},
            currentMembers:[],
            notifications:[],
            editedDetails:{
                name:'',
                email:'',
                phoneNo:0,
                location:''
            }
        };
    },
    methods: {
        async changed(e){
            console.log(this.editedDetails.name)
            this.editedDetails = {
                name:e.target[0].value,
                email:e.target[1].value,
                phoneNo:e.target[2].value,
                location:e.target[3].value,
            }
            console.log(this.editedDetails)
            axios.patch("http://localhost:3000/editOrganisationDetails",{
                unsanitisedId:localStorage.getItem("id"),
                editDetails:this.editedDetails
            })
            .then(()=>{
                axios.post("http://localhost:3000/getOrganisationDetails",{
            unsanitisedId:localStorage.getItem("id")
        })
        .then((res)=>{
            this.organisation=res.data;
            this.editedDetails = {
                name:this.organisation.name,
                email:this.organisation.email,
                location:this.organisation.location,
                phoneNo:this.organisation.phoneNo
            }
            console.log(this.organisation._id)
        })  
            })
        }
        
    },
    mounted(){
        let token = localStorage.getItem("token");
        if (!token) {
            this.$router.push({ name: "signUp" });
        }
        axios.post("http://localhost:3000/getOrganisationDetails",{
            unsanitisedId:localStorage.getItem("id")
        })
        .then((res)=>{
            this.organisation=res.data;
            this.editedDetails = {
                name:this.organisation.name,
                email:this.organisation.email,
                location:this.organisation.location,
                phoneNo:this.organisation.phoneNo
            }
            console.log(this.organisation._id)
        })  

        }
}

</script>
<style scoped>

h4 {
  color: #504DFF;
}
input,
select option,
select {
  padding: 1em;
  line-height: 1.4;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
input:focus {
  outline: 0;
  border-color: #504DFF;
}
input:focus + .input-icon i {
  color: #504DFF;
}
input:focus + .input-icon:after {
  border-right-color: #504DFF;
}
/*  */

.input-group {
  margin-bottom: 1em;
  zoom: 1;
}
.input-group:before,
.input-group:after {
  content: "";
  display: table;
}
.input-group:after {
  clear: both;
}
.input-group-icon {
  position: relative;
}
.input-group-icon input {
  padding-left: 4.4em;
}
.input-group-icon .input-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 3.4em;
  height: 3.4em;
  line-height: 3.4em;
  text-align: center;
  pointer-events: none;
}
.input-group-icon .input-icon:after {
  position: absolute;
  top: 0.6em;
  bottom: 0.6em;
  left: 3.4em;
  display: block;
  border-right: 1px solid #e5e5e5;
  content: "";
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.input-group-icon .input-icon i {
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.container {
  /* max-width: 38em; */
  padding: 1em 3em 2em 3em;
  margin: 0em auto;
}
.row {
  zoom: 1;
}
.row:before,
.row:after {
  content: "";
  display: table;
}
.row:after {
  clear: both;
}
.col-half {
  padding-right: 10px;
  float: left;
  width: 50%;
}
.col-half:last-of-type {
  padding-right: 0;
}
.col-third {
  padding-right: 10px;
  float: left;
  width: 33.33333333%;
}
.col-third:last-of-type {
  padding-right: 0;
}
@media only screen and (max-width: 540px) {
  .col-half {
    width: 100%;
    padding-right: 0;
  }
}

</style>