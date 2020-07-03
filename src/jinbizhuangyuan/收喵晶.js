auto()
requestScreenCapture();
let funs = require("functions.js");
const { clickAreaByImage } = require("./functions");
console.show()

funs.dianGaoshi = function()
{
    if(funs.matchImage("targetimage/miaojing/gonggao2.png"))
    {
        click(540, 1438)
    }
}



funs.backToHomePage()

funs.toMaodian()

funs.dianGaoshi()


console.log("end")
