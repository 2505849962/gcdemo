<template>
  <div class="table-bg">
      <el-table  :data="list">
    
          <el-table-column prop="title" label="活动名称" align="center"></el-table-column>
         
          <el-table-column label="开始时间" align="center" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.begintime | setTime}}</span>
            </template>
          </el-table-column>
          
          <el-table-column label="结束时间" align="center" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.endtime | setTime}}</span>
            </template>
          </el-table-column>

      
          <el-table-column label="状态">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
                  <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
              </template>
          </el-table-column>
         
          <el-table-column label="修改">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
                    <el-button type="danger" size="small"  @click="del(scope.row.id)"  circle icon="el-icon-delete"></el-button>
                </template>
          </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { delSeck,getSeck} from "@/request/seckill"
export default {
    data(){
        return{
            list:[] //存放数据的
        }
    },

    computed: {
       
    },
    mounted() {
      this.getlist()
      
    },
    methods:{
        async getlist(){
            let res = await getSeck();
            this.list = res
        },

        async del(id){
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                let res = await delSeck(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    // 如果本页只有1条数据！且不是第1页！
                   this.getlist()
                }else{
                    this.$message.error(res.msg)
                }
            }).catch(()=>{})
        },

        edit(val){
            this.$emit('edit',{...val})
        },
    },
    components:{}
}
</script>
<style scoped>
</style>