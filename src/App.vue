<template>
 <router-view/>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
    methods:{
signup(){
this.$router.push({name:'signUp'})
},
login(){
this.$router.push({name:'login'})
},
memberSignup(){
  this.$router.push({name:'memberSignup'})
},
dashBoard(){
  this.$router.push({name:'dashBoard'})
}

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
