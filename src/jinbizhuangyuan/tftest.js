"ui";

auto()

importClass(android.webkit.WebView)
importClass(android.webkit.WebChromeClient)
importClass(android.webkit.WebResourceResponse)
importClass(android.webkit.WebViewClient)

ui.layout(
    <linear w="*" h="*">
        <webview id="webview" h="*" w="*" />
    </linear>
)

let webview = ui.webview
let set = webview.getSettings()
set.setAllowFileAccessFromFileURLs(false)
set.setAllowUniversalAccessFromFileURLs(false)
set.setSupportZoom(false)
set.setJavaScriptEnabled(true)

// 这里的lesson是开始时创建的文件夹名，请根据自己的情况修改
webview.loadUrl('http://baidu.com')

var webcc = new JavaAdapter(WebChromeClient, {
    onJsPrompt: function (webView, url, fnName, defaultValue, jsPromptResult) {
        toast(fnName + ' ' + defaultValue)

        // 这段代码是必要的，否则会弹出prompt，阻塞界面。
        jsPromptResult.confirm()
        return true
    }
})
webview.setWebChromeClient(webcc)