auto()

let funs = require("functions.js");
let zhuangyuanGlobal = require("./JBZY/JBZY_zhuangyuan.js")

funs.closeGaoshi = function()
{
    if(funs.matchImage("targetimage/miaojing/gonggao2.png"))
    {
        click(540, 1438)
        sleep(1e3)
        console.log("把告示点掉了");
    }
}

funs.clickWozhidaole = function ()
{
    if(funs.clickAreaByImage("targetimage/miaojing/wozhidaole.png", true))
    {
        console.log("点了我知道了按钮");
        sleep(1e3)
    }
}

funs.toMaochao = function ()
{
    zhuangyuanGlobal.backToHomePage()
    console.log("进入猫超")
    funs.clickAreaByImage("targetimage/miaojing/maochao.png")
    waitForActivity("com.taobao.browser.BrowserActivity")
    sleep(3e3)
}
 
funs.toMaodian = function ()
{
    funs.toMaochao()
    console.log("进入猫店")
    funs.clickAreaByImage("targetimage/miaojing/miaodianBtn.png")
    waitForActivity("com.taobao.browser.exbrowser.BrowserUpperActivity")
    sleep(15e3)
}

funs.swipeToCenter = function ()
{
    sleep(1e3)
    console.log("屏幕往上滑动一点")
    let x = funs.getDeviceWidth() / 2
    let y = funs.getDeviceHeight() / 2
    let yd = funs.getDeviceHeight() * (1 / 5)
    swipe(x, y, x, y - yd, 500)
    sleep(1e3)
}

funs.clickAllShouwan = function ()
{
    for(;;)
    {
        let a = funs.matchImage("targetimage/miaojing/shouwan.png")
        if(!a)
        {
            break
        }
        click(a.x, a.y)
    }
}

funs.clickAllShangjia = function ()
{
    for(;;)
    {
        let a = funs.matchImage("targetimage/miaojing/shangjiaBtn.png")
        if(!a)
        {
            break
        }
        click(a.x, a.y)
        funs.clickAreaByImage("targetimage/miaojing/wozhidaole.png", true)
        funs.clickWozhidaole()
    }
}


function main ()
{
    console.log("开始收猫晶")
     
    zhuangyuanGlobal.backToHomePage()
     
    funs.toMaodian()
     
    // funs.closeGaoshi()
     
    funs.clickWozhidaole()
     
    funs.swipeToCenter()
     
    funs.clickAllShouwan()
     
    funs.clickAllShangjia()
     
    console.log("收猫晶结束了")
}

funs.runAfterPrepare(main)