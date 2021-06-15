/*
 * @Author: your name
 * @Date: 2021-06-06 00:38:27
 * @LastEditTime: 2021-06-06 00:38:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\demo_判断应用是否安装.js
 */
打开应用("微信")
function 打开应用(应用名){

    if(getPackageName(应用名)!=null){

    
    app.launchApp(应用名);
    toastLog("打开成功")
    
    }else{
    
    alert("温馨提示", "请下载安装"+应用名);
    console.log("请下载安装"+应用名);
    console.hide();
    
    console.log("关闭控制台");
    
    console.log("停止"+应用名+"脚本");
    exit();
    
    }
    
}