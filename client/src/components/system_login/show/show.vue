<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="youname" label="姓名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄" width="180"></el-table-column>
      <el-table-column prop="name" label="用户名" width="180"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="address" label="住址"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="small" @click="Edit(scope.$index)">修改</el-button>
          <el-button size="small" type="danger" @click="dele(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>

        <el-button type="primary" @click="delete1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "element-ui/lib/theme-chalk/index.css";
import { reqemploy, deletename } from "../../../api";
import vm from "../vm1";
export default {
  data() {
    return {
      tableData: [],
      name: "",
      delVisible: false
    };
  },
  methods: {
    async request() {
      const result = await reqemploy();
      this.tableData = result.data;
    },
    dele(name) {
      name = this.tableData[name].name;
      this.name = name;
      this.delVisible = true;
    },
    async delete1() {
      const { name } = this;
      await deletename({ name });
      this.delVisible = false;
      this.$router.go(0);
    },
    Edit:function(name) {
      name = this.tableData[name];
      this.$router.push({path:'/slogin/updata',query: {"data": name}});
    }
  },
  mounted() {
    this.request();
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>

