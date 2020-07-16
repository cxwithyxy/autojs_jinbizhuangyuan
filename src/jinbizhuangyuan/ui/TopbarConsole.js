let w = floaty.window(
    <frame w="*" h="*">
        <text id="showingText" bg="#ffffff" w="auto" layout_gravity="center" >悬浮文字</text>
    </frame>
);
ui.run(function()
{
    w.setPosition(0, -80)
    w.setSize(-1, 120)
    w.showingText.setText("" + device.width)
});

let funs = {}

let oldConsoleLog = console.log

function showLog(strList)
{
    ui.run(function()
    {
        w.showingText.setText("" + strList.join(" "))
    });
}

funs.active = function ()
{
    console.log = function ()
    {
        oldConsoleLog.apply(console, arguments)
        showLog([].slice.call(arguments))
    }
}

funs.inactive = function ()
{
    console.log = oldConsoleLog
}

module.exports = funs

