/*
 * @Author: your name
 * @Date: 2021-06-04 18:38:19
 * @LastEditTime: 2021-06-04 18:42:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\demo_clickable为false.js
 */
// 方法一、利用父控件点击
// 方法二、查找控件获取坐标
// 方法三、找图找色
function clickImg(smallImgPath, threshold) {
    var smallImg = images.read(smallImgPath); //读取本地的领取图片
    var img = captureScreen();
    var result = findImage(img, smallImg, {
        threshold: threshold,
    }); //找到图会返回坐标 找不到返回null
    if (!result) {
        log("没找到");
        return false;
    } else {
        click(result.x, result.y);
        log("找到了");
        return true;
    }
}
clickImg("1.jpg", 0.9);