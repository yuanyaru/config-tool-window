module DemoArea {
    sequence<byte> ByteSeq;
    sequence<long> LongSeq;
    sequence<string> StringSeq;
};

module YCArea {
    struct DxPropertyYC {
        DemoArea::ByteSeq name;
        DemoArea::ByteSeq unit;
        float k;
        float b;
        short precision;
        float fullvalue;
        float mindelta;
        float zerovalue;
        short flog;
        short fplan;
        short fcache;
        bool fTrans;
        bool fMin;
        bool fMax;
        bool fAvrg;
        bool fRatio;
        bool fUpper;
        bool fLower;
        bool fUpper2;
        bool fLower2;
        bool fMinTime;
        bool fMaxTime;
        short padding;
        bool fMax2;
        bool fMaxTime2;
        short yxno;
        short alevel;
        float uppervalue;
        float lowervalue;
        float uppervalue2;
        float lowervalue2;
    };

    struct DxDTYC {
        short status;
        float value;
        int timetag;
    };

   sequence<DxPropertyYC> DxPropertyYCSeq;
   sequence<DxDTYC> DxDTYCSeq;
};

module YXArea {
    struct DxPropertyYX {
        DemoArea::ByteSeq name;
        bool fAlarm;
        bool fAlarmCount;
        byte unused;
        int reserved;
        short ykno;
        short alarmtype;
        short alevel;
    };

    struct DxDTYX {
        short status;
        short value;
        int timetag;
    };

   sequence<DxPropertyYX> DxPropertyYXSeq;
   sequence<DxDTYX> DxDTYXSeq;
};

module StationArea {
    struct DxPropertyStation {
        DemoArea::ByteSeq name;
        int nYX;
        int nYC;  
        short type;  
        DemoArea::ByteSeq protocol;  
        DemoArea::ByteSeq addr1;
        DemoArea::ByteSeq addr2;
        short port;
        int slaveAddr;
        DemoArea::ByteSeq devName;
        int baud;
        int dataBits;
        int stopBits;
        byte parity;
        int timeout;  
        int reserved;  

    };
    
    sequence<DxPropertyStation> DxPropertyStationSeq;
};

module SystemArea {
    struct DxPropertySystem {
        DemoArea::ByteSeq name;
        short nstation;
    };
};

module CommandArea {
   interface DataCommand {
        int RPCDelYCProperty (int station, DemoArea::LongSeq pIDs);
        int RPCGetYCProperty (int station, out DemoArea::LongSeq pIDs, out YCArea::DxPropertyYCSeq result);
        int RPCSetYCProperty (int station, DemoArea::LongSeq pIDs, YCArea::DxPropertyYCSeq YCProperty);
        int RPCGetRealtimeYCData (int station, DemoArea::LongSeq pIDs, out YCArea::DxDTYCSeq result);
        int RPCGetRealtimeYCDataForHTML (DemoArea::StringSeq pIDs, out YCArea::DxDTYCSeq result);
        int RPCGetDayYCDatas (string datetime, DemoArea::StringSeq pIDs, out DemoArea::LongSeq pIDNum, out YCArea::DxDTYCSeq result, out YCArea::DxDTYCSeq maxseq , out YCArea::DxDTYCSeq minseq, out YCArea::DxDTYCSeq averageseq);
        int RPCGetPeriodYCDatas(string datetime0, string datetime1, DemoArea::StringSeq pIDs, out DemoArea::LongSeq pIDNum, out YCArea::DxDTYCSeq result);       
        int RPCGetTimePointYCData (int station, string datetime, DemoArea::LongSeq pIDs, out YCArea::DxDTYCSeq result);
        int RPCSetRealtimeYCData (int station, DemoArea::LongSeq pIDs, YCArea::DxDTYCSeq data);
        int RPCSaveYCData (int station, DemoArea::LongSeq pIDs, YCArea::DxDTYCSeq data);

        int RPCDelYXProperty (int station, DemoArea::LongSeq pIDs);
        int RPCGetYXProperty (int station, out DemoArea::LongSeq pIDs, out YXArea::DxPropertyYXSeq result);
        int RPCSetYXProperty (int station, DemoArea::LongSeq pIDs, YXArea::DxPropertyYXSeq YXProperty);
        int RPCGetRealtimeYXData (int station, DemoArea::LongSeq pIDs, out YXArea::DxDTYXSeq result);
        int RPCGetRealtimeYXDataForHTML (DemoArea::StringSeq pIDs, out YXArea::DxDTYXSeq result);
        int RPCGetDayYXData (int station, string datetime, long pID, out YXArea::DxDTYXSeq result);
        int RPCGetDayYXDatas (int station, string datetime, DemoArea::LongSeq pIDs, out DemoArea::LongSeq pIDNum, out YXArea::DxDTYXSeq result);
        int RPCGetPeriodYXData(int station, string datetime0,string datetime1, long pID, out YXArea::DxDTYXSeq result);
        int RPCGetTimePointYXData (int station, string datetime, DemoArea::LongSeq pIDs, out YXArea::DxDTYXSeq result);
        int RPCSetRealtimeYXData (int station, DemoArea::LongSeq pIDs, YXArea::DxDTYXSeq data);
        int RPCSaveYXData (int station, DemoArea::LongSeq pIDs, YXArea::DxDTYXSeq data);

        int RPCDelStationProperty (DemoArea::LongSeq stations);
        int RPCGetStationProperty (out DemoArea::LongSeq stations, out StationArea::DxPropertyStationSeq result);
        int RPCSetStationProperty (DemoArea::LongSeq stations, StationArea::DxPropertyStationSeq StationProperty);

        int RPCGetSystemProperty (out SystemArea::DxPropertySystem result);
        int RPCSetSystemProperty (SystemArea::DxPropertySystem SystemProperty);
        
        int RPCGetPropertyTable (out DemoArea::StringSeq systemtable, out DemoArea::StringSeq stationtable, out DemoArea::StringSeq yctable, out DemoArea::StringSeq yxtable, out DemoArea::StringSeq yktable, out DemoArea::StringSeq yttable, out DemoArea::StringSeq eventtable);

    };
};
