function yxTableClick() {
    var elems = document.getElementsByName("yx");
    for(var i=0;i<elems.length;i++){
        elems[i].addEventListener('click',function(evt){
            clearYxTable();
            // jquery对象
            var elm = $(this).parents("li")["1"];
            stationId = $(elm).children().eq(0).text();
            show_yx_table();
        })
    }
}

function ycTableClick() {
    var elems = document.getElementsByName("yc");
    for(var i=0;i<elems.length;i++){
        elems[i].addEventListener('click',function(evt){
            clearYcTable();
            // jquery对象
            var elm = $(this).parents("li")["1"];
            stationId = $(elm).children().eq(0).text();
            show_yc_table();
        })
    }
}

function show_link_table() {
　　document.getElementById("link_table").style.display="block";
    document.getElementById("yx_table").style.display="none";
    document.getElementById("yc_table").style.display="none";
    document.getElementById("sys_table").style.display="none";
}

// 清空表格
function clearLinkTable() {
    $("#tBody_link").text("");
}

// 刷新左侧树
function getStation() {
    $.get("/station_data", function(res){
        $("#station").empty();
        str1 = '<li id="station" class="closed"><span class="folder" onclick="show_link_table()">厂站列表</span></li>';
        $("#sta").html(str1);
        // 将JSON字符串反序列化成JSON对象
        var res2Json = JSON.parse(res);
        for(var i = 0; i<res2Json.length; i++) {
            str2 = '<ul><li class="closed">'+
                '<span class="folder" id="staId" style="display: none;">'+ res2Json[i].station +'</span>'+
                '<span class="folder" id="staName">'+ res2Json[i].name +'</span>'+
                '<ul><li>'+'<span class="file" name="yx">遥信</span>'+'</li></ul>'+
                '<ul><li>'+'<span class="file" name="yc">遥测</span>'+'</li></ul>'+
                '<ul><li>'+'<span class="file">遥控</span>'+'</li></ul>'+
                '<ul><li>'+'<span class="file">遥调</span>'+'</li></ul>'+
                '<ul><li>'+'<span class="file">事件</span>'+'</li></ul>'+
                '</li></ul>';

            $("#station").append(str2);
        }
        $("#browser").treeview();
        yxTableClick();
        ycTableClick();
    });
}

// 显示数据库的数据
function show_db_station_data() {
    $.get("/station_data", function(res){
        clearLinkTable();
        var resLen = res.length;
        if (resLen > 2) {
            // 将JSON字符串反序列化成JSON对象
            var res2Json = JSON.parse(res);
            // var res2Json = eval(res);
            for(var i = 0; i<res2Json.length; i++) {
                str = "<tr><td><input type='checkbox' name='station_ID'/>"
                        + "</td><td name='td0'>" + res2Json[i].station
                        + "</td><td>" + res2Json[i].name
                        + "</td><td>" + res2Json[i].nYX
                        + "</td><td>" + res2Json[i].nYC
                        + "</td><td>" + res2Json[i].type
                        + "</td><td>" + res2Json[i].protocol
                        + "</td><td>" + res2Json[i].addr1
                        + "</td><td>" + res2Json[i].addr2
                        + "</td><td>" + res2Json[i].port
                        + "</td><td>" + res2Json[i].slaveAddr
                        + "</td><td>" + res2Json[i].devName
                        + "</td><td>" + res2Json[i].baud
                        + "</td><td>" + res2Json[i].dataBits
                        + "</td><td>" + res2Json[i].stopBits
                        + "</td><td>" + res2Json[i].parity
                        + "</td><td>" + res2Json[i].timeout
                        + "</td><td>" + res2Json[i].reserved + "</td></tr>";

                // 追加到table中
                $("#tBody_link").append(str);
            }
        } else {
            alert("数据库为空，没有数据可显示！");
        }
    });
}

// 在表格尾部增添一行
function addStationRow(){
    str = "<tr><td><input type='checkbox' class='i-checks' name='station_ID'/>"
            + "</td><td name='td0'>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"  + "</td></tr>";

    // 追加到table中
    $("#tBody_link").append(str);
}

// 删除尾部添加的行
function deleteStationRow() {
    var i = 0
    $("input[type='checkbox'][name='station_ID']").each(function() {
        if(this.checked) {
            i = i + 1;
            $(this).parents('tr').remove();
        }
    });
    if (i > 0) {
        alert("删除成功！")
    }
    else {
        alert("请先选择要删除的行！")
    }
}

