auto()
requestScreenCapture();
let funs = require("functions.js");
const { clickAreaByImage } = require("./functions");

funs.dianGaoshi = function()
{
    if(funs.matchImage("targetimage/miaojing/gonggao2.png"))
    {
        click(540, 1438)
        console.log("把告示点掉了");
        
    }
}

funs.dianLixianShouyi = function ()
{
    if(funs.clickAreaByImage("targetimage/miaojing/wozhidaole.png", true))
    {
        console.log("把离线收益点掉了");
    }
}


funs.backToHomePage()

funs.toMaodian()

funs.dianGaoshi()

funs.dianLixianShouyi()


console.log("end")
