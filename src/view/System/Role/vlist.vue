<template>
 <div class="table-bg">
    <el-table
    :data="rolelist">
       <el-table-column label="ID" prop="id" align="center"></el-table-column>
       <el-table-column label="角色名称" prop="rolename" align="center"></el-table-column>
       
         <el-table-column
          label="类型">
            <template slot-scope="scope">
               <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
               <el-tag type="warning" v-if="scope.row.status==2">禁用</el-tag>
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
import { delRole } from "@/request/role"
export default {
 data(){
 return{
 }
 },
  created(){},
    computed:{
    ...mapGetters({
      rolelist:"role/rolelist"
    })
  },
  mounted(){
    if(!this.rolelist.length){
      this.get_role_list()
    }
  },

 methods:{
   ...mapActions({
     get_role_list:"role/get_role_list"
   }),
   
   async del(id){
         this.$confirm('是否永久删除此文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
          let res = await delRole(id)
            if(res.code == 200){
                this.$message.success(res.msg)
                this.get_role_list()
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

}

</script>
<style scoped>
</style>