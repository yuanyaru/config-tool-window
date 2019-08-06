#!/usr/bin/python
# -*- coding:utf-8 -*-

from flask import Flask, render_template
from iceCon import ice_con
import sys
import Ice
Ice.loadSlice("./ice-sqlite.ice")
from sysproperty import sys_blu
from staproperty import sta_blu, get_station_property
from yxproperty import yx_blu
from ycproperty import yc_blu

reload(sys)
sys.setdefaultencoding('utf-8')

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.register_blueprint(sys_blu)
app.register_blueprint(sta_blu)
app.register_blueprint(yx_blu)
app.register_blueprint(yc_blu)


def get_property_table():
    DataCommand = ice_con()
    status, systemtable, stationtable, yctable, yxtable, yktable, yttable, eventtable = \
        DataCommand.RPCGetPropertyTable()
    table = [systemtable, stationtable, yctable, yxtable, yktable, yttable, eventtable]
    return table


@app.route('/')
def index():
    table = get_property_table()
    result, stations = get_station_property()
    return render_template('data.html', tValue=table, ids=stations, staValue=result, staLen=len(stations))


if __name__ == '__main__':
    app.run(debug=True)


