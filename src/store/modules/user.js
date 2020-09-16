
import { getUser,getTotal,Login } from '@/request/user'

import { Message } from 'element-ui'

import router from "@/router"

let userinfo = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem("userinfo")):{}


export default {
    namespaced:true,
    state:{
        userlist:[],
        size:1, //每页数量
        page:1, //页码数
        total:0, //总条数
        userinfo:userinfo
    },
    getters:{
       userlist:state=>state.userlist,
       size:state=>state.size,
       page:state=>state.page,
       total:state=>state.total,
       menus:state=>state.userinfo.menus,
       menus_url:state=>state.userinfo.menus_url,
       username:state=>state.userinfo.username,
    },
    mutations:{
        SET_LIST(state,data){
          state.userlist = data
         },
        SET_SIZE(state,data){
          state.size = data
        },
        SET_PAGE(state,data){
            state.page = data
          },
        SET_TOTAL(state,data){
          state.total = data
        },
       //登录
        SET_USERINFO(state,data){
            //存入数据实现数据持久化
            localStorage.setItem('userinfo',JSON.stringify(data)) 
          // 存入vuex是为了各组件方便直接拿取数据
            state.userinfo = data;
        } ,
       //退出登录
       QUIT(state){
           localStorage.removeItem("userinfo")
           state.userinfo = {};
           router.push("/login")
       }      
    },
    actions:{
        async get_user_list({commit,state,dispatch}){
         let res = await getUser(state.page,state.size);
            commit('SET_LIST',res) 
            dispatch('get_user_total');
        },
        async get_user_total({commit}){
            let res = await getTotal();
            commit('SET_TOTAL',res)
        },
        set_page({commit,dispatch},data){
            commit('SET_PAGE',data)
            dispatch('get_user_list')
        },
        set_size({commit,dispatch},data){
            commit('SET_PAGE',1)  //切换每页数量时 页码数变成第一个
            commit('SET_SIZE',data)
            dispatch('get_user_list')
        },

        // 登录方法
       async login({commit},data){
            let res = await Login(data); 
            if(res.code == 200){
               commit('SET_USERINFO',res.list) 
                Message.success("登录成功")
                router.push('/')
            }else{
                Message.error(res.msg)
            }

        }

    }
}