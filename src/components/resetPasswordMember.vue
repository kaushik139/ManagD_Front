<template>
    <h1>Member Password Reset</h1>
        <p v-if="!otpSent">Forgot your password? Please enter your email to help you get started on the password reset process.</p>
    <p v-else>Please enter the OTP along with your password to set it.</p>
    <form @submit.prevent="submitReset">
        <input class="for-input" type="email" name="" id="" placeholder="Email">
        <br/>
        <button class=".for-button" type="submit">Confirm</button>
    </form>

    <form v-if="otpSent" @submit.prevent="submitPassword">
        <input class="for-input" type="text" placeholder="OTP"/>
        <br/>
        <input class="for-input" type="password" placeholder="password"/>
        <br/>
        <input class="for-input" type="password" placeholder="confirm password"/>
        <br/>
        <button class=".for-button" type="submit">Reset Password</button>
    </form>
    <footer class="for-footer">ManagD @{{ new Date().getFullYear() }}</footer>
</template>
<style>
.for-input{
    outline:none;
    border:none;
    border-radius: 10px;
    padding: 7px;
    box-shadow: 0px 0px 10px gray;
    width:20%;
    margin-bottom: 20px;
}
.for-button, .for-input[type="submit"], .for-input[type="reset"] {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    background-color: #504dff;
    border-radius: 15px;
    color:white;
    padding: 7px;
    padding-left:10px;
    padding-right: 10px;
}
.for-footer{
    position: fixed;
    bottom:0;
    text-align: center;
    width: 100%;
    font-family: "Nunito", sans-serif !important;
    font-size: 1.1rem;
    color:#504dff;
    font-weight: 800;
}
</style>
<script>
import axios from 'axios';


export default{
    name:"PasswordResetForOrg",
    data(){
        return {
            otpSent:false,
            email:""
        }
    },
    methods:{
        submitReset(e){
            axios.post("https://managd-backend-server.onrender.com/sendOtp",{
                email:e.target[0].value
            }).then(()=>{
                alert("OTP has been sent to your email");
                this.email=e.target[0].value
                this.otpSent=true;
            })
        },
        submitPassword(e){
            if(e.target[1].value===e.target[2].value){
                axios.post("https://managd-backend-server.onrender.com/resetPasswordOfMember",{
                    email:this.email,
                    receivedOtp:e.target[0].value,
                    password: e.target[1].value
                }).then((res)=>{
                    alert(res.data.message)
                })

            }else{
                alert("Passwords should match")
            }
        }
    }
}

</script>