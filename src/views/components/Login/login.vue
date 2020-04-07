<template lang="html">
  <div>
    day la login page
  </div>
</template>
<script>
import signIn from '@/firebase/api.js'
signIn('tuyen.no1.tb@gmail.com', 'Mmc181199@')
import { mapMutations } from 'vuex'

export default {
  name: "Login",
  messages: {
    type: Array,
    required: true
  },
  methods: {
    ...mapMutations([
      'auth',
    ])
  }
};
</script>
