<template>
  <el-dialog :title="info.isAdd ? '添加菜单':'修改菜单'" @close="cancel"  :visible.sync="info.isShow" width="50%">
    <!-- 表单 -->
    <el-form :model="forminfo" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="菜单类型">
        <el-radio-group v-model="forminfo.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 下拉框 -->
      <el-form-item v-if="forminfo.type==2" label="上级目录">
        <el-select v-model="forminfo.pid" placeholder="请选择">
          <el-option label="顶级目录" :value="0"></el-option>
          <el-option
            v-for="item in menulist"
            v-if="item.type==1"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="forminfo.type==1 ? '目录名称':'菜单名称'" prop="title">
        <el-input v-model="forminfo.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="forminfo.icon" placeholder="请输入图标class"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" prop="url" v-if="forminfo.type==2">
        <el-input v-model="forminfo.url" placeholder="请输入菜单地址"></el-input>
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
import { addMenu, editMenu } from "@/request/menu";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  pid: 0,
  title: "",
  icon: "",
  type: 1, //1目录 2 菜单
  url: "",
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
        title: [{ required: true, message: "必填！", trigger: "blur" }],
        url: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist",
    }),
  },
  created() {},
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
    }),
    async submit() {
      // 表单验证
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            //判断是添加还是修改
            res = await addMenu(this.forminfo);
            console.log(res);
          } else {
            res = await editMenu(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg); //提示添加成功
            this.info.isShow = false;
            this.get_menu_list(); // 再次获取列表，让仓库里面的数据是最新的！
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