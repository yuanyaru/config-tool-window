var stationId;
$(document).ready(function () {
    var elems = document.getElementsByName("yc");
    for(var i=0;i<elems.length;i++){
        elems[i].addEventListener('click',function(evt){
            clearYcTable();
            // jquery对象
            var elm = $(this).parents("li")["1"];
            stationId = $(elm).children().eq(1).text();
            show_yc_table();
        })
    }
});

function show_yc_table() {
    document.getElementById("yc_table").style.display="block";
　　document.getElementById("yx_table").style.display="none";
    document.getElementById("link_table").style.display="none";
    document.getElementById("sys_table").style.display="none";
}

// 清空表格
function clearYcTable() {
    $("#tBody_yc").text("");
}

// 显示数据库的数据
function show_db_yc_data() {
    $.post("/yc_data", {'stationId': stationId}, function(res){
        clearYcTable();
        var resLen = res.length;
        if (resLen > 2) {
            // 将JSON字符串反序列化成JSON对象
            var res2Json = JSON.parse(res);
            for(var i = 0; i<res2Json.length; i++) {
                str = "<tr><td><input type='checkbox' name='yc_ID'/>"
                + "</td><td name='td2'>" + res2Json[i].id
                + "</td><td>" + res2Json[i].name
                + "</td><td>" + res2Json[i].unit
                + "</td><td>" + res2Json[i].k
                + "</td><td>" + res2Json[i].b
                + "</td><td>" + res2Json[i].precision
                + "</td><td>" + res2Json[i].fullvalue
                + "</td><td>" + res2Json[i].mindelta
                + "</td><td>" + res2Json[i].zerovalue
                + "</td><td>" + res2Json[i].flog
                + "</td><td>" + res2Json[i].fplan
                + "</td><td>" + res2Json[i].fcache
                + "</td><td>" + res2Json[i].fTrans
                + "</td><td>" + res2Json[i].fMin
                + "</td><td>" + res2Json[i].fMax
                + "</td><td>" + res2Json[i].fAvrg
                + "</td><td>" + res2Json[i].fRatio
                + "</td><td>" + res2Json[i].fUpper
                + "</td><td>" + res2Json[i].fLower
                + "</td><td>" + res2Json[i].fUpper2
                + "</td><td>" + res2Json[i].fLower2
                + "</td><td>" + res2Json[i].fMinTime
                + "</td><td>" + res2Json[i].fMaxTime
                + "</td><td>" + res2Json[i].padding
                + "</td><td>" + res2Json[i].fMax2
                + "</td><td>" + res2Json[i].fMaxTime2
                + "</td><td>" + res2Json[i].yxno
                + "</td><td>" + res2Json[i].alevel
                + "</td><td>" + res2Json[i].uppervalue
                + "</td><td>" + res2Json[i].lowervalue
                + "</td><td>" + res2Json[i].uppervalue2
                + "</td><td>" + res2Json[i].lowervalue2 + "</td></tr>";

                // 追加到table中
                $("#tBody_yc").append(str);
            }
        } else {
            alert("数据库为空，没有数据可显示！");
        }
    });
}

// 在表格尾部增添一行
function addYcRow(){
    str = "<tr><td><input type='checkbox' class='i-checks' name='yc_ID'/>"
            + "</td><td name='td2'>"
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
            + "</td><td>"+ "</td></tr>";

    // 追加到table中
    $("#tBody_yc").append(str);
}

