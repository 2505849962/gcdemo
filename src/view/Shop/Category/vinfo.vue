<template>
  <el-dialog :title="info.isAdd ? '添加分类':'修改分类'" @close="cancel"  :visible.sync="info.isShow" width="50%">
    <!-- 表单 -->
    <el-form :model="forminfo" :rules="rules" ref="form" label-width="120px">
      <!-- 下拉框 -->
      <el-form-item label="上级目录">
        <el-select v-model="forminfo.pid" placeholder="请选择">
          <el-option label="顶级目录" :value="0"></el-option>
          <el-option
            v-for="item in catelist"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="forminfo.catename" placeholder="请输入分类名称"></el-input>
      </el-form-item>

     <el-form-item label="分类图片">
        <el-upload
              action=""
              :auto-upload="false" 
              list-type="picture-card"
              :limit="1"
              :on-preview="see"
              :on-change="change"
              :on-remove="remove"
              :file-list="filelist">
        <!--auto-upload 是否在选取文件后立即进行上传 -->
        <!--list-type 文件列表的类型 -->
        <!-- on-preview	点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据 -->
        <!-- on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 -->
        <!-- on-remove	文件列表移除文件时的钩子 -->
        <!-- file-list	上传的文件列表 -->
              <i slot="default" class="el-icon-plus"></i>
        </el-upload>
       
       <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
                <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

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
import { addCategory, editCategory } from "@/request/category";
import { mapGetters, mapActions } from "vuex";


let defaultItem = {
  pid: 0,
  catename: "",
  img: "",
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
      dialogVisible:false,
      dialogImageUrl:"",
      forminfo: { ...defaultItem },
      rules: {
        // 验证规则对象！
        catename: [{ required: true, message: "必填！", trigger: "blur" }],
      },
      filelist:[]
    };
  },
  computed: {
    ...mapGetters({
      catelist: "category/categorylist",
    }),
  },
  mounted(){
   if(!this.catelist.length){
     this.get_category_list();
   }
  },
  created() {},
  methods: {
    // 图片预览
    see(file){
      this.dialogVisible = true;
      this.dialogImageUrl = file.url
    },
    change(file,filelist){
      // console.log(filelist)
      // console.log(file)
      this.forminfo.img = file.raw  //raw 上传文件的js原生信息
    },
    remove(file,filelist){
      this.forminfo.img = ""
    },


    ...mapActions({
      get_category_list: "category/get_category_list",
    }),
    async submit() {
      // 表单验证
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          let sj = new FormData();
          for(let k in this.forminfo){
            sj.append(k,this.forminfo[k])
          }
          if (this.info.isAdd) {
            //判断是添加还是修改
            res = await addCategory(sj);
            // console.log(res);
          } else {
            res = await editCategory(sj);
          }
          if (res.code == 200) {
            this.$message.success(res.msg); //提示添加成功
            this.info.isShow = false;
            this.get_category_list(); // 再次获取列表，让仓库里面的数据是最新的！
            this.cancel()
          } else {  
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if(this.info.isAdd){
        this.forminfo = {...resetItem}
      }else{
        this.setinfo({...defaultItem})
      }
    },
    cancel(){
    this.forminfo = {...resetItem}
    this.filelist = [];
    },
    setinfo(val){
      // console.log(val)
        if(val.img){
          this.filelist = [{
            name:val.catename,
            url:this.$host+val.img
          }]
        }
       val.children ? delete val.children : ''
       defaultItem = {...val} 
       this.forminfo = {...val}
    }
  },
  components: {},
};
</script>
<style scoped>
</style>