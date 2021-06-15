/*
 * @Author: your name
 * @Date: 2021-06-06 00:37:23
 * @LastEditTime: 2021-06-06 00:37:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Autojs\demo_加群+QQ弹窗.js
 */
联系(1906507927,553908361)
function 联系(QQ,QQ群){          
    var Q群=QQ群
    var isFold = false,
        isRunning = false,
        isRotate = null;
        function sjcl() {
            let d = ["red", "green", "blue", "purple"]
            let y = random(0, 3)
            return d[y]
        
        }
    var ys = sjcl();

    
    var h = device.height;
    var w = device.width;
    dialogs.build({
        title: "欢迎加入更多项目群",
        titleColor: ys,
        content: "作者QQ:" + QQ + "\nautojs交流群:" + Q群,
        contentColor: ys,
        cancelable: true,
        positive: "加入Q群",
        positiveColor: ys,
        neutral: "取消",
        neutralColor: ys,
        negative: "联系作者",
        negativeColor: ys
    }).on("positive", () => {
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: "mqqapi://card/show_pslcard?card_type=group&uin=" + Q群,
            packageName: "com.tencent.mobileqq",
        });
        toast("加入Q群")
    }).on("negative", () => {
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: "mqqapi://card/show_pslcard?uin=" + QQ,
            packageName: "com.tencent.mobileqq",
        })
    
        toast("联系作者")
    }).on("neutral", () => {
        //取消键
        toast("返回")
    
    }).show();}