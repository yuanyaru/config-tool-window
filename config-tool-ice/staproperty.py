#!/usr/bin/python
# -*- coding:utf-8 -*-

from flask import Blueprint, request
from iceCon import ice_con
import json
import Ice
Ice.loadSlice("./ice-sqlite.ice")
import StationArea

sta_blu = Blueprint('station', __name__)


def get_station_property():
    DataCommand = ice_con()
    status, stations, result = DataCommand.RPCGetStationProperty()
    return result, stations

# 查找(厂站属性)
@sta_blu.route('/station_data', methods=['GET'])
def get_station_property_send():
    result, stations = get_station_property()
    staproperty = []
    for i in range(len(result)):
        staproperty.append({"station": stations[i], "name": result[i].name,
                            "nYX": result[i].nYX, "nYC": result[i].nYC,
                            "type": result[i].type, "protocol": result[i].protocol,
                            "addr1": result[i].addr1, "addr2": result[i].addr2,
                            "port": result[i].port, "slaveAddr": result[i].slaveAddr,
                            "devName": result[i].devName, "baud": result[i].baud,
                            "dataBits": result[i].dataBits, "stopBits": result[i].stopBits,
                            "parity": result[i].parity, "timeout": result[i].timeout,
                            "reserved": result[i].reserved})
    return json.dumps(staproperty)

# 添加、修改(厂站属性)
@sta_blu.route('/set_station', methods=['POST'])
def set_station_property():
    DataCommand = ice_con()
    newstation = request.form.get("data")
    new_station = json.loads(newstation)
    stations = json.loads(new_station[len(new_station) - 1])
    sta = []
    for i in range(len(stations)):
        sta.append(long(stations[i]))
    new_station.pop()
    StationProperty = new_station
    stationp = []
    for i in range(len(StationProperty)):
        stationp.append(json.loads(StationProperty[i]))
    stap = []
    for j in range(len(stations)):
        spstruct = StationArea.DxPropertyStation(stationp[0][j].encode("utf-8"), int(stationp[1][j]),
                                                 int(stationp[2][j]), int(stationp[3][j]),
                                                 stationp[4][j].encode("utf-8"), stationp[5][j].encode("utf-8"),
                                                 stationp[6][j].encode("utf-8"), int(stationp[7][j]),
                                                 int(stationp[8][j]), stationp[9][j].encode("utf-8"),
                                                 int(stationp[10][j]), int(stationp[11][j]),
                                                 int(stationp[12][j]), int(stationp[13][j]),
                                                 int(stationp[14][j]), int(stationp[15][j]))
        stap.append(spstruct)
    # sta = [13L]
    # spstruct = StationArea.DxPropertyStation("station", 11, 12000, 100, "st_protocol", "192.168.100.111",
    #                                          "192.168.100.112", 200, 20000, "st_devName",
    #                                          20000, 31000, 32000, 100, 40000, 41000)
    # stap.append(spstruct)
    DataCommand.RPCSetStationProperty(sta, stap)
    return '保存成功!'

# 删除(厂站属性)
@sta_blu.route('/delete_station', methods=['POST'])
def delete_station_data():
    DataCommand = ice_con()
    stationIDs = request.form.get("ids")
    stations = json.loads(stationIDs)
    sta = []
    for i in range(len(stations)):
        sta.append(long(stations[i]))
    DataCommand.RPCDelStationProperty(sta)
    return '删除成功!'