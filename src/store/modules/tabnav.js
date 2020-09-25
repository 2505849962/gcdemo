import router from "@/router"


 let tablist = localStorage.getItem('tablist') ? JSON.parse(localStorage.getItem('tablist')):[]

export default {
  namespaced:true,
  state:{
    tablist:tablist
  },
  getters:{
    tablist:state=>state.tablist
  },
  mutations:{
    SET_PATH(state,route){
      let isExist = state.tablist.some(val=>val.path == route.fullPath)  //返回false true
       if(!isExist){
            state.tablist.push({
                name:route.meta.title,
                path:route.fullPath,
            }) 
            // 实现数据持久化
       localStorage.setItem('tablist', JSON.stringify(state.tablist))
       }
    },
    DEL_PATH(state,{index,isActive}){
        if(isActive){    //如果选中的
            state.tablist.splice(index,1)
            if(state.tablist.length){
               if(index ==0){   //如果是第一个删除 index变化 但还是为零
                   router.push(state.tablist[index].path)  //跳转到为零的
               }else{
                   router.push(state.tablist[index-1].path) //如果不为零 就跳到前一个
               }
            }else{
                router.push("/")  //如果删除最后一个 跳到首页
            }

        }else{   //不是激活
            state.tablist.splice(index,1) 
        }
    },
    
    DEL_ALL(state){
     state.tablist = [],
     localStorage.removeItem('tablist')
     router.push('/')
    },
    DEL_ATHER(state,path){
        console.log(state,path)
        state.tablist = state.tablist.filter(val=>val.path == path)
        localStorage.setItem('tablist',JSON.stringify(state.tablist))
    }
  },
  
}