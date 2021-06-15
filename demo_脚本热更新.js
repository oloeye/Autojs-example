"ui";

const localVersion="V1.0"

//热更新
threads.start(function(){
    const versionName = "V1.0";
    const baseUrl = "github.com...";

    // 获取远程最新版本 
    var r = http.get(baseUrl).body.json();
    var filename = r[0].filename;
    var remoteVersion = r[0].version.slice(r[0].version.indexOf("V")+1, r[0].version.length);
    var localVersion = localVersion.slice(localVersion.indexOf("V")+1, localVersion.length);

    // 和当前版本比对是否更新 （本地文件中需要一个变量保存版本号）
    if(localVersion.replace("/\D/g", "") < remoteVersion.replace("/\D/g", "")){
        // 可更新，开一个线程下载远程代码
        threads.start(function(){
            codePath = engines.myEngine().cwd()+"/main.js";
            files.write(codePath, http.get("更新文件的地址").body.string());
            // 更新运行脚本
            engines.execScriptFile(codePath);
            toast("更新完成");

            exit();
        });
    }

    

})