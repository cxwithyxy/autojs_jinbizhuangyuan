auto()
setScreenMetrics(1080, 1920);

let funs = require("./functions.js")

funs.gotoEle = function ()
{
    console.log("进入饿了么")
    funs.backToHomePage()
    sleep(1e3)
    desc("饿了么").find()[0].click()
    sleep(10e3)
}

funs.clickToWode = function ()
{
    console.log("进入我的")
    text("我的").find()[0].parent().click()
    sleep(3e3)
}

funs.clickQiandaoPage = function ()
{
    console.log("进入签到")
    funs.clickAreaByUIObject(text("签到领10元红包").find()[0])
    sleep(5e3)
}

funs.clickQiandaoBtn = function ()
{
    console.log("点击签到按钮")
    try
    {
        text("立即签到").find()[0].click()
        console.log("签到成功")
    }
    catch(e)
    {
        console.log("没有找到签到按钮, 可能已经签到了")
    }
    sleep(3e3)
}

function main ()
{
    console.log("开始进行饿了么签到")
    funs.gotoEle()
    funs.clickToWode()
    funs.clickQiandaoPage()
    funs.clickQiandaoBtn()
    device.cancelKeepingAwake()
    console.log("饿了么签到结束了")
}

funs.runAfterPrepare(main)