"ui";

//此代码由飞云脚本圈整理提供（www.feiyunjs.com）

// 误区一：使用线程开启无障碍
// 浪费CPU和内存资源，不必要的线程
// threads.start(function() {
//      auto.waitFor();
// });


// 误区二：直接使用auto()
// 对用户不友好
// auto();

// 正确示范：
// 通过一个开关表示无障碍权限是否开启
// 如果用户没有开启直接运行则提示

ui.layout(
    <vertical>
        <appbar>
            <toolbar title="UI脚本使用无障碍服务的最佳实践"/>
        </appbar>
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
        <frame height="200" gravity="center">
            <text text="相关配置..." gravity="center"/>
        </frame>
        <button id="start" text="开始运行"/>
    </vertical>
);

ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if(checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if(!checked && auto.service != null){
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;

    // 这里需要延迟再次判断，因为会出现判断不及时
    setTimeout(() => {
        if(auto.service != null){
            log("开启无障碍服务");
            ui.autoService.checked = true;
        }else{
            log("关闭无障碍服务");
            ui.autoService.checked = false;
        }
    },1000);
});



ui.start.on("click", function(){
    //程序开始运行之前判断无障碍服务
    if(auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    main();
});


function main() {
    // 这里写脚本的主逻辑
    threads.start(function () {
        log("开始运行");
        sleep(2000);
        log("运行结束");
    });
}

