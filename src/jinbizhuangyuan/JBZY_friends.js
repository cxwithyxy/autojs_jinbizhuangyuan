auto()
let funs = require("./functions.js")

funs.openTJBList = function ()
{
    funs.clickAreaByUIObject(textContains("偷金币").find()[0])
    sleep(5e3)
}

funs.jiaoshui = function ()
{
    funs.clickAreaByUIObject(text("浇水").findOne())
}

funs.loopJiaoshui = function ()
{
    while(true)
    {
        if(funs.matchImage("targetimage/jinbizhuangyuan/jiaoshuiping_kong.png"))
        {
            break
        }
        let jiaoshuiButton = text("可浇水").find()
        console.log("当前可浇水: " + jiaoshuiButton.length);
        if(jiaoshuiButton.length == 0)
        {
            break
        }
        jiaoshuiButton[0].click()
        sleep(8e3)
        funs.jiaoshui()
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

funs.loopFriendsAndDoIt = function ()
{
    while(true)
    {
        funs.loopToujinbi()
        funs.loopJiaoshui()
        console.log("加载更多好友");
        try
        {
            text("加载更多好友").find()[0].click()
        }
        catch(e)
        {
            console.log("金币庄园好友都搞完了");
            break
        }
        sleep(2e3)
    }
}

funs.friendJob = function ()
{
    console.log("开始搞好友偷金币")
    funs.openTJBList()
    funs.loopFriendsAndDoIt()
    console.log("搞好友偷金币完了")
}



module.exports = funs