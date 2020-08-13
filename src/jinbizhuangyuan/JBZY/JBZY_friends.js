auto()
let funs = require("./../functions.js")

funs.openTJBList = function ()
{
    funs.clickAreaByImage("targetimage/jinbixiaozhen/banghaoyou.png")
    text("我的好友").findOne()
    sleep(5e3)
}

funs.loadMoreFriend = function ()
{
    moreBtn = funs.findInUIObjectWithTextMatches(depth(0).findOne(), /还有[0-9]*个好友可以助力/)[0]
    console.log("加载, " + moreBtn.text())
    moreBtn.click()
    sleep(1.5e3)
}

funs.zhuliBtnClickInFriendTownThanBack = function ()
{
    text("立即助力").clickable().find().forEach(function (v)
    {
        funs.clickAreaByUIObject(v)
        sleep(1e3)
    })
    sleep(1e3)
    back()
    sleep(3e3)
}

funs.loopFriendsAndDoIt = function ()
{
    for(;;)
    {
        let zhuliBtnList = funs.findInUIObjectWithTextMatches(depth(0).findOne(), /去助力/)
        if(zhuliBtnList.length == 0)
        {
            try
            {
                funs.loadMoreFriend()
                continue
            }
            catch(e)
            {
                break
            }
        }
        console.log("当前页面还有 " + zhuliBtnList.length + " 个可助力");
        zhuliBtnList[0].click()
        sleep(5e3)
        funs.zhuliBtnClickInFriendTownThanBack()
    }
}

funs.friendJob = function ()
{
    funs.openTJBList()
    funs.loopFriendsAndDoIt()
}



module.exports = funs