#!/usr/bin/python
# -*- coding:utf-8 -*-

from flask import Blueprint, request
from iceCon import ice_con
import json
import Ice
Ice.loadSlice("./ice-sqlite.ice")
import YCArea

yc_blu = Blueprint('yc', __name__)

# 查找(遥测属性)
@yc_blu.route('/yc_data', methods=['POST'])
def get_yc_property_send():
    stationId = request.form.get("stationId")
    station = json.loads(stationId)
    DataCommand = ice_con()
    status, pIDs, result = DataCommand.RPCGetYCProperty(station)
    ycproperty = []
    for i in range(len(pIDs)):
        ycproperty.append({"id": pIDs[i], "name": result[i].name,
                           "unit": result[i].unit, "k": result[i].k,
                           "b": result[i].b, "precision": result[i].precision,
                           "fullvalue": result[i].fullvalue, "mindelta": result[i].mindelta,
                           "zerovalue": result[i].zerovalue, "flog": result[i].flog,
                           "fplan": result[i].fplan, "fcache": result[i].fcache,
                           "fTrans": result[i].fTrans, "fMin": result[i].fMin,
                           "fMax": result[i].fMax, "fAvrg": result[i].fAvrg,
                           "fRatio": result[i].fRatio, "fUpper": result[i].fUpper,
                           "fLower": result[i].fLower, "fUpper2": result[i].fUpper2,
                           "fLower2": result[i].fLower2, "fMinTime": result[i].fMinTime,
                           "fMaxTime": result[i].fMaxTime, "padding": result[i].padding,
                           "fMax2": result[i].fMax2, "fMaxTime2": result[i].fMaxTime2,
                           "yxno": result[i].yxno, "alevel": result[i].alevel,
                           "uppervalue": result[i].uppervalue, "lowervalue": result[i].lowervalue,
                           "uppervalue2": result[i].uppervalue2, "lowervalue2": result[i].lowervalue2})
    return json.dumps(ycproperty)

# 添加、修改(遥测属性)
@yc_blu.route('/set_yc', methods=['POST'])
def set_yc_property():
    DataCommand = ice_con()
    stationId = request.form.get("stationId")
    station = json.loads(stationId)
    newyc = request.form.get("data")
    new_yc = json.loads(newyc)
    p_IDs = json.loads(new_yc[len(new_yc) - 1])
    pIDs = []
    for i in range(len(p_IDs)):
        pIDs.append(long(p_IDs[i]))
    new_yc.pop()
    YcProperty = new_yc
    ycp = []
    for i in range(len(YcProperty)):
        ycp.append(json.loads(YcProperty[i]))
    ycproperty = []
    for j in range(len(p_IDs)):
        ycpstruct = YCArea.DxPropertyYC(ycp[0][j].encode("utf-8"), ycp[1][j].encode("utf-8"),
                                        float(ycp[2][j]), float(ycp[3][j]),
                                        int(ycp[4][j]), float(ycp[5][j]),
                                        float(ycp[6][j]), float(ycp[7][j]),
                                        int(ycp[8][j]), int(ycp[9][j]),
                                        int(ycp[10][j]), ycp[11][j],
                                        ycp[12][j], ycp[13][j],
                                        ycp[14][j], ycp[15][j],
                                        ycp[16][j], ycp[17][j],
                                        ycp[18][j], ycp[19][j],
                                        ycp[20][j], ycp[21][j],
                                        int(ycp[22][j]), ycp[23][j],
                                        ycp[24][j], int(ycp[25][j]),
                                        int(ycp[26][j]), float(ycp[27][j]),
                                        float(ycp[28][j]), float(ycp[29][j]),
                                        float(ycp[30][j]))
        ycproperty.append(ycpstruct)
    DataCommand.RPCSetYCProperty(station, pIDs, ycproperty)
    return '保存成功!'

# 删除(遥测属性)
@yc_blu.route('/delete_yc', methods=['POST'])
def delete_yc_data():
    DataCommand = ice_con()
    stationId = request.form.get("stationId")
    station = json.loads(stationId)
    ycIDs = request.form.get("ids")
    yc_IDs = json.loads(ycIDs)
    pIDs = []
    for i in range(len(yc_IDs)):
        pIDs.append(long(yc_IDs[i]))
    DataCommand.RPCDelYCProperty(station, pIDs)
    return '删除成功!'