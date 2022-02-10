<template>
  <div>
    <div class="text-center mt-2">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="getNotifications"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            
          >
          <span class="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
              {{notifications.length}}
    </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(notification, index) in notifications" :key="index">
            <v-list-item-title v-if="notification.data.message">{{ notification.data.message }}</v-list-item-title>
            <!-- <v-list-item-title>Hey</v-list-item-title> -->
            <!-- <p>{{ items.data }}</p> -->
            <v-list-item-title v-if="notification.data.name">{{ notification.data.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapFields } from "vuex-map-fields";


export default {
  name: "Notification",
  data: () => ({
    notifications:[]
  }),
  methods: {
    getNotifications() {
      axios
        .get(`http://127.0.0.1:8000/api/dashboard/notifications`,
        {
            headers: {
            "Authorization": "Bearer " + this.token2
          },
        }
        )
        .then((response) => {
        //   console.log( response.data.data[0].data.name);
        console.log( response.data.data);
          this.notifications=response.data.data
        });
    },
  },
  computed: {
      ...mapFields(['token2'])
  }
};
</script>
<style></style>
