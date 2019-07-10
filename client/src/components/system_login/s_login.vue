<template>
<div>
<div class="line"></div>
<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"  @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
  <el-menu-item index="1"><router-link to='/slogin/show' class="a">用户管理</router-link></el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" >消息中心</el-menu-item>
  <el-menu-item ><router-link to='/slogin/insert'  class="a">添加用户</router-link></el-menu-item>
</el-menu>
  <router-view></router-view>
</div>
</template>
<script>
import "element-ui/lib/theme-chalk/index.css"
export default {
data() {
      return {

      }
    }
}
</script>
<style scoped>
.a{
  text-decoration: none;
}
</style>


