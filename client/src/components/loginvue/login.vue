<template>
  <div>
    <el-form ref="loginForm" :model="form" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎管理员登录</h3>
      <a href="javascript:;" id="a1" @click="flag=!flag" v-if="flag">管理员登录</a>
      <a href="javascript:;" id="a1" @click="flag=!flag" v-else>员工登录</a>
      <el-form-item label="账号">
        <el-input type="text" style="position:fixed;bottom:-9999px;"></el-input>
        <el-input type="text" placeholder="请输入账号" v-model="name" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" style="position:fixed;bottom:-9999px;"></el-input>
        <el-input
          type="text"
          placeholder="请输入密码"
          v-model="password"
          autocomplete="off"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/index.css";
import { reqsystemlogin,reqemlogin} from "../../api";
export default {
  data() {
    return {
      name: "",
      password: "",
      flag: true
    };
  },
  methods: {
   async submit() {
      const { name, password } = this;
      if (this.flag) {
        if (!this.name) {
          this.$alert("请输入用户名", "警告", {
            confirmButtonText: "确定"
          });
          return;
        }
        else if(!this.password){
            this.$alert("请输入密码", "警告", {
            confirmButtonText: "确定"
          });
          return;
          }
        const result= await reqsystemlogin({name,password})
         if(result.code==1){
           console.log(result.code)
            this.$alert("密码或者用户名错误", "警告", {
            confirmButtonText: "确定"
          });
          return;
         }else{
           this.$router.replace('/slogin')
         }
      } else {
         if (!this.name) {
          this.$alert("请输入用户名", "警告", {
            confirmButtonText: "确定"
          });
          return;
        }
        else if(!this.password){
            this.$alert("请输入密码", "警告", {
            confirmButtonText: "确定"
          });
          return;
          }
        const result= await reqemlogin({name,password})
         if(result.code===1){
            this.$alert("密码或者用户名错误", "警告", {
            confirmButtonText: "确定"
          });
          return;
         }else{
           let name=this.name
           this.$router.push({path:'/emlogin',query: {"name":name}})
         }
      }
    }
  }
};
</script>

<style scoped>
#a1 {
  display: block;
  position: relative;
  bottom: 12px;
  left: 271px;
  text-decoration: none;
  color: #0091ff;
}
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
