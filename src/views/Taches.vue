<template>
  <div>
    <div class="flex">
      <SideBar />
      <div class="flex justify-center mt-10">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Done</th>
                <th class="text-left">Changer Le status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item,i in todos" :key="i">
                <td>{{ item.tache }}</td>
                <td>{{ item.done == 0 ? 'Non fait':'Fait' }}</td>
                <td>
                    <v-simple-checkbox
                    @click="getcheckboxValue(item.id,i,item.done)"
                    :ripple="false"
                    v-model="item.done"
                    >
                        
                    </v-simple-checkbox>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
        <div>
            <AddTacheModal />
        </div>
    </div>
  </div>
</template>
<script>
import SideBar from "../components/sideBar.vue";
import { mapFields } from "vuex-map-fields";
import axios from 'axios';
import AddTacheModal from '../components/AddTacheModal.vue'
export default {
  name: "Taches",
  components: {
    SideBar,AddTacheModal
  },
  mounted() {
    this.$store.dispatch("getTodos");
    // this.todos[this.arrIndex].done == 0 ? this.updatedStat.done=false : this.updatedStat.done=true
  },
  data() {
    return {
      
      todoID: "" ,
      arrIndex:0,
      updatedStat: {
          done: false
      },
    };
  },
  methods: {
      getcheckboxValue(value,index,done){
          console.log(value);
          console.log(index);
          console.log(done);
          this.updatedStat.done=done
          this.arrIndex=index
          this.todoID=value;
          this.updateTodoStatus()
      },

      //Update la valeur du done dans la DB
    updateTodoStatus() {
      axios
        .put(
          `http://127.0.0.1:8000/api/dashboard/tache/update/${this.todoID}`,
          this.updatedStat,
          {
            headers: {
              Authorization: "Bearer " + this.token2,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        // this.$store.dispatch("getEntrepriseInfos");
        this.$toast.success("Status modifiés avec succès")
        this.$store.dispatch("getTodos");

        })
        .catch((error) => {
          console.log(error.response);
        this.$toast.error("Status non modifiés")

        });
    },

  },
  computed: {
    ...mapFields(["todos","token2"]),
    // zeroTofalse(){
    //     if (this.todos.done == 0) {
            
    //         return false
    //     }else{
    //         return true
    //     }
    // }
  },
};
</script>
<style></style>
