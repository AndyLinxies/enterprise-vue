<template>
  <!-- New -->
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ajoutBtn" color="purple accent-2" v-bind="attrs" v-on="on"
            >Edit Entreprise Informations</v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark
              >Modification des informations</v-toolbar
            >
            <v-card-text>
              <form>
                <v-text-field
                  v-model="editedInfos.phoneEntreprise"
                  label="Tel de l'entreprise"
                />
                <v-text-field
                  v-model="editedInfos.persContactphone"
                  label="Tel de la personne de contact"
                />
                <v-text-field
                  v-model="editedInfos.persContactEmail"
                  label="Mail de la personne de contact"
                ></v-text-field>
                <v-text-field
                  v-model="editedInfos.persContactNom"
                  label="Nom de la personne de contact"
                ></v-text-field>
                <v-btn type="button" @click="editEntrepriseProfile">Save</v-btn>
              </form>
              <!--  -->
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
  <!-- fin New -->
</template>
<script>
import axios from "axios";
import { mapFields } from "vuex-map-fields";

export default {
  name: "EditEntrepriseModal",
  props: {},
  data() {
    return {
      editedInfos: {
        phoneEntreprise:"",
        persContactEmail: "",
        persContactNom: "",
        persContactphone: "",
      },
    };
  },
  //Pour que les champs soient préremplis
  mounted() {
    //   console.log(this.entInfo.phoneEntreprise);
    this.editedInfos.phoneEntreprise=this.entInfo.phoneEntreprise;
    this.editedInfos.persContactEmail=this.entInfo.persContactEmail;
    this.editedInfos.persContactNom=this.entInfo.persContactNom;
    this.editedInfos.persContactphone=this.entInfo.persContactphone;

    //Le path surlequel on se trouve
    console.log(this.$router.currentRoute.path);

  },
  methods: {
    editEntrepriseProfile() {
      axios
        .put(
          `http://127.0.0.1:8000/api/dashboard/entreprise/update/${this.entInfo.id}`,
          this.editedInfos,
          {
            headers: {
              Authorization: "Bearer " + this.token2,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        this.$store.dispatch("getEntrepriseInfos");
        this.$toast.success("Informations modifiés avec succès")

        })
        .catch((error) => {
          console.log(error.response);
        this.$toast.error("Informations non modifiés")

        });
    },
  },
  computed: {
    ...mapFields(["token2","entInfo"]),
  },
};
</script>
<style></style>
