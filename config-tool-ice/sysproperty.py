#!/usr/bin/python
# -*- coding:utf-8 -*-

from flask import Blueprint, request
from iceCon import ice_con
import json
import Ice
Ice.loadSlice("./ice-sqlite.ice")
import SystemArea

sys_blu = Blueprint('sys', __name__)


def get_sys_property():
    DataCommand = ice_con()
    status, result = DataCommand.RPCGetSystemProperty()
    return result

# 查找(系统属性)
@sys_blu.route('/sys_data', methods=['GET'])
def get_sys_property_send():
    result = get_sys_property()
    sysproperty = []
    sysproperty.append({"name": result.name, "nstation": result.nstation})
    return json.dumps(sysproperty)

# 修改(系统属性)
@sys_blu.route('/set_sys', methods=['POST'])
def set_sys_property():
    DataCommand = ice_con()
    newstation = request.form.get("data")
    new_station = json.loads(newstation)
    syspstruct = SystemArea.DxPropertySystem(new_station[0].encode("utf-8"), int(new_station[1]))
    # syspstruct = SystemArea.DxPropertySystem("systemm", 10)
    DataCommand.RPCSetSystemProperty(syspstruct)
    return '保存成功!'