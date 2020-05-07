<template>
  <div class="main-wrapper" style="height: 100%" >
    <Login />
  </div>
</template>

<script>
import Login from "@/views/components/Login/login.vue";
export default {
  name: "LoginScreen",
  components: {
    Login,
  },
};
</script>
