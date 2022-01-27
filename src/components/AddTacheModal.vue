<template>
  <!-- New -->
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ajoutBtn" color="purple accent-2" v-bind="attrs" v-on="on"
            icon> <v-icon>mdi-plus-circle</v-icon> </v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary" dark
              >Ajouter des taches</v-toolbar
            >
            <v-card-text>
              <form>
                <v-text-field
                  v-model="addTodo.tache"
                  label="Tache"
                />
                
                <v-btn type="button" @click="handleAddTodo">Save</v-btn>
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
import axios from 'axios';
import { mapFields } from "vuex-map-fields";

export default {
    name:"AddTache",
    data() {
        return {
            addTodo:{}
        }
    },
    methods: {
        handleAddTodo(){
           
      axios
        .post(
          `http://127.0.0.1:8000/api/dashboard/tache/create/${this.entInfo.id}`,
          this.addTodo,
          {
            headers: {
              Authorization: "Bearer " + this.token2,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        // this.$store.dispatch("getEntrepriseInfos");
        this.$toast.success("Tache ajoutée avec succès")
        this.$store.dispatch("getTodos");

        })
        .catch((error) => {
          console.log(error.response);
        this.$toast.error("Tache non ajoutée")

        });
        }
    },
    computed: {
    ...mapFields(["entInfo","token2"])
    }
}
</script>