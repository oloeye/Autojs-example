/*
 * @Author: your name
 * @Date: 2021-06-08 22:45:21
 * @LastEditTime: 2021-06-08 23:08:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\demo_关闭app的方法.js
 */

// 方法一 应用详情页 强行关闭
function 关闭应用(packageName) {
    var name = getPackageName(packageName); 
    if(!name){
        if(getAppName(packageName)){
            name = packageName;
        }else{
            return false;
        } 
    }
    app.openAppSetting(name);
    text(app.getAppName(name)).waitFor();  
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*确.*|.*定.*)/).findOne().click();
        log(app.getAppName(name) + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        log(app.getAppName(name) + "应用不能被正常关闭或不在后台运行");
        back();
    }
}

// 方法二 最近任务页滑动关闭(可能部分手机需要定制)
function killApp(name){
    recents();
    sleep(1000);

    var a=desc(name+",未加锁").findOne().bounds();
    // 滑动关闭 滑动到上面关闭
    swipe(a.centerX(), a.centerY(), a.centerX(), device.height, 300);
    sleep(1000);
    home();
    sleep(1000);
}

killApp("bilibili");
