function show_sys_table() {
    document.getElementById("sys_table").style.display="block";
　　document.getElementById("link_table").style.display="none";
    document.getElementById("yx_table").style.display="none";
    document.getElementById("yc_table").style.display="none";
}

// 清空表格
function clearSysTable() {
    $("#tBody_sys").text("");
}

// 显示数据库的数据
function show_db_sys_data() {
    $.get("/sys_data", function(res){
        clearSysTable();
        var resLen = res.length;
        if (resLen > 2) {
            // 将JSON字符串反序列化成JSON对象
            var res2Json = JSON.parse(res);
            for(var i = 0; i<res2Json.length; i++) {
                str = "<tr><td><input type='checkbox' name='sys_ID'/>"
                + "</td><td>" + res2Json[i].name
                + "</td><td>" + res2Json[i].nstation + "</td></tr>";

                // 追加到table中
                $("#tBody_sys").append(str);
            }
        } else {
            alert("数据库为空，没有数据可显示！");
        }
    });
}

// 修改
function set_sys_data() {
    var new_data = new Array();

    $("input[type='checkbox'][name='sys_ID']").each(function() {
        if(this.checked) {
            var name = $(this).parents('tr').children().eq(1).text();
            var nstation = $(this).parents('tr').children().eq(2).text();

            new_data.push(name);
            new_data.push(nstation);
            $.post("/set_sys", {'data': JSON.stringify(new_data)}, function(res){
                alert(res);
                show_db_sys_data();
                $("input[type='checkbox']").not(this).prop("checked",false);
            });
        } else {
            alert("请先选择要保存的行！")
        }
    });
}

// 全选按钮
$(function() {
	$("#selectAllSys").bind("click",function(){
		if($(this).prop("checked")){
			$("input[type='checkbox']").not(this).prop("checked",true);
		}else{
			$("input[type='checkbox']").not(this).prop("checked",false);
		}
	});
});