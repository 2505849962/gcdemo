<template>
<div>
  <div class="tabnav">
     <el-scrollbar class="scroll-bar">
        <el-tag
            v-for="(item,idx) in tablist"
            :key="idx"
            closable
            :type="isActive(item.path) ? 'danger':'' "
            @close="clearSingle(item.path,idx)"
            >
            <router-link :to="item.path">{{item.name}}</router-link>
        </el-tag>
     </el-scrollbar>
  </div>

     <div class="rightmenu">
        <el-dropdown :hide-on-click="false" class="">
        <span class="el-dropdown-link">
            标签管理<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  @click.native="DEL_ALL" >关闭全部</el-dropdown-item>
            <el-dropdown-item  @click.native="DEL_ATHER($route.fullPath)" >关闭其他</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
     </div>
     

   

 </div>
</template>

<script>


import { mapMutations,mapActions, mapGetters } from "vuex"
export default {
 data(){
 return{
     list:['111','2222','3333','dddddddddddddddd']
 }
 },
 created(){},
 computed:{
    ...mapGetters({
        tablist:"tabnav/tablist"
    })
 },
 methods:{
     ...mapMutations({
         SET_PATH:'tabnav/SET_PATH',
         DEL_PATH:'tabnav/DEL_PATH',

         DEL_ALL:'tabnav/DEL_ALL',
         DEL_ATHER:'tabnav/DEL_ATHER',
     }),
     isActive(path){
         return path == this.$route.fullPath
     },
     clearSingle(path,index){
       if(this.$route.path == path){
          this.DEL_PATH({index,isActive:true})
       }else{
        this.DEL_PATH({index})
       }
     }

 },
  watch:{
    $route:{
        immediate:true,
        deep:true,
        handler(newval){
         this.SET_PATH(newval)
        }
    }
  },
  
 components:{}
}
</script>
<style scoped>
.tabnav{
    width: 100%;
    height: 60px;
    position: absolute;
    left: 0;
    background-color: #fff;
    border-top: 1px solid #eee;
}
.el-tag {
    height: 40px;
    line-height: 40px;
    display: inline-block;
    margin: 10px 5px;   
}
.el-tag a{
    text-decoration: none;
}


.rightmenu{
     width: 86px;
     height: 40px;
     background-color: hotpink;
     position: absolute;
     border-radius:5px;
     right:10px;
     line-height: 40px;
     margin-top: 10px;
     margin-right: 10px;
     padding-left: 20px;
}
.rightmenu span{
    color: #fff;
}
</style>