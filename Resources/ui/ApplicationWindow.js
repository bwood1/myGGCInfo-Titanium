// Application Window Component Constructor
function ApplicationWindow() {
    
    // If you don't want margins around the Translucent or Web View you can set the gutter to zero.
    var gutter = 0;
    // The translucent view is a stylish rounded rect behind the web view.
    var translucentViewOn = false;
    // If you want the translucent view or the web view to fade in slowly, set this to true.
    var animationsOn = false;
    // If you don't want a navBar with the corresponding back button you can set this to false.
    // If so, this requires you to have a back button in your HTML on iOS. Android uses standard hardware back button.
    var titleBarOn = false;
    // Set the background color appropriately.
    var backgroundColor = '#f1e9cf';
    // Popup menu/drawer for forward/back. Without this cross-file links will have no way of getting back to the 
    // calling file without a UI in the HTML proper.
    var drawerOn = false;

    var osname = Ti.Platform.osname;

    // Create our main window
    var self = Ti.UI.createWindow({
        // If no image desired, you can remove this line and set the backgroundColor instead.
        backgroundColor : '#FFFFFF',
        navBarHidden : !titleBarOn, // iOS only
 //       barColor : barColor,
        modal : true,
        exitOnClose : true  // Android only
    });

    if (translucentViewOn) {
        // Nice translucent rounded rect in the background.
        var translucentView = Ti.UI.createView({
            left : gutter,
            top : gutter,
            right : gutter,
            bottom : gutter,
            borderRadius : 5,
            borderWidth : 1,
            borderColor : backgroundColor,
            backgroundColor : backgroundColor,
            opacity : animationsOn ? 0 : 0.75
        });
        self.add(translucentView);

       if (animationsOn) {
            setTimeout(function() {
                translucentView.animate(Ti.UI.createAnimation({
                    opacity : 0.75,
                    duration : 2000
                }));
            }, 1);
        }
        gutter = gutter * 2;
    }

    // Create a WebView, this will host the HTML
    var webView = Ti.UI.createWebView({
        left : gutter,
        top : gutter,
        right : gutter,
        bottom : gutter,
        // This allows the translucent view and the background to shine through. You could set this to a standard RGB color and change the opacity if desired.
        backgroundColor : translucentViewOn ? 'transparent' : backgroundColor,
        opacity : animationsOn ? 0 : 1,
        enableZoomControls : false, // Android only
        // Default assumes that all HTML is in the HTML folder and the first file is index.html, you can change the next line to suit your HTML.
        url : '/HTML/index.html'
    });
    self.add(webView);

	//stores the user name into the properties table
	Ti.App.addEventListener('app:addUNameToProperties', function(e) {
		// Ti.API.info('username stored as: ' + e.username);
		Ti.App.Properties.setString('username', e.username);
	});
	
	//gets the username from properties table
	Ti.App.addEventListener('app:getUNameFromProperties', function() {
		// Ti.API.info('Getting the username from the database');
		//Ti.App.fireEvent('app:addUNameToProperties', {username: 'bwood1'});
		var uName = Ti.App.Properties.getString('username');
		// Ti.API.info('The userName being returned is: ' + uName);
		Ti.App.fireEvent('app:sendUsername', {username: uName});
		Ti.API.info('ApplicationWindow.js says "username sent"');
	});
	
	function checkLoginResponse(response) {
				if(response =="no"){
					// Ti.API.info('login.html says "the response is ' + response + '"');
					alert('Username or password incorrect');
				}
				else if(response == "empty"){
					// Ti.API.info('login.html says "the response is ' + response + '"');
					alert('Must fill out both fields');
				}
				else{
					// Ti.API.info('login.html says "the response is ' + response + '"');
					alert('You have successfully logged in');
					// saveUname();
					// window.location.href = "index.html";
				}
			}
	
	//creates a request for the user to log in
	Ti.App.addEventListener('app:openLoginRequest', function(e) {
		var url = 'http://10.0.179.202/brandon/request.php?request=login&user=';
		
		var client = Ti.Network.createHTTPClient({
    		 // function called when the response data is available
    		 onload : function(f) {
    		     Ti.API.info("Received text: " + this.responseText);
    		     checkLoginResponse(this.responseText);
    		     Ti.API.info('response headers: ' + this.getResponseHeaders());
    		 },
    		 // function called when an error occurs, including a timeout
    		 onerror : function(f) {
    		     Ti.API.debug(f.error);
    		     alert('error');
    		 },
    		 withCredentials: true,
    		 timeout : 5000  // in milliseconds
		 });
		//prepare the connection
		Ti.API.info('the request is: ' + url + e.username + "&pass=" + e.password);
		client.open("GET", url + e.username + "&pass=" + e.password);
		//send the request
		client.send();
	});
	
	//creates a request for the schedule
	Ti.App.addEventListener('app:openScheduleRequest', function(e) {
		var url = 'http://10.0.179.202/brandon/request.php?request=schedule&user=bwood1&session=';
		
		var client = Ti.Network.createHTTPClient({
    		 // function called when the response data is available
    		 onload : function(f) {
    		     Ti.API.info("Received text: " + this.responseText);
    		     // alert('success');
    		     Ti.App.fireEvent("app:sendJSON", {object: this.responseText});
    		 },
    		 // function called when an error occurs, including a timeout
    		 onerror : function(f) {
    		     Ti.API.debug(f.error);
    		     alert('error');
    		 },
    		 withCredentials: true,
    		 timeout : 5000  // in milliseconds
		 });
		//prepare the connection
		Ti.API.info('the request is: ' + url + e.session + "&year=" + e.year);
		client.open("GET", url + e.session + "&year=" + e.year);
		//send the request
		client.send();
	});

    if (animationsOn) {
        setTimeout(function() {
            webView.animate(Ti.UI.createAnimation({
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
    ApplicationWindowPlatform(self, webView, titleBarOn, drawerOn);

    return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
