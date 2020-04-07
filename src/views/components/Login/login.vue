<template lang="html" style="height: 100%">
  <div class="login">
    <div class="login-page">
      <div class="image">
        <div>
          <img src="login.png" alt="login" class="mx-auto" />
        </div>
      </div>
      <div class="form-login">
        <div>
          <h4 class="title">Login</h4>
          <p class="title">Welcome back, please login to your account.</p>
        </div>
        <vs-divider color="primary"></vs-divider>
        <div class="form">
          <div>
            <vs-input
              icon="email"
              type="text"
              label="Email"
              name="email"
              v-model="email"
              placeholder="Email"
              class="inputx"
              id="email"
            />
            <vs-input
              icon="https"
              type="password"
              name="password"
              label="Password"
              v-model="password"
              placeholder="Password"
              class="inputx"
              id="password"
            />
          </div>
          <div class="support">
            <div class="rememmber">
              <vs-checkbox>Rememmber me</vs-checkbox>
            </div>
            <div class="forget">
              <a>Forget Password</a>
            </div>
          </div>
          <div class="btn">
            <vs-button color="primary" type="border" style="width: 120px"
              >Đăng kí</vs-button
            >
            <vs-button
              type="button"
              @click="Login()"
              class="vs-component vs-button vs-button-primary vs-button-filled"
              style="width: 120px"
              >Đăng nhập</vs-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  messages: {
    type: Array,
    required: true,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  methods: {
    ...mapActions({ updateUser: "updateUser" }),
    Login() {
      if (!this.email) {
        alert("Vui lòng nhập email");
      } else {
        if (!this.password) {
          alert("Vui lòng nhập mật khẩu");
        } else {
          this.updateUser({
            email: this.email,
            password: this.password,
            router: this.$router
          });
          // eslint-disable-next-line no-undef
          // console.log('this.userId',this.userId)
          //  if(this.userId) {
          //   this.$router.push({ name: "Chat" });
          // }
          // 
        }
      }
    },
  },
  // created() {
  //   this.$store.dispatch('updateUser');
  // }
};
</script>
<style scoped="">
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-page {
  display: flex;
  /* height: 60%; */
  width: 58%;
  justify-content: center;
  justify-content: space-around;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.1);
  background: #cdd3e1;
}
.image {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eff2f7;
}
.form-login {
  width: 50%;
  padding: 60px 38px 0 32px;
  background: #fff;
}
.title {
  margin-bottom: 1rem;
  font-size: 18.48px;
  color: #626262;
}
.vs-con-input-label {
  width: 100%;
  padding: 10px;
}
.support {
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 10px;
}
.btn {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.forget {
  font-size: 15px;
  color: #1f74ff;
}
</style>
