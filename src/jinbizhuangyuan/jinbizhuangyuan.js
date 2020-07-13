auto()
// requestScreenCapture();
let funs = require("./functions.js")
let zhuangyuanGlobal = require("./JBZY/JBZY_zhuangyuan.js")
let zhuanyuanFriendFuns = require("./JBZY/JBZY_friends.js")
let haodianFuns = require("./JBZY/JBZY_haodianrenwu.js")
let shuidiFuns = require("./JBZY/JBZY_shuidi.js")

function main ()
{
    sleep(5e3)
    funs.unlockScreen()
    console.show()
    console.log("金币庄园任务开始搞");

    zhuangyuanGlobal.gotoZhuangyuan()
    zhuangyuanGlobal.shoucai()
    zhuangyuanGlobal.qiandao()
    
    zhuangyuanGlobal.gotoZhuangyuan()
    haodianFuns.haodianJob()

    zhuangyuanGlobal.gotoZhuangyuan()
    zhuanyuanFriendFuns.friendJob()
    
    zhuangyuanGlobal.gotoZhuangyuan()
    shuidiFuns.shuidiDo()

    console.log("金币庄园任务全部完成了");
}


while (true)
{
    try
    {
        main()
        break
    }
    catch(e)
    {
        console.log(e)
        console.log("出现错误, 10s后重新运行")
        sleep(10e3)
    }
}

