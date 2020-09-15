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
                            <el-select v-model="forminfo.second_cateid" @change="topChange" placeholder="请选择">
                                <el-option  v-for="item in catelist" :key="item.id" :label="item.catename"  :value="item.id">
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
                            <el-select v-model="forminfo.goodsid" @change="goodsChange"  placeholder="请选择">
                                <el-option  v-for="item in goodslist" :key="item.id" :label="item.goodsname"  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品属性值">
                            <el-select v-model="forminfo.goodsattr" multiple placeholder="请选择">
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
  goodsid:"",
  goodsattr:"",
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
      forminfo: { ...defaultItem },
      rules: {
        // 验证规则对象！
        goodsname:[{ required: true, message: "必填！", trigger: "blur" }]
      },
      list:[{value:""}],
      activeName:"first"
    };
  },
  computed: {
    ...mapGetters({
        catelist:"category/catelist",
        specslist:"specs/specslist"
    }),
  },
  created(){},
  
  mounted(){
    if(!this.goodslist.length){
      this.get_goods_list()
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
      get_goods_list:"goods/get_goods_list",
   
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
            res = await addGoods(this.forminfo);
            // console.log(res);
          } else {
            res = await editGoods(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg); //提示添加成功
            this.info.isShow = false;
            this.get_goods_list(); // 再次获取列表，让仓库里面的数据是最新的！
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