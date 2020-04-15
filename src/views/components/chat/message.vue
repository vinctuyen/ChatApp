<template>
  <div class="chat-talk">
    <span style="padding:0 30px">
      <vs-avatar
        v-if="
          (messages[id - 1] && messages[id].from != messages[id - 1].from) ||
            id == 0
        "
        src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
      />
      <div v-else style="width: 42px"></div>
    </span>

    <div>
      <!-- <div v-for="item in messages" :key="item.key" class="chat-text">
        <p>{{ item.content }}</p>
      </div> -->
      <div class="chat-text">
        <p>{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data: () => ({
    // messages: [{ message: "helo" }],
  }),
  props: ["content", "messages", "id"],
};
</script>
<style lang="stylus" scoped="">
.chat-talk {
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
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
</style>
