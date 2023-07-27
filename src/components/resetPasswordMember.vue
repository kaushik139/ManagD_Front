<template>
    <form @submit.prevent="submitReset">
        <input type="email" name="" id="" placeholder="Email">
        <button type="submit">Confirm</button>
    </form>

    <form v-if="otpSent" @submit.prevent="submitPassword">
        <input type="text" placeholder="OTP"/>
        <input type="password" placeholder="password"/>
        <input type="password" placeholder="confirm password"/>
        <button type="submit">Reset Password</button>
    </form>
</template>

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
            axios.post("http://localhost:3000/sendOtp",{
                email:e.target[0].value
            }).then(()=>{
                alert("OTP has been sent to your email");
                this.email=e.target[0].value
                this.otpSent=true;
            })
        },
        submitPassword(e){
            if(e.target[1].value===e.target[2].value){
                axios.post("http://localhost:3000/resetPasswordOfMember",{
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