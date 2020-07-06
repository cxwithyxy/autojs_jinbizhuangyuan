auto()
// requestScreenCapture();
let funs = require("functions.js")
const { backToHomePage } = require("./functions")

console.show()

// funs.backToHomePage()

// sleep(1e3)


// funs.clickAreaByImage("targetimage/jinbizhuangyuan/1.png");


funs.openTJBList = function ()
{
    funs.clickAreaByUIObject(textContains("偷金币").findOne())
}

funs.jiaoshui = function ()
{
    funs.clickAreaByUIObject(text("浇水").findOne())
}

funs.loopJiaoshui = function ()
{
    while(true)
    {
        let jiaoshuiButton = text("可浇水").find()
        console.log("当前可浇水: " + jiaoshuiButton.length);
        if(jiaoshuiButton.length == 0)
        {
            break
        }
        jiaoshuiButton[0].click()
        sleep(8e3)
        text("浇水").findOne().click()
        sleep(3e3)
        back()
        sleep(3e3)
    }
}

funs.loopToujinbi = function ()
{
    while(true)
    {
        let toujinbiButton = depth(18).text("偷金币").find()
        console.log("当前偷金币: " + toujinbiButton.length);
        if(toujinbiButton.length == 0)
        {
            break
        }
        toujinbiButton[0].click()
        sleep(8e3)
        click(570, 787)
        sleep(3e3)
        back()
        sleep(3e3)
    }
}


while(true)
{
    funs.loopToujinbi()
    console.log("加载更多好友");
    text("加载更多好友").findOne().click()
    sleep(2e3)
}

