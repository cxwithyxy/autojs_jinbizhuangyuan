auto()
requestScreenCapture();
let funs = require("functions.js");
const { clickAreaByImage } = require("./functions");

funs.dianGaoshi = function()
{
    if(funs.matchImage("targetimage/miaojing/gonggao2.png"))
    {
        click(540, 1438)
        sleep(1e3)
        console.log("把告示点掉了");
    }
}

funs.dianLixianShouyi = function ()
{
    if(funs.clickAreaByImage("targetimage/miaojing/wozhidaole.png", true))
    {
        console.log("把离线收益点掉了");
        sleep(1e3)
    }
}

funs.toMaochao = function ()
{
    funs.backToHomePage()
    funs.clickAreaByImage("targetimage/miaojing/maochao.png")
    waitForActivity("com.taobao.browser.BrowserActivity")
    sleep(3e3)
}
 
funs.toMaodian = function ()
{
    funs.toMaochao()
    funs.clickAreaByImage("targetimage/miaojing/miaodianBtn.png")
    waitForActivity("com.taobao.browser.exbrowser.BrowserUpperActivity")
    sleep(15e3)
}


funs.backToHomePage()

funs.toMaodian()

funs.dianGaoshi()

funs.dianLixianShouyi()


console.log("end")
