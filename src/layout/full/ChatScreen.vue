<template>
  <div class="main-wrapper" style="height: 100%">
    <Chat />
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
