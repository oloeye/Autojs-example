/*
 * @Author: your name
 * @Date: 2021-06-08 23:28:32
 * @LastEditTime: 2021-06-08 23:36:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\demo_充满电提心.js
 */

// 知识点
device.getBattery(); // 获取设备电量
device.isCharging(); // 设备是否正在充电， 放回布尔类型
device.setMusicVolume(); // 获取媒体声量
media.playMusic(path) // 播放音乐
engines.execScriptFile(path) // 执行新脚本

// 可以配合外部开关，防止长时间充电，损坏手机电池