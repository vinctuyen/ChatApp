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
            <vs-icon icon="person_add" size="30px" color="#DD3434"></vs-icon>
          </span>
          <vs-avatar
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          />
        </div>
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
      <div class="chat">
        <div class="chat-avatar">
          <vs-avatar
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          />
        </div>
        <div class="chat-content">
          <div class="name-chater">hennry</div>
          <div class="first-meassage">How can I purchase it?</div>
        </div>
        <div class="last-time">11:34 am</div>
      </div>

      <div class="chat">
        <div class="chat-avatar">
          <vs-avatar
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          />
        </div>
        <div class="chat-content">
          <div class="name-chater">Alin Kystal</div>
          <div class="first-meassage">Apple pie bonbon cheesecake</div>
        </div>
        <div class="last-time">11:34 am</div>
      </div>

      <div class="chat">
        <div class="chat-avatar">
          <vs-avatar
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          />
        </div>
        <div class="chat-content">
          <div class="name-chater">Lawrence Collins</div>
          <div class="first-meassage">Looks clean and fresh UI.</div>
        </div>
        <div class="last-time">11:34 am</div>
      </div>

      <div class="chat">
        <div class="chat-avatar">
          <vs-avatar
            src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          />
        </div>
        <div class="chat-content">
          <div class="name-chater">Alice Hawker</div>
          <div class="first-meassage">I will purchase it for sure</div>
        </div>
        <div class="last-time">11:34 am</div>
      </div>

      <!-- <div class="footer-sidebar" slot="footer">
        <vs-button icon="reply" color="danger" type="flat">log out</vs-button>
        <vs-button icon="settings" color="primary" type="border"></vs-button>
      </div> -->
    </vs-sidebar>
    <div class="chat-conversation">
      <div style="height: calc(750px);overflow-y: scroll;" id="chat">
        <div class="chat-box" v-for="(item, index) in messages" :key="item.key">
          <Message
            v-bind:message="item"
            :messages="messages"
            :id="index"
            v-if="item.from != 1"
          />
          <MessageRight
            style="display: flex"
            v-bind:message="item"
            :messages="messages"
            :id="index"
            v-if="item.from == 1"
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
          @click="InitRoom()"
          >Send</vs-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MessageRight from "./message-right";
import Message from "./message";

export default {
  components: {
    MessageRight,
    Message,
  },
  data: () => ({
    active: false,
    activeItem: 0,
    search: "",
    messages: {
      0: {
        content: "hello",
        from: 1,
      },
      1: {
        content: "baby",
        from: 1,
      },
      2: {
        content: "hi, my love",
        from: 2,
      },
      3: {
        content: "hi, my love",
        from: 2,
      },
      4: {
        content: "how are you ?",
        from: 1,
      },
      5: {
        content: "find, and you?",
        from: 2,
      },
      6: {
        content: "hello",
        from: 1,
      },
      7: {
        content: "baby",
        from: 1,
      },
      8: {
        content: "hi, my love",
        from: 2,
      },
      9: {
        content: "hi, my love",
        from: 2,
      },
      10: {
        content: "how are you ?",
        from: 1,
      },
      11: {
        content: "find, and you?",
        from: 2,
      },
      12: {
        content: "find, and you?",
        from: 2,
      },
      13: {
        content: "hello",
        from: 1,
      },
      14: {
        content: "baby",
        from: 1,
      },
      15: {
        content: "hi, my love",
        from: 2,
      },
      16: {
        content: "hi, my love",
        from: 1,
      },
      17: {
        content: "how are you ?",
        from: 1,
      },
      18: {
        content: "find, and you?",
        from: 2,
      },
      19: {
        content: "hi, my love",
        from: 2,
      },
      20: {
        content: "hi, my love",
        from: 2,
      },
      21: {
        content: "how are you ?",
        from: 1,
      },
      22: {
        content: "find, and you?",
        from: 2,
      },
    },
    account: {
      0: {
        anh: "",
        email: "",
        name: "Hennry",
        room: {
          0: 1,
        },
      },
      1: {
        anh: "",
        email: "",
        name: "Alin Kystal",
        room: {
          0: 1,
        },
      },
      2: {
        anh: "",
        email: "",
        name: "Lawrence ",
        room: {
          0: 1,
        },
      },
      3: {
        anh: "",
        email: "",
        name: "Alice Hawker",
        room: {
          0: 1,
        },
      },
    },
  }),
  methods: {
    ...mapActions({ createRoom: "createRoom" }),
    InitRoom() {
      this.createRoom({
        idRoom: 1,
        nameRoom: "abc",
        members: [1, 2],
        message: "heeelooo",
      });
    },
  },
};

</script>

<style lang="stylus" scoped="">
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
    z-index: 100000;
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
// .chat-talk {
//   display: flex;
//   justify-content: flex-start;
//   padding: 20px 0;
// }
// .chat-text {
//   p {
//     max-width: 600px;
//     padding: .5rem 1rem;
//     color: #757575;
//     border-radius: 5px;
//     background-color: #fff;
//     box-shadow: 1px 1px 10px 0 rgba(0,0,0,.14);
//   }

// }
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
