<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <div class="flex w-0">
        <RegisterModal />
        <LoginModal />
        <Logout />
        <v-btn v-if="stepperSubmited" class="mt-3" color="gray">
          <router-link to="/dashboard/profile">
          Dashboard 
          </router-link>
        </v-btn>
        <Stepper />
        <!-- Notif -->
        <Notification v-if="stepperSubmited" />
      </div>
    </v-app-bar>

    <v-main>
    <router-view :key="$route.path"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import RegisterModal from "../src/components/RegisterModal.vue";
import LoginModal from "../src/components/LoginModal.vue";
import Stepper from "../src/components/Stepper.vue";
import Notification from "../src/components/Notification.vue";
import { mapFields } from "vuex-map-fields";
import Logout from '../src/components/Logout.vue'

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});

export default {
  name: "App",
  components: {
    RegisterModal,
    LoginModal,
    Stepper,
    Notification,
    Logout
  },
  computed: {
    ...mapFields(['token2',"stepperSubmited","entreprise","entInfo"])
  },
mounted() {
  // console.log("hello");
  console.log(this.$route.path);
},
  data: () => ({
    //
  }),
};
</script>
