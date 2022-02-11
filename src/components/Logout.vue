<template>
  <div class="mt-3 mr-2">
    <v-btn v-if="token2" @click="logOut" color="red" elevation="2">Log out </v-btn>
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "Logout",
  methods: {
      logOut() {
          this.token2="";
          this.userID="";
          this.stepperSubmited=false
          this.$route.path !="/" && this.$router.push('/') 
      }
  },
  computed: {
      ...mapFields(['token2','userID',"stepperSubmited"])
  }

};
</script>
<style></style>
