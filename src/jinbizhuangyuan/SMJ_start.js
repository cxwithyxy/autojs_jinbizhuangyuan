auto()

let funs = require("functions.js");
let zhuangyuanGlobal = require("./JBZY/JBZY_zhuangyuan.js")

funs.closeGaoshi = function()
{
    console.log("检测是否有告示板");
    if(funs.matchImage("targetimage/miaojing/gonggao2.png"))
    {
        click(540, 1438)
        sleep(1e3)
        console.log("把告示点掉了");
    }
}

funs.clickWozhidaole = function ()
{
    console.log("检测是否有我知道了按钮");
    if(funs.clickAreaByImage("targetimage/miaojing/wozhidaole.png", true))
    {
        console.log("点了我知道了按钮");
        sleep(1e3)
    }
}

funs.toMaochao = function ()
{
    console.log("正在前往猫超");
    zhuangyuanGlobal.backToHomePage()
    funs.clickAreaByImage("targetimage/miaojing/maochao.png")
    waitForActivity("com.taobao.browser.BrowserActivity")
    sleep(3e3)
}
 
funs.toMaodian = function ()
{
    funs.toMaochao()
    console.log("正在前往猫店");
    funs.clickAreaByImage("targetimage/miaojing/miaodianBtn.png")
    waitForActivity("com.taobao.browser.exbrowser.BrowserUpperActivity")
    sleep(15e3)
}

funs.swipeToCenter = function ()
{
    sleep(1e3)
    console.log("屏幕往上滑动一点")
    let x = device.width / 2 + 50
    let y = device.height / 2
    let yd = device.height * (1 / 5)
    swipe(x, y, x, y - yd, 500)
}

funs.clickAllShouwan = function ()
{
    console.log("开始点击已售完");
    for(;;)
    {
        let a = funs.matchImage("targetimage/miaojing/shouwan.png")
        if(!a)
        {
            break
        }
        click(a.x, a.y)
    }
    console.log("已售完已经处理完了");
}

funs.clickAllShangjia = function ()
{
    console.log("开始点击上架");
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
    console.log("上架已经处理完了");
}


function main ()
{
    console.log("开始收猫晶")
     
    zhuangyuanGlobal.backToHomePage()
     
    funs.toMaodian()
     
    funs.closeGaoshi()
     
    funs.clickWozhidaole()
     
    funs.swipeToCenter()
     
    funs.clickAllShouwan()
     
    funs.clickAllShangjia()
     
    console.log("收猫晶结束了")
}

funs.runAfterPrepare(main)