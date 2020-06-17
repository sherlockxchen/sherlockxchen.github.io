
			var worlddata=new Array();
			var citydata=new Array();
function chartsworld(dom){
var myChart = echarts.init(dom);
var app = {};
option = null;
myChart.showLoading();
var convertData = function (dataworld,datacity) {
    var res = [];
    for (var i = 0; i < datacity.length; i++) {
		var pro=datacity[i].properties;
		var adoname=pro.name;
		var newArr = dataworld.filter(function (obj) {
		return obj.name== adoname;
});
        
        if (newArr.length!=0) {
			var vvalue=newArr[0].value;
			var geome=datacity[i].geometry;
			var coor=geome.coordinates;
			var arr=[];arr.push(coor);
			coor.push(vvalue);
            res.push({
                name: adoname,
                value: coor
				//geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

$.get('https://jackiechj.github.io/first/json/world1.json', function (geoJson) {

    myChart.hideLoading();

    echarts.registerMap('world', geoJson);
	var val=convertData(worlddata,citydata.features);

    myChart.setOption(option = {
        title: {
            text: '世界疫情分布',
			
			textStyle: {
            color: '#D3D0C5'
        }
			
            //subtext: '人口密度数据来自Wikipedia',
            //sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, callback) {
        console.log(params);
        var showHtm="";
        
        showHtm+="国家："+params.name+'<br>'+ "确诊人数："+ params.value[2]+" 人"
  
        return showHtm;
        }},
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                //dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
		geo: {
        map: 'world',
		zoom: 1.2,
		aspectScale:1.2,
         itemStyle: { // 地图区域的多边形 图形样式。
                normal: {
                    borderColor: 'rgba(147, 235, 248, 1)', // 图形的描边颜色
                    borderWidth: 1, // 描边宽度 0表示无描边
                    areaColor: { // 地图区域的颜色
                        type: 'radial', // 径向渐变
                        x: 0.5, // 圆心 x,y
                        y: 0.5,
                        r: 0.8, // 半径
                        colorStops: [{
                            offset: 0,
                            color: '#20519C' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#20519C' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: '#253C96', // 阴影颜色
                    shadowOffsetX: -2, //阴影水平方向上的偏移距离。
                    shadowOffsetY: 2, //阴影垂直方向上的偏移距离。
                    shadowBlur: 10 // 图形阴影的模糊大小
                },
				 emphasis: { // 鼠标移动到时
                    areaColor: '#76F0F0',
                    borderWidth: 0
                }
            }
    },
        /* visualMap: {
            min: 0,
            max: 1000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
        }, */
        series: [
		{
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: val,
             symbolSize: function (val) {
                if(val[2]>10000){
				return 25;
				}
				else if(val[2]>7000)
					return 15;
				else if(val[2]>1000)
					return 10;
				else
					return 7;
            }, 
            label: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            itemStyle: {
                color: 'red'
            },
            emphasis: {
                label: {
                    show: false
                }
            }
        },
		/* {
            name: 'pm2.51',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: val,
             symbolSize: function (val) {
                if(val[2]>10000){
				return 25;
				}
				else if(val[2]>7000)
					return 15;
				else if(val[2]>1000)
					return 0
				else
					return 0;
            }, 
            label: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            itemStyle: {
                color: 'red'
            },
            emphasis: {
                label: {
                    show: false
                }
            }
        } */
		/* ,
		 {
                        zlevel: 1.5,
                        type: 'bar',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: blue
                            }
                        },
                        data: worlddata
                    } */
		/* ,
            {
                name: '香港18区人口密度',
                type: 'map',
                mapType: 'world', // 自定义扩展图表类型
				zoom: 1.2,
				aspectScale:1.2,
				//width:120%,
                label: {
                    show: false
                },
                data: worlddata 
                 //自定义名称映射
                 
            } */
			
        
			/* ,
			
			{
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data1),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            label: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            itemStyle: {
                color: 'purple'
            },
            emphasis: {
                label: {
                    show: true
                }
            }
        } */
        ]
    });
});
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
 
}
$(function(){

			$.get("https://jackiechj.github.io/first/json/city1.json",function(msg){       //请求返回参数
		citydata=msg;});
			$.get("http://127.0.0.1:3000/query",function(msg){       //请求返回参数
		worlddata=msg;
		if(worlddata.length>0){
var dom = document.getElementById("container");
	chartsworld(dom);}
			});
		
 });