<template>
 <div class="table-bg">
    <el-table
    :data="bannerlist"
    row-key="id"
    stripe
    style="width: 100%"
    :tree-props="{children: 'children'}"
    >

        <el-table-column
          prop="id"
          label="ID"
          align="center"
          width="180">
        </el-table-column>

        <el-table-column
          prop="title"
          label="轮播图名称"
          align="center"
          width="180">
        </el-table-column>

          <el-table-column
          label="轮播图片">
          <template slot-scope="scope">
          <img style="width:80px" v-if="scope.row.img" :src="scope.row.img | SETIMG" alt="">
              <span v-else>暂无图片</span>
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
import { delBanner } from "@/request/banner"
export default {
 data(){
 return{
 }
 },
 created(){},
 methods:{
   ...mapActions({
     get_banner_list:"banner/get_banner_list"
   }),
   
   async del(id){
         this.$confirm('是否永久删除此文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
          let res = await delBanner(id)
            if(res.code == 200){
                this.$message.success(res.msg)
                this.get_banner_list()
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
     bannerlist:"banner/bannerlist"
   })
 },
 mounted(){
   if(!this.bannerlist.length){
     this.get_banner_list()
   }
 }

}

</script>
<style scoped>
</style>