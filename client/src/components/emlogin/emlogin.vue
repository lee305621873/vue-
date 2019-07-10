<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item label="员工名字" class="el1">
        <el-input v-model="employname" placeholder="员工名字"></el-input>
      </el-form-item>
      <el-form-item label="工件名字" class="el1">
        <el-input v-model="workName" placeholder="工件名字"></el-input>
      </el-form-item>
      <el-form-item label="工件数" class="el1">
        <el-input v-model="workNumber" placeholder="工件数"></el-input>
      </el-form-item>
      <el-form-item label="工件加工周期" class="el1">
        <el-input v-model="cycleTime" placeholder="工件加工周期"></el-input>
      </el-form-item>
      <el-form-item label="工件价格" class="el1">
        <el-input v-model="jobPrice" placeholder="工件价格"></el-input>
      </el-form-item>
    <el-form-item label="机器数" class="el1">
        <el-input v-model="mach" placeholder="机器数"></el-input>
      </el-form-item>
      <el-form-item
        class="el2"
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'作业任务' + index"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="{
      required: true, message: '作业不能为空', trigger: 'blur'
    }"
      >
        <el-input v-model="domain.value"></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增工件</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <chart ref="chart1" :options="orgOptions" :auto-resize="true" v-if="flag"></chart>
    
    <chart ref="chart1" :options="orgOptions1" :auto-resize="true" v-if="flag"></chart>
  </div>
</template>
<script>
import echarts from 'echarts'
import option from './a'
import {postjob} from '../../api/index'
import option1 from './echart'
export default {
  data() {
      return {
        employname:'',
        workName:'',
        workNumber:'',
        cycleTime:'',
        jobPrice:'',
        mach:'',
        flag:false,
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          em: ''
        },
        orgOptions: option,
        orgOptions1: option1
      };
    },
    created() {
      console.log(this.$route.query)
      this.employname=this.$route.query.name;
        },
    methods: {
       async submitForm(formName) {
         const {employname,workName,workNumber,cycleTime,jobPrice,mach}=this
         var arr=[]
        this.$refs[formName].validate((valid) => {
          if (valid) {
             for(let i=0;i<this.dynamicValidateForm.domains.length;i++) {
              arr.push(this.dynamicValidateForm.domains[i].value)
             }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
        const result =await postjob({employname,workName,workNumber,cycleTime,jobPrice,mach,job:arr})
        const mock=result.data;
        const mock1=result.joball;
        console.log(mock)
        var values = []
        var values1=[]
        let colors = ['yellow', 'blue', 'deepskyblue', 'green', 'gray', 'red', 'pink', 'black']
        for (let machineId in mock) {
        for (let i = 0; i < mock[machineId].length; i++) {
          let startTime = mock[machineId][i].startTime
          let endTime = mock[machineId][i].endTime
          values.push({
          name: mock[machineId][i].job,
        value: [+machineId - 1, startTime, endTime, endTime - startTime],
          color: colors[mock[machineId][i].job]
      })
   }
    }


     for (let machineId in mock1) {
        for (let i = 0; i < mock1[machineId].length; i++) {
          let startTime = mock1[machineId][i].startTime
          let endTime = mock1[machineId][i].endTime
          values1.push({
          name: mock1[machineId][i].mach,
        value: [+machineId - 1, startTime, endTime, endTime - startTime],
          color: colors[mock1[machineId][i].mach]
      })
   }
    }
    console.log(values1)


      var data = []
      var startTime = 0
      var categories = ['机器1', '机器2', '机器3']
      for (let i = 0; i < values.length; i++) {
      data.push({
      name: values[i].name,
      value: values[i].value,
      itemStyle: {
      normal: {
        color: values[i].color
      }
    }
  })
}

    var joball = []
      var startTime = 0
      for (let i = 0; i < values1.length; i++) {
      joball.push({
      name: values1[i].name,
      value: values1[i].value,
      itemStyle: {
      normal: {
        color: values1[i].color
      }
    }
  })
}
     console.log(data);
     console.log(joball);
     this.orgOptions.series[0].data=data;
     this.orgOptions1.series[0].data=joball;
     this.flag=true
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
        // console.log(this.dynamicValidateForm.domains)
        // console.log(this.dynamicValidateForm.domains[0].value)
      }
    },
    computed: {

    },
    mounted() {

    },

}
</script>
<style scoped>
.el1 {
  width: 300px;
}
.demo-dynamic {
  margin-top: 70px;
}
.el2 {
  width: 70vw;
}
</style>

