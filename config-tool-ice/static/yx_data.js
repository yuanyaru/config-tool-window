var stationId;
$(document).ready(function () {
    var ss=document.getElementById('time').getElementsByTagName('span');
    function changeTime() {
        var time = new Date();
        ss[0].innerHTML = time.getFullYear().toString();
        ss[1].innerHTML = time.getMonth()+1;
        ss[2].innerHTML = time.getDate().toString();
        ss[3].innerHTML = time.getHours().toString();
        ss[4].innerHTML = time.getMinutes().toString();
        ss[5].innerHTML = time.getSeconds().toString();
    }
    changeTime();
    setInterval(function(){
        changeTime();
    },1000)

    var elems = document.getElementsByName("yx");
    for(var i=0;i<elems.length;i++){
        elems[i].addEventListener('click',function(evt){
            clearYxTable();
            // jquery对象
            var elm = $(this).parents("li")["1"];
            stationId = $(elm).children().eq(1).text();
            show_yx_table();
        })
    }

    $("#contect").click(function () {
        window.confirm("感谢您的使用 ！\n" +
                        "如果您在使用过程中有任何疑问，请联系平台研发部yyr !");
    });

    $("#about").click(function () {
        window.confirm("本产品：点表配置工具\n" +
                       "版   本：v1.0.0");
    });

    $("#browser").treeview();
});

function show_yx_table() {
　　document.getElementById("yx_table").style.display="block";
    document.getElementById("yc_table").style.display="none";
    document.getElementById("link_table").style.display="none";
    document.getElementById("sys_table").style.display="none";
}

// 清空表格
function clearYxTable() {
    $("#tBody_yx").text("");
}

// 显示数据库的数据
function show_db_yx_data() {
    $.post("/yx_data", {'stationId': stationId}, function(res){
        clearYxTable();
        var resLen = res.length;
        if (resLen > 2) {
            // 将JSON字符串反序列化成JSON对象
            var res2Json = JSON.parse(res);
            for(var i = 0; i<res2Json.length; i++) {
                str = "<tr><td><input type='checkbox' name='yx_ID'/>"
                + "</td><td name='td1'>" + res2Json[i].id
                + "</td><td>" + res2Json[i].name
                + "</td><td>" + res2Json[i].fAlarm
                + "</td><td>" + res2Json[i].fAlarmCount
                + "</td><td>" + res2Json[i].unused
                + "</td><td>" + res2Json[i].reserved
                + "</td><td>" + res2Json[i].ykno
                + "</td><td>" + res2Json[i].alarmtype
                + "</td><td>" + res2Json[i].alevel + "</td></tr>";

                // 追加到table中
                $("#tBody_yx").append(str);
            }
        } else {
            alert("数据库为空，没有数据可显示！");
        }
    });
}

// 在表格尾部增添一行
function addYxRow(){
    str = "<tr><td><input type='checkbox' class='i-checks' name='yx_ID'/>"
            + "</td><td name='td1'>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>"
            + "</td><td>" + "</td></tr>";

    // 追加到table中
    $("#tBody_yx").append(str);
}

// 删除尾部添加的行
function deleteYxRow() {
    var i = 0
    $("input[type='checkbox'][name='yx_ID']").each(function() {
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

// 添加、修改
function set_yx_data() {
    var ids = new Array(); var names = new Array();
    var fAlarms = new Array(); var fAlarmCounts = new Array();
    var unuseds = new Array(); var reserveds = new Array();
    var yknos = new Array(); var alarmtypes = new Array();
    var alevels = new Array(); var new_data = new Array();

    $("input[type='checkbox'][name='yx_ID']").each(function() {
        if(this.checked) {
            var id = $(this).parents('tr').children().eq(1).text();
            var name = $(this).parents('tr').children().eq(2).text();
            var fAlarm = $(this).parents('tr').children().eq(3).text();
            var fAlarmCount = $(this).parents('tr').children().eq(4).text();
            var unused = $(this).parents('tr').children().eq(5).text();
            var reserved = $(this).parents('tr').children().eq(6).text();
            var ykno = $(this).parents('tr').children().eq(7).text();
            var alarmtype = $(this).parents('tr').children().eq(8).text();
            var alevel = $(this).parents('tr').children().eq(9).text();

            ids.push(id); names.push(name); fAlarms.push(fAlarm);
            fAlarmCounts.push(fAlarmCount); unuseds.push(unused); reserveds.push(reserved);
            yknos.push(ykno); alarmtypes.push(alarmtype); alevels.push(alevel);
        }
    });

    new_data.push(JSON.stringify(names)); new_data.push(JSON.stringify(fAlarms));
    new_data.push(JSON.stringify(fAlarmCounts)); new_data.push(JSON.stringify(unuseds));
    new_data.push(JSON.stringify(reserveds)); new_data.push(JSON.stringify(yknos));
    new_data.push(JSON.stringify(alarmtypes)); new_data.push(JSON.stringify(alevels));
    new_data.push(JSON.stringify(ids));

    var new_data_ID_len = new_data[8].length;
    if (new_data_ID_len > 2) {
        $.post("/set_yx", {'data': JSON.stringify(new_data),
                           'stationId': stationId}, function(res){
            alert(res);
            show_db_yx_data();
            $("input[type='checkbox']").not(this).prop("checked",false);
        });
    } else {
        alert("请先选择要保存的行！")
    }
}

// 删除
function delete_yx_data() {
    var yx_IDs = new Array();
    $("input[type='checkbox'][name='yx_ID']").each(function() {
        if(this.checked) {
            var yx_ID = $(this).parents('tr').children().eq(1).text();
            yx_IDs.push(yx_ID)
        }
    });

    var yx_IDs_len = yx_IDs.length;
    if (yx_IDs_len > 0) {
        $.post("/delete_yx", {'ids': JSON.stringify(yx_IDs),
                              'stationId': stationId}, function(res){
            alert(res);
            show_db_yx_data();
            $("input[type='checkbox']").not(this).prop("checked",false);
        });
    } else {
        alert("请先选择要删除的行！")
    }
}

// 全选按钮
$(function() {
	$("#selectAllYx").bind("click",function(){
		if($(this).prop("checked")){
			$("input[type='checkbox']").not(this).prop("checked",true);
		}else{
			$("input[type='checkbox']").not(this).prop("checked",false);
		}
	});
});