// 删除尾部添加的行
function deleteYcRow() {
    var i = 0
    $("input[type='checkbox'][name='yc_ID']").each(function() {
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
function set_yc_data() {
    var ids = new Array(); var names = new Array();
    var units = new Array(); var ks = new Array();
    var bs = new Array(); var precisions = new Array();
    var fullvalues = new Array(); var mindeltas = new Array();
    var zerovalues = new Array(); var flogs = new Array();
    var fplans = new Array(); var fcaches = new Array();
    var fTranss = new Array(); var fMins = new Array();
    var fMaxs = new Array(); var fAvrgs = new Array();
    var fRatios = new Array(); var fUppers = new Array();
    var fLowers = new Array(); var fUpper2s = new Array();
    var fLower2s = new Array(); var fMinTimes = new Array();
    var fMaxTimes = new Array(); var paddings = new Array();
    var fMax2s = new Array(); var fMaxTime2s = new Array();
    var yxnos = new Array(); var alevels = new Array();
    var uppervalues = new Array(); var lowervalues = new Array();
    var uppervalue2s = new Array(); var lowervalue2s = new Array();
    var new_data = new Array();

    $("input[type='checkbox'][name='yc_ID']").each(function() {
        if(this.checked) {
            var id = $(this).parents('tr').children().eq(1).text();
            var name = $(this).parents('tr').children().eq(2).text();
            var unit = $(this).parents('tr').children().eq(3).text();
            var k = $(this).parents('tr').children().eq(4).text();
            var b = $(this).parents('tr').children().eq(5).text();
            var precision = $(this).parents('tr').children().eq(6).text();
            var fullvalue = $(this).parents('tr').children().eq(7).text();
            var mindelta = $(this).parents('tr').children().eq(8).text();
            var zerovalue = $(this).parents('tr').children().eq(9).text();
            var flog = $(this).parents('tr').children().eq(10).text();
            var fplan = $(this).parents('tr').children().eq(11).text();
            var fcache = $(this).parents('tr').children().eq(12).text();
            var fTrans = $(this).parents('tr').children().eq(13).text();
            var fMin = $(this).parents('tr').children().eq(14).text();
            var fMax = $(this).parents('tr').children().eq(15).text();
            var fAvrg = $(this).parents('tr').children().eq(16).text();
            var fRatio = $(this).parents('tr').children().eq(17).text();
            var fUpper = $(this).parents('tr').children().eq(18).text();
            var fLower = $(this).parents('tr').children().eq(19).text();
            var fUpper2 = $(this).parents('tr').children().eq(20).text();
            var fLower2 = $(this).parents('tr').children().eq(21).text();
            var fMinTime = $(this).parents('tr').children().eq(22).text();
            var fMaxTime = $(this).parents('tr').children().eq(23).text();
            var padding = $(this).parents('tr').children().eq(24).text();
            var fMax2 = $(this).parents('tr').children().eq(25).text();
            var fMaxTime2 = $(this).parents('tr').children().eq(26).text();
            var yxno = $(this).parents('tr').children().eq(27).text();
            var alevel = $(this).parents('tr').children().eq(28).text();
            var uppervalue = $(this).parents('tr').children().eq(29).text();
            var lowervalue = $(this).parents('tr').children().eq(30).text();
            var uppervalue2 = $(this).parents('tr').children().eq(31).text();
            var lowervalue2 = $(this).parents('tr').children().eq(32).text();

            ids.push(id); names.push(name); units.push(unit); ks.push(k);
            bs.push(b); precisions.push(precision); fullvalues.push(fullvalue); mindeltas.push(mindelta);
            zerovalues.push(zerovalue); flogs.push(flog); fplans.push(fplan); fcaches.push(fcache);
            fTranss.push(fTrans); fMins.push(fMin); fMaxs.push(fMax); fAvrgs.push(fAvrg);
            fRatios.push(fRatio); fUppers.push(fUpper); fLowers.push(fLower); fUpper2s.push(fUpper2);
            fLower2s.push(fLower2); fMinTimes.push(fMinTime); fMaxTimes.push(fMaxTime); paddings.push(padding);
            fMax2s.push(fMax2); fMaxTime2s.push(fMaxTime2);yxnos.push(yxno); alevels.push(alevel);
            uppervalues.push(uppervalue); lowervalues.push(lowervalue); uppervalue2s.push(uppervalue2); lowervalue2s.push(lowervalue2);
        }
    });

    new_data.push(JSON.stringify(names)); new_data.push(JSON.stringify(units));
    new_data.push(JSON.stringify(ks)); new_data.push(JSON.stringify(bs));
    new_data.push(JSON.stringify(precisions)); new_data.push(JSON.stringify(fullvalues));
    new_data.push(JSON.stringify(mindeltas)); new_data.push(JSON.stringify(zerovalues));
    new_data.push(JSON.stringify(flogs)); new_data.push(JSON.stringify(fplans));
    new_data.push(JSON.stringify(fcaches)); new_data.push(JSON.stringify(fTranss));
    new_data.push(JSON.stringify(fMins)); new_data.push(JSON.stringify(fMaxs));
    new_data.push(JSON.stringify(fAvrgs)); new_data.push(JSON.stringify(fRatios));
    new_data.push(JSON.stringify(fUppers)); new_data.push(JSON.stringify(fLowers));
    new_data.push(JSON.stringify(fUpper2s)); new_data.push(JSON.stringify(fLower2s));
    new_data.push(JSON.stringify(fMinTimes)); new_data.push(JSON.stringify(fMaxTimes));
    new_data.push(JSON.stringify(paddings)); new_data.push(JSON.stringify(fMax2s));
    new_data.push(JSON.stringify(fMaxTime2s)); new_data.push(JSON.stringify(yxnos));
    new_data.push(JSON.stringify(alevels)); new_data.push(JSON.stringify(uppervalues));
    new_data.push(JSON.stringify(lowervalues)); new_data.push(JSON.stringify(uppervalue2s));
    new_data.push(JSON.stringify(lowervalue2s)); new_data.push(JSON.stringify(ids));

    var new_data_ID_len = new_data[31].length;
    if (new_data_ID_len > 2) {
        $.post("/set_yc", {'data': JSON.stringify(new_data),
                           'stationId': stationId}, function(res){
            alert(res);
            show_db_yc_data();
            $("input[type='checkbox']").not(this).prop("checked",false);
        });
    } else {
        alert("请先选择要保存的行！")
    }
}

// 删除
function delete_yc_data() {
    var yc_IDs = new Array();
    $("input[type='checkbox'][name='yc_ID']").each(function() {
        if(this.checked) {
            var yc_ID = $(this).parents('tr').children().eq(1).text();
            yc_IDs.push(yc_ID)
        }
    });

    var yc_IDs_len = yc_IDs.length;
    if (yc_IDs_len > 0) {
        $.post("/delete_yc", {'ids': JSON.stringify(yc_IDs),
                              'stationId': stationId}, function(res){
            alert(res);
            show_db_yc_data();
            $("input[type='checkbox']").not(this).prop("checked",false);
        });
    } else {
        alert("请先选择要删除的行！")
    }
}

// 全选按钮
$(function() {
	$("#selectAllYc").bind("click",function(){
		if($(this).prop("checked")){
			$("input[type='checkbox']").not(this).prop("checked",true);
		}else{
			$("input[type='checkbox']").not(this).prop("checked",false);
		}
	});
});