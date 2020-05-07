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
          <button class="btnHeader">
            <vs-icon
              icon="group_add"
              size="38px"
              color="#DD3434"
              @click="popupActivo1 = true"
            ></vs-icon>
          </button>
          <button class="btnHeader">
            <vs-icon
              icon="person_add"
              size="30px"
              color="#DD3434"
              @click="popupActivo2 = true"
            ></vs-icon>
          </button>
          <vs-dropdown vs-custom-content vs-trigger-click>
            <a class="a-icon" href.prevent>
              <vs-avatar
                src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
              />
            </a>
            <vs-dropdown-menu>
              <vs-dropdown-item>
                <button style="border: none; background: none">
                  Profile
                </button>
              </vs-dropdown-item>
              <vs-dropdown-item divider>
                <button @click="LogOut()" style="border: none; background: none">
                  Logout
                </button>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
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
            <div class="addFriend">
              <p>Gửi đến bạn bè lời chào hỏi</p>
              <vs-input class="inputx" placeholder="" v-model="firstChat" />
            </div>
            <div style="display: flex;justify-content: center;">
              <vs-button
                @click="
                  popupActivo3 = false;
                  InitRoom();
                "
                color="primary"
                type="filled"
                >Thêm kết nối</vs-button
              >
            </div>
          </vs-popup>
        </vs-popup>

        <vs-popup title="popup-search-user" :active.sync="popupActivo1">
          <vs-input
            class="inputx"
            placeholder="Nhập tên nhóm"
            v-model="nameGroup"
            style="width: 100%; padding-bottom: 20px"
            label="Tên nhóm"
          />
          <vs-input
            class="inputx"
            placeholder="Gửi lời chào"
            v-model="firstMessageGroup"
            style="width: 100%; padding-bottom: 20px"
            label="Gửi lời chào nhóm"
          />
          <vs-select
            placeholder="Choose members"
            multiple
            class=""
            label="Members"
            v-model="users"
          >
            <vs-select-item
              :key="item.value"
              :value="item.value"
              :text="item.name"
              v-for="item in listUser"
              >{{ item.name }}</vs-select-item
            >
          </vs-select>

          <div style="display: flex;justify-content: center;">
            <vs-button
              @click="
                popupActivo1 = false;
                initGroup();
              "
              color="primary"
              type="filled"
              >Tạo nhóm</vs-button
            >
          </div>
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
      <div v-if="!contacts || contacts == []" class="">
        Hãy thêm bạn để bắt đầu trò chuyện
      </div>
      <div v-else>
        <button
          v-for="item in contacts"
          :key="item.key"
          v-bind:class="{ contactActive: item.roomID == currentRoom }"
          class="listContact"
          @click="getChat(item.roomID)"
        >
          <ListChat
            v-bind:name="item.contactName"
            :firstMessage="item.firstMessage"
            :time="item.time"
            :avatar="item.contactAvatar"
          />
        </button>
      </div>

      <!-- <div class="footer-sidebar" slot="footer">
        <vs-button icon="reply" color="danger" type="flat">log out</vs-button>
        <vs-button icon="settings" color="primary" type="border"></vs-button>
      </div> -->
    </vs-sidebar>
    <div class="chat-conversation">
      <div style="height: calc(750px);overflow-y: scroll;" id="chat">
        <div v-if="!conversation" class="noConversation">
          Bạn chưa có cuộc trò chuyện
        </div>
        <div v-else>
          <div
            class="chat-box"
            v-for="(item, index) in conversation.messages"
            :key="item.key"
          >
            <Message
              v-bind:content="item.content"
              :messages="conversation.messages"
              :id="index"
              v-if="item.from != userId && conversation"
            />
            <MessageRight
              style="display: flex"
              v-bind:content="item.content"
              :messages="conversation.messages"
              :id="index"
              v-if="item.from == userId && conversation"
            />
          </div>
        </div>
      </div>

      <vs-row
        vs-w="12"
        class="input-message"
        vs-type="flex"
        style="width: auto"
      >
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="1"
          vs-sm="1"
          vs-xs="2"
        >
          <span>
            <vs-icon icon="face" style="padding-left: 20px"></vs-icon>
          </span>
          <span>
            <vs-icon icon="link" style="padding-left: 20px"></vs-icon>
          </span>
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="9"
          vs-sm="7"
          vs-xs="8"
        >
          <vs-textarea
            v-model="textarea"
            class="input-text"
            style="width: 100%"
          />
        </vs-col>
        <vs-col vs-type="flex" vs-align="center" vs-lg="2" vs-sm="4" vs-xs="12">
          <vs-button
            color="primary"
            type="filled"
            style="width: 120px; left: 50px;"
            @click="sendMessageRequest()"
            >Send</vs-button
          >
        </vs-col>
      </vs-row>
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
    ListChat,
  },
  data: () => ({
    value1: "",
    textarea: "",
    popupActivo1: false,
    popupActivo2: false,
    popupActivo3: false,
    nameSearch: "",
    emailSearch: "",
    active: false,
    activeItem: 0,
    firstChat: "",
    users: [],
    nameGroup: "",
    firstMessageGroup: "",
  }),
  computed: mapState({
    searchUser: (state) => state.searchUser,
    userId: (state) => state.userId,
    room: (state) => state.room,
    contacts: (state) => state.contacts,
    conversation: (state) => state.conversation,
    currentRoom: (state) => state.currentRoom,
    listUser: (state) => state.listUser,
  }),
  methods: {
    ...mapActions({
      createRoom: "createRoom",
      search: "search",
      getRoom: "getRoom",
      getContacts: "getContacts",
      getConversation: "getConversation",
      sendMessage: "sendMessage",
      getDefaultConversation: "getDefaultConversation",
      createGroup: "createGroup",
      SignOut: "SignOut",
    }),
    InitRoom() {
      this.createRoom({
        idRoom: this.room.length,
        nameRoom: this.searchUser.uid,
        members: [this.userId, this.searchUser.uid],
        message: this.firstChat,
      });
    },
    initGroup() {
      this.createGroup({
        idRoom: this.room.length,
        nameRoom: this.nameGroup,
        members: this.users,
        message: this.firstMessageGroup,
      });
    },
    sendMessageRequest() {
      this.sendMessage({
        sender: this.userId,
        message: this.textarea,
        roomID: this.currentRoom,
        idMessage: this.conversation.messages.length,
      });
      this.textarea = "";
    },
    getChat(roomId) {
      this.getConversation(roomId);
    },
    getListRoom() {
      this.getRoom();
    },
    Search() {
      this.search({ email: this.emailSearch });
    },
    LogOut() {
      this.SignOut({ router: this.$router });
    },
  },
  beforeMount() {
    this.getListRoom();
    this.getContacts(this.userId);
    this.getDefaultConversation();
  },
  mounted: function() {
    if (document.getElementById("chat")) {
      document.getElementById("chat").scrollTop = 999999999999;
    }
  },
};
</script>

<style lang="stylus" scoped="">
.btnHeader {
  border: none
  background: none
  :hover {
    background #CFD5DF
  }
}
.noConversation {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}
.contactActive {
  button {
  background: #EEFBFF;
}

}
.listContact {
  min-height: 67px;
  display: flex;
  border: none;
  padding: 0;
  max-width: 260px;
  align-items: center;
  background: #fff;
  button:hover {
  background: #EEFBFF;
}
}
.addFriend {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
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
