import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios'
//Persisted State
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name:"",
    email:"",
    password:"",
    token:"",
    token2:"",
    userID:"",
    dialogLogin:false,
    userInfo:"",
    stepperDialog:false,
    entreprise:{
      nrTVA:"",
      nomEntreprise:"",
      adresseEntreprise:"",
      villeEntreprise:"",
      paysEntreprise:"",
      codePostalEntreprise:"",
      phoneEntreprise:"",
      activiteEntreprise:""
    },
    entInfo:{},
    todos:[],
    messageList:[]
  },
  mutations: {
    updateField,

    updateEntInfo(state,res){
      state.entInfo=res
    },
    updateTodos(state,res){
      state.todos=res
    },
    updateMessages(state,res){
      state.messageList=res
    }

  },
  actions: {

    getEntrepriseInfos({commit,state}) {
      axios
        .get("http://127.0.0.1:8000/api/dashboard/profile", {
          headers: {
            "Authorization": "Bearer " + state.token2
          },
        })
        .then((response) => {
        console.log(response.data.data)
          commit("updateEntInfo",response.data.data)
      
        });
    },

    //Les Taches de l'entreprise
    getTodos({commit,state}) {
      axios
        .get("http://127.0.0.1:8000/api/dashboard/taches", {
          headers: {
            "Authorization": "Bearer " + state.token2
          },
        })
        .then((response) => {
        console.log(response.data.data)
          commit("updateTodos",response.data.data)
      
        });
    },
    //Les messages que l'entreprise a envoyé à l'admin
    getMessages({commit,state}) {
      axios
        .get(`http://127.0.0.1:8000/api/dashboard/messageList/`, {
        // .get(`http://127.0.0.1:8000/api/dashboard/messageList/${state.entInfo.id}`, {
          headers: {
            "Authorization": "Bearer " + state.token2
          },
        })
        .then((response) => {
        console.log(response.data.data)
          commit("updateMessages",response.data.data)
      
        });
    },
  },
  getters: {
    getField,
  },
  //persisted State. Mets tout dans le local storage de base
  //Rajouter {paths: ['NomduData']} dans la parenthese pour specifier
  plugins: [createPersistedState()],

})
