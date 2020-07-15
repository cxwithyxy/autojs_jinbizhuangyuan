auto()

let funs = {}

funs.runAfterPrepare = function (callbackfuns)
{
    funs.unlockScreen()
    funs.autoRequestScreenCapture()
    funs.runDuringScreenOn(callbackfuns)
}

funs.runDuringScreenOn = function (callbackfuns)
{
    device.keepScreenDim(3600e3)
    callbackfuns()
    device.cancelKeepingAwake()
}

funs.autoRequestScreenCapture = function ()
{
    let th1 = threads.start(function ()
    {
        sleep(2e3)
        click(783, 1805)
    })
    requestScreenCapture();
    th1.isAlive() ? th1.interrupt() : 0;
}

funs.matchImage = function (imgpath)
{
    for(let i = 0; i < 2; i++)
    {
        let targetImg = images.read(imgpath);
        let p = images.findImage(captureScreen(), targetImg, {level: i});
        if(p)
        {
            return p
        }
    }
    return false
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

funs.clickAreaByUIObject = function (UIObject)
{
    let uiRect = UIObject.bounds()
    click(uiRect.left, uiRect.top)
}

funs.getLeftBottomButtons = function ()
{
    let a = className("android.widget.ListView").depth(10).find()[0]
    let b = a.children()
    return b
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

funs.unlockScreen = function ()
{
    if(!device.isScreenOn())
    {
        device.wakeUp()
        sleep(1e3)
        let x = device.width / 2
        let y = device.height - 10
        gesture(200,
                [x, y * (5/5) ],
                [x, y * (4/5) ],
                [x, y * (4/5) ],
                [x, y * (3/5) ],
                [x, y * (2/5) ],
                [x, y * (1/5) ],
                [x, y * (0/5) ]
        )
        sleep(200)
    }
}

module.exports = funs
