"ui";

// 阻塞获取无障碍权限！
var t = auto.waitFor();
log("是有无障碍服务");


ui.layout(
    <vertical>
        <appbar>
            <toolbar title="demo_2" />
            <tabs id="tabs_id"/>
        </appbar>

        <Switch id="autoService" text="无障碍服务" checked="{{auto.service !=null}}" />

        <viewpager id="vpager">
            <vertical>
                <text text="页面1"/>
                <button id="start_run" text="启动"/>
            </vertical>

            <vertical>
                <text text="页面2"/>
            </vertical>
        </viewpager>
    </vertical>
);

// 页面和导航栏绑定
ui.vpager.setTitles(["程序", "联系作者"])
ui.tabs_id.setupWithViewPager(ui.vpager)

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

// 开启无障碍服务
ui.autoService.on("check", function(checked){
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if(checked && auto.service == null){
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if(!checked && auto.service != null){
        auto.service.disableSelf();
    }
})

ui.start_run.click(function(){
    if(auto.service == null){
        toast("请开启无障碍服务");
        return;
    }
    else{
        threads.start(appRun);
    }
    
})

function appRun(){
    toast("开始运行了");
}
