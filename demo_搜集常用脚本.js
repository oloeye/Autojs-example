/*
 * @Author: your name
 * @Date: 2021-06-09 00:16:53
 * @LastEditTime: 2021-06-09 00:18:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\demo_搜集常用脚本.js
 */

// 微信语音聊天电话无限轰炸脚本
"auto";
launchApp("微信");
toast("打开聊天界面进行操作");
while (true) {
    id("aa6").click();
    bounds(786, 1166, 1032, 1436).click();
    sleep(1000);
    id("bps").click();
}

// 跳过启动页广告
"auto";
var ad = textContains("跳过");
while (true) {
    ad.findOne().click();
}