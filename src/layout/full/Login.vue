<template>
  <div class="main-wrapper" >
    <Login />
  </div>
</template>

<script>
import Login from "@/views/components/Login/login.vue";
import messages from '@/views/components/chat/messages.js';

export default {
  name: "ChatScreen",
  components: {
    Login,
  },
  data:() => ({
	messages: messages,
}),
};
</script>
