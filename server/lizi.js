var md5 = require('blueimp-md5')
// var a = [132232,123124,2433]
// var job={}

// for(let i=0;i<a.length;i++){
//     let num=i+1
//     let work="work"+num;
//     let arr1=a[i].toString().split('').map(v => +v)
//     let arr2=[]
//     for (let j = 0, k = 1; k < arr1.length;) {
//     let arr3=[]
//     arr3.push(arr1[j],arr1[k])
//     arr2.push(arr3)
//       j = j + 2;
//       k = k + 2;
//   }
//   job[work]=arr2;
// }


//  const jobinit = [1245,4546,7879];
//     const job1= {}
//     for (let i = 0; i < jobinit.length; i++) {
//         let num = i;
//         let work = "work" + num;
//         let arr1 = jobinit[i].toString().split('').map(v => +v)
//         let arr2 = []
//         for (let j = 0, k = 1; k < arr1.length;) {
//             let arr3 = []
//             arr3.push(arr1[j], arr1[k])
//             arr2.push(arr3)
//             j = j + 2;
//             k = k + 2;
//         }
//         job1[work] = arr2;
//     }
//     const job=[]
//     job.push(job1)
//     console.log(job)
//     console.log(job[0].work0)

// var data = {
//     '1': [{
//             job: 1,
//             process: 1,
//             startTime: 2,
//             endTime: 5
//         },
//         {
//             job: 2,
//             process: 1,
//             startTime: 0,
//             endTime: 2
//         }
//     ],
//     '2': [{
//             job: 1,
//             process: 2,
//             startTime: 5,
//             endTime: 7
//         },
//         {
//             job: 2,
//             process: 3,
//             startTime: 7,
//             endTime: 11
//         },
//         {
//             job: 3,
//             process: 1,
//             startTime: 0,
//             endTime: 4
//         }
//     ],
//     '3': [{
//             job: 1,
//             process: 3,
//             startTime: 7,
//             endTime: 9
//         },
//         {
//             job: 2,
//             process: 2,
//             startTime: 2,
//             endTime: 3
//         },
//         {
//             job: 3,
//             process: 2,
//             startTime: 4,
//             endTime: 7
//         }
//     ]
// }
// for(let i in data){
//     for(let j=0;j<data[i].length;j++){
//         console.log(data[i][j].job)
//     }
// }  
 

var anObj = {
    8: 'a',
    10: 'b',
    7: 'c'
};
console.log(Object.keys(anObj));