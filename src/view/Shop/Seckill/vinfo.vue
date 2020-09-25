<template>
  <el-dialog :title="info.isAdd ? '添加商品':'修改商品'" @close="cancel" :visible.sync="info.isShow" width="50%">

    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="100px">
    <!-- teb切换 -->
               <el-row>
                  <el-col :span="12" :offset="3">

                        <el-form-item label="活动名称" prop="title">
                        <el-input v-model="forminfo.title" placeholder="请输入活动名称"></el-input>
                        </el-form-item> 

                       <el-form-item label="活动时间">
                         <el-date-picker
                          v-model="times"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                         </el-date-picker>
                        </el-form-item>

                      <!-- 一级分类 -->
                      <el-form-item label="一级分类">
                            <el-select v-model="forminfo.first_cateid" @change="topChange" placeholder="请选择">
                                <el-option  v-for="item in categorylist" :key="item.id" :label="item.catename"  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                       <el-form-item label="二级分类">
                            <el-select v-model="forminfo.second_cateid"  @change="ChangeSon" placeholder="请选择">
                                <el-option  v-for="item in secondlist" :key="item.id" :label="item.catename"  :value="item.id">
                                </el-option>
                            </el-select>
                       </el-form-item>

                       <el-form-item label="商品">
                            <el-select v-model="forminfo.goodsid" placeholder="请选择">
                                <el-option  v-for="item in goodslist" :key="item.id" :label="item.goodsname"  :value="item.id">
                                </el-option>
                            </el-select>
                       </el-form-item>
                        
                       
               <el-form-item label="状态" prop="status">
                <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
              </el-form-item>

           </el-col>
         </el-row>

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
import { addSeck, editSeck } from "@/request/seckill";
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { getSeckGoods } from "@/request/goods"

let defaultItem = {
  title:"",    //活动名称 
  begintime:"",  //开始时间
  endtime:"",    //结束时间
  first_cateid:"",
  second_cateid:"",
  goodsid:"",   //商品编号
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
        title:[{ required: true, message: "必填！", trigger: "blur" }],
        first_cateid:[{ required: true, message: "必填！", trigger: "blur" }],
      },
        filelist:[],  // [{name:'',url:''}]
        secondlist:[],  // 二级分类
        times:[],   //时间范围
        goodslist:[]   //商品
    };
  },
  computed: {
      ...mapGetters({
        categorylist:'category/categorylist'
      })
  },
  created(){},
  mounted(){
    if(!this.categorylist.length){
      this.get_category_list()
    }
  },
  methods: {
      ...mapActions({
         get_category_list:'category/get_category_list'
      }),

       topChange(id){  // 一级分类变化
            this.secondlist = []
            this.forminfo.second_cateid = ''
            // id就是选中的ID，根据这个ID遍历一级分类数组，找出其对应的chilren就是二级分类列表！
            this.categorylist.forEach(val=>{
                if(val.id==id){
                    this.secondlist = val.children;
                }
            })
        },
      async ChangeSon(){
            let res = await getSeckGoods(this.forminfo.first_cateid,this.forminfo.second_cateid)
            console.log(res)
            this.goodslist = res
        },
        setinfo(val){  // 将数据赋给默认defaultItem; 赋给表单
            console.log(val)
            defaultItem = {...val};
            this.forminfo = {...val};
            this.times = [ new Date(val.begintime*1) , new Date(val.endtime*1)]
            
            this.categorylist.forEach(value=>{
                if(value.id == val.first_cateid){
                   this.secondlist = value.children
                }
            })
            this.ChangeSon()    


        },
    // 提交
    async submit(){
             if(!this.times.length){
                this.$message.warning("请选择活动时间")
                return;
             }
            //  console.log(this.times)
            //  获取时间数据
            this.forminfo.begintime = this.times[0].getTime();
            this.forminfo.endtime = this.times[1].getTime();
            // 表单验证！
            this.$refs.form.validate(async valid=>{
                if(valid){ // 如果验证通过！
                    let res;
                    if(this.info.isAdd){ // 添加还是修改！
                        res = await addSeck(this.forminfo);
                    }else{
                        res = await editSeck(this.forminfo)
                    }
                    if(res.code==200){
                        this.$message.success(res.msg)
                        this.info.isShow = false;
                       this.$parent.update();
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
    },
    // 数据的回显操作
  },
  components: {

  },
};
</script>
<style scoped>
</style>