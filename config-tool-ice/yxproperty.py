#!/usr/bin/python
# -*- coding:utf-8 -*-

from flask import Blueprint, request
from iceCon import ice_con
import json
import Ice
Ice.loadSlice("./ice-sqlite.ice")
import YXArea

yx_blu = Blueprint('yx', __name__)

# 查找(遥信属性)
@yx_blu.route('/yx_data', methods=['POST'])
def get_yx_property_send():
    stationId = request.form.get("stationId")
    station = json.loads(stationId)
    DataCommand = ice_con()
    status, pIDs, result = DataCommand.RPCGetYXProperty(station)
    yxproperty = []
    for i in range(len(pIDs)):
        yxproperty.append({"id": pIDs[i], "name": result[i].name,
                           "fAlarm": result[i].fAlarm, "fAlarmCount": result[i].fAlarmCount,
                           "unused": result[i].unused, "reserved": result[i].reserved,
                           "ykno": result[i].ykno, "alarmtype": result[i].alarmtype,
                           "alevel": result[i].alevel})
    return json.dumps(yxproperty)

# 添加、修改(遥信属性)
@yx_blu.route('/set_yx', methods=['POST'])
def set_yx_property():
    DataCommand = ice_con()
    stationId = request.form.get("stationId")
    station = json.loads(stationId)
    newyx = request.form.get("data")
    new_yx = json.loads(newyx)
    p_IDs = json.loads(new_yx[len(new_yx) - 1])
    pIDs = []
    for i in range(len(p_IDs)):
        pIDs.append(long(p_IDs[i]))
    new_yx.pop()
    YxProperty = new_yx
    yxp = []
    for i in range(len(YxProperty)):
        yxp.append(json.loads(YxProperty[i]))
    yxproperty = []
    for j in range(len(p_IDs)):
        yxpstruct = YXArea.DxPropertyYX(yxp[0][j].encode("utf-8"), yxp[1][j],
                                        yxp[2][j], int(yxp[3][j]),
                                        int(yxp[4][j]), int(yxp[5][j]),
                                        int(yxp[6][j]), int(yxp[7][j]))
        yxproperty.append(yxpstruct)
    DataCommand.RPCSetYXProperty(station, pIDs, yxproperty)
    return '保存成功!'

# 删除(遥信属性)
@yx_blu.route('/delete_yx', methods=['POST'])
def delete_yx_data():
    DataCommand = ice_con()
    stationId = request.form.get("stationId")
    station = json.loads(stationId)
    yxIDs = request.form.get("ids")
    yx_IDs = json.loads(yxIDs)
    pIDs = []
    for i in range(len(yx_IDs)):
        pIDs.append(long(yx_IDs[i]))
    DataCommand.RPCDelYXProperty(station, pIDs)
    return '删除成功!'