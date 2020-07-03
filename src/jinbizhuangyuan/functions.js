auto()
requestScreenCapture();

let funs = {}

funs.clickAreaByImage = function(imgpath)
{
    let targetImg = images.read(imgpath);
    let p = images.findImage(captureScreen(), targetImg);
    if(!p)
    {
        throw new Error("no match: " + imgpath)
    }
    click(p.x, p.y)
    return p
}

funs.backToHomePage = function ()
{
    app.startActivity({
        packageName: "com.taobao.taobao",
        className: "com.taobao.tao.TBMainActivity"
    });
    waitForActivity("com.taobao.tao.TBMainActivity")
    sleep(1e3)
    let homeBtn = images.read("targetimage/home/homebtn.png");
    let p = images.findImage(captureScreen(), homeBtn);
    if(p)
    {
        return
    }
    funs.clickAreaByImage("targetimage/home/homebtnClick.png")
    sleep(1e3)
    homeBtn = images.read("targetimage/home/homebtnTop.png");
    p = images.findImage(captureScreen(), homeBtn);
    if(p)
    {
        click(p.x, p.y)
        sleep(1e3)
    }
}

funs.toMaochao = function ()
{
    funs.backToHomePage()
    funs.clickAreaByImage("targetimage/miaojing/maochao.png")
    waitForActivity("com.taobao.browser.BrowserActivity")
    sleep(3e3)
}

funs.toMaodian = function ()
{
    funs.toMaochao()
    funs.clickAreaByImage("targetimage/miaojing/miaodianBtn.png")
    waitForActivity("com.taobao.browser.exbrowser.BrowserUpperActivity")
}

module.exports = funs
