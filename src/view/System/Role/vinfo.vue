<template>
  <el-dialog :title="info.isAdd ? '添加角色':'修改角色'" @close="cancel" :visible.sync="info.isShow" width="50%">
    <!-- 表单 -->
    <el-form :model="forminfo" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="forminfo.rolename" placeholder="请输入角色名称"></el-input>
      </el-form-item>

      <el-form-item label="角色权限">
          <el-tree  
          node-key="id" 
          :props="{children:'children',label:'title'}" 
          :data="menulist" 
          show-checkbox  
          ref="tree" 
          :check-strictly="checkStrictly">
          </el-tree>

      </el-form-item>

      <el-form-item label="角色状态" prop="status">
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
import { addRole, editRole } from "@/request/role";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  rolename:"",
  menus:"",
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
        rolename:[{ required: true, message: "必填！", trigger: "blur" }]
      },
      checkStrictly:false
    };
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist",
    }),
  },
  created() {},
  mounted(){
    if(!this.menulist.length){
      this.get_menu_list()
    }
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
      get_role_list:"role/get_role_list"
    }),
    // 提交
    async submit(){
        let idarr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());   
        //getCheckedKeys 获取到选中的节点 拼接 getHalfCheckedKeys  若节点可被选择返回目前半选中的节点所组成的数组
        console.log(idarr)

        if(idarr.length){
          this.forminfo.menus = idarr
        }else{
          this.$message.error("请选择权限")
          return
        }

        // 表单验证
      this.$refs.form.validate(async (valid) => {
        if (valid) {    //表单验证如果通过验证则继续执行
          let res;
          if (this.info.isAdd) {
            //判断是添加还是修改
            res = await addRole(this.forminfo);
            // console.log(res);
          } else {
            res = await editRole(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg); //提示添加成功
            this.info.isShow = false;
            this.get_role_list(); // 再次获取列表，让仓库里面的数据是最新的！
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
         this.$refs.tree.setCheckedKeys([])
      }else{
         this.setinfo({...defaultItem})  //如果不是添加就给赋值为获取到的数据
      }
       
    },
    //表单的@close 事件
    cancel(){
      this.forminfo = {...resetItem}  //重新赋值
      this.$refs.tree.setCheckedKeys([])  //清空树结构
    },


    // 数据的回显操作
    // 修改按钮点击 获得数据传给setinfo
    setinfo(val){
       
      let idarr = val.menus.split(",")

      if(idarr[0]){
        this.checkStrictly = true;  //修改之前父子互不关联
        this.$nextTick(()=>{   //vue中的方法 等到节点渲染完之后在执行某些操作
          this.$refs.tree.setCheckedKeys(idarr)
          this.checkStrictly = false;  //修改之后再次关联上
        })
      }
        defaultItem = {...val};
        this.forminfo = {...val};
    },
    
  },
  components: {},
};
</script>
<style scoped>

</style>