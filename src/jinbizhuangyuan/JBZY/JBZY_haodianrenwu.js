auto()

let funs = require("./../functions.js")

funs.haodianrenwuDo = function()
{
    let topBox = depth(0).find()[0]
    let buttonList = funs.findInUIObjectWithTextMatches(topBox, /逛10秒/, "desc")
    for(let i = 0; i != buttonList.length; i++)
    {
        console.log("浏览好店 " + (i + 1) + "/" + buttonList.length)
        buttonList[i].parent().click()
        sleep(15e3)
        back()
        sleep(5e3)
    }
}

funs.gotoHaodian = function ()
{
    funs.clickAreaByImage("targetimage/jinbixiaozhen/guangdianpu.png")
    desc("浏览好店送金币").findOne()
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