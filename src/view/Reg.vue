<template>
   <el-row class="login-bg">
      <el-col :span="8" class="login-box">
          <!-- <h3>小U商城管理系统</h3> -->
          <el-form :model="forminfo" ref="form" :rules="rules" >
            <el-form-item prop="nickname">
              <el-input v-model="forminfo.nickname" placeholder="请输入昵称">
                  <template slot="prepend">
                    <i class="el-icon-user"></i>
                  </template>
              </el-input>
            </el-form-item>

              <el-form-item prop="phone">
              <el-input v-model="forminfo.phone" placeholder="请输入手机号">
                  <template slot="prepend">
                    <i class="el-icon-user"></i>
                  </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="forminfo.password" show-password placeholder="请输入密码">
                  <template slot="prepend">
                    <i class="el-icon-lock"></i>
                  </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button class="login-btn" type="primary" @click="submit">立即注册</el-button>
            </el-form-item>
          </el-form>
      </el-col>  
   </el-row>
</template>
<script>

import { REG } from "@/request/user"

let defaultItem = {
        nickname:"",  //昵称
        phone:"",     //手机号
        password:"",   //密码
}
export default {
 data(){
 return{
     forminfo:{...defaultItem},
     rules:{
       nickname:[{ required: true, message: "必填！", trigger: "blur" }],
       phone:[{ required: true, message: "必填！", trigger: "blur" }],
       password:[{ required: true, message: "必填！", trigger: "blur" }]
     }
 }
 },
        methods:{
            submit(){
            this.$refs.form.validate(valid=>{
                if(valid){
                 REG(this.forminfo)
                 alert("注册成功")
                  this.forminfo = {...defaultItem}
                }

            })
         }
        }
}

</script>
<style scoped>
.login-bg{
   width: 100vw;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   background-image: url("../assets/2.jpg");
   background-size: 100% 100%;
}
.login-box{
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0,0,0,.2);
  padding: 30px 40px;
  border-radius: 5px;
  border:1px solid #eee;
}
.login-box h3{
  line-height: 40px;
  text-align: center;
  margin-bottom: 20px;
}
.login-btn{
  display: block;
  width: 100%;
}

</style>