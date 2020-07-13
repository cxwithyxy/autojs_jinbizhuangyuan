auto()

let zhuangyuanGlobal = require("./JBZY_zhuangyuan.js")

let funs = {}

funs.openShuidi = function ()
{
    click(960, 1123)
    console.log("点击水滴按钮");
    sleep(3e3)
     
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
 
funs.hasAllShudiDo = function ()
{
     
    for(let i = 0; i < textBoxList.length; i++)
    {
        let textBox = textBoxList[i]
        let buttonBox = buttonList[i]
        let b = textBox.text().match(new RegExp("^逛.*"))
        if(b && funs.shuidiButtonCanClick(buttonBox))
        {
            return false
        }
    }
    return true
}
 
funs.shuidiDo = function ()
{
    while(true)
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
            let b = textBox.text().match(new RegExp("^逛.*"))
            if(b)
            {
                console.log(textBox.text().split(" ")[0]);
                if(!funs.shuidiButtonCanClick(buttonList[i])){
                    console.log("跳过了")
                    continue
                }
                buttonList[i].click()
                console.log("点击了")
                sleep(30e3)
                back()
                sleep(3e3)
                break
            }
        }
        zhuangyuanGlobal.gotoZhuangyuan()
    }
}

module.exports = funs