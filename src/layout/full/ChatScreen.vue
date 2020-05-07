<template>
  <div class="main-wrapper" style="height: 100%">
    <Chat />
  </div>
</template>

<script>
import Chat from "@/views/components/chat/chat.vue";
export default {
  name: "ChatScreen",
  components: {
    Chat,
  },
};
</script>
