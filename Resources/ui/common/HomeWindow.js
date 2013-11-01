/**
 * @author Brandon Wood
 */
function HomeView() {
	// If you don't want margins around the Translucent or Web View you can set the gutter to zero.
    var gutter = 0;
    // If you don't want a navBar with the corresponding back button you can set this to false.
    // If so, this requires you to have a back button in your HTML on iOS. Android uses standard hardware back button.
    var titleBarOn = true;
    var osname = Ti.Platform.osname;
    
    // if (osname == 'iphone' || osname == 'ipad') {
        // titleBarOn = true;
    // };
    
    var self = Ti.UI.createWindow({
        navBarHidden: false,
        title:'Home',
        // title: 'MyInfo',
        // If no image desired, you can remove this line and set the backgroundColor instead.
        // backgroundColor : '#FFFFFF',
        // fullscreen: false,
        // modal : true,
        // orientationModes: [Titanium.UI.PORTRAIT],
        exitOnClose : true  // Android only
    });
	
	//Create a WebView, this will host the HTML
    var homeWebView = Ti.UI.createWebView({
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
        url : '/HTML/index.html'
    });
    
    function addEventListeners() {
        
        Ti.App.addEventListener('login:reloadHomeWindow', function() {
            homeWebView.reload();
        });
        Ti.App.addEventListener('index:openFacebook', function () {
            Ti.Platform.openURL("http://www.facebook.com/georgiagwinnett");
        });
    
        Ti.App.addEventListener('index:reloadView', function() {
            homeWebView.reload();
        });
        
        Ti.App.addEventListener('index:openTwitter', function() {
            Ti.Platform.openURL("http://twitter.com/GeorgiaGwinnett");
        });
        
        Ti.App.addEventListener('index:openYouTube', function() {
            Ti.Platform.openURL("http://www.youtube.com/user/GeorgiaGwinnett");
        });
        
        Ti.App.addEventListener('index:getLoggedInStatus', function() {
            getLoggedInStatus();
            // Ti.App.fireEvent('index:sendLoggedInStatus', {status: Ti.App.Properties.getBool('isLoggedIn')});
        });
        
        function getLoggedInStatus() {
            var url = 'http://' + Ti.App.Properties.getString('server') + Ti.App.Properties.getString('requestPath') +
                Ti.App.Properties.getString('scheduleRequest') + '&user=' + Ti.App.Properties.getString('username') +
                '&session=Fall' + '&year=2013';
                                                    
            var client = Ti.Network.createHTTPClient({
                onload : function(e) {
                    checkLoggedIn(client.responseText);
                },
                onerror : function(e) {
                    Ti.API.debug(e.error);
                    // alert("Problem connecting to the server");
                },
                timeout:5000, //in miliseconds
                withCredentials:false
            });
            
            //prepare the connection
            client.open("GET", url);
            // Send the request
            client.send();
        }
        
        function checkLoggedIn(status) {
            if( status == 'not logged in'){
                Ti.App.fireEvent('index:sendLoggedInStatus', {status: false});
            } else {
                Ti.App.fireEvent('index:sendLoggedInStatus', {status: true});
            }
        }
        
        //calls the function to create the logout request
        
        Ti.App.addEventListener('index:logoutRequest', function() {
            logoutRequest();
        });
        
        function logoutRequest() {
            var url = "http://" + Ti.App.Properties.getString('server') +
                Ti.App.Properties.getString('requestPath') + "request=logoff";
            
            Ti.API.info('the logout request is ' + url);
            
            var client = Ti.Network.createHTTPClient({
                 // function called when the response data is available
                 onload : function(f) {
                     alert('You are now logged out');
                     Ti.App.fireEvent('index:sendLoggedInStatus', {status: false});
                 },
                 // function called when an error occurs, including a timeout
                 onerror : function(f) {
                     Ti.API.debug(f.error);
                     // isLoggedIn = false;
                     alert('Problem connecting to the server');
                 },
                 withCredentials: false,
                 timeout : 5000  // in milliseconds
             });
            //prepare the connection
            client.open("GET", url);
            //send the request
            client.send();
        }

    }
    
    addEventListeners();
    self.add(homeWebView);
    
    if(osname == 'mobileweb'){
        
    } else {
        self.addEventListener('swipe', function(e) {
           if(e.direction == 'up'){
               Ti.App.fireEvent('index:swipeUp');
           } else if(e.direction == 'down') {
               Ti.App.fireEvent('index:swipeDown');
           }
        });
    }
    
    self.addEventListener('focus', function() {
       // homeWebView.reload();
    });
    
    return self;
}

module.exports = HomeView;

