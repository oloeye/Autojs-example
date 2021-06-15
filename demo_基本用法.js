/*
 * @Author: your name
 * @Date: 2021-06-07 00:15:01
 * @LastEditTime: 2021-06-09 00:13:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\ulits\demo_基本用法.js
 */
auto.waitFor();
var appName = "法宣在线";
launchApp(appName);

sleep(5000);

// 等待应用界面
// waitForPackage(package[, period = 200]);

// findOne() 找不到会进行阻塞
// findOne(timeout) timeout中找不到跳过, 返回 null
// findOnce() 返回值是控件， 找不到返回 null
// findOnce(i) 找返回第i 个控件
// find()  untilfind()

// 等待课程的按钮出现
id("activity_main_course").waitFor();
// 判断是否进入首页，但是需要控制时间
// text("课程").exists();

// 寻找课程这个按钮
var btn_course = id("activity_main_course").findOne();
if (btn_course) {
    btn_course.click();
    sleep(5000);
}

// 点击选修课
var btn_radio = text("选修课").findOne();
if (btn_radio) {
    btn_radio.click();
    sleep(5000);
}

id("curse_item_learn_button").waitFor();

var btn_learn = id("curse_item_learn_button").findOnce(1);
// 当 clickable = true 时候:
// 直接使用    控件click();

// 当 clickable = false 时候:
// 利用bounds找中心点坐标，然后使用click(x,y) 或 press(x,y, 100); 100ms
if (btn_learn) {
    x = btn_learn.bounds().centerX();
    y = btn_learn.bounds().centerY();
    click(x, y);
}


// 点击 学
sleep(1000 * 60 * 11);


launchApp ("名字"); // 通过 app 名字启动 app 应用

launch ("app 包名"); // 通过包名启动 app 应用

sleep (random (1000,5000)); // 随机等待 1 到 5 秒

swipe (x1,y1,x2,y2,time); // 滑动屏幕 (time 表示滑动的时间)

click (x,y); // 单点击坐标，， click ("加好友"); // 点击 "加好友" 按钮

press (x,y,time); // 按住坐标，time 表示时间好像是毫秒

home (); // 回到桌面

back (); // 返回上一步

app.uninstall ("包名"); // 卸载 app

getpackagename (' 应用名 '); // 通过应用名获取 app 包名

toast ("hallo word"); // 在手机 toast 提示

toastLog ('hallo word'); // 提示信息 + log 记录

log ('hallo word'); // 记录 log

text ("属性值").findOne ().parent ().click (); //parent 通过子控件查找父控件，常用于子控件不能点击，而通过子控件查找到父控件完成点击

text ("属性值").findOne ().childCount (); // 获取控件中子控件的数量

text ("进入游戏").find ().click (); // 点击进入游戏 (先查找再点击)

text ("进入游戏").findOne (3000).click (); // 点击进入游戏___查询超时就报错，，(text () 是完全匹配)

textContains ("手机").find ().click (); // 匹配页面包含手机的元素

textStartsWith ("手机").find ().click (); // 匹配以 "手机" 开头的元素

textEndsWith ("手机").find ().click (); // 匹配以 "手机" 结尾的元素

text ("xxxx").find (); // 按控件文本查找，，  也可使用 findOne ()

desc ("xxxx").find (); // 按描述信息查找

id ("xxxx").find (); // 按元素 id 查找元素

className ("xxxx").find (); // 按元素类型查找

atextMatches ("\\d+"); // 以正则匹配

setText ("城南花已开") ; // 在光标处输入数据

alert ("标题","内容"); // 对话框输出


//传入路径就可以使用
function Baidu_OCR(imgFile) {
    access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=YIKKfQbdpYRRYtqqTPnZ5bCE&client_secret=hBxFiPhOCn6G9GH0sHoL0kTwfrCtndDj").body.json().access_token;
    url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic" + "?access_token=" + access_token;
    imag64 = images.toBase64(images.read(imgFile));
    res = http.post(url, {headers: {'Content-Type': 'application/x-www-form-urlencoded'},image: imag64,image_type: "BASE64",});
    str = JSON.parse(res.body.string()).words_result.map(val => val.words).join('\n');
    return str;
}