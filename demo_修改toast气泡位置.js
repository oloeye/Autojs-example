/*
 * @Author: your name
 * @Date: 2021-06-06 00:34:12
 * @LastEditTime: 2021-06-06 00:34:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\demo_修改toast气泡位置.js
 */
function toastAt0(msg, x, y) {
    importClass(android.widget.Toast);
    importClass(android.view.Gravity);
    var toast = Toast.makeText(context, msg, Toast.LENGTH_SHORT);
    toast.setGravity(Gravity.TOP | Gravity.LEFT, x, y);
    toast.show();
}

function toastAt(msg, x, y) {
ui.run(() => toastAt0(msg, x, y));
}

toastAt('测试语句',device.width/2,device.height/2)
//toastAt('测试语句',300,300)
sleep(2000)