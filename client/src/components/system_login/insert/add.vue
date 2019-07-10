<template>
  <div>
    <el-form ref="loginForm" :model="form" label-width="80px" class="login-box">
      <el-form-item label="姓名">
        <el-input type="text" style="position:fixed;bottom:-9999px;"></el-input>
        <el-input
          type="text"
          placeholder="请输入姓名"
          v-model="form.youname"
          autocomplete="off"
          clearable
        />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input type="text" style="position:fixed;bottom:-9999px;"></el-input>
        <el-input type="text" placeholder="请输入年龄" v-model="form.age" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input type="text" style="position:fixed;bottom:-9999px;"></el-input>
        <el-input
          type="text"
          placeholder="请输入用户名"
          v-model="form.name"
          autocomplete="off"
          clearable
        />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" style="position:fixed;bottom:-9999px;"></el-input>
        <el-input
          type="text"
          placeholder="请输入密码"
          v-model="form.password"
          autocomplete="off"
          clearable
        />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="text" style="position:fixed;bottom:-9999px;"></el-input>
        <el-input
          type="text"
          placeholder="请输入地址"
          v-model="form.address"
          autocomplete="off"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import "element-ui/lib/theme-chalk/index.css";
import { reqaddemploy } from "../../../api";
export default {
  data() {
    return {
      form: {
        youname: "",
        age: "",
        name: "",
        password: "",
        sex: "",
        address: ""
      }
    };
  },
  methods: {
    async submit() {
    const { youname, age, name, password, sex, address } = this.form;
    console.log( { youname, age, name, password, sex, address })
     const result=await reqaddemploy({ youname, age, name, password, sex, address });
     console.log("df")
      if(result.code===0){
        this.$alert("用户名已经存在", "警告", {
            confirmButtonText: "确定"
          });
      return;
      }else{
        this.$router.push('/slogin')
      }
      // this.$router.push('/slogin')
    }
  }
};
</script>
<style scoped>
.login-box {
  margin-top: 50px;
}
</style>
