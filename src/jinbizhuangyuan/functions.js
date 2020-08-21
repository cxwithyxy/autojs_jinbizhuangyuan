auto()

let TopbarConsole = require("./ui/TopbarConsole.js")

let funs = {}

let stor = storages.create("CX2889FunctionsJs")

funs.getDeviceWidth = function ()
{
    return stor.get("deviceWidth")
}

funs.getDeviceHeight = function ()
{
    return stor.get("deviceHeight")
}

funs.runAfterPrepare = function (callbackfuns)
{
    setScreenMetrics(1080, 1920);
    funs.deviceSizeInit()
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

funs.deviceSizeInit = function ()
{
    let w = floaty.rawWindow(
        <linear w="*" h="*">
        </linear>
    );
    w.setTouchable(false);
    w.setSize(-1, -1)
    sleep(1e3)
    stor.put("deviceWidth", w.getWidth())
    stor.put("deviceHeight", w.getHeight())
    w.close()
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
    sleep(1e3)
}

funs.imageFixCurrentScreen = function (imageObject)
{
    let baseSize = {w: 1080, h:1920}
    let currentSize = {w: funs.getDeviceWidth(), h: funs.getDeviceHeight()}
    if(baseSize.w == currentSize.w && baseSize.h == currentSize.h)
    {
        return imageObject
    }
    return images.scale(imageObject, currentSize.w / baseSize.w, currentSize.h / baseSize.h)
}

funs.matchImage = function (imgpath)
{
    let targetImg = images.read(imgpath);
    let screenImage = captureScreen()
    for(let i = 0.9; i >= 0.5; i -= 0.1)
    {
        for(let j = 0; j < 2; j++)
        {
            // console.log("相似度 " + i + "层级 " + j)
            let p = images.findImage(screenImage, targetImg, {threshold:i, level: j});
            if(p)
            {
                let position = {x: p.x, y: p.y}
                return position
            }
            sleep(1e3/12)
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
        setScreenMetrics(funs.getDeviceWidth(), funs.getDeviceHeight());
        click(p.x, p.y)
        setScreenMetrics(1080, 1920);
    }
    return p
}

funs.clickAreaByUIObject = function (UIObject)
{
    setScreenMetrics(funs.getDeviceWidth(), funs.getDeviceHeight());
    let uiRect = UIObject.bounds()
    click(uiRect.centerX(), uiRect.centerY())
    setScreenMetrics(1080, 1920);
}

funs.unlockScreen = function ()
{
    if(!device.isScreenOn())
    {
        device.wakeUp()
        sleep(1e3)
        let x = funs.getDeviceWidth() / 2
        let y = funs.getDeviceHeight() - 10
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

funs.getCurrentPageText = function ()
{
    let a = textMatches(new RegExp(".*")).find()
    let text = ""
    for(let i = 0; i != a.length; ++i)
    {
        text += a[i].text()
    }
    return text
}

funs.findInUIObjectWithTextMatches = function (UIObject, reg, textFunctionName)
{
    let sons = UIObject.children()
    let resultList = []
    textFunctionName = textFunctionName || "text"
    for(let i = 0; i != sons.length; i++)
    {
        if(reg.test(sons[i][textFunctionName]()))
        {
            resultList.push(sons[i])
        }
        if(sons[i].children().length != 0)
        {
            let sonsResultList = funs.findInUIObjectWithTextMatches(sons[i], reg, textFunctionName)
            if(sonsResultList.length != 0)
            {
                resultList = resultList.concat(sonsResultList)
            }
        }
    }
    return resultList
}

module.exports = funs
