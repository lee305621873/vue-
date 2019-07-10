import echarts from 'echarts'
let mock = {
  '1': [{
    job: 1,
    process: 1,
    startTime: 2,
    endTime: 5
  },
  {
    job: 2,
    process: 1,
    startTime: 0,
    endTime: 2
  }
  ],
  '2': [{
    job: 1,
    process: 2,
    startTime: 5,
    endTime: 7
  },
  {
    job: 2,
    process: 3,
    startTime: 7,
    endTime: 11
  },
  {
    job: 3,
    process: 1,
    startTime: 0,
    endTime: 4
  }
  ],
  '3': [{
    job: 1,
    process: 3,
    startTime: 7,
    endTime: 9
  },
  {
    job: 2,
    process: 2,
    startTime: 2,
    endTime: 3
  },
  {
    job: 3,
    process: 2,
    startTime: 4,
    endTime: 7
  }
  ]
}
var values = []
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
// var dataAall = [{
//     name: '工件2',
//     value: [0, 0, 2, 2],
//     color: '#7b9ce1'
//   },
//   {
//     name: '工件1',
//     value: [0, 2, 5, 3],
//     color: '#75d874'
//   },
//   {
//     name: '工件3',
//     value: [1, 0, 4, 4],
//     color: '#dc77dc'
//   },
//   {
//     name: '工件2',
//     value: [1, 4, 8, 4],
//     color: '#7b9ce1'
//   },
//   {
//     name: '工件1',
//     value: [1, 8, 10, 2],
//     color: '#75d874'
//   },
//   {
//     name: '工件2',
//     value: [2, 2, 3, 1],
//     color: '#7b9ce1'
//   },
//   {
//     name: '工件3',
//     value: [2, 4, 7, 3],
//     color: '#dc77dc'
//   },
//   {
//     name: '工件1',
//     value: [2, 10, 12, 2],
//     color: '#75d874'
//   }
// ]
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

function renderItem (params, api) {
  var categoryIndex = api.value(0)
  var start = api.coord([api.value(1), categoryIndex])
  var end = api.coord([api.value(2), categoryIndex])
  var height = api.size([0, 1])[1] * 0.6

  var rectShape = echarts.graphic.clipRectByRect({
    x: start[0],
    y: start[1] - height / 2,
    width: end[0] - start[0],
    height: height
  }, {
    x: params.coordSys.x,
    y: params.coordSys.y,
    width: params.coordSys.width,
    height: params.coordSys.height
  })

  return rectShape && {
    type: 'rect',
    shape: rectShape,
    style: api.style()
  }
}
var option = {
  tooltip: {
    formatter: function (params) {
      return params.marker + params.name + ': ' + params.value[3] + ' ms'
    }
  },
  title: {
    text: '机器甘特图',
    left: 'center'
  },
  dataZoom: [{
    type: 'slider',
    filterMode: 'weakFilter',
    showDataShadow: false,
    top: 400,
    height: 10,
    borderColor: 'transparent',
    backgroundColor: '#e2e2e2',
    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
    handleSize: 20,
    handleStyle: {
      shadowBlur: 6,
      shadowOffsetX: 1,
      shadowOffsetY: 2,
      shadowColor: '#aaa'
    },
    labelFormatter: ''
  }, {
    type: 'inside',
    filterMode: 'weakFilter'
  }],
  grid: {
    height: 300
  },
  xAxis: {
    min: 0,
    scale: true,
    axisLabel: {
      formatter: function (val) {
        return Math.max(0, val - 0) + 'h'
      }
    }
  },
  yAxis: {
    data: ['机器1', '机器2', '机器3','机器4','机器5']
  },
  series: [{
    type: 'custom',
    renderItem: renderItem,
    itemStyle: {
      normal: {
        opacity: 0.8
      }
    },
    encode: {
      x: [1, 2],
      y: 0
    },
    data: []
  }]
}
export default option
