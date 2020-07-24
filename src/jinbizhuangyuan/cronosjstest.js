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
    w.setPosition(-1080, 0)
    w.setSize(-1, -1)
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
    webview.loadUrl('file:///' + engines.myEngine().cwd() + "/cronosjs/index.html")
    setInterval(function ()
    {
        webview.evaluateJavascript("new Date()", function (v)
        {
            console.log(v)
        })
    },1e3)
    
});
