<template>
 <div class="table-bg">
    <el-table
    :data="menulist"
    row-key="id"
    stripe
    style="width: 100%"
    :tree-props="{children: 'children'}"
    >

        <el-table-column prop="id" label="ID" align="center" width="180"></el-table-column>

        <el-table-column prop="title" label="菜单名称" align="center" width="180">
        </el-table-column>

        <el-table-column prop="url" label="菜单地址" align="center"></el-table-column>

          <el-table-column label="图标">
            <template slot-scope="scope">
               <i :class="scope.row.icon"></i>
            </template>
         </el-table-column>

            <el-table-column label="类型">
            <template slot-scope="scope">
               <el-tag type="success" v-if="scope.row.type==1">目录</el-tag>
               <el-tag type="warning" v-if="scope.row.type==2">菜单</el-tag>
            </template>
         </el-table-column>

          <el-table-column
          label="修改">

            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
                <el-button type="danger" size="small"  @click="del(scope.row.id)"  circle icon="el-icon-delete"></el-button>
            </template>

         </el-table-column>

  </el-table>
 </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex"
import { delMenu } from "@/request/menu"
export default {
 data(){
 return{
 }
 },
 created(){},
 methods:{
   ...mapActions({
     get_menu_list:"menu/get_menu_list"
   }),
   
   async del(id){
         this.$confirm('是否永久删除此文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
          let res = await delMenu(id)
            if(res.code == 200){
                this.$message.success(res.msg)
                this.get_menu_list()
            }else{
              this.$message.error(res.msg)
            }
        }).catch(()=>{})
     
   },
   
   edit(val){
      this.$emit("edit",{...val})
   },
   

 },
 components:{},
 computed:{
   ...mapGetters({
     menulist:"menu/menulist"
   })
 },
 mounted(){
   if(!this.menulist.length){
     this.get_menu_list()
   }
 }

}

</script>
<style scoped>
</style>