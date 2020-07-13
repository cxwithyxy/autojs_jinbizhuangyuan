auto()

let funs = require("./../functions.js")

funs.haodianrenwuDo = function()
{
    let a = desc("关注 +10金币").find()
    console.log("可关注的: " + a.length)
    for(let i = 0; i < a.length; i++)
    {
        a[i].parent().click()
        sleep(300)
    }
    scrollDown()
    sleep(300)
    a = desc("签到 +5金币").find()
    console.log("可签到的: " + a.length)
    for(let i = 0; i < a.length; i++)
    {
        a[i].parent().click()
        sleep(3e3)
        back()
        sleep(1e3)
    }
    console.log("好店任务完成了")
}

funs.gotoHaodian = function ()
{
    funs.clickAreaByUIObject(funs.getLeftBottomButtons()[0])
    sleep(3e3)
}

funs.haodianJob = function ()
{
    console.log("开始搞好店任务");
    funs.gotoHaodian()
    funs.haodianrenwuDo()
    console.log("搞好店任务完成了");
}

module.exports = funs