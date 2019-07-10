var express = require('express')
var all = require('./connnect/connext')
var md5 = require('blueimp-md5')
var systems = all.getmodel('systems')
var employs = all.getmodel('employs')
var router = express.Router()
var workjobs = all.getmodel('workjob')
var startEnds = all.getmodel('startEnd')
var allTimes = all.getmodel('allTime')
var workInformations = all.getmodel('workInformation')
router.post('/system_login', function (req, res) {
    const name = req.body.name;
    const password = req.body.password;
    systems.findOne({
        name
    }, function (err, use) {
        if (use) {
            if (use.password != password) {
                console.log("fdf")
                res.send({
                    code:1,
                    data: '用户名和密码错误'
                })
            } else {
                console.log("dsds")
                res.send({
                    code: 0,
                    data: {
                        name: use.name,
                        password: use.password
                    }
                })
            }
        }else{
        res.send({
            code: 1,
            data: '用户名和密码错误'
        })
        }
    })
})
router.post('/add_employ', function (req, res) {
    const name = req.body.name
    employs.findOne({
        name
    }, function (err, use) {
        if (use) {
            res.send({
                code: 0
            })
        } else {
            res.send({
                code: 1
            })
            const employ = new employs({
                youname: req.body.youname,
                age: req.body.age,
                name: req.body.name,
                password: req.body.password,
                sex: req.body.sex,
                address: req.body.address
            })
            console.log(req.body.name)
            console.log(req.body.password)
            employ.save();
        }
    })
})
router.get('/showemploy', function (req, res) {
    const sex = '男'
    employs.find({
        sex
    }, function (err, use) {
        res.send({
            data: use
        })
    })
})

router.post('/delete', function (req, res) {
    const name = req.body.name;
    employs.remove({
        name
    }, function (err, use) {
        console.log("1")
        res.send({
            code: 1
        })
    })

})




router.post('/updata', function (req, res) {
    var updata = {
        youname: req.body.youname,
        age: req.body.age,
        name: req.body.name,
        sex: req.body.sex,
        address: req.body.address
    }
    const condition = {
        name: req.body.name
    }
    employs.update(condition, updata, function (err, doc) {
        if (err) {
            res.send({
                code: 0
            })
        } else {
            res.send({
                code: 1
            })
        }
    })
})


router.post('/employ_login', function (req, res) {
    const name = req.body.name
    const password = req.body.password
    employs.findOne({
        name
    }, function (err, use) {
        if (use) {
            // console.log("finduse", use);
            if (use.password != password) {
                res.send({
                    code: 1,
                    msg: "用户名和密码错误"
                })
            } else {
                res.send({
                    code: 0,
                    data: {
                        name: use.name,
                        password: use.password
                    }
                })
            }
        }else{
            res.send({
                code: 1,
                data: '用户名和密码错误'
            })
        }
    })

})


