/*
 * @Author: your name
 * @Date: 2021-06-04 17:09:44
 * @LastEditTime: 2021-06-05 00:13:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\demo_ui悬浮窗.js
 */
"ui";

// 停止所有脚本运行
engines.all().map((scriptEngine) => {
    if(engines.myEngine().toString() != scriptEngine.ToString()){
        scriptEngine.forceStop();
    }
});