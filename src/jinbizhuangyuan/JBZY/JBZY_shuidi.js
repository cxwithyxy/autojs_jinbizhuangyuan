auto()

let zhuangyuanGlobal = require("./JBZY_zhuangyuan.js")

let funs = require("./../functions.js")

funs.openShuidi = function ()
{
    console.log("点击赚金币按钮");
    text("赚金币").findOne().click()
    textStartsWith("做任务赚金币").findOne()
}
 
funs.clickYijianLingshuidi = function ()
{
    sleep(1e3)
    text("一键领取").find()[0].click()
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
    let c1 = str.match(new RegExp("^逛.*"))
    let c2 = str.match(new RegExp(".*榜"))
    let c3 = str.match(new RegExp("^浏览.*"))
    let c4 = str.match(new RegExp("^每日来访.*"))
    return c1 || c2 || c3 || c4
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
    console.log("开始领取水滴");
    funs.clickYijianLingshuidi()
    console.log("领取水滴结束了");
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
                sleep(17e3)
                break
            }
        }
        zhuangyuanGlobal.gotoZhuangyuan()
    }
}

module.exports = funs