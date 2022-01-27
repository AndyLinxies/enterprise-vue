<template>
  <v-card
    height="900"
    width="256"
  >
    <v-navigation-drawer permanent >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <router-link to="/"> Home</router-link>
          </v-list-item-title>
          <!-- <v-list-item-subtitle>
            
          </v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
      >
      <!-- Profile -->
        <v-list-item to="/dashboard/profile" >
          <v-list-item-icon>
            <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
          <!-- Message -->
        </v-list-item>
        <v-list-item to="/dashboard/messages">
          <v-list-item-icon>
            <v-icon>mdi-android-messages</v-icon>
        </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Message</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--  -->
        <!-- Taches-->
        <v-list-item to="/dashboard/taches">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-edit-outline</v-icon>
        </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Taches</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--  -->
        
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    name:"SideBar",
    data () {
      return {
        
        right: null,
      }
    },
  }
</script>