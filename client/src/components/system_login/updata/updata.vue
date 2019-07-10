<template>
  <div>
    <el-form ref="loginForm" :model="form" label-width="80px" class="login-box">
      <el-form-item label="姓名">
        <el-input type="text" style="position:fixed;bottom:-9999px;"></el-input>
        <el-input
          type="text"
          placeholder="请输入姓名"
          v-model="youname"
          autocomplete="off"
          clearable
        />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input type="text" style="position:fixed;bottom:-9999px;"></el-input>
        <el-input type="text" placeholder="请输入年龄" v-model="age" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input type="text" style="position:fixed;bottom:-9999px;"></el-input>
        <el-input type="text" placeholder="请输入用户名" v-model="name" autocomplete="off" clearable/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="text" style="position:fixed;bottom:-9999px;"></el-input>
        <el-input
          type="text"
          placeholder="请输入地址"
          v-model="address"
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
import { postupdata } from "../../../api";
import vm from '../vm1'
export default {
  data() {
    return {
      name:'',
      sex:"",
      age:"",
      youname:"",
      address:"",
      password:"",
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
  mounted() {
  },
  created() {
  this.name=this.$route.query.data.name;
  this.youname=this.$route.query.data.youname
  this.address=this.$route.query.data.address
  this.sex=this.$route.query.data.sex
  this.age=this.$route.query.data.age
  },
  methods: {
    async submit(){
     const {youname,age,name,sex,address}=this
     const result=await postupdata({youname,age,name,sex,address})
     this.$router.push('/slogin')
    }

  }
};
</script>
<style scoped>
.login-box {
  margin-top: 50px;
}
</style>
