<template>
  <div class="main-wrapper">
    <Chat parent="#parentx" :messages="messages"/>
  </div>
</template>

<script>
import Chat from "@/views/components/chat/chat.vue";
import messages from '@/views/components/chat/messages.js';

export default {
  name: "ChatScreen",
  components: {
    Chat,
  },
  data:() => ({
	messages: messages,
}),
};
</script>
