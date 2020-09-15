<template>
  <el-dialog :title="info.isAdd ? '添加管理员':'修改管理员'" @close="cancel" :visible.sync="info.isShow" width="50%">
    <!-- 表单 -->
     <el-form :model="forminfo" ref="form" :rules="rules" label-width="150px">
       <el-form-item label="管理员角色" prop="roleid">
           <el-select v-model="forminfo.roleid" placeholder="请选择角色">
             <el-option v-for="item in rolelist" 
                        :key="item.id"
                        :label="item.rolename"
                        :value="item.id">
             </el-option>
           </el-select>
       </el-form-item>
    
      <el-form-item label="管理员名称" prop="username">
        <el-input v-model="forminfo.username" placeholder="请输入管理员名称"></el-input>
      </el-form-item>

       <el-form-item label="管理员密码" prop="password">

        <el-input v-model="forminfo.password" :placeholder="info.isAdd ? '请输入管理员密码':'为空表示不修改'"></el-input>
        
      </el-form-item>

       
      <el-form-item label="管理员状态" prop="status">
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
import { addUser, editUser } from "@/request/user";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  roleid:"",
  username:"",
  password:"",
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
        roleid:[{ required: true, message: "必填！", trigger: "blur" }],
        username:[{ required: true, message: "必填！", trigger: "blur" }]

      },
    };
  },
  computed: {
    ...mapGetters({
      rolelist: "role/rolelist",
    }),
  },
  created() {},
  
  mounted(){
    if(!this.rolelist.length){
      this.get_role_list()
    }
  },
  methods: {
    ...mapActions({
      get_role_list:"role/get_role_list",
      get_user_list:"user/get_user_list"
    }),
    // 提交
    async submit(){

       if(this.isAdd && !this.forminfo.password){
         this.$message.warning("请输入密码")
         return;
       }
        
        // 表单验证
      this.$refs.form.validate(async (valid) => {
        if (valid) {    //表单验证如果通过验证则继续执行
          let res;
          if (this.info.isAdd) {
            //判断是添加还是修改
            res = await addUser(this.forminfo);
            // console.log(res);
          } else {
            res = await editUser(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg); //提示添加成功
            this.info.isShow = false;
            this.get_user_list(); // 再次获取列表，让仓库里面的数据是最新的！
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
    },

    // 数据的回显操作
    setinfo(val){
         val.password = ""
        defaultItem = {...val};
        this.forminfo = {...val};
    },
    
  },
  components: {},
};
</script>
<style scoped>
</style>