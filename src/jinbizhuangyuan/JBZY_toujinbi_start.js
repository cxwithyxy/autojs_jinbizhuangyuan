auto()

let funs = require("./functions.js")
let zhuangyuanGlobal = require("./JBZY/JBZY_zhuangyuan.js")
let zhuanyuanFriendFuns = require("./JBZY/JBZY_friends.js")
let haodianFuns = require("./JBZY/JBZY_haodianrenwu.js")
let shuidiFuns = require("./JBZY/JBZY_shuidi.js")

function main ()
{
    console.log("金币庄园帮好友开始搞");

    zhuangyuanGlobal.gotoZhuangyuan()
    zhuanyuanFriendFuns.friendJob()
    
    console.log("金币庄园帮好友全部完成了");
}


funs.runAfterPrepare(main)
