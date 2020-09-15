import { getGoods,getTotal } from "@/request/goods"

export default {
  namespaced:true,
  state:{
      goodslist:[],
      page:1,
      size:10,
      total:0,
  },
  getters:{
      goodslist:state=>state.goodslist,
      page:state=>state.page,
      size:state=>state.size,
      total:state=>state.total
  },
  mutations:{
      SET_LIST(state,data){
          state.goodslist = data
      },
      SET_PAGE(state,data){
        state.page = data
      },
    SET_SIZE(state,data){
        state.size = data
    },
    SET_TOTAL(state,data){
        state.total = data
    },

  },
  actions:{
       // 请求菜单列表的数据！
      async get_goods_list({commit}){
         let res = await getGoods();
         commit('SET_LIST',res) 
         
      },
      async get_goods_total({commit}){
          let res = await getTotal();
          commit('SET_TOTAL',res)
      },
      set_page({commit,dispatch},data){
          commit("SET_PAGE",data)
          dispatch('get_goods_list')
      },
      set_size({commit,dispatch},data){
        commit("SET_SIZE",data)
        dispatch('get_goods_list')
    }
  }
}