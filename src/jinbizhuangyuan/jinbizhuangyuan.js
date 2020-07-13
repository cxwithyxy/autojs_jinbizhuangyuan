auto()
requestScreenCapture();
let funs = require("./functions.js")
let zhuangyuanGlobal = require("./JBZY_zhuangyuan.js")
let zhuanyuanFriendFuns = require("./JBZY_friends.js")
let haodianFuns = require("./JBZY_haodianrenwu.js")
let shuidiFuns = require("./JBZY_shuidi.js")



console.show()

function main ()
{
    console.show()
      
    zhuangyuanGlobal.gotoZhuangyuan()
    zhuangyuanGlobal.shoucai()
    zhuangyuanGlobal.qiandao()
    zhuangyuanGlobal.gotoZhuangyuan()
    haodianFuns.haodianJob()
    zhuangyuanGlobal.gotoZhuangyuan()
    zhuanyuanFriendFuns.friendJob()
      
    console.log("金币庄园任务全部完成了");
}

zhuangyuanGlobal.gotoZhuangyuan()
shuidiFuns.shuidiDo()

console.log("完事了")