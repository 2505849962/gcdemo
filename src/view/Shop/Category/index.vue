<template>
 <div> 
     <!-- 添加按钮 -->
     <el-button type="primary" @click="add">添加分类</el-button>
     <!-- 列表展示组件 -->
      <vlist @edit="edit"></vlist> 
      <!-- 添加/修改组件 提示框 -->
      <vinfo :info="info" ref="xiu"></vinfo> 
 </div>
</template>

<script>
import vlist from "./vlist"
import vinfo from "./vinfo"
export default {

 data(){
 return{
     info:{
         isAdd:false,
         isShow:false,
     }
 }
 },
 
 methods:{
     add(){
        this.info.isAdd= this.info.isShow = true 
     },
    //  自定义事件来触发
     edit(val){  //接受vlist传来的数据val 
       this.info.isAdd = false;
       this.info.isShow = true;
       this.$refs.xiu.setinfo(val);  //将val 赋值给vinfo中的函数
     }
 },
 components:{
     vlist,vinfo
 }
}

</script>
<style scoped>
</style>