auto()

importClass(android.webkit.WebView)
importClass(android.webkit.WebChromeClient)
importClass(android.webkit.WebResourceResponse)
importClass(android.webkit.WebViewClient)
importClass(android.webkit.JavascriptInterface)

let w = floaty.window(
    <linear w="*" h="*">
        <webview id="webview" h="*" w="*" />
    </linear>
);
ui.run(function()
{
    w.setPosition(0, 0)
    w.setSize(-1, 500)
    let webview = w.webview
    let set = webview.getSettings()
    set.setAllowFileAccessFromFileURLs(false)
    set.setAllowUniversalAccessFromFileURLs(false)
    set.setSupportZoom(false)
    set.setJavaScriptEnabled(true)
    var webcc = new JavaAdapter(WebChromeClient,
    {
        onJsPrompt: function (webView, url, fnName, defaultValue, jsPromptResult)
        {
            toast(fnName + ' ' + defaultValue)
            jsPromptResult.confirm()
            return true
        },
        onJsAlert: function (webView, url, defaultValue, jsPromptResult)
        {
            toast(defaultValue)
        }
    })
    webview.setWebChromeClient(webcc)
    // let bb = function (){}
    // bb.prototype.a = 333
    let bb = {a: function (){alert("bb.a")}}
    // var javascriptInterface = new JavaAdapter(java.lang.Object, JavascriptInterface, bb)
    webview.addJavascriptInterface(bb, "bb")
    webview.loadUrl('file:///' + engines.myEngine().cwd() + "/tensorflow/index.html")
    setTimeout(function ()
    {
        webview.evaluateJavascript(";cc();", function (v)
        {
            console.log(v)
        })
    },1e3)
    
});



setTimeout(function ()
{
    console.log(1)
}, 3e3)