auto()
requestScreenCapture();
let funs = require("functions.js")

console.show()

// funs.backToHomePage()

// sleep(1e3)


// funs.clickAreaByImage("targetimage/jinbizhuangyuan/1.png");


funs.clickAreaByUIObject(bounds(936, 837, 1062, 957).findOne())
// click(936 + 1, 837 + 1)