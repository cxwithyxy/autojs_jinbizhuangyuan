auto()

let funs = {}

funs.openTJBList = function ()
{
    funs.clickAreaByUIObject(textContains("偷金币").findOne())
}

funs.jiaoshui = function ()
{
    funs.clickAreaByUIObject(text("浇水").findOne())
}

funs.loopJiaoshuiCount = 10

funs.loopJiaoshui = function ()
{
    while(true)
    {
        if(funs.loopJiaoshuiCount <= 0)
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
        funs.loopJiaoshuiCount--
        console.log("可浇水次数剩余: " + funs.loopJiaoshuiCount);
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



module.exports = funs