router.post('/get_cjdd', function (req, res) {
    //const joball=req.body.job;
    const mach = req.body.mach;
    const jobinit = req.body.job;
    const employname = req.body.employname;
    const workName = req.body.workName;
    const workNumber = req.body.workNumber;
    const cycleTime = req.body.cycleTime;
    const jobPrice = req.body.jobPrice;
    var workjob = new workjobs({
        employname: employname,
        mach: mach,
        workName: workName,
        workName: workNumber,
        job1: jobinit[0],
        job2: jobinit[1],
        job3: jobinit[2],
        job4: jobinit[3],
        job5: jobinit[4]
    })
    workjob.save();
    const job1 = {}
    for (let i = 0; i < jobinit.length; i++) {
        let num = i
        let work = "work" + num;
        let arr1 = jobinit[i].toString().split('').map(v => +v)
        let arr2 = []
        for (let j = 0, k = 1; k < arr1.length;) {
            let arr3 = []
            arr3.push(arr1[j], arr1[k])
            arr2.push(arr3)
            j = j + 2;
            k = k + 2;
        }
        job1[work] = arr2;
    }
    const job = [];
    job.push(job1)
    // console.log(mach)
    // console.log(job)
    // res.send({code:2})
    // console.log(typeof mach)
    // console.log(typeof job)
    // res.send({
    //     job:job
    // })

    // var mach = 3;
    // var job = [{
    //     'work0': [
    //         [1, 3],
    //         [2, 2],
    //         [3, 2]
    //     ],
    //     'work1': [
    //         [1, 2],
    //         [3, 1],
    //         [2, 4]
    //     ],
    //     'work2': [
    //         [2, 4],
    //         [3, 3]
    //     ]
    // }];
    var ans = new Array(100);
    var pre = 10000;
    var num = new Array(10); //第i个机器有几个工序
    var cur = new Array(10); //作业i进行到了第几个工序
    var p = new Array(); //作业i的第j到工序在哪个机器运作
    var t = new Array(); //作业i的第j道工序花费时间
    var worknum = Object.keys(job[0]).length //几个作业数
    var worknum1 = Object.keys(job[0]) //"work1"--"work2".....
    var sum = 0; //所有作业的总工序数
    var m = new Array(10); //第i个机器花费的总时间
    var c = new Array(10) //判断机器相互之间是否有作业时间冲突
    var re = 100000; //作业最短时间
    var ans = new Array(100); //执行顺序
    for (let i = 0; i < worknum; i++) {
        sum = sum + job[0][worknum1[i]].length;
    }
    for (let i = 0; i < 10; i++) {
        m[i] = 0;
        cur[i] = 0;
        c[i] = 0;
    }
    for (var i1 = 1; i1 <= worknum1.length; i1++) {
        var numall = job[0][worknum1[i1 - 1]].length;
        num[i1] = numall;
    }

    for (let i = 1; i <= worknum; i++) {
        p[i] = new Array()
        t[i] = new Array()
        let arr = job[0][worknum1[i - 1]]
        for (let j = 1; j <= num[i]; j++) {
            p[i][j] = arr[j - 1][0];
            t[i][j] = arr[j - 1][1]
        }
    }

    var arr = [];

    function dfs(cnt) {
        var maxn = 0;
        for (let i = 1; i <= mach; i++) {
            maxn = Math.max(maxn, m[i]);
        }
        if (maxn > re) {
            return;
        }
        if (cnt == sum) {
            arr = []
            for (let i = 1; i <= cnt; i++) {
                arr.push(ans[i])
            }
            re = Math.min(re, maxn);
            return;
        } else {
            for (let i = 1; i <= worknum; i++) {
                if (cur[i] == num[i]) {
                    continue;
                } else {
                    let x = cur[i];
                    cur[i]++;
                    let y = m[p[i][cur[i]]];
                    let z = c[i]
                    if (m[p[i][cur[i]]] <= c[i]) {
                        m[p[i][cur[i]]] = c[i] + t[i][cur[i]]
                    } else {
                        m[p[i][cur[i]]] += t[i][cur[i]];
                    }
                    c[i] = m[p[i][cur[i]]]
                    ans[cnt + 1] = i
                    dfs(cnt + 1)
                    c[i] = z
                    cur[i] = x
                    m[p[i][cur[i] + 1]] = y
                }
            }
        }
    }

    dfs(0)

    function getResult(arr) {
        let jobNumber = Object.keys(job[0]).length;
        var processIds = Array.from({
            length: jobNumber + 1
        }, v => 1);
        var maxProcessNumber = Math.max(...Object.keys(job[0]).map(k => job[0][k].length));

        var startTime = [];
        var endTime = [];
        let machineWorkTime = Array.from({
            length: mach + 1
        }, v => 0);
        let fulfill = 0;
        for (let i = 0; i <= jobNumber; i++) {
            startTime.push(Array.from({
                length: maxProcessNumber + 1
            }, v => 0));
            endTime.push(Array.from({
                length: maxProcessNumber + 1
            }, v => 0));
        }
        for (let jobId of arr) {
            let processId = processIds[jobId];
            let machineId = p[jobId][processId];
            let time = t[jobId][processId];
            processIds[jobId]++;
            startTime[jobId][processId] = processId === 1 ? machineWorkTime[machineId] :
                Math.max(endTime[jobId][processId - 1], machineWorkTime[machineId]);
            machineWorkTime[machineId] = startTime[jobId][processId] + time;
            endTime[jobId][processId] = machineWorkTime[machineId];
            fulfill = Math.max(fulfill, machineWorkTime[machineId]);
        }
        return {
            fulfill,
            startTime,
            endTime,
            machineWorkTime,
        }
        // p, t
    }

    // console.log(getResult(arr));
    let jobNumber = Object.keys(job[0]).length;
    var maxProcessNumber = Math.max(...Object.keys(job[0]).map(k => job[0][k].length));
    let result = getResult(arr);
    let data = {};
    //console.log(jobNumber, maxProcessNumber);
    for (let i = 1; i <= jobNumber; i++) {
        for (let j = 1; j <= maxProcessNumber; j++) {
            if (p[i][j] !== undefined) {
                let t = {
                    job: i,
                    process: j,
                    startTime: result.startTime[i][j],
                    endTime: result.endTime[i][j]
                };
                data[p[i][j]] ? data[p[i][j]].push(t) : data[p[i][j]] = [t];
                //console.log(`job:${ i }, process: ${ j }, machine: ${ p[i][j] }, startTime: ${ result.startTime[i][j] }, endTime: ${ result.endTime[i][j] }`);
            }
        }
    }
    //console.log(data)
    let joball = {};
    for (let i = 1; i <= worknum; i++) {
        joball[i] = [];
    }
    for (let i = 1; i <= Object.keys(data).length; i++) {
        let j;
        for (j = 0; j < data[i].length; j++) {
            let t = {
                mach: i,
                process: data[i][j].process,
                startTime: data[i][j].startTime,
                endTime: data[i][j].endTime
            }
            joball[data[i][j].job].push(t);
        }
    }



    for (let i in data) {
        for (let j = 0; j < data[i].length; j++) {
            let job = data[i][j].job;
            let process = data[i][j].process;
            let startTime = data[i][j].startTime;
            let endTime = data[i][j].endTime;
            var startEnd = new startEnds({
                employname: employname,
                workName: job,
                jobNumber: process,
                startTime: startTime,
                endTime: endTime
            })
            startEnd.save();
        }
    }
    var allTime = new allTimes({
        employname: employname,
        workName: workName,
        allTime: re
    })
    allTime.save()
    var workInformation = new workInformations({
        employname: employname,
        workName: workName,
        cycleTime: cycleTime,
        jobPrice,
        jobPrice
    })
    workInformation.save()
    res.send({
        data,
        joball
    })
})

module.exports = router;