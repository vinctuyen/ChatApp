<template lang="html">
  <div id="login">
    <div class="">
      <img src="login.png" alt="">
    </div>
    <div >
      <div>
        <h1>Login</h1>
        <p>Welcome back, please login to your account.</p>
      </div>
      <div>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()" class="vs-component vs-button vs-button-primary vs-button-filled">Login</button>
      </div>
    </div>

  </div>
</template>
<script>

export default {
  name: "Login",
  messages: {
    type: Array,
    required: true
  },
  data(){
    return {
      input: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    login() {

    }
  }

};
</script>
<style scoped="">
  #login {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
    display: flex;
    justify-content: space-around;
  }

</style>