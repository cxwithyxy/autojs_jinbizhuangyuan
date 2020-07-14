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
    sleep(3e3)
}

funs.clickQiandao = function ()
{

}

console.show()
funs.autoRequestScreenCapture()
funs.gotoEle()
funs.clickToWode()
funs.clickQiandaoPage()
