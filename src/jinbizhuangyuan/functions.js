auto()
requestScreenCapture();

let funs = {}

funs.matchImage = function (imgpath)
{
    let targetImg = images.read(imgpath);
    let p = images.findImage(captureScreen(), targetImg);
    return p
}

funs.clickAreaByImage = function(imgpath, noerror)
{
    let p = funs.matchImage(imgpath)
    if(!p && !noerror)
    {
        throw new Error("no match: " + imgpath)
    }
    if(p)
    {
        click(p.x, p.y)
    }
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

module.exports = funs
