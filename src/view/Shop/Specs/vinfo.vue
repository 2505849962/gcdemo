<template>
  <el-dialog :title="info.isAdd ? '添加商品规格':'修改商品规格'" @close="cancel" :visible.sync="info.isShow" width="50%">
    <!-- 表单 -->
     <el-form :model="forminfo" ref="form" :rules="rules" label-width="150px">
    
      <el-form-item label="商品规格名称" prop="specsname">
        <el-input v-model="forminfo.specsname" placeholder="请输入商品规格名称"></el-input>
      </el-form-item>

       <el-form-item label="商品属性">
         <label v-for="(item,index) in list" :key="index" >
            <el-input v-model="item.value"  placeholder="请输入商品属性" style="display:inline-block;width:200px;margin-bottom:10px;"></el-input>
            <el-button v-if="index==0"  type="primary" @click="addAttrs">添加属性</el-button>
            <el-button v-else type="danger" @click="delAttrs(index)">删除属性</el-button>
         </label>
         
      </el-form-item>

    
      <el-form-item label="状态" prop="status">
        <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>

      <el-form-item label>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
     </el-form>
  </el-dialog>
</template>

<script>
import { addSpecs, editSpecs } from "@/request/specs";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  specsname:"",
  attrs:"",
  status: 1, //状态 1正常 2禁用
};
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      forminfo: { ...defaultItem },
      rules: {
        // 验证规则对象！
        specsname:[{ required: true, message: "必填！", trigger: "blur" }]
      },
      list:[{value:""}]
    };
  },
  computed: {
    ...mapGetters({
      specslist: "specs/specslist",
    }),
  },
  created(){},
  
  mounted(){
    if(!this.specslist.length){
      this.get_specs_list()
    }
  },
  methods: {
      //添加属性
      addAttrs(){
         this.list.push({value:""})
      },
      // 删除属性
      delAttrs(idx){
        this.list.splice(idx,1)
      },

    ...mapActions({
      get_specs_list:"specs/get_specs_list",
   
    }),
    // 提交
    async submit(){
       if(!this.list.every(val=>val.value)){
         this.$message.warning("请输入属性值")
         return;
       }
     this.forminfo.attrs = this.list.map(val=>val.value);
     this.forminfo.attrs = this.forminfo.attrs.join(',')


        // 表单验证
      this.$refs.form.validate(async (valid) => {
        if (valid) {    //表单验证如果通过验证则继续执行
          let res;
          if (this.info.isAdd) {
            //判断是添加还是修改
            res = await addSpecs(this.forminfo);
            // console.log(res);
          } else {
            res = await editSpecs(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg); //提示添加成功
            this.info.isShow = false;
            this.get_specs_list(); // 再次获取列表，让仓库里面的数据是最新的！
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset(){
      if(this.info.isAdd){
         this.forminfo = {...resetItem}
      }else{
         this.setinfo({...defaultItem})  //如果不是添加就给赋值为获取到的数据
      }
    },
    //表单的@close 事件
    cancel(){
      this.forminfo = {...resetItem}  //重新赋值
      this.list = [{value:""}]
    },
    // 数据的回显操作
    setinfo(val){
        this.list = val.attrs.map(v=>({
          value:v
        }))
        defaultItem = {...val};
        this.forminfo = {...val};
    },
  },
  components: {},
};
</script>
<style scoped>
</style>