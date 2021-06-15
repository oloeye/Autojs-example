"ui";

ui.layout(
    <vertical>
        <appbar>
            <toolbar title="demo_2" />
            <tabs id="tabs_id"/>
        </appbar>

        <Switch id="autoService" text="无障碍服务" checked="{{auto.service !=null}}" />

        <viewpager id="vpager">
            <vertical>
                <button id="start_run" text="启动"/>
            </vertical>

            <vertical>
                <horizontal>
                    <text text="请输入激活码:" />
                    <input hint="获取请联系作者" />
                </horizontal>
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


// 设备唯一id
// 返回设备的IMEI.
log(device.getIMEI())
//返回设备的Android ID。
log(device.getAndroidId())

// 本地验证：
    // 1、获取用户输入的验证密钥
    // 2、和获取导的设备唯一id 进行比较
    // 3、相同通过，不同提示联系作者
    // 4、用户发送设备唯一id，密钥生成器生成给用户
    // 5、用户输入，然后保存导本地存储

// 网络验证：
    // 用户注册，返回正确的密钥
    // 用户输入密钥后进行网络验证是否在数据库中
    