// 添加和修改
function set_link_data() {
    var stations = new Array(); var names = new Array();
    var nYXs = new Array(); var nYCs = new Array();
    var types = new Array(); var protocols = new Array();
    var addr1s = new Array(); var addr2s = new Array();
    var ports = new Array(); var slaveAddrs = new Array();
    var devNames = new Array(); var bauds = new Array();
    var dataBitss = new Array(); var stopBitss = new Array();
    var paritys = new Array(); var timeouts = new Array();
    var reserveds = new Array(); var new_data = new Array();

    $("input[type='checkbox'][name='station_ID']").each(function() {
        if(this.checked) {
            var station = $(this).parents('tr').children().eq(1).text();
            var name = $(this).parents('tr').children().eq(2).text();
            var nYX = $(this).parents('tr').children().eq(3).text();
            var nYC = $(this).parents('tr').children().eq(4).text();
            var type = $(this).parents('tr').children().eq(5).text();
            var protocol = $(this).parents('tr').children().eq(6).text();
            var addr1 = $(this).parents('tr').children().eq(7).text();
            var addr2 = $(this).parents('tr').children().eq(8).text();
            var port = $(this).parents('tr').children().eq(9).text();
            var slaveAddr = $(this).parents('tr').children().eq(10).text();
            var devName = $(this).parents('tr').children().eq(11).text();
            var baud = $(this).parents('tr').children().eq(12).text();
            var dataBits = $(this).parents('tr').children().eq(13).text();
            var stopBits = $(this).parents('tr').children().eq(14).text();
            var parity = $(this).parents('tr').children().eq(15).text();
            var timeout = $(this).parents('tr').children().eq(16).text();
            var reserved = $(this).parents('tr').children().eq(17).text();

            stations.push(station); names.push(name); nYXs.push(nYX); nYCs.push(nYC);
            types.push(type); protocols.push(protocol); addr1s.push(addr1);
            addr2s.push(addr2); ports.push(port); slaveAddrs.push(slaveAddr);
            devNames.push(devName); bauds.push(baud); dataBitss.push(dataBits);
            stopBitss.push(stopBits); paritys.push(parity); timeouts.push(timeout);
            reserveds.push(reserved);
        }
    });

    new_data.push(JSON.stringify(names)); new_data.push(JSON.stringify(nYXs));
    new_data.push(JSON.stringify(nYCs)); new_data.push(JSON.stringify(types));
    new_data.push(JSON.stringify(protocols)); new_data.push(JSON.stringify(addr1s));
    new_data.push(JSON.stringify(addr2s)); new_data.push(JSON.stringify(ports));
    new_data.push(JSON.stringify(slaveAddrs)); new_data.push(JSON.stringify(devNames));
    new_data.push(JSON.stringify(bauds)); new_data.push(JSON.stringify(dataBitss));
    new_data.push(JSON.stringify(stopBitss)); new_data.push(JSON.stringify(paritys));
    new_data.push(JSON.stringify(timeouts)); new_data.push(JSON.stringify(reserveds));
    new_data.push(JSON.stringify(stations));

    var new_data_ID_len = new_data[16].length;
    if (new_data_ID_len > 2) {
        $.post("/set_station", {'data': JSON.stringify(new_data)}, function(res){
            alert(res);
            show_db_station_data();
            $("input[type='checkbox']").not(this).prop("checked",false);
            getStation();
        });
    } else {
        alert("请先选择要保存的行！")
    }
}

// 删除
function delete_station_data() {
    var station_IDs = new Array();
    $("input[type='checkbox'][name='station_ID']").each(function() {
        if(this.checked) {
            var station_ID = $(this).parents('tr').children().eq(1).text();
            station_IDs.push(station_ID)
        }
    });

    var station_IDs_len = station_IDs.length;
    if (station_IDs_len > 0) {
        $.post("/delete_station", {'ids': JSON.stringify(station_IDs)}, function(res){
            alert(res);
            show_db_station_data();
            $("input[type='checkbox']").not(this).prop("checked",false);
            getStation();
        });
    } else {
        alert("请先选择要删除的行！")
    }
}

// 全选按钮
$(function() {
	$("#selectAllStation").bind("click",function(){
		if($(this).prop("checked")){
			$("input[type='checkbox']").not(this).prop("checked",true);
		}else{
			$("input[type='checkbox']").not(this).prop("checked",false);
		}
	});
});