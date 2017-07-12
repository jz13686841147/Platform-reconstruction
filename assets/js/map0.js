/**
 * Created by K on 10/21/14.
 */
$(function () {

    // 百度地图API功能
    // 百度地图API功能
    map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(121.541664, 31.277704), 15);

    map.addEventListener("click", updateInfo);
    var local = new BMap.LocalSearch("全国", {
        renderOptions: {
            map: map,
            panel: "r-result",
            autoViewport: true,
            selectFirstResult: false
        }});

    function updateInfo(e){
        $("#id_latitude").val(e.point.lat);
        $("#id_longitude").val(e.point.lng);
    }
    var city = $("#id_city");
    var district = $("#id_district");
    function init_map(){
        if (district.text() != ""){
            local.search(district.text());
        } else {
            var city_name = city.text();
            local.search(city_name);
        }
    }
    init_map();
    $("#sub").bind('click', function () {
        var searchValue = $("#address").val(); //得到搜索框的值
        if (searchValue != "") {
            local.search(searchValue);
        }
    });
    $("#id_address").change(function() {
        local.search($(this).val());
    });

    // 表单屏蔽回车提交
    $("input").keypress(function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (keyCode == 13) {
            return false;
        } else {
            return true;
        }
    });

});
/**
 * Created by hp on 2017/7/3.
 */

var markerArr = [
    { title: "名称：上海华晶宾馆",status:"1", point: "121.54267,31.27684", address: "长阳路1687号",number:"10", tel: "(021)51860805" },
    { title: "名称：上海威尼斯大酒店",status:"2", point: "121.551797,31.287888", address: "内江路365号3楼(周家嘴路) ",number:"15", tel: "18500000000" },
    { title: "名称：杨浦公园", status:"1",point: "121.542454,31.28653", address: "上海市杨浦区控江路",number:"18", tel: "(021)65430028" },
    { title: "名称：杨浦科技馆",status:"0", point: "121.563742,31.286407", address: "隆昌路690号",number:"20", tel: "18500000000" }
];

function map_init() {
    var map = new BMap.Map("map"); // 创建Map实例
    var point = new BMap.Point(121.54267, 31.27684); //地图中心点，广州市
    map.centerAndZoom(point, 13); // 初始化地图,设置中心点坐标和地图级别。
    map.enableScrollWheelZoom(true); //启用滚轮放大缩小
    //地图、卫星、混合模式切换
    map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP]}));
    //向地图中添加缩放控件
    var ctrlNav = new window.BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE
    });
    map.addControl(ctrlNav);
    //向地图中添加缩略图控件
    var ctrlOve = new window.BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: 1
    });
    map.addControl(ctrlOve);
    //向地图中添加比例尺控件
    var ctrlSca = new window.BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_LEFT
    });
    map.addControl(ctrlSca);

    var point = new Array(); //存放标注点经纬信息的数组
    var marker = new Array(); //存放标注点对象的数组
    var info = new Array(); //存放提示信息窗口对象的数组
    var searchInfoWindow =new Array();//存放检索信息窗口对象的数组
    for (var i = 0; i < markerArr.length; i++) {
        var p0 = markerArr[i].point.split(",")[0]; //
        var p1 = markerArr[i].point.split(",")[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来
        point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点
        marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记
        map.addOverlay(marker[i]);
//            marker[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        //显示marker的title，marker多的话可以注释掉
//            var label = new window.BMap.Label(markerArr[i].title, { offset: new window.BMap.Size(20, -10) });
//            marker[i].setLabel(label);
        // 创建信息窗口对象
        info[i] = "<p style=’font-size:12px;lineheight:1.8em;’>" + "</br>地址：" + markerArr[i].address + "</br> 电话：" + markerArr[i].tel + "</br></p>";
        //创建百度样式检索信息窗口对象

        searchInfoWindow[i] = new BMapLib.SearchInfoWindow(map, info[i], {
            title: markerArr[i].title, //标题
            width: 292, //宽度
            height: 60, //高度
            panel : "panel", //检索结果面板
            enableAutoPan : true, //自动平移
            enableSendToPhone: true, //是否显示发送到手机按钮
            searchTypes :[
                BMAPLIB_TAB_SEARCH,   //周边检索
                BMAPLIB_TAB_TO_HERE,  //到这里去
                BMAPLIB_TAB_FROM_HERE //从这里出发
            ]
        });
        //添加点击事件
        marker[i].addEventListener("click",
            (function(k){
                // js 闭包
                return function(){
                    //将被点击marker置为中心
                    //map.centerAndZoom(point[k], 18);
                    //在marker上打开检索信息窗口
                    searchInfoWindow[k].open(marker[k]);
                }
            })(i)
        );
    }
}
//异步调用百度js
function map_load() {
    var load = document.createElement("script");
    load.src = "http://api.map.baidu.com/api?v=2.0&ak=IDvNBsejl9oqMbPF316iKsXR&callback=map_init";
    document.body.appendChild(load);
}
window.onload = map_load;


$(function () {
    $('#container1').highcharts({
        chart: {
            type: 'column',
        },
        title: {
            text: '月用电量'
        },
        subtitle: {
            text: '看看金黄色的覅哦哈发到哪'
        },
        xAxis: {
            categories: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
            ],
            crosshair: true
        },

        yAxis: {
            min: 0,
            title: {
                text: '用电量 (KW)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} KW</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '东京',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }, {
            name: '纽约',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        }, {
            name: '伦敦',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        }, {
            name: '柏林',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        }]
    });
    $('#container2').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '月消费金额'
        },
        xAxis: {
            categories: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: '月消费金额（元）'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '元'+'<br/>' +
                    '总量: ' + this.point.stackTotal+'元';
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: '雷神',
            data: [5, 3, 4, 7, 2,6,4,8,2,11,15,6]
        }, {
            name: '雨神',
            data: [2, 2, 3, 2, 1,5,3,4,6,1,21,8]
        }, {
            name: '水神',
            data: [3, 4, 4, 2, 5,6,9,1,7,5,13,9]
        }]
    });
    $('#container3').highcharts({
        chart: {
            type: 'column',
        },
        title: {
            text: '月充值金额'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
            ],
            crosshair: true
        },

        yAxis: {
            min: 0,
            title: {
                text: '充值金额 (元)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} 元</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '充电站1',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }, {
            name: '充电站2',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        }, {
            name: '充电站3',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        }, {
            name: '充电站4',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        }]
    });
    $('#container4').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: '月注册用户统计'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {
            title: {
                text: '人数'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true          // 开启数据标签
                },
                enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
            }
        },
        series: [{
            name: '上海',
            data: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9]
        }, {
            name: '嘉善',
            data: [3, 4, 5, 8, 11, 15, 17, 16, 14, 10, 6, 4]
        }]
    });

});
