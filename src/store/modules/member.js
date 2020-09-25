import { getMember } from "@/request/member"

export default {
  namespaced:true,
  state:{
      memberlist:[]
  },
  getters:{
      memberlist:state=>state.memberlist
  },
  mutations:{
      SET_LIST(state,data){
          state.memberlist = data
      }
  },
  actions:{
      async get_member_list({commit}){
         let res = await getMember();
         commit('SET_LIST',res) 
      }
  }
}