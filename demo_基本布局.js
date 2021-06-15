"ui";
ui.layout(
    <ScrollView>
        {/* 为了不同分辨率手机，保证全部显示，使用可以滑动 */}
        <vertical>
            {/* 垂直布局 */}
            <text layout_gravity="center" text="你好" textSize="20" w="auto" h="auto"/>
            <button id="start_run" layout_gravity="center" text="启动" w="auto" h="auto"/>
            <img layout_gravity="center" w="200" h="200" src="https://pic.5tu.cn/uploads/allimg/1911/pic_5tu_big_201911122201021011.jpg"/>
            
            <horizontal>
                {/* 水平布局 */}
                <text text="请输入账号:" textColor="#000000"/>
                <input id="input" w="auto" hint="0000000" inputType="number"/>
            </horizontal>

            <radiogroup>
                {/* 单选框 */}
                <radio id="model1" text="模式一"/>
                <radio id="model2" text="模式二"/>
            </radiogroup>

            <radiogroup orientation="horizontal">
                {/* 单选框 */}
                <radio id="model3" text="模式三"/>
                <radio id="model4" text="模式四"/>
            </radiogroup>
        </vertical>
    </ScrollView>
);

ui.start_run.click(function(){
    if(ui.model1.isChecked()){
        //启动app
        threads.start(appRun);
    }
    
});

function appRun(){
    app.launchApp("法宣在线");
}