
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

