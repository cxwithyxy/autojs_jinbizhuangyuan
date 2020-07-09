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

function shoucai()
{
    console.log("开始收菜")
    click(570, 787)
    console.log("收菜完了")
    sleep(1e3)
}

function qiandao()
{
    console.log("开始签到")
    click(978, 175)
    sleep(1e3)
    click(540, 1471)
    sleep(1e3)
    console.log("签到完了")
}

console.show()

gotoZhuangyuan()
shoucai()
qiandao()
gotoZhuangyuan()
haodianFuns.haodianJob()
gotoZhuangyuan()
zhuanyuanFriendFuns.friendJob()

console.log("金币庄园任务全部完成了");


