<template>
  <button class="chat">
    <div class="chat-avatar">
      <vs-avatar v-bind:src="avatar" />
    </div>
    <div class="chat-content">
      <div class="name-chater">{{ name }}</div>
      <div class="first-meassage">{{ firstMessage }}</div>
    </div>
    <div class="last-time">{{ time }}</div>
  </button>
</template>

<script>
export default {
  name: "ListChat",
  data: () => ({
    // messages: [{ message: "helo" }],
  }),
  props: ["avatar", "name", "firstMessage", "time"],
};
</script>
<style lang="stylus" scoped="">
.chat {
  min-height: 67px;
  display: flex;
  border: none;
  padding: 0;
  max-width: 260px;
  align-items: center;
  background: #fff;
}
button:hover {
  background: #EEFBFF;
} 
.chat-avatar {
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  width: 28%;
}
.chat-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  width: 45%;
  padding: 20px 0;
}
.name-chater {
  width: 100px;
  font-weight: 700;
  font-size: initial;
  color: #454655;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.first-meassage {
  width: 120px;
  font-size: .85rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #616161;
  display: flex;
  padding-left: 10px;
}
.last-time {
  padding: 27px 14px;
  font-size: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
