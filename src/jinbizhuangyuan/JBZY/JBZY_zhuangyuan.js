auto()

let funs = require("./../functions.js")

funs.gotoZhuangyuan = function () {
    console.log("进入金币庄园")
    funs.backToHomePage()
    sleep(1e3)
    desc("领淘金币").find()[0].click()
    text("偷金币").findOne()
    zhuangyuanGlobal.ifNoticeQiaodaoThanClick()
    sleep(1e3)
}

funs.ifNoticeQiaodaoThanClick = function ()
{
    if(funs.matchImage("targetimage/jinbizhuangyuan/meiriqiandao.png"))
    {
        click(909, 478)
    }
}
 
funs.shoucai = function ()
{
    console.log("开始收菜")
    click(570, 787)
    console.log("收菜完了")
    sleep(1e3)
}
 
funs.qiandao = function ()
{
    console.log("开始签到")
    click(978, 175)
    sleep(1e3)
    click(540, 1471)
    sleep(1e3)
    console.log("签到完了")
}
 
module.exports = funs