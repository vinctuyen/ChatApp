<template lang="html">
  <div class="centerx">
    <vs-button @click="popupActivo2 = true" color="primary" type="filled"
      >Open Popup</vs-button
    >
    <vs-popup
      classContent="popup-example"
      title="Lorem ipsum dolor sit amet"
      :active.sync="popupActivo2"
    >
      <vs-input class="inputx" placeholder="Placeholder" v-model="value1" />
      <vs-button @click="popupActivo3 = true" color="primary" type="filled"
        >Open Inner Popup</vs-button
      >
      <vs-popup title="Inner popup" :active.sync="popupActivo3"> </vs-popup>
    </vs-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select1: 3,
      options1: [
        { text: "IT", value: 0 },
        { text: "Blade Runner", value: 2 },
        { text: "Thor Ragnarok", value: 3 }
      ],
      value1: "",
      value2: "",
      popupActivo2: false,
      popupActivo3: false
    };
  }
};
</script>

<style lang="stylus">
.popup-example
  .vs-input
    float left
    width 50%
    margin 10px
    margin-top 5px
  .con-select
    margin-left 10px
    width 50%
    margin-bottom 10px
</style>
