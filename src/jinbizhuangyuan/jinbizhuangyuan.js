auto()
// requestScreenCapture();
let funs = require("functions.js")

console.show()

// funs.backToHomePage()

// sleep(1e3)


// funs.clickAreaByImage("targetimage/jinbizhuangyuan/1.png");


funs.openTJBList = function ()
{
    funs.clickAreaByUIObject(textContains("偷金币").findOne())
}

funs.jiaoshui = function ()
{
    funs.clickAreaByUIObject(text("浇水").findOne())
}


// let jiaoshuiButton = text("可浇水").find()
// console.log(jiaoshuiButton.length);

// funs.clickAreaByUIObject(jiaoshuiButton[0])

back()