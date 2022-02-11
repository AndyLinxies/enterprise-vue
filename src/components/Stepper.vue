<template>
  <v-row justify="center">
    <v-dialog
      v-model="stepperDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" class="hidden" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="stepperDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Informations sur l'Entreprise</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="createEntreprise"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>Veuillez remplir les champs</v-subheader>

          <v-divider></v-divider>
          <!-- Stepper -->
          <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1">
              Entreprise
            </v-stepper-step>
            <!-- Step 1 -->
            <v-stepper-content step="1">
              <v-card class="mb-12" height="700px">
                <!-- Champs -->
                <v-text-field
                  v-model="entreprise.nrTVA"
                  label="TVA*"
                  required
                ></v-text-field>
                <v-btn @click="handleCheckTVA" rounded> Vérifier </v-btn>
                <v-text-field
                  :value="entreprise.nomEntreprise"
                  label="Nom"
                  required
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="entreprise.activiteEntreprise"
                  label="Activité"
                  required
                ></v-text-field>
                <v-text-field
                  :value="entreprise.adresseEntreprise"
                  label="Adresse"
                  required
                  disabled
                ></v-text-field>
                <v-text-field
                  :value="entreprise.villeEntreprise"
                  label="Ville"
                  required
                  disabled
                ></v-text-field>
                <v-text-field
                  :value="entreprise.paysEntreprise"
                  label="Pays"
                  required
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="entreprise.phoneEntreprise"
                  label="Tel"
                  required
                ></v-text-field>
                <v-text-field
                  :value="entreprise.codePostalEntreprise"
                  label="Code Postal"
                  required
                  disabled
                ></v-text-field>
              </v-card>
              <v-btn color="primary"  @click="e6 = 2"> Continue </v-btn>
            </v-stepper-content>
            <!-- Step 2 -->
            <v-stepper-step :complete="e6 > 2" step="2">
              Personne de contact
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-card class="mb-12" height="300px">
                <v-text-field
                  v-model="entreprise.persContactEmail"
                  label="Email de la personne de Contact"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="entreprise.persContactNom"
                  label="Nom de la personne de Contact"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="entreprise.persContactphone"
                  label="Tel de la personne de Contact"
                  required
                ></v-text-field>
              </v-card>
              <v-btn color="primary" @click="e6 = 1"> Back To Step 1 </v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import axios from 'axios'
export default {
  name: "Stepper",
  data() {
    return {
      e6: 1,

    };
  },
//   mounted() {
//       this.handleCheckTVA()
//   },
  methods: {
      //Step 1
      handleCheckTVA(){
          axios
      .get(`https://controleerbtwnummer.eu/api/validate/BE${this.entreprise.nrTVA}.json`)
      .then((response) => {
          console.log(response.data);
          console.log(response.data.strAddress);
          this.entreprise.nomEntreprise=response.data.name
          this.entreprise.adresseEntreprise=response.data.strAddress
          this.entreprise.villeEntreprise=response.data.address.city
          this.entreprise.paysEntreprise=response.data.address.country
          this.entreprise.codePostalEntreprise=response.data.address.zip_code
          this.$router.push('/dashboard/profile')

      })
      },

      //Post l'entreprise
      createEntreprise(){
          
      axios
      .post(
        `http://127.0.0.1:8000/api/CreateEntreprise`,
        this.entreprise,
        {headers: {
          "Authorization": "Bearer " + this.token2,
        }}
      )
      .then((response) => {
        console.log(response.data);
        this.stepperDialog = false
        this.stepperSubmited=true
        this.$router.push('/dashboard/profile');
      })
      .catch((error) => {
        console.log(error.response);

      })
    },

  },
  computed: {
    ...mapFields(["stepperDialog", "entreprise","token2","stepperSubmited"]),
    showContinueBtn(){
        return this.entreprise.nrTVA  && this.entreprise.nomEntreprise && this.entreprise.adresseEntreprise && this.entreprise.villeEntreprise && this.entreprise.paysEntreprise && this.entreprise.codePostalEntreprise && this.entreprise.phoneEntreprise && this.entreprise.activiteEntreprise
    }
  },
};
</script>
