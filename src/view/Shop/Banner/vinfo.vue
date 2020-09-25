<template>
  <el-dialog :title="info.isAdd ? '添加轮播图':'修改轮播图'" @close="cancel"  :visible.sync="info.isShow" width="50%">
    <!-- 表单 -->
    <el-form :model="forminfo" :rules="rules" ref="form" label-width="120px">

      <el-form-item label="轮播图名称" prop="title">
        <el-input v-model="forminfo.title" placeholder="请输入名称"></el-input>
      </el-form-item>
         <!--轮播图图片-->
      <el-form-item label="轮播图片">
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
        <el-button type="primary" @click="submit">立即添加</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addBanner, editBanner } from "@/request/banner";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  id: 0,
  title: "", //轮播图名称
  img: "",  //图片
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
      },
       dialogVisible:false,
       dialogImageUrl:"",
       filelist:[]
    };
  },
  computed: {
    ...mapGetters({
      bannerlist: "banner/bannerlist",
    }),
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
      get_banner_list: "banner/get_banner_list",
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
            res = await addBanner(sj);
            console.log(res);
          } else {
            res = await editBanner(sj);
          }
          if (res.code == 200) {
            this.$message.success(res.msg); //提示添加成功
            this.info.isShow = false;
            this.get_banner_list(); // 再次获取列表，让仓库里面的数据是最新的！
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
    setinfo(val) {
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
    },
    cancel(){
     this.forminfo = {...resetItem}
     this.filelist = [];
    }
  },
  components: {},
};
</script>
<style scoped>
</style>