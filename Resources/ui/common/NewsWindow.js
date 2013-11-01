/**
 * @author Brandon Wood
 */
function NewsWindow() {
    // If you don't want margins around the Translucent or Web View you can set the gutter to zero.
    var gutter = 0;
    // If you don't want a navBar with the corresponding back button you can set this to false.
    // If so, this requires you to have a back button in your HTML on iOS. Android uses standard hardware back button.
    var titleBarOn = false;
    var osname = Ti.Platform.osname;
    
    if (osname == 'iphone' || osname == 'ipad') {
        titleBarOn = true;
    };
    
    var self = Ti.UI.createWindow({
        title: 'MyInfo',
        // If no image desired, you can remove this line and set the backgroundColor instead.
        backgroundColor : '#FFFFFF',
        fullscreen:false,
        modal : false,
        exitOnClose : false  // Android only
    });
    
    //Create a WebView, this will host the HTML
    var newsWebView = Ti.UI.createWebView({
        left : gutter,
        top : gutter,
        right : gutter,
        bottom : gutter,
        // // This allows the translucent view and the background to shine through. You could set this to a standard RGB color and change the opacity if desired.
        // backgroundColor : translucentViewOn ? 'transparent' : backgroundColor,
        // opacity : animationsOn ? 0 : 1,
        disableBounce: true,
        willHandleTouches: false,
        enableZoomControls : false, // Android only
        // Default assumes that all HTML is in the HTML folder and the first file is index.html, you can change the next line to suit your HTML.
        url : '/HTML/ggcNews.html'
    });
    
    function addEventListeners() {
        self.addEventListener('focus', function() {
            newsWebView.reload(); 
        });
        
        self.addEventListener('android:back', function() {
            if(newsWebView.canGoBack()) {
                newsWebView.goBack();
            } else {
                self.close();
            }
       });
       
       Ti.App.addEventListener('ggcNews:openLink', function(aLink) {
            // alert('try to open event link');
            Ti.Platform.openURL(aLink.link);
        });
        
        Ti.App.addEventListener('news:closeWindow', function() {
            if( osname == 'iphone' || osname == 'ipad') {
                nav.close(newsWindow, {animated: true});
            } else {
                newsWindow.close();
            }
        });
    }    
    addEventListeners();
    self.add(newsWebView);
    return self;
}

module.exports = NewsWindow;