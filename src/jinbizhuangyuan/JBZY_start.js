auto()
setScreenMetrics(1080, 1920);

let funs = require("./functions.js")
let zhuangyuanGlobal = require("./JBZY/JBZY_zhuangyuan.js")
let zhuanyuanFriendFuns = require("./JBZY/JBZY_friends.js")
let haodianFuns = require("./JBZY/JBZY_haodianrenwu.js")
let shuidiFuns = require("./JBZY/JBZY_shuidi.js")

function main ()
{
    funs.unlockScreen()
    console.show()
    console.log("金币庄园任务开始搞");

    funs.autoRequestScreenCapture()
    device.keepScreenDim(3600e3)
    
    zhuangyuanGlobal.gotoZhuangyuan()
    zhuangyuanGlobal.shoucai()
    zhuangyuanGlobal.qiandao()
    
    zhuangyuanGlobal.gotoZhuangyuan()
    haodianFuns.haodianJob()

    zhuangyuanGlobal.gotoZhuangyuan()
    zhuanyuanFriendFuns.friendJob()
    
    for(let i = 0; i < 3; i++)
    {
        zhuangyuanGlobal.gotoZhuangyuan()
        console.log("收水滴第 " + (i + 1) + "次")
        shuidiFuns.shuidiDo()
    }

    device.cancelKeepingAwake()
    console.log("金币庄园任务全部完成了");
}

for(;;)
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