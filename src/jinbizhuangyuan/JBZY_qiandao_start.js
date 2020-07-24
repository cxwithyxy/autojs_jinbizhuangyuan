auto()

let funs = require("./functions.js")
let zhuangyuanGlobal = require("./JBZY/JBZY_zhuangyuan.js")
let zhuanyuanFriendFuns = require("./JBZY/JBZY_friends.js")
let haodianFuns = require("./JBZY/JBZY_haodianrenwu.js")
let shuidiFuns = require("./JBZY/JBZY_shuidi.js")

function main ()
{
    console.log("金币庄园签到开始搞");

    for(let i = 0; i < 2; i++)
    {
        zhuangyuanGlobal.gotoZhuangyuan()
        zhuangyuanGlobal.qiandao()
    }
    
    console.log("金币庄园签到全部完成了");
}


funs.runAfterPrepare(main)
