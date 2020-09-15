import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// 这段代码为了解决 element-ui 同路由强制跳转到同路由报错问题，原因是 element-ui和路由的版本冲突！
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/login',
      component:()=>import("@/view/Login"),
      meta:{title:"登录"}
    },
    {
      path: '/',
      component:()=>import("@/view/Layout"),
      meta:{title:"XXX管理系统"},
      redirect:"/index",
      children:[
        {
          path:"/index",
          component:()=>import("@/view/Index"),
          meta:{title:"后台首页"}
        },
        {
          path:'/menu',
          component:()=>import("@/view/System/Menu"),
          meta:{title:"菜单管理"}
        },
        {
          path:"/role",
          component:()=>import("@/view/System/Role"),
          meta:{title:"角色管理"}
        },
        {
          path:"/user",
          component:()=>import("@/view/System/User"),
          meta:{title:"管理员管理"}
        },
        {
          path:"/banner",
          component:()=>import("@/view/Shop/Banner"),
          meta:{title:"轮播图管理"}
        },
        {
          path:"/category",
          component:()=>import("@/view/Shop/Category"),
          meta:{title:"分类管理"}
        },
        {
          path:"/goods",
          component:()=>import("@/view/Shop/Goods"),
          meta:{title:"商品管理"}
        },
        {
          path:"/member",
          component:()=>import("@/view/Shop/Member"),
          meta:{title:"会员管理"}
        },
        {
          path:"/seckill",
          component:()=>import("@/view/Shop/Seckill"),
          meta:{title:"秒杀管理"}
        },
        {
          path:"/specs",
          component:()=>import("@/view/Shop/Specs"),
          meta:{title:"规格管理"}
        }
      ]
    },

  ]
})


router.beforeEach((to,from,next)=>{
  if(to.path=="/login"){
    document.title = to.meta.title
    next();
  }else{
    if(localStorage.getItem("userinfo")){
      let whiteList = store.getters['user/menus_url'];
      whiteList.push('/index')
      if(whiteList.includes(to.path)){
        document.title = to.meta.title
        next();
      }
    }else{
      next('/login')
    }
  }
 

})


export default router