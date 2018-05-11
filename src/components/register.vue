<style scoped>
  .box-card{
    width:70%;
    min-width:350px;
  }
  #loginBox{
    background:#fff;
    background-size:100%;
    width:100%;
    height:100%;
  }
</style>
<template>
  <div id="loginBox">
    <el-container>
      <el-header></el-header>
      <el-main>
        <div>
          <el-row style="margin-top:10%;">
            <el-col :span="16">
              &nbsp;
            </el-col>
            <el-col :span="8">

            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Vue from "vue";
  export default {
    data () {
      return {
      }
    },
    methods:{
      submit(e){
        var vm = this;
        this.$refs["loginForm"].$children[0].validate(function(valid){
          if (valid) {
            Vue.set(vm.fdata, 'password', Vue.encode(vm.fdata.password));
            //Todo:ajax
          } else {
            return false;
          }
        });
      },
      forgetPw(){
        //todo:
      },
      signIn(){
        //todo:
      },
      createCode(){
        var code = "";
        var codeLength = 4;//验证码的长度
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
          'S','T','U','V','W','X','Y','Z');//随机数
        for(var i = 0; i < codeLength; i++) {//循环操作
          var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
          code += random[index];//根据索引取得随机数加到code上
        }
        this.validCode = code;//把code值赋给验证码
      }
  },
  mounted:function(){
    this.createCode();
  }
  }
</script>
