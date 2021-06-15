// 创建本地存储
var localStorage = storages.create("303771604_demo");
// 放到本地存储中了
localStorage.put("QQ", "303771604");
// 获取存储的数据
var data = localStorage.get("QQ");
log(data)

// 移除该本地存储的所有数据
storages.clear();