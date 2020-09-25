<template>
 <div class="table-bg">
    <el-table
    :data="memberlist"
    row-key="id"
    stripe
    style="width: 100%"
    :tree-props="{children: 'children'}"
    >

        <el-table-column prop="uid" label="UID" align="center" width="180"></el-table-column>

        <el-table-column prop="nickname" label="昵称" align="center" width="180">
        </el-table-column>
        
          <el-table-column prop="phone" label="手机号" align="center" width="180">
        </el-table-column>

          <el-table-column label="注册日期" align="center" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.addtime | setTime}}</span>
            </template>
          </el-table-column>


          <el-table-column
          label="修改">

            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
            </template>

         </el-table-column>

  </el-table>
 </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex"


export default {
 data(){
 return{

 }
 },
 created(){
 },

 methods:{
   ...mapActions({
     get_member_list:"member/get_member_list"
   }),
 
   edit(val){
      this.$emit("edit",{...val})
   },
 },
 components:{},
 computed:{
   ...mapGetters({
     memberlist:"member/memberlist"
   }),
 },
 mounted(){
     console.log(this.memberlist)
   if(!this.memberlist.length){
     this.get_member_list();
     console.log(this.memberlist)
   }
 }

}

</script>
<style scoped>
</style>