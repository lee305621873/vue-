var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
const schema=mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String
    }
})
const schema1=mongoose.Schema({
    youname:{
        type:String
    },
    age:{
        type:String
    },
    name:{
       type:String
    },
    password:{
        type:String
    },
    sex:{
        type:String
    },
    address:{
        type:String
    }
})

const schema2=mongoose.Schema({
    employname:{
        type:String//员工名字
    },
    mach:{
        type:String//机器数
    },
    workName:{
      type:String//工件名字
    },
    workNumbmer:{
        type:String//工件数
    },
    job1:{
        type:Array
    },
    job2:{
        type:Array
    },
    job3:{
        type:Array
    },
    job4:{
        type:Array
    },
    job5:{
        type:Array
    }
})
const schema3=mongoose.Schema({
    employname: {
        type: String //员工名字
    },
    workName:{
        type:String//工件名字
    },
    jobNumber:{
        type:String//第几个工序
    },
    startTime:{
        type:String//开始时间
    },
    endTime:{
       type:String//结束时间
    }
})


const schema4=mongoose.Schema({
    employname: {
        type: String//员工名字
    },
    workName:{
        type:String//工件名字
    },
    allTime:{
        type:String//所有时间
    }
})

const schema5=mongoose.Schema({
    employname: {
        type: String//员工名字
    },
    workName:{
        type:String//工件名字
    },
    cycleTime:{
      type:String//工件加工周期
    },
    jobPrice:{
        type:String//工件价格
    }
})
var system=mongoose.model('systems',schema);
// var a=new system({name:"lee",password:"305621"})
// a.save();
var employ=mongoose.model('employs',schema1);

var workjob=mongoose.model('workjob',schema2);

var startEnd=mongoose.model('startEnd',schema3);
 
var allTime=mongoose.model('allTime',schema4);

var workInformation=mongoose.model('workInformation',schema5);

exports.getmodel=function(name){return mongoose.model(name)}