<template>
  <div>
    <div class="flex">
      <SideBar />
      <div class="flex justify-center">
        <!-- <v-card v-for="(value,name,i) in entInfo" :key="i">
                <v-card-title>{{value}}</v-card-title>
                    <v-card-text>bon </v-card-text>
        </v-card> -->
        <v-card elevation="24" height="50%" class="mt-10">
          <v-card-title>Entreprise: {{ entInfo.nomEntreprise }}</v-card-title>
          <v-card-subtitle
            >Numero de TVA: BE{{ entInfo.nrTVA }}</v-card-subtitle
          >
          <v-card-text>{{entInfo.adresseEntreprise}}</v-card-text>
          <v-card-text>Pays: {{entInfo.paysEntreprise}} </v-card-text>
          <v-card-text>Phone: {{entInfo.phoneEntreprise}} </v-card-text>
          <v-card-text>Activité: {{entInfo.activiteEntreprise}} </v-card-text>
          <!-- Personne de contact -->
          <hr><hr>
            <v-card-text>Email de la Personne de contact: <b>{{entInfo.persContactEmail}}</b> </v-card-text>
            <v-card-text>nom de la Personne de contact: <b>{{entInfo.persContactNom}} </b> </v-card-text>
            <v-card-text>Telephone de la Personne de contact: <b>{{entInfo.persContactphone}} </b> </v-card-text>

        </v-card>
      </div>
      <div class="mt-5">
      <EditEntrepriseModal />
      </div>
    </div>
  </div>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import SideBar from "../components/sideBar.vue";
import EditEntrepriseModal from '../components/EditEntreprise.vue'
export default {
  name: "EntrePriseProfile",
  components: {
    SideBar,EditEntrepriseModal
  },
  mounted() {
    this.$store.dispatch("getEntrepriseInfos");
    console.log(this.entInfo);
  },
  computed: {
    ...mapFields(["entInfo"]),
  },
};
</script>
<style></style>
