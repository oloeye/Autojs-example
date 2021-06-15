"ui";

auto();
var color = "#000000";
//数据源
var _golDataSource;
var _golHasBind = false;//是否绑定数据
var _golFolder = "./runJs/";
/**
 * 当前刷新app的索引
 */
var _golRunIndex = 0;

/**
 * card按钮宽度
 */
var _golCardWidth = 0;
/**
 * card按钮高度
 */
var _golCardHeigth = 200
/**
 * 共通方法类
 */
var golRunComm = null;
/**
 * 主线程
 */
var _golThread;
/**
 * 保存窗口数据和窗口状态
 */
var _golStorage = null;

/**小窗体的大小 */
var floaty_window_W;
var floaty_window_H;
/**按钮名称 */
var floaty_window_BtnStr;
//-----窗口数据结束

var key = "default";

var path_img = "file://./res/assests/ewm.jpg"

_golCardWidth = parseInt(device.width * 0.155);


Main();//主入口

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar bg="#FF5c50e6" id="toolbar" title="自动刷新" paddingTop="2dp" h="auto" >
                    <button bg="#FF00CED1" id="BtnExit" layout_gravity="right" textColor="#ffffff" text="离开" style="Widget.AppCompat.Button.Borderless.Colored" w="auto" />
                </toolbar>
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                {/* 第一级 */}
                <frame>
                    <scroll>
                        <vertical>
                            <horizontal gravity="center_vertical">
                                <card w="{{_golCardWidth}}" h="{{_golCardHeigth}}"
                                    layout_width="0dp" layout_weight="3"
                                    margin="4" cardCornerRadius="15dp" cardBackgroundColor="#f5f5f5"
                                    cardElevation="15dp" gravity="left" foreground="?selectableItemBackground">
                                    <vertical>
                                        <linear margin="0 40 0 0">
                                            <View bg="#2196f3" h="*" w="10" />
                                            <text id="name" w="*" h="40" hint="欢迎自动刷新" />
                                        </linear>
                                        <button id="BtnStart" text="开始刷新" w="{{_golCardWidth}}" />
                                    </vertical>
                                </card>
                                <card w="{{_golCardWidth}}" h="{{_golCardHeigth}}"
                                    layout_width="0dp" layout_weight="3"
                                    margin="4" cardCornerRadius="15dp" cardBackgroundColor="#f5f5f5"
                                    cardElevation="15dp" gravity="right" foreground="?selectableItemBackground">
                                    <vertical>
                                        <linear margin="0 40 0 0">
                                            <img w="30" h="30" src="@drawable/ic_person_black_48dp" />
                                            <text id="name" w="*" h="40" hint="自动点赞" />
                                        </linear>
                                        <button text="未完成" w="{{_golCardWidth}}" />
                                    </vertical>
                                </card>
                            </horizontal>
                            <horizontal gravity="center_vertical">
                                <card w="{{_golCardWidth}}" h="{{_golCardHeigth}}"
                                    layout_width="0dp" layout_weight="3"
                                    margin="4" cardCornerRadius="15dp" cardBackgroundColor="#f5f5f5"
                                    cardElevation="15dp" gravity="left" foreground="?selectableItemBackground">
                                    <vertical>
                                        <linear margin="0 40 0 0">
                                            <View bg="#2196f3" h="*" w="10" />
                                            <text id="name" w="*" h="40" hint="公众号'学生快乐编程'" />
                                        </linear>
                                        <button text="未完成" w="{{_golCardWidth}}" />
                                    </vertical>
                                </card>
                                <card w="{{_golCardWidth}}" h="{{_golCardHeigth}}"
                                    layout_width="0dp" layout_weight="3"
                                    margin="4" cardCornerRadius="15dp" cardBackgroundColor="#f5f5f5"
                                    cardElevation="15dp" gravity="right" foreground="?selectableItemBackground">
                                    <vertical>
                                        <linear margin="0 40 0 0">
                                            <img w="30" h="30" src="@drawable/ic_person_black_48dp" />
                                            <text id="name" w="*" h="40" hint="预留功能" />
                                        </linear>
                                        <button text="未完成" w="{{_golCardWidth}}" />
                                    </vertical>
                                </card>
                            </horizontal>

                            <vertical h="auto" align="center" marginTop="1">
                                <img layout_gravity="center" src="{{path_img}}" w="120" h="120" />
                                <text w="auto" glayout_gravity="center" color="#111111" size="13" text="关注公众号：学生快乐编程" />
                            </vertical>

                        </vertical>
                    </scroll>
                </frame>
                {/*
                第二级
                 注释：
                 -修改排序内容 */}
                <frame>
                    <vertical>
                        <horizontal weightSum="8" bg='#FF5c50e6'>
                            <button layout_width="0dp" layout_weight="4" id="BtnSave" text="手动保存" />
                            <button layout_width="0dp" layout_weight="4" id="BtnBegin" text="开始刷新" />
                        </horizontal>
                        <scroll>
                            <vertical>
                                <card id="card0" w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal gravity="center_vertical">
                                        <View bg="#000080" h="*" w="10" />
                                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                            <text id="appCnName0" text="" textColor="#222222" textSize="14sp" maxLines="1" />
                                            <text id="filepath0" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                            <text id="app0" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                        </vertical>
                                        <text w="auto" gravity="right" color="#111111" size="13" text="排序" />
                                        <input id="sortid0" text="" textSize="13sp" maxLines="1" inputType="number" />
                                        <text w="auto" gravity="right" color="#111111" size="13" text="(秒)" />
                                        <input id="t0" w="auto" gravity="right" textSize="13sp" text="" inputType="number" />
                                        <checkbox id="done0" marginLeft="4" marginRight="6" checked="true" />
                                    </horizontal>
                                </card>

                                <card id="card1" w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal gravity="center_vertical">
                                        <View bg="#00008B" h="*" w="10" />
                                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                            <text id="appCnName1" text="" textColor="#222222" textSize="14sp" maxLines="1" />
                                            <text id="filepath1" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                            <text id="app1" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                        </vertical>
                                        <text w="auto" gravity="right" color="#111111" size="13" text="排序" />
                                        <input id="sortid1" text="" textSize="13sp" maxLines="1" inputType="number" />
                                        <text w="auto" gravity="right" color="#111111" size="13" text="(秒)" />
                                        <input id="t1" w="auto" gravity="right" textSize="13sp" text="" inputType="number" />
                                        <checkbox id="done1" marginLeft="4" marginRight="6" checked="false" />
                                    </horizontal>
                                </card>

                                <card id="card2" w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal gravity="center_vertical">
                                        <View bg="#0000CD" h="*" w="10" />
                                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                            <text id="appCnName2" text="" textColor="#222222" textSize="14sp" maxLines="1" />
                                            <text id="filepath2" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                            <text id="app2" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                        </vertical>
                                        <text w="auto" gravity="right" color="#111111" size="13" text="排序" />
                                        <input id="sortid2" text="" textSize="13sp" maxLines="1" inputType="number" />
                                        <text w="auto" gravity="right" color="#111111" size="13" text="(秒)" />
                                        <input id="t2" w="auto" gravity="right" textSize="13sp" text="" inputType="number" />
                                        <checkbox id="done2" marginLeft="4" marginRight="6" checked="false" />
                                    </horizontal>
                                </card>

                                <card id="card3" w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                                    cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal gravity="center_vertical">
                                        <View bg="#0000FF" h="*" w="10" />
                                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                            <text id="appCnName3" text="" textColor="#222222" textSize="14sp" maxLines="1" />
                                            <text id="filepath3" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                            <text id="app3" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                        </vertical>
                                        <text w="auto" gravity="right" color="#111111" size="13" text="排序" />
                                        <input id="sortid3" textSize="13sp" maxLines="1" inputType="number" />
                                        <text w="auto" gravity="right" color="#111111" size="13" text="(秒)" />
                                        <input id="t3" w="auto" gravity="right" textSize="13sp" text="" inputType="number" />
                                        <checkbox id="done3" marginLeft="4" marginRight="6" checked="false" />
                                    </horizontal>
                                </card>

                                <card id="card4" w="*" h="70" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                                    <horizontal gravity="center_vertical">
                                        <View bg="#00BFFF" h="*" w="10" />
                                        <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                            <text id="appCnName4" text="" textColor="#222222" textSize="14sp" maxLines="1" />
                                            <text id="filepath4" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                            <text id="app4" text="" textColor="#999999" textSize="12sp" maxLines="1" />
                                        </vertical>
                                        <text w="auto" gravity="right" color="#111111" size="13" text="排序" />
                                        <input id="sortid4" textSize="13sp" maxLines="1" inputType="number" />
                                        <text w="auto" gravity="right" color="#111111" size="13" text="(秒)" />
                                        <input id="t4" w="auto" gravity="right" textSize="13sp" text="" inputType="number" />
                                        <checkbox id="done4" marginLeft="4" marginRight="6" checked="false" />
                                    </horizontal>
                                </card>


                            </vertical>
                        </scroll>
                    </vertical>
                </frame>
                {/*
                    第三级
                 ？第二层结束？ */}
                <frame>
                    <com.stardust.autojs.core.console.ConsoleView id="console" h="*" />
                </frame>
                {/*
                    第四级
                 ？第四层结束？ */}
                <frame>
                    <card id="card4" w="*" h="100" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
                        <horizontal gravity="center_vertical">
                            <View bg="#00BFFF" h="*" w="10" />
                            <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                <text w="auto" color="#111111" size="16" text="1、需要启动无障碍服务。" />
                                <text w="auto" color="#111111" size="16" text="2、允许app显示在其他应用的上层。" />
                            </vertical>

                        </horizontal>
                    </card>
                </frame>
                {/*
                    第五级
                 ？第五层结束？ */}
                <frame>
                    <text w="auto" gravity="right" color="#111111" size="16" text="          第四页：关注公众号学生快乐编程" />

                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" />
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}" />
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
                </horizontal>
            </list>
        </vertical>
    </drawer>
);



/**复选框 开始*/
//绑定勾选框事件
ui.done0.on("check", function (checked) {
    log("ck-" + checked);

    if (checked) {
        ui.card0.attr("bg", "#F5f5f5");
    } else {
        ui.card0.attr("bg", "#999999");
    }

});
/**复选框 结束*/
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["主页", "配置", "日志", "帮助", "About"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

/**
 * 页面头部选项卡更改侦听器
 * */
ui.viewpager.setOnPageChangeListener({
    //已选定页面发生改变时触发
    onPageSelected: function (index) {
        if (index == 1 && _golHasBind == false) {
            /**
            * 绑定，填充数据
            */
            bindDdata();
        } else if (index == 2) {
            /**控制台 */
            ui.console.setConsole(runtime.console);
            // ui.console.findViewById(org.autojs.autojs.R.id.input_container).setVisibility(android.view.View.GONE);
            //ui.console.setConsole(org.autojs.autojs.autojs.AutoJs.getInstance().getGlobalConsole());            

            // 设置控制台字体颜色
            let c = new android.util.SparseArray();
            let Log = android.util.Log;
            c.put(Log.VERBOSE, new java.lang.Integer(colors.parseColor("#dfc0c0c0")));
            c.put(Log.DEBUG, new java.lang.Integer(colors.parseColor("#cc000000")));
            c.put(Log.INFO, new java.lang.Integer(colors.parseColor("#ff64dd17")));
            c.put(Log.WARN, new java.lang.Integer(colors.parseColor("#ff2962ff")));
            c.put(Log.ERROR, new java.lang.Integer(colors.parseColor("#ffd50000")));
            c.put(Log.ASSERT, new java.lang.Integer(colors.parseColor("#ffff534e")));
            ui.console.setColors(c);
            /**控制台 */
        }

    }
})

/**
 * 主入口程序
 */
function Main() {
    log("main");

    engines.all().slice(1).forEach(script => {
        if (script.getSource().getName().indexOf(engines.myEngine().getSource())) {
            toastLog("脚本正在运行中");
            engines.myEngine().forceStop();
        }
    });

    ui.statusBarColor(color);

    _golDataSource = LoadConfig();
    _golStorage = storages.create("asianbest.vip");

    log("winW=" + _golStorage.get("winW"));
    log("winH=" + _golStorage.get("winH") + "-btnText-" + _golStorage.get("btnText"));


    floaty_window_W = 120;
    floaty_window_H = 120;
    floaty_window_BtnStr = "小化";
}


/**
 * 将数据填充到UI中
 */
function bindDdata() {

    for (let k = 0; k < _golDataSource.length; k++) {

        ui["filepath" + k].setText(_golDataSource[k].filepath);

        let appEn = _golDataSource[k].app;
        ui["app" + k].setText(appEn);


        let appCn = getAppName(appEn);
        if (null == appCn) {

            ui["done" + k].checked = false;
            ui["card" + k].attr("bg", "#999999");
            ui["appCnName" + k].setText(appEn);
        }
        else {

            ui["done" + k].checked = true;
            ui["card" + k].attr("bg", "#F5f5f5");
            ui["appCnName" + k].setText(appCn);
        }

        let isRun = _golDataSource[k].Run;
        if ("0" == isRun) {
            ui["done" + k].checked = false;
            ui["card" + k].attr("bg", "#A9A9A9");
        }

        ui["sortid" + k].setText(_golDataSource[k].sortid);
        ui["t" + k].setText(_golDataSource[k].t);
    }
    _golHasBind = true;
}

/**
 * 读取config文件
 */
function LoadConfig() {

    let _txtFile = _golFolder + "config.txt";

    if (files.exists(_txtFile)) {

        toast('读取文件' + _txtFile);

        var jsonStr = files.read(_txtFile);
        setTimeout(() => {
            toastLog("读取文件。");
        }, 400);
        var commFun = require(_golFolder + "CommonFun.js");
        golRunComm = new commFun();

        /**
        *对数组重新排序
        */
        let obj = golRunComm.ReSort(eval('(' + jsonStr + ')'));
        setTimeout(() => {
            toastLog("文件解析完成。");
        }, 400);

        return obj;
    }

}

/**保存按钮 */
ui.BtnSave.on("click", function () {

    let str = "[";

    for (let k = 0; k < _golDataSource.length; k++) {

        str += "{\"filepath\":\"" + ui["filepath" + k].text() + "\",";
        str += "\"app\":\"" + ui["app" + k].text() + "\","
        str += "\"sortid\":\"" + ui["sortid" + k].text() + "\",";
        str += "\"t\":\"" + ui["t" + k].text() + "\"}";
        if (k < _golDataSource.length - 1) {
            str += ",";
        }
    }

    str += "]";

    _golDataSource = golRunComm.ReSort(eval('(' + str + ')'));

    let _txtFile = _golFolder + "config.txt";
    files.write(_txtFile, str);

    setTimeout(() => {
        toastLog("修改文件。");
    }, 1500);

    bindDdata();
    setTimeout(() => {
        toastLog("更新UI界面。");
    }, 1500);
});
/**
 * 启动刷新程序
 */
ui.BtnStart.on("click", () => {
    ui.BtnStart.setText("暂停");
    ui.BtnBegin.setText("暂停");
    _golThread = threads.start(function () {
        log("Start日志");
        xuanfuchuang();
        log("启动子线程");
        ThreadStart();
    });
});
ui.BtnBegin.on("click", () => {
    ui.BtnStart.setText("暂停");
    ui.BtnBegin.setText("暂停");
    _golThread = threads.start(function () {
        log("Start日志");
        xuanfuchuang();
        log("启动子线程");
        ThreadStart();
    });
});
/**
 * 退出程序
 */
ui.BtnExit.on("click", () => {
    if (_golThread && _golThread.isAlive()) {
        log("线程" + _golThread.isAlive());
        _golThread.interrupt();
    }
    ui.finish();
});

function ThreadStart() {
    log("线程启动>>" + _golDataSource[0].filepath);

    Help(_golFolder + _golDataSource[_golRunIndex].filepath,
        _golDataSource[_golRunIndex].app,
        _golDataSource[_golRunIndex].t,
        getAppName(_golDataSource[_golRunIndex].app));


}

/**
* 
* [url=home.php?mod=space&uid=952169]@Param[/url] {js路径} _path 
* @param {app包名称} _appName 
* @param {执行时间长度} _times 
* @param {包中文名} _cn 
*/
function Help(_path, _appName, _times, _cn) {
    var myObj = require(_path);
    var unlock = new myObj(_appName, _times, _cn, golRunComm);
    unlock.RunApp();
    Calc_golRunIndex();
    ThreadStart();
}


function xuanfuchuang() {
    w = floaty.window(
        <frame id="action" bg="#90251911" w="{{floaty_window_W}}" h="{{floaty_window_H}}" padding="2">
            <linear w="*" h='*'>
                <vertical gravity="left" padding="-1">
                    <button id="Bmin" text="{{floaty_window_BtnStr}}" w="40" h="40" textSize="8sp" />
                    <button id="yidong" text="移动" w="40" h="40" textSize="8sp" />
                    <button id="tuichu" text="退出" w="40" h="40" textSize="8sp" />
                </vertical>
                <vertical padding="0">
                    <vertical>
                        <com.stardust.autojs.core.console.ConsoleView id="ConS" margin="1" textSize="8sp" />
                    </vertical>
                </vertical>
            </linear>
        </frame>
    );

    setInterval(() => { }, 1000);
    /**
     * 设定窗体位置
     */
    log("窗体位置" + _golStorage.get("winx") + " pos " + _golStorage.get("winy"));

    if (_golStorage.get("winx") && _golStorage.get("winy")) {
        w.setPosition(_golStorage.get("winx"), _golStorage.get("winy"));
    } else {
        w.setPosition(5, 1000);
    }

    ui.run(() => {
        w.ConS.setConsole(runtime.console);
        //w.ConS.setConsole(org.autojs.autojs.autojs.AutoJs.getInstance().getGlobalConsole());
        //w.ConS.findViewById(org.autojs.autojs.R.id.input_container).setVisibility(android.view.View.GONE);
    });

    w.tuichu.click(() => {
        log("线程" + _golThread.isAlive());

        ui.BtnStart.setText("重启");
        ui.BtnBegin.setText("重启");

        Calc_golRunIndex();

        if (_golThread && _golThread.isAlive()) {
            _golThread.interrupt();
        }
        toastLog("退出线程 >>");
        w.close();

    });

    var x = 0, y = 0;
    var windowX, windowY;
    var downTime;
    ui.run(function () {
        windowWidth = w.getWidth();
        windowHeight = w.getHeight();
    }
    );
    /**最小化显示 */
    w.Bmin.setOnTouchListener(function (view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = w.getX();
                windowY = w.getY();

                return true;
            case event.ACTION_MOVE:

                let wx = windowX + (event.getRawX() - x);
                let wy = windowY + (event.getRawY() - y);
                w.setPosition(wx, wy);
                SaveFloatWinPos(wx, wy);
                SaveFloatWinStates(190, 190, w.Bmin.text());
                return true;
            case event.ACTION_UP:

                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    if (w.Bmin.text() == "小化") {
                        w.Bmin.setText("大化");
                        w.setSize(190, 190);
                        SaveFloatWinStates(190, 190, w.Bmin.text());
                    } else {
                        w.Bmin.setText("小化");
                        w.setSize(windowWidth, windowHeight);
                        SaveFloatWinStates(windowWidth, windowHeight, w.Bmin.text());
                    }
                }
                return true;
        }
        return true;
    });
    /**移动窗体 */
    w.yidong.setOnTouchListener(function (view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                aw = w.getWidth();
                ah = w.getHeight();
                windowX = w.getX();
                windowY = w.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:

                w.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                return true;
            case event.ACTION_UP:

                SaveFloatWinPos(w.getX(), w.getY());
                return true;
        }
        return true;
    });
    /**
     * 保存窗体的坐标
     * @_x x坐标
     * @_y y坐标
     */
    function SaveFloatWinPos(_x, _y) {
        _golStorage.put("winx", _x);
        _golStorage.put("winy", _y);
    };
    /**
    * 保存窗体的状态
    * _states 窗体大小
    */
    function SaveFloatWinStates(_winW, _winH, _btnStr) {
        _golStorage.put("winW", _winW);
        _golStorage.put("winH", _winH);
        _golStorage.put("btnText", _btnStr);
    };

}

/**
 * 计算当前正在运行的app索引
 * 每次循环完成，自动+1；
 * 当手动停止的时候，自动+1
 * 
*/
function Calc_golRunIndex() {

    _golRunIndex++;
    if (_golRunIndex >= (_golDataSource.length)) {
        _golRunIndex = 0;
    }
};
