auto()

let zhuangyuanGlobal = require("./JBZY_zhuangyuan.js")

let funs = require("./../functions.js")

funs.openShuidi = function ()
{
    console.log("点击赚金币按钮");
    text("赚金币").findOne().click()
    textStartsWith("做任务赚金币").findOne()
    sleep(5e3)
}
 
funs.clickYijianLingshuidi = function ()
{
    sleep(1e3)
    for(;;)
    {
        let allBtns = []
        try
        {
            allBtns = funs.findInUIObjectWithTextMatches(depth(0).find()[0], /^领取奖励$/)
        }
        catch(e)
        {
            sleep(300)
            continue
        }
        if(allBtns.length == 0)
        {
            break
        }
        allBtns.shift().click()
        sleep(1e3)
    }
    sleep(1e3)
}
 
 
let textBoxList = []
let buttonList = []

let renwuList

funs.getRenwuWordBox = function(renwuBox)
{
    return funs.findInUIObjectWithTextMatches(renwuBox, /（[0-9]\/[0-9]）/)[0]
}

funs.getRenwuButton = function(renwuBox)
{
    return renwuBox.children()[1]
}

funs.initTextBoxList = function()
{
    let a = className("android.widget.ListView").depth(13).find()[0]
    renwuList = a.children()
}
 
funs.shuidiButtonCanClick = function (buttonBox)
{
    let buttonBoxText = buttonBox.text()
    return /去完成/.test(buttonBoxText)
}

funs.isShuidiRenwuMatch = function (textBox)
{
    let str = textBox.text()
    return /^逛.*/.test(str) ||
        /.*榜/.test(str) ||
        /^看免费小说.*/.test(str) ||
        /^每日来访.*/.test(str) ||
        /^浏览福利中心.*/.test(str)
}
 
funs.hasAllShudiDo = function ()
{
     
    for(let i = 0; i < renwuList.length; i++)
    {
        let textBox = funs.getRenwuWordBox(renwuList[i])
        let buttonBox = funs.getRenwuButton(renwuList[i])
        if(funs.isShuidiRenwuMatch(textBox) && funs.shuidiButtonCanClick(buttonBox))
        {
            return false
        }
    }
    return true
}

funs.lingquShuidi = function ()
{
    funs.openShuidi()
    console.log("开始领取能量");
    funs.clickYijianLingshuidi()
    console.log("领取能量结束了");
}

funs.shuidiDo = function ()
{
    for(;;)
    {
        funs.openShuidi()
        funs.initTextBoxList()
        if(funs.hasAllShudiDo())
        {
            break
        }
        for(let i = 0; i < renwuList.length; i++)
        {
            let textBox = funs.getRenwuWordBox(renwuList[i])
            let buttonBox = funs.getRenwuButton(renwuList[i])
            if(funs.isShuidiRenwuMatch(textBox))
            {
                if(!funs.shuidiButtonCanClick(buttonBox)){
                    console.log("跳过了")
                    continue
                }
                buttonBox.click()
                console.log("点击了" + textBox.text().split(" ")[0])
                sleep(25e3)
                break
            }
        }
        zhuangyuanGlobal.gotoZhuangyuan()
    }
}

module.exports = funs