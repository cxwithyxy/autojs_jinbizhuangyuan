auto()
requestScreenCapture();
let funs = require("./functions.js")
let zhuanyuanFriendFuns = require("./JBZY_friends.js")
let haodianFuns = require("./JBZY_haodianrenwu.js")

function gotoZhuangyuan() {
    funs.backToHomePage()
    sleep(1e3)
    funs.clickAreaByImage("targetimage/jinbizhuangyuan/1.png");
    sleep(10e3)
}

console.show()



gotoZhuangyuan()
haodianFuns.haodianJob()
gotoZhuangyuan()
zhuanyuanFriendFuns.friendJob()

console.log("金币庄园任务全部完成了");

