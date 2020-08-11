auto()

let funs = require("./../functions.js")

funs.backToHomePage = function ()
{
    app.startActivity({
        packageName: "com.taobao.taobao",
        className: "com.taobao.tao.TBMainActivity"
    })
    console.log("等待进入淘宝主页")
    waitForActivity("com.taobao.tao.TBMainActivity")
    desc("我的淘宝").findOne()
    if(funs.matchImage("targetimage/home/homebtn.png"))
    {
        return
    }
    console.log("当前不在淘宝主页, 尝试回主页")
    funs.clickAreaByImage("targetimage/home/homebtnClick.png")
    sleep(1e3)
    let p = funs.matchImage("targetimage/home/homebtnTop.png")
    if(p)
    {
        click(p.x, p.y)
        sleep(1e3)
    }
}

funs.getLeftBottomButtons = function ()
{
    let a = className("android.widget.ListView").depth(10).find()[0]
    let b = a.children()
    return b
}

funs.gotoZhuangyuan = function () {
    console.log("进入金币庄园")
    funs.backToHomePage()
    sleep(1e3)
    desc("领淘金币").find()[0].click()
    text("赚金币").findOne()
    console.log("已进入金币庄园")
    // zhuangyuanGlobal.ifNoticeQiaodaoThanClick()
    // sleep(1e3)
    funs.shoucai()
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
    sleep(1e3)
    console.log("收菜完了")
    click(1078, 787)
    sleep(1e3)
}

funs.heliClick = function ()
{
    console.log("开始点击合力按钮");
    for(;;)
    {
        if(!funs.clickAreaByImage("targetimage/jinbixiaozhen/heli.png" ,true))
        {
            break;
        }
        sleep(1e3)
    }
    console.log("点击合力按钮结束");
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