auto()

let TopbarConsole = require("./ui/TopbarConsole.js")

let funs = {}

funs.runAfterPrepare = function (callbackfuns)
{
    setScreenMetrics(1080, 1920);
    funs.unlockScreen()
    funs.autoRequestScreenCapture()
    funs.runDuringScreenOn(callbackfuns)
}

funs.runDuringScreenOn = function (callbackfuns)
{
    TopbarConsole.active()
    device.keepScreenDim(3600e3)
    callbackfuns()
    device.cancelKeepingAwake()
    TopbarConsole.inactive()
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

funs.imageFixCurrentScreen = function (imageObject)
{
    let baseSize = {w: 1080, h:1920}
    let currentSize = {w: device.width, h: device.height}
    if(baseSize.w == currentSize.w && baseSize.h == currentSize.h)
    {
        return imageObject
    }
    return images.scale(imageObject, currentSize.w / baseSize.w, currentSize.h / baseSize.h)
}

funs.matchImage = function (imgpath)
{
    let targetImg = images.read(imgpath);
    let screenImage = funs.imageFixCurrentScreen(captureScreen())
    for(let i = 0; i < 2; i++)
    {
        let p = images.findImage(screenImage, targetImg, {level: i});
        if(p)
        {
            let position = {x: p.x, y: p.y, level: i}
            return position
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
