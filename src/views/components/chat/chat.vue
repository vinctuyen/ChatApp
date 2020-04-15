<template lang="html" style="height: 100%">
  <div class="abc">
    <div>
      <div class="header">
        <div slot="title" class="app-name">
          <img
            src="../../../assets/images/logo/logo.jpg"
            alt="logo"
            class="logo"
          />
          <vs-navbar-title class="title">
            ChatApp
          </vs-navbar-title>
        </div>
        <div style="width: 75%">
          <vs-input
            icon="search"
            placeholder="Search"
            v-model="value1"
            style="width: 25%;"
          />
        </div>
        <div class="list-icon">
          <span>
            <vs-icon icon="notifications" size="30px" color="#DD3434"></vs-icon>
          </span>
          <span>
            <vs-icon
              icon="person_add"
              size="30px"
              color="#DD3434"
              @click="popupActivo2 = true"
            ></vs-icon>
          </span>
          <vs-avatar
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          />
        </div>
        <vs-popup
          classContent="popup-search-user"
          title="Thêm kết nối"
          :active.sync="popupActivo2"
        >
          <vs-input
            class="inputx"
            placeholder="Nhập email"
            v-model="emailSearch"
            style="width: 100%; padding-bottom: 20px"
          />
          <div style="display: flex;justify-content: center;">
            <vs-button
              @click="
                popupActivo3 = true;
                popupActivo2 = false;
                Search();
              "
              color="primary"
              type="filled"
              >Tìm kiếm</vs-button
            >
          </div>
          <vs-popup title="Kết quả tìm kiếm" :active.sync="popupActivo3">
            <div class="searchUser">
              <vs-avatar v-bind:src="searchUser.anh" />
              <span>
                {{ searchUser.name }}
              </span>
            </div>
            <div style="display: flex;justify-content: center;">
              <vs-button
                @click="
                  popupActivo3 = false;
                  InitRoom()
                "
                color="primary"
                type="filled"
                >Thêm kết nối</vs-button
              >
            </div>
          </vs-popup>
        </vs-popup>
      </div>
    </div>
    <vs-sidebar
      static-position
      default-index="1"
      color="primary"
      class="sidebarx"
      spacer
      v-model="active"
    >
      <button v-for="item in contacts" :key="item.key" class="listContact" @click="getChat(item.roomID)">
        <ListChat
          v-bind:name="item.contactName"
          :firstMessage="item.firstMessage"
          :time="item.time"
          :avatar="item.contactAvatar"
        />
      </button>
      <!-- <div class="footer-sidebar" slot="footer">
        <vs-button icon="reply" color="danger" type="flat">log out</vs-button>
        <vs-button icon="settings" color="primary" type="border"></vs-button>
      </div> -->
    </vs-sidebar>
    <div class="chat-conversation">
      <div style="height: calc(750px);overflow-y: scroll;" id="chat">
        <div class="chat-box" v-for="(item, index) in conversation.messages" :key="item.key">
          <Message
            v-bind:content="item.content"
            :messages="conversation.messages"
            :id="index"
            v-if="item.from != userId"
          />
          <MessageRight
            style="display: flex"
            v-bind:content="item.content"
            :messages="conversation.messages"
            :id="index"
            v-if="item.from == userId"
          />
        </div>
      </div>

      <div class="input-message">
        <span style="width: 3%">
          <vs-icon icon="face" style="padding-left: 20px"></vs-icon>
        </span>
        <span style="width: 3%">
          <vs-icon icon="link" style="padding-left: 10px"></vs-icon>
        </span>
        <vs-textarea v-model="textarea" class="input-text" />
        <vs-button
          color="primary"
          type="filled"
          style="width: 120px; left: 50px;"
          @click="sendMessageRequest()"
          >Send</vs-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MessageRight from "./message-right";
import Message from "./message";
import ListChat from "./list-chat";
export default {
  components: {
    MessageRight,
    Message,
    ListChat
  },
  data: () => ({
    value1: "",
    textarea: "",
    popupActivo2: false,
    popupActivo3: false,
    nameSearch: "",
    emailSearch: "",
    active: false,
    activeItem: 0,
  }),
  computed: mapState({
    searchUser: state => state.searchUser,
    userId: state => state.userId,
    room: state => state.room,
    contacts: state => state.contacts,
    conversation: state => state.conversation,
    currentRoom: state => state.currentRoom
  }),
  methods: {
    ...mapActions({ createRoom: "createRoom", search: "search" , getRoom: 'getRoom', getContacts: "getContacts", getConversation: "getConversation", sendMessage: "sendMessage"}),
    InitRoom() {
      this.createRoom({
        idRoom: this.room.length+1,
        nameRoom: this.searchUser.uid,
        members: [this.userId, this.searchUser.uid],
        message: ""
      });
    },
    sendMessageRequest() {
      // eslint-disable-next-line no-console
      this.sendMessage({sender: this.userId, message: this.textarea, roomID: this.currentRoom, idMessage: this.conversation.messages.length})
    },
    getChat(roomId) {
      // eslint-disable-next-line no-console
      this.getConversation(roomId)
    },
    getListRoom() {
      this.getRoom()
    },
    Search() {
      // eslint-disable-next-line no-console
      this.search({ email: this.emailSearch });
      // eslint-disable-next-line no-console
    }
  },beforeMount(){
    this.getListRoom()
    this.getContacts(this.userId)
 },
  mounted: function() {
    if (document.getElementById("chat")) {
      document.getElementById("chat").scrollTop = 999999999999;
    }
  }
};
</script>

<style lang="stylus" scoped="">
.listContact {
  min-height: 67px;
  display: flex;
  border: none;
  padding: 0;
  max-width: 260px;
  align-items: center;
  background: #fff;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background #CAECFF
}
.list-icon{
  display: flex;
  justify-content: space-around;
  width: 10%;
  align-items: center;
  padding-right: 20px;
}
.chat {
  min-height: 67px;
  display: flex;
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
}
.last-time {
  padding: 27px 14px;
  font-size: 10px;
}
.chat-conversation {
  min-width: calc(100% - 260px);
  float: right;
  // background url("../../../assets/images/background/chat-background.jpg")
  // background #fff
  height: 100%;
}
.input-message {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 261px;
  min-width: calc(100% - 260px);
  z-index: 1000;
  height: 120px;
  background: #fff;
}
.input-text {
  background #F0F5F9
  width: 80%
  top: 8px;
  left: 10px;
  height: 80px;
}
.chat-box {
  display: flex;
  justify-content: flex-start;
  flex-direction: column
}
.searchUser {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}
.parentx-static
  // overflow hidden
  // height 500px
  // position relative

.header-sidebar
  display flex
  align-items center
  justify-content center
  flex-direction column
  width 100%
  h4
    display flex
    align-items center
    justify-content center
    width 100%
    > button
      margin-left 10px
.footer-sidebar
  display flex
  align-items center
  justify-content space-between
  width 100%
  > button
      border 0px solid rgba(0,0,0,0) !important
      border-left 1px solid rgba(0,0,0,.07) !important
      border-radius 0px !important

.app-name {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 22px;
  width: 15%;

}
.logo {
  width: 30px
  height: 30px
}
.title {
  font-size 24px
  color #787586
}
</style>
