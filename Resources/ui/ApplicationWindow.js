// Application Window Component Constructor
function ApplicationWindow() {
    
    // If you don't want margins around the Translucent or Web View you can set the gutter to zero.
    var gutter = 0;
    //Choose if you want to animate the view on load
    var animationsOn = true;
    // If you don't want a navBar with the corresponding back button you can set this to false.
    // If so, this requires you to have a back button in your HTML on iOS. Android uses standard hardware back button.
    var titleBarOn = false;

    var osname = Ti.Platform.osname;
    // var isLoggedIn = false;
    var uName = null;
    Ti.App.Properties.setString('server', '10.0.179.202');					//The server to which the requests are being sent
    Ti.App.Properties.setString('requestPath', '/brandon/request.php?'); 	//The path on the server to send the requests to
    Ti.App.Properties.setBool('isLoggedIn', false);
	
    // Create our main window
    var self = Ti.UI.createWindow({
        // If no image desired, you can remove this line and set the backgroundColor instead.
        backgroundColor : '#FFFFFF',
        navBarHidden : !titleBarOn, // iOS only
 //       barColor : barColor,
        modal : true,
        exitOnClose : true  // Android only
    });

    // Create a WebView, this will host the HTML
    var homeWebView = Ti.UI.createWebView({
        left : gutter,
        top : gutter,
        right : gutter,
        bottom : gutter,
        // This allows the translucent view and the background to shine through. You could set this to a standard RGB color and change the opacity if desired.
        backgroundColor: '#FFFFFF',
        opacity: 1,
        enableZoomControls : false, // Android only
        // Default assumes that all HTML is in the HTML folder and the first file is index.html, you can change the next line to suit your HTML.
        url : '/HTML/index.html'
    });
    
    //Add the home page to the window
    self.add(homeWebView);

    if (animationsOn) {
        setTimeout(function() {
            homeWebView.animate(Ti.UI.createAnimation({
                opacity : 1,
                duration : 2000
            }));
        }, 1);
    }
    
    // Load the platform specific UI.
    var ApplicationWindowPlatform;
    if (Ti.Platform.osname == 'mobileweb') {
        // Work around missing platform-specific require feature in Mobile Web.
        ApplicationWindowPlatform = require('mobileweb/ui/ApplicationWindowPlatform');
    } else {
        ApplicationWindowPlatform = require('ui/ApplicationWindowPlatform');
    }
    ApplicationWindowPlatform(self, homeWebView, titleBarOn);

    return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;