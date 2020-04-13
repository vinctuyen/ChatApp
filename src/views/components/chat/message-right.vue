<template>
  <div class="right-box chat-talk">
    <!-- <div v-for="item in messages" :key="item.key" class="chat-text">
      <p>{{ item.content }}</p>
    </div> -->
    <div class="chat-text">
      <p>{{ message.content }}</p>
    </div>
    <span style="padding:0 30px">
      <vs-avatar v-if="messages[id-1] && messages[id].from != messages[id-1].from || id == 0"
        src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
      />
      <div v-else style="width: 42px"></div>
    </span>
  </div>
</template>

<script>
export default {
  name: "MessageRight",
  data: () => ({
    // messages: [{ message: "I will it for sure" }],
  }),
  props: ['message', "messages", "id"],
};
</script>
<style lang="stylus" scoped="">
.chat-talk {
  display: flex;
  justify-content: flex-start;
}
.chat-text {
  p {
    max-width: 600px;
    padding: .5rem 1rem;
    color: #757575;
    border-radius: 5px;
    background-color : #fff;
    box-shadow: 1px 1px 10px 0 rgba(0,0,0,.14);
    margin-bottom: 0;
  };
}
.right-box {
  justify-content: flex-end !important;
}
</style>
