<template>
  <el-dialog :title="info.isAdd ? '添加商品':'修改商品'" @close="cancel" :visible.sync="info.isShow" width="50%">

    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="100px">
    <!-- teb切换 -->
      <el-tabs v-model="activeName" tab-position="left">
            <el-tab-pane label="基本信息" name="first">
               <el-row>
                  <el-col :span="12" :offset="5">
                      <!-- 一级分类 -->
                      <el-form-item label="一级分类">
                            <el-select v-model="forminfo.first_cateid" @change="topChange" placeholder="请选择">
                                <el-option  v-for="item in catelist" :key="item.id" :label="item.catename"  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                       <el-form-item label="二级分类">
                            <el-select v-model="forminfo.second_cateid" placeholder="请选择">
                                <el-option  v-for="item in secondlist" :key="item.id" :label="item.catename"  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                      <el-form-item label="商品名称" prop="goodsname">
                        <el-input v-model="forminfo.goodsname" placeholder="请输入商品名称"></el-input>
                     </el-form-item> 
                       <el-form-item label="商品价格" prop="price">
                        <el-input v-model="forminfo.price" placeholder="请输入商品名称"></el-input>
                     </el-form-item>  
                       <el-form-item label="市场价格" prop="market_price">
                        <el-input v-model="forminfo.market_price" placeholder="请输入商品名称"></el-input>
                     </el-form-item>  
                      <el-form-item label="商品图片">
                            <el-upload
                                action=""
                                :auto-upload="false"
                                list-type="picture-card"
                                :limit="1"
                                :on-preview="see"
                                :on-change="change"
                                :on-remove="remove"
                                :file-list="filelist"
                            >
                                <i slot="default" class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                      </el-form-item> 
                      <el-form-item label="商品规格">
                            <el-select v-model="forminfo.specsid" @change="specsChange"  placeholder="请选择">
                                <el-option  v-for="item in specslist" :key="item.id" :label="item.specsname"  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品属性值">
                            <el-select v-model="forminfo.specsattr" multiple placeholder="请选择">
                                <el-option  v-for="item in attrslist" :key="item" :label="item"  :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item> 
  
              <el-form-item label="是否新品">
                  <el-switch v-model="forminfo.isnew" :active-value="1" :inactive-value="2"></el-switch>
              </el-form-item>
               <el-form-item label="是否热卖">
                  <el-switch v-model="forminfo.ishot" :active-value="1" :inactive-value="2"></el-switch>
              </el-form-item>
               <el-form-item label="状态" prop="status">
                <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
              </el-form-item>

           </el-col>
         </el-row>
        </el-tab-pane>

        <el-tab-pane label="详细描述" name="second">
          <el-row>
            <el-col>
                <vue-wangeditor  ref="wangeditor" width="100%"  height="400"  id="editor" ></vue-wangeditor>
            </el-col>
          </el-row>
        </el-tab-pane>

      </el-tabs>


      <el-row>
        <el-col :span="16" :offset="5">
          <el-form-item label>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form> 
  </el-dialog>
</template>

<script>
import vueWangeditor from "vue-wangeditor"

import { addGoods, editGoods } from "@/request/goods";
import { mapGetters, mapActions } from "vuex";

let defaultItem = {
  first_cateid:"",
  second_cateid:"",
  goodsname:"",
  price:"",
  market_price:"",
  img:"",
  description:"",
  specsid:"",
  specsattr:"",
  isnew:2,
  ishot:2,
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
        goodsname:[{ required: true, message: "必填！", trigger: "blur" }]
      },

        filelist:[],  // [{name:'',url:''}]
        activeName:'first',
        secondlist:[],  // 二级分类
        attrslist:[]  // 规格值列表
    };
  },
  computed: {
    ...mapGetters({
        catelist: "category/categorylist",
        specslist:"specs/specslist"
    }),
  },
  created(){},
  
  mounted(){
    if(!this.catelist.length){
      this.get_category_list()
    }
    if(!this.specslist.length){
      this.get_specs_list()
    }
  },
  methods: {
    ...mapActions({
      get_category_list:"category/get_category_list",
      get_specs_list:"specs/get_specs_list",
      get_goods_list:"goods/get_goods_list"
    }),
      see(file){
            this.dialogVisible = true;
            this.dialogImageUrl = file.url // JS 生成的预览地址！
        },
        change(file,fileList){
            this.forminfo.img = file.raw;  // file.raw 是原生文件信息！
        },
        remove(file,fileList){
             this.forminfo.img =''
        },
       topChange(id){  // 一级分类变化
            this.secondlist = []
            this.forminfo.second_cateid = ''
            // id就是选中的ID，根据这个ID遍历一级分类数组，找出其对应的chilren就是二级分类列表！
            this.catelist.forEach(val=>{
                if(val.id==id){
                    this.secondlist = val.children;
                }
            })
        },
        specsChange(id){  // 规格名发生变化
            this.attrslist = [];
            this.forminfo.specsattr = [];
            this.specslist.forEach(val=>{
                if(val.id==id){
                    this.attrslist = val.attrs;
                }
            })
        },
        setinfo(val){  // 将数据赋给默认defaultItem; 赋给表单
            if(val.img){
                this.filelist = [{
                    name:val.catename,
                    url:this.$host+val.img
                }]
            }
            val.children ? delete val.children:''
            this.topChange(val.first_cateid)
            this.specsChange(val.specsid)
            'firstcatename' in val ? delete val.firstcatename:'';
            'secondcatename' in val ? delete val.secondcatename:'';
            // 手动设置编辑器的内容
            this.$nextTick(()=>{
                console.log(this.$refs.wangeditor)
                this.$refs.wangeditor.setHtml(val.description);
            })
            defaultItem = {...val};
            this.forminfo = {...val};
        },
    // 提交
    async submit(){
     // 文章正文！
            this.forminfo.description = this.$refs.wangeditor.getHtml();
            // gethtml sethtml 是wangeditor组件自带的方法
            // 表单验证！
            this.$refs.form.validate(async valid=>{
                if(valid){ // 如果验证通过！
                    let res;
                    // 提交FormData类型！
                    let fd = new FormData();
                    for(let k in this.forminfo){
                        fd.append(k,this.forminfo[k])
                    }
                    if(this.info.isAdd){ // 添加还是修改！
                        res = await addGoods(fd);
                    }else{
                        res = await editGoods(fd)
                    }
                    if(res.code==200){
                        this.$message.success(res.msg)
                        this.info.isShow = false;
                        this.get_goods_list();  // 再次获取列表，让仓库里面的数据是最新的！
                        this.cancel();
                    }else{
                        this.$message.error(res.msg)
                    }
                }
            })
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
      this.filelist = [];
      this.$refs.wangeditor.setHtml("")
    },
    // 数据的回显操作
  },
  components: {
    vueWangeditor
  },
};
</script>
<style scoped>
</style>