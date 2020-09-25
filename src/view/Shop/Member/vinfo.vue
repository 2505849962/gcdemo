<template>

  <el-dialog title="修改会员" @close="cancel"  :visible.sync="info.isShow" width="50%">
    <!-- 表单 -->
    <el-form :model="forminfo" :rules="rules" ref="form" label-width="120px">

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="forminfo.nickname" readonly placeholder="请输入昵称"></el-input>
      </el-form-item>

      <el-form-item label="phone" prop="phone">
        <el-input v-model="forminfo.phone" readonly placeholder="请输入手机号"></el-input>
      </el-form-item>

       <el-form-item label="password" prop="password">
        <el-input v-model="forminfo.password" placeholder="密码为空表示不修改"></el-input>
      </el-form-item>


      <el-form-item label="状态" prop="url" v-if="forminfo.type==2">
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
  import { addMember, editMember } from "@/request/member";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
 uid:"",	         //会员编号，必填项
 nickname:"",      //昵称
 phone:"",	         //手机号
 password:"",     	 //密码
 status:1,	       //状态1正常2禁用
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
        title: [{ required: true, message: "必填！", trigger: "blur" }],
        url: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      memberlist: "member/memberlist",
    }),
  },
  created() {},
  methods: {
    ...mapActions({
      get_member_list: "member/get_member_list",
    }),
    async submit() {
      // 表单验证
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            //判断是添加还是修改
            res = await addMember(this.forminfo);
            console.log(res);
          } else {
            res = await editMember(this.forminfo);

          }
          if(res.code == 200){
            this.$message.success(res.msg); //提示添加成功
            this.info.isShow = false;
            this.get_member_list(); // 再次获取列表，让仓库里面的数据是最新的！
            this.cancel()
          } else {  
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      this.forminfo = { ...defaultItem };
    },
    setinfo(val) {
      val.password = ""
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    
    cancel(){
    this.forminfo = {...resetItem}
    }
  },
  components: {},
};
</script>
<style scoped>
</style>