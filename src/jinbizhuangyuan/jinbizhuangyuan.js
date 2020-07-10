auto()
requestScreenCapture();
let funs = require("./functions.js")
let zhuanyuanFriendFuns = require("./JBZY_friends.js")
let haodianFuns = require("./JBZY_haodianrenwu.js")

function gotoZhuangyuan() {
    funs.backToHomePage()
    sleep(1e3)
    funs.clickAreaByImage("targetimage/jinbizhuangyuan/1.png");
    sleep(10e3)
}

function shoucai()
{
    console.log("开始收菜")
    click(570, 787)
    console.log("收菜完了")
    sleep(1e3)
}

function qiandao()
{
    console.log("开始签到")
    click(978, 175)
    sleep(1e3)
    click(540, 1471)
    sleep(1e3)
    console.log("签到完了")
}

function main()
{
    console.show()
    
    gotoZhuangyuan()
    shoucai()
    qiandao()
    gotoZhuangyuan()
    haodianFuns.haodianJob()
    gotoZhuangyuan()
    zhuanyuanFriendFuns.friendJob()
    
    console.log("金币庄园任务全部完成了");
}

console.show()

funs.openShuidi = function ()
{
    click(960, 1123)
    console.log("点击水滴按钮");
    sleep(3e3)
    
}


let textBoxList = []
let buttonList = []

funs.initTextBoxList = function()
{
    let a = textMatches(new RegExp("^逛.*")).find()
    let textBoxParent = a[0].parent()
    textBoxList = []
    buttonList = []
    for(let i = 0; i < textBoxParent.childCount(); i++)
    {
        let tbox = textBoxParent.child(i)
        let tboxSize = tbox.bounds()
        if(tboxSize.width() > 450)
        {
            textBoxList.push(tbox)
        }
        if(tboxSize.width() == 186)
        {
            buttonList.push(tbox)
        }
    }
}

funs.hasAllShudiDo = function ()
{
    let countA = 0
    let countB = 0
    for(let i = 0; i < textBoxList.length; i++)
    {
        let textBox = textBoxList[i]
        let b = textBox.text().match(new RegExp("^逛.*"))
        if(b)
        {
            countA++
        }
    }
    for(let i = 0; i < textBoxList.length; i++)
    {
        let buttonBox = buttonList[i]
        if(buttonBox.text() == "领取")
        {
            countB++
        }
    }

    return countA == countB
}

funs.shuidiDo = function ()
{
    while(true)
    {
        funs.openShuidi()
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
                if(
                    buttonList[i].text() == "领取" ||
                    buttonList[i].text() == "已完成"
                ){
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
        gotoZhuangyuan()
    }
}

gotoZhuangyuan()
funs.shuidiDo()


console.log("完事了")