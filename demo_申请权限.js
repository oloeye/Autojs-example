/*
 * @Author: your name
 * @Date: 2021-06-04 18:05:08
 * @LastEditTime: 2021-06-06 00:33:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\demo_申请权限.js
 */

// 截图权限
if (!requestScreenCapture()) {
    toastLog("请求截图权限 失败");
} else {
    toastLog("请求截图权限 成功");
}

// 悬浮窗权限
floaty.checkPermission();
// 跳转悬浮窗权限设置界面代码
app.startActivity({
    packageName: "com.android.settings",
    className: "com.android.settings.Settings$AppDrawOverlaySettingsActivity",
    data: "package:" + context.getPackageName(),
});


// 后台自启权限
let intent = new Intent();
intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
let pkg = "com.huawei.systemmanager";
let cls = "com.huawei.systemmanager.startupmgr.ui.StartupNormalAppListActivity";
let componentName = new android.content.ComponentName(pkg, cls);
intent.setComponent(componentName);
context.startActivity(intent);


// 申请权限
function 权限申请() {
    if (!floaty.checkPermission()) {
        toast("请开启悬浮窗和后台弹出界面权限");
        floaty.requestPermission();
        return
    }
    if (auto.service == null) {
        toast("请开启脚本的无障碍服务");
        auto.waitFor();
        return
    }
}
权限申请();