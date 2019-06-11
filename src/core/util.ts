/* md5 加密使用ts源码的方法 */
class md5_hex {
    static MD5(str: string): string {
        return new MD5().hex_md5(str);
    }
}

/*
* util 公用的js模板;
*/
class util {
    static mKeys: Object = {
        "1.0.1": "bdb0f3c3c0c7c89fb602f2464549a0c5",
    };
    static mHttpCall: HttpRequest = null;
    constructor() {

    }
    /* 统计数据 */
    static server(keyName: string, callback: Laya.Handler, data: Object = null): void {
        // if (oGameId != '') {
        //     GameMain.app.otherGameId = oGameId
        //     GameMain.app.wClick = keyName
        // }
        if (data == null) { data = {} }
        util.mHttpCall = new Laya.HttpRequest();
        util.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        util.mHttpCall.once(Laya.Event.ERROR, this, util.onHttpRequestError);
        let paramsData: Object = {};
        data['is_new'] = GameMain.app.mWX.PointFirst
        data['device_os_version'] = wxCore.uo.mPhone['system']
        data['wechat_version'] = wxCore.uo.mPhone['version']
        data['device_type'] = wxCore.uo.mPhone['model']
        paramsData["clos"] = JSON.stringify(data)
        // if (where != '') {
        //     paramsData["clos"] = '点击游戏:' + oGameId + '，点击来源：' + where + '，is_new：' + GameMain.app.mWX.PointFirst
        // } else {
        //     paramsData["clos"] = oGameId + '，is_new：' + GameMain.app.mWX.PointFirst
        // }
        paramsData["keyname"] = keyName
        paramsData["mobile"] = Laya.Browser.onIOS ? 2 : 1;
        paramsData['platform'] = 5;
        paramsData["uid"] = GameMain.app.mWX.mUID;
        paramsData["now_time"] = GameMain.app.getCurrTime();

        let str = GameMain.app.mWX.statUrl + "&" + util.getUrlParams(paramsData);
        // util.getServer() 
        util.mHttpCall.send(str, null, "get", "text");
        console.log("网络请求地址：", str);
        // 请求结果
        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string") {
                ret = util.getJSON(e);
            } else {
                ret = util.getJSON(util.mHttpCall.data);
            }
            if (callback != null) {
                callback.runWith(ret);
            }
            util.mHttpCall = null;
        }
    }
    /* 请求错误的回调 */
    static onHttpRequestError(e: any): void {
        wx.hideLoading({});
        util.mHttpCall = null;
    }
    static getUrlParams(params: Object, ver: string = "1.0.1"): string {
        let havetick = false;
        let keys: Array<string> = new Array<string>();
        for (let key in params) {
            if (typeof (params[key]) != "string" && typeof (params[key]) != "number") {
                continue;
            }
            if (key == "tick") {
                havetick = true;
            }
            let aa = key.toLocaleLowerCase();
            params[aa] = params[key];
            keys.push(aa);
        }
        if (havetick == false) {
            var date: Date = new Date();
            params['tick'] = Math.floor(date.getTime() / 1000);
            keys.push("tick");
        }
        keys.sort(function (a: string, b: string): number { return a > b ? 1 : -1 });
        // 组合
        let str = "";
        for (var index = 0; index < keys.length; index++) {
            str = str + keys[index] + "=" + params[keys[index]] + "&";
        }
        let scr: string = "";
        if (util.mKeys[ver] != null) {
            scr = md5_hex.MD5(str + "key=" + util.mKeys[ver]);
        } else {
            scr = md5_hex.MD5(str + "key=wvkbfuhl");
        }
        return str + "key=" + scr;
    }

    static getServer(): string {
        return "https://mascaiyou.wanzhushipin.cn/zi_paijl/"; // 正式服
        // return "https://testxcx.wanzhushipin.cn/zi_paijl/"; // 测试服
    }

    static getCDN(): string {
        return "https://tcdn.wanzhushipin.cn/xcx/games/piaoyi/";
    }

    static getJSON(str: string): Object {
        if (str == "" || str == null) {
            return { "code": -999 };
        }
        var len: number = str.indexOf("{", 0);
        str = str.substr(len, str.length - len);
        return JSON.parse(str);
    }
}