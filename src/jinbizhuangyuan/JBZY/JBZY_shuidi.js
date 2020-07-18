auto()

let zhuangyuanGlobal = require("./JBZY_zhuangyuan.js")

let funs = require("./../functions.js")

funs.openShuidi = function ()
{
    console.log("点击水滴按钮");
    funs.clickAreaByImage("targetimage/jinbizhuangyuan/shuidiBtn.png")
    textStartsWith("水滴奖励双倍").findOne()
}
 
funs.clickYijianLingshuidi = function ()
{
    sleep(1e3)
    text("一键领取").find()[0].click()
    sleep(1e3)
}
 
 
let textBoxList = []
let buttonList = []
 
funs.initTextBoxList = function()
{
    let a = textMatches(new RegExp("^逛.*")).find()
    let textBoxParent = a[0].parent()
    textBoxList = []
    buttonList = []
    let textAndButonList = []
    for(let i = 0; i < textBoxParent.childCount(); i++)
    {
        let tbox = textBoxParent.child(i)
        if(tbox.clickable())
        {
            textAndButonList.push(tbox)
        }
    }
    for(let i = 0; i < textAndButonList.length; i++)
    {
        if(i % 2 == 0)
        {
            textBoxList.push(textAndButonList[i])
        }
        else
        {
            buttonList.push(textAndButonList[i])
        }
    }
}
 
funs.shuidiButtonCanClick = function (buttonBox)
{
    return ! (
            buttonBox.text() == "领取" ||
            buttonBox.text() == "已完成" ||
            buttonBox.text() == "冷却中"
            )
}

funs.isShuidiRenwuMatch = function (textBox)
{
    let str = textBox.text()
    let c1 = str.match(new RegExp("^逛.*"))
    let c2 = str.match(new RegExp(".*榜"))
    let c3 = str.match(new RegExp("^浏览.*"))
    return c1 || c2 || c3
}
 
funs.hasAllShudiDo = function ()
{
     
    for(let i = 0; i < textBoxList.length; i++)
    {
        let textBox = textBoxList[i]
        let buttonBox = buttonList[i]
        if(funs.isShuidiRenwuMatch(textBox) && funs.shuidiButtonCanClick(buttonBox))
        {
            return false
        }
    }
    return true
}
 
funs.shuidiDo = function ()
{
    for(;;)
    {
        funs.openShuidi()
        funs.clickYijianLingshuidi()
        funs.initTextBoxList()
        if(funs.hasAllShudiDo())
        {
            break
        }
        for(let i = 0; i < textBoxList.length; i++)
        {
            let textBox = textBoxList[i]
            if(funs.isShuidiRenwuMatch(textBox))
            {
                if(!funs.shuidiButtonCanClick(buttonList[i])){
                    console.log("跳过了")
                    continue
                }
                buttonList[i].click()
                console.log("点击了" + textBox.text().split(" ")[0])
                sleep(37e3)
                break
            }
        }
        zhuangyuanGlobal.gotoZhuangyuan()
    }
}

module.exports = funs