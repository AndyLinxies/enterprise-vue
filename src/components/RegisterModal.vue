<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mt-6" color="purple darken-2" dark v-bind="attrs" v-on="on">
          Register
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Register</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Name -->
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Name*"
                  required
                  v-model="name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4"> </v-col>
              <!-- Email -->
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <!-- Password -->
              <v-col v-if="!edituser" cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="password"
                ></v-text-field>
              </v-col>
              <!-- Picture -->
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="handleRegister">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import axios from "axios";

export default {
  name: "RegisterModal",
  props: {
    edituser: Boolean,
  },
  data: () => ({
    dialog: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    formData: new FormData(),
    errorMessage: "",
    successMessage: "",
  }),
  methods: {
    handleRegister() {
      console.log("save Register");
        this.formData.append("name", this.name);
        this.formData.append("email", this.email);
        this.formData.append("password", this.password);
        axios
          .post(
            "http://127.0.0.1:8000/api/register",
            this.formData,
            this.headers
          )
          .then((response) => {
            console.log(response.data);
            console.log(this.password);

            this.successMessage = response.data.message;
            this.token = response.data.token;
            this.dialog = false;
            this.dialogLogin = true;
            this.$toast.success("You are registered ")

          })
          .catch((error) => {
            console.log(error);
            this.$toast.error("You are not registered ")

            // this.errorMessage=error.response.data.error.messages.errors
          });
      
    },
  },
  computed: {
    ...mapFields([
      "name",
      "email",
      "password",
      "userID",
      "token",
      "token2",
      "dialogLogin"
    ]),
  },
};
</script>
