auto()

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
    requestScreenCapture();
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
    let a = text("this is a apng image").find()
    a[0].parent().click()
}

let a = textMatches(new RegExp("^逛.*")).find()

let allBox = a[0].parent().children()
for(let i = 0; i < allBox.length; i++)
{
    let textBox = allBox[i]
    let b = textBox.text().match(new RegExp("^逛.*"))
    if(b)
    {
        console.log(textBox.text());
        loop1: for(let j = i; j < allBox.length; j++)
        {
            let nextBox = allBox[j]
            switch(nextBox.text())
            {
                case "领取":
                case "去完成":
                case "去逛逛":
                    console.log(nextBox.text())
                    nextBox.click()
                    sleep(30e3)
                    break loop1
            }
        }
    }
    
}
console.log("完事了")