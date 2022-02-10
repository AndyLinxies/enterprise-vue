<template>
  <v-row justify="center">
    <v-dialog v-model="dialogLogin" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="redirect" color="success" dark v-bind="attrs" v-on="on"> Login </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Email -->
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <!-- Password -->
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogLogin = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="login"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import axios from "axios";

export default {
  name: "LoginModal",
  data() {
    return {
      formData: new FormData(),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      },
    };
  },
  mounted() {
    console.log(this.entInfo);
  },
  methods: {
    login() {
      console.log("Save login");
      this.formData.append("email", this.email);
      this.formData.append("password", this.password);

      axios
        .post("http://127.0.0.1:8000/api/login", this.formData, this.headers)
        .then((response) => {
          console.log(response.data);
          this.userInfo = response.data.user;
          this.token2 = response.data.token2;
          this.userID = response.data.user.id;
          this.$toast.success("You are Logged in ");
          this.stepperDialog = true;
          this.dialogLogin=false
          this.redirect();
          //Un nouveau Token est généré
        })
        .catch((error) => {
          console.log(error.response);
          this.$toast.error("You are not Logged in ");
        });
    },
    //Si on est déja connecté il nous envoit vers le dashboard. Sinon on voit le modal de connection
    redirect() {
      // if (this.entreprise.nrTVA =="") {
      //   this.stepperDialog = true;
      //   this.$toast.success("Please Register your Society ");
      //   this.dialogLogin=false
      // } else {
      //   this.dialogLogin=false
      //   this.stepperDialog = false;

      //   this.$router.push("/dashboard/profile");
      // }
    },
  },
  computed: {
    ...mapFields([
      "email",
      "password",
      "dialogLogin",
      "userInfo",
      "token2",
      "userID",
      "stepperDialog",
      "entreprise",
    ]),
  },
};
</script>
