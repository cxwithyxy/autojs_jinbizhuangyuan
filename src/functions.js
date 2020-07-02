auto()
requestScreenCapture();

let funs = {}

funs.clickAreaByImage = function(imgpath)
{
    let targetImg = images.read(imgpath);
    let p = images.findImage(captureScreen(), targetImg);
    click(p.x, p.y)
    return p
}

funs.backToHomePage = function ()
{
    app.startActivity({
        packageName: "com.taobao.taobao",
        className: "com.taobao.tao.TBMainActivity"
    });
    sleep(1e3)
    let homeBtn = images.read("homebtn.png");
    let p = images.findImage(captureScreen(), homeBtn);
    if(p)
    {
        return
    }
    funs.clickAreaByImage("homebtnClick.png")
    sleep(1e3)
    homeBtn = images.read("homebtnTop.png");
    p = images.findImage(captureScreen(), homeBtn);
    if(p)
    {
        click(p.x, p.y)
        sleep(1e3)
    }
}

module.exports = funs
