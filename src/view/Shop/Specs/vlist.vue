<template>
 <div class="table-bg">
    <el-table
    :data="specslist">
       <el-table-column label="ID" prop="id" align="center"></el-table-column>
       <el-table-column label="规格名称" prop="specsname" align="center"></el-table-column>
     
     <el-table-column label="规格属性" align="center">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.attrs" :key="index" type="success">
              {{item}}
          </el-tag>
        </template>
     </el-table-column>

         <el-table-column
          label="状态">
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
      <el-pagination
      @size-change="set_size"
      @current-change="set_page"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </div>
</template>

<script>
import { mapGetters,mapActions, mapMutations } from "vuex"
import { delSpecs } from "@/request/specs"
export default {
 data(){
 return{
 }
 },
  created(){},
    computed:{
    ...mapGetters({
      specslist:"specs/specslist",
      size:"specs/size",
      page:"specs/page",
      total:"specs/total",
    })
  },
  mounted(){
    if(!this.specslist.length){
      this.get_specs_list()
    }
  },

 methods:{
   ...mapMutations({
     SET_PAGE:"specs/SET_PAGE"
   }),
   ...mapActions({
     get_specs_list:"specs/get_specs_list",
     set_page:"specs/set_page",
     set_size:"specs/set_size"
   }),
   
   async del(id){
         this.$confirm('是否永久删除此文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
          let res = await delSpecs(id)
            if(res.code == 200){
                this.$message.success(res.msg)
              // 如果本页只有1条数据！且不是第1页！
                if(this.specslist.length==1 && this.page!=1){
                    this.SET_PAGE(this.page-1)
                }
                this.get_specs_list()
            }else{
              this.$message.error(res.msg)
            }
        }).catch(()=>{})
   },

   edit(val){
    //  console.log(val)
      this.$emit("edit",{...val})
   },
 },
 components:{},

}

</script>
<style scoped>
.el-pagination{
  width:650px;
  margin: 0 auto;
}
</style>