/*
 * @Author: your name
 * @Date: 2021-06-04 17:36:40
 * @LastEditTime: 2021-06-04 18:04:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\demo_问题解决.js
 */
// 问题: 控件属性 clickable=false 不能点击
function clickui(ui) {
    if (ui.exists()) { 
        var a = ui.findOnce(); 
        if (a) { 
            var b = a.bounds(); 
            if (b) { 
                log(b) 
                click(b.centerX(), b.centerY()); 
                return true; 
            } 
        } 
    } 
    return false;
}
//示例:clickui(text("消息"))
//clickui(id("控件名字"))

// 问题：代码怎么改变一个 UI 按钮不可见
ui.启动.visbility("gone");
viewId.setVisibility (android.view.View.GONE);


// 问题： 随机出现的广告，去广告线程
 // 
threads.start(function () { 
    function 点击广告(classes,dep, draw, inpa) { 
        var view1 = className(classes).depth(dep).drawingOrder(draw).indexInParent(inpa); 
        if (view1.exists()) { 
        view1.click() 
        toastLog("已经点击关闭广告按钮");
        sleep(10000); 
        } 
        else { 
            toastLog("等待关闭按钮出现"); 
            sleep(5000) 
        }
    }

    function clickUi(ui) { 
        if (ui.exists()) { 
            var a = ui.findOnce(); 
            if (a) { 
                var b = a.bounds(); 
                if (b) { 
                    log(b) 
                    click(b.centerX(), b.centerY()); 
                    return true; 
                } 
            } 
        } return false;
    } 

    toastLog("开启广告线程") 
    sleep(6000) 
    var imgim = className("android.widget.ImageView").indexInParent("1").depth("5").drawingOrder("2"); 
    while (true) {
        点击广告("android.widget.RelativeLayout",4, 6, 3); 
        //clickUi("tt_video_ad_close_layout") 
        //sleep(2000); 
        //点击广告("android.widget.ImageView",5, 5, 2); 
        //sleep(2000); 
        //if (imgim.exists()) { 
        //    clickUi(imgim) 
        //    sleep(2000) 
        //} sleep(2000); 
    }
});

// 问题: 息屏运行一会就暂停运行
//保持亮屏 注意,最好手动开启一下停止电池优化
device.keepScreenOn(360000000 * 1000);