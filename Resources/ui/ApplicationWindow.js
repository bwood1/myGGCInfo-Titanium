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
    var isLoggedIn = false;
    var uName = null;
    Ti.App.Properties.setString('server', '10.0.179.202');					//The server to which the requests are being sent
    Ti.App.Properties.setString('requestPath', '/brandon/request.php?'); 	//The path on the server to send the requests to
    Ti.App.Properties.setBool('isLogggedIn', false);
    
    
    
    // //add event listeners for this class
    // //listens for mentor request
	// Ti.App.addEventListener('loadMentorInfo', function() {
		// // Ti.API.info('loadMentorInfo fired');
		// var mentorObject;
		// mentorObject = Ti.App.Properties.getObject('mentorInfo');
		// // Ti.API.info(mentorObject);
		// Ti.App.fireEvent('sendMentor', {mentor: mentorObject});
		// // Ti.API.info('Mentor info sent');
	// });
	
	
	
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
    var homeWebView = Ti.UI.createWebView({
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
    
    // webView for login page
    var loginWebView = Ti.UI.createWebView({
        	left : gutter,
        	top : gutter,
        	right : gutter,
        	bottom : gutter,
        	// This allows the translucent view and the background to shine through. You could set this to a standard RGB color and change the opacity if desired.
        	backgroundColor : translucentViewOn ? 'transparent' : backgroundColor,
        	opacity : animationsOn ? 0 : 1,
        	enableZoomControls : false, // Android only
        	// Default assumes that all HTML is in the HTML folder and the first file is index.html, you can change the next line to suit your HTML.
        	url : '/HTML/login.html'
    	});
    	
    	// webView for login page
    	var scheduleWebView = Ti.UI.createWebView({
        	left : gutter,
        	top : gutter,
        	right : gutter,
        	bottom : gutter,
        	// This allows the translucent view and the background to shine through. You could set this to a standard RGB color and change the opacity if desired.
        	backgroundColor : translucentViewOn ? 'transparent' : backgroundColor,
        	opacity : animationsOn ? 0 : 1,
        	enableZoomControls : false, // Android only
        	// Default assumes that all HTML is in the HTML folder and the first file is index.html, you can change the next line to suit your HTML.
        	url : '/HTML/mySchedule.html'
    	});
    	
    	// webView for schedule page
   	 	var loginWebView = Ti.UI.createWebView({
        	left : gutter,
        	top : gutter,
        	right : gutter,
        	bottom : gutter,
        	// This allows the translucent view and the background to shine through. You could set this to a standard RGB color and change the opacity if desired.
        	backgroundColor : translucentViewOn ? 'transparent' : backgroundColor,
        	opacity : animationsOn ? 0 : 1,
        	enableZoomControls : false, // Android only
        	// Default assumes that all HTML is in the HTML folder and the first file is index.html, you can change the next line to suit your HTML.
        	url : '/HTML/login.html'
    	});
    	
    	// webView for mentor page
    	var mentorWebView = Ti.UI.createWebView({
        	left : gutter,
        	top : gutter,
        	right : gutter,
        	bottom : gutter,
        	// This allows the translucent view and the background to shine through. You could set this to a standard RGB color and change the opacity if desired.
        	backgroundColor : translucentViewOn ? 'transparent' : backgroundColor,
        	opacity : animationsOn ? 0 : 1,
        	enableZoomControls : false, // Android only
        	// Default assumes that all HTML is in the HTML folder and the first file is index.html, you can change the next line to suit your HTML.
        	url : '/HTML/myMentor.html'
    	});
    	
    	// webView for news page
    	var newsWebView = Ti.UI.createWebView({
        	left : gutter,
        	top : gutter,
        	right : gutter,
        	bottom : gutter,
        	// This allows the translucent view and the background to shine through. You could set this to a standard RGB color and change the opacity if desired.
        	backgroundColor : translucentViewOn ? 'transparent' : backgroundColor,
        	opacity : animationsOn ? 0 : 1,
        	enableZoomControls : false, // Android only
        	// Default assumes that all HTML is in the HTML folder and the first file is index.html, you can change the next line to suit your HTML.
        	url : '/HTML/ggcNews.html'
    	});
    	
    	// webView for events page
    	var eventsWebView = Ti.UI.createWebView({
        	left : gutter,
        	top : gutter,
        	right : gutter,
        	bottom : gutter,
        	// This allows the translucent view and the background to shine through. You could set this to a standard RGB color and change the opacity if desired.
        	backgroundColor : translucentViewOn ? 'transparent' : backgroundColor,
        	opacity : animationsOn ? 0 : 1,
        	enableZoomControls : false, // Android only
        	// Default assumes that all HTML is in the HTML folder and the first file is index.html, you can change the next line to suit your HTML.
        	url : '/HTML/whatsHappening.html'
    	});
    	
    //TODO:find out the right way to do this hack
    // Add event listeners to change pages
    Ti.App.addEventListener('index:openLoginPage', function() {
    	self.add(loginWebView);
    	self.addEventListener('android:back', function() {
    		Ti.App.fireEvent('login:backPressed');
    	});
    });
    
    Ti.App.addEventListener('login:backPressed', function () {
    	self.remove(loginWebView);
    	homeWebView.reload();
    });
    
    Ti.App.addEventListener('index:openSchedulePage', function() {
    	self.add(scheduleWebView);
    	self.addEventListener('android:back', function() {
    		Ti.App.fireEvent('schedule:backPressed');
    	});
    });
    
    Ti.App.addEventListener('schedule:backPressed', function () {
    	self.remove(scheduleWebView);
    	homeWebView.reload();
    });
    
    Ti.App.addEventListener('index:openMentorPage', function() {
    	self.add(mentorWebView);
    	self.addEventListener('android:back', function() {
    		Ti.App.fireEvent('mentor:backPressed');
    	});
    });
    
    Ti.App.addEventListener('mentor:backPressed', function () {
    	self.remove(mentorWebView);
    	homeWebView.reload();
    });
    
    Ti.App.addEventListener('index:openNewsPage', function() {
    	self.add(newsWebView);
    	self.addEventListener('android:back', function() {
    		Ti.App.fireEvent('news:backPressed');
    	});
    });
    
    Ti.App.addEventListener('news:backPressed', function () {
    	self.remove(newsWebView);
    	homeWebView.reload();
    });
    
    Ti.App.addEventListener('index:openEventsPage', function() {
    	self.add(eventsWebView);
    	self.addEventListener('android:back', function() {
    		Ti.App.fireEvent('events:backPressed');
    	});
    });
    
    Ti.App.addEventListener('events:backPressed', function () {
    	self.remove(eventsWebView);
    	homeWebView.reload();
    });
    
    // self.addEventListener('android:back', function(e) {
    	// if(webView.canGoBack()) {
//     		
    	// } else {
    		// self.close();
    	// }
	// });
    self.add(homeWebView);

	/* -----------------------Event listeners for login.html-----------------------*/
	//gets the username from properties table
	Ti.App.addEventListener('login:getUNameFromProperties', function() {
		// Ti.API.info('Getting the username from the database');
		// var uName = Ti.App.Properties.getString('username');
		// Ti.API.info('The userName being returned is: ' + uName);
		Ti.App.fireEvent('login:sendUsername', {username: Ti.App.Properties.getString('username')});
		// Ti.API.info('ApplicationWindow.js says "username ' + 
		// Ti.App.Properties.getString('username') + ' sent"');
	});

	//
	Ti.App.addEventListener('login:openLoginRequest', function(e) {
		openLoginRequest(e);
	});
	
	/**
	 * creates a request for the user to log in
	 */
	function openLoginRequest(e) {
		var url = 'http://' + Ti.App.Properties.getString('server') + Ti.App.Properties.getString('requestPath') + 
			'request=login&user=' + e.username.toLowerCase() + '&pass=' + e.password;
		uName = e.username.toLowerCase();
		// Ti.API.info('uName variable = ' + uName);
		var client = Ti.Network.createHTTPClient({
    		 // function called when the response data is available
    		 onload : function(f) {
    		     // alert("Login response is : " + this.responseText);
    		     checkLoginResponse(this.responseText);
    		     // Ti.API.info('response headers: ' + this.getResponseHeaders());
    		 },
    		 // function called when an error occurs, including a timeout
    		 onerror : function(f) {
    		     Ti.API.debug(f.error);
    		     isLoggedIn = true;
    		     alert('Problem connecting to the server');
    		 },
    		 withCredentials: true,
    		 timeout : 5000  // in milliseconds
		 });
		//prepare the connection
		// alert('The login request is: ' + url);
		client.open("GET", url);
		//send the request
		client.send();
	}
	
	//reads the text of the login request and responds appropriatly.
	function checkLoginResponse(aResponse) {
		if(aResponse =="no"){
			// Ti.API.info('login.html says "the response is ' + aResponse + '"');
			alert('Username or password incorrect');
		}
		else if(aResponse == "empty"){
			// Ti.API.info('login.html says "the response is ' + aResponse + '"');
			alert('Must fill out both fields');
		}
		else if (aResponse = "yes") {
			// Ti.API.info('login.html says "the response is ' + aResponse + '"');
			// alert('You have successfully logged in');
			Ti.App.Properties.setBool('isLoggedIn', true);
			// Ti.API.info('The logged in status is: ' + Ti.App.Properties.getBool('isLoggedIn'));
			// Ti.App.fireEvent('login:loginSuccess');
			loginSuccess();
		}
	}
	
	function loginSuccess() {
		saveUsername();
		checkMentor();
		Ti.App.fireEvent('login:loginSuccess');
	}
	
	function saveUsername() {
		// Ti.API.info('The username is being saved as: ' + e.username.toLowerCase());
		if(uName != null){
			// Ti.API.info('saveUsername fired');
			Ti.App.Properties.setString('username', uName);
		}
	}
	
	/**
	 * Checks to see if the mentor is saved onto the device. If not then calls getMentorInfoFromServer()
	 * else sends mentor object
	 */
	Ti.App.addEventListener('login:checkMentor', function() {
		checkMentor();
	});
	
	function checkMentor() {
		// Ti.API.info('checkMentor fired');
		var mentorObject = Ti.App.Properties.getObject('mentorInfo');
		// Ti.API.info(mentorObject);
		if( mentorObject == null ) {
			getMentorInfoFromServer();
		}
	}
	
	/**
	 * Downloads the mentor Information from the server
	 */
	function getMentorInfoFromServer() {
		// Ti.API.info('Getting mentor information from the server');
		var url = 'http://' + Ti.App.Properties.getString('server') + Ti.App.Properties.getString('requestPath') +
			'request=mentor&user=' + Ti.App.Properties.getString('username');
		
		var client = Ti.Network.createHTTPClient({
    		 // function called when the response data is available
    		 onload : function(f) {
    		    // Ti.API.info("Received text: " + this.responseText);
    		    checkMentorResponse(this.responseText);
    		 },
    		 // function called when an error occurs, including a timeout
    		 onerror : function(f) {
    		     Ti.API.debug(f.error);
    		     // Ti.API.info('Problem connecting to the server');
    		 },
    		 withCredentials: true,
    		 timeout : 5000  // in milliseconds
		 });
		//prepare the connection
		// alert('The mentor request is: ' + url);
		client.open("GET", url);
		//send the request
		client.send();
	}
	
	/**
	 * reads the text of the mentor request and responds appropriatly.
	 */
	function checkMentorResponse(response) {
		if(response =="no mentor"){
			Ti.API.info("the response is: " + response);
			var noMentorJSON = JSON.stringify({"PERSON_ID":"00000","USERNAME":"uName",
				"FULL_NAME":"No Mentor","FACULTY_USERNAME":"","OFFICE_NUMBER":"",
				"BUILDING_NAME":"","PHONE":""});
			Ti.App.Properties.setObject('mentorInfo', noMentorJSON);
		}
		else{
			Ti.App.Properties.setObject('mentorInfo', eval('(' + response + ')'));
			//getting the picture is a seperate request
			getMentorPicture( Ti.App.Properties.getObject('mentorInfo'));
		}
	}
	
	function getMentorPicture( aMentorArray) {
		//http://' + Ti.App.Properties.getString('server') + '/brandon/request.php?request=pics&size=200&user=bwood1&faculty=tim
		var url = 'http://' + Ti.App.Properties.getString('server') + 
			Ti.App.Properties.getString('requestPath') + 'request=pics&size=200&user=' + 
			Ti.App.Properties.getString('username') + '&faculty=' + aMentorArray.FACULTY_USERNAME;
		
		var client = Ti.Network.createHTTPClient({
    		 // function called when the response data is available
    		 onload : function(f) {
    		 	// grab a handle to the file where you'll store the downloaded data
    		 	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'myMentor.jpg');
				file.write(this.responseData); //write to file
    		 },
    		 // function called when an error occurs, including a timeout
    		 onerror : function(f) {
    		     Ti.API.debug(f.error);
    		     alert('Problem connecting to the server');
    		 },
    		 withCredentials: true,
    		 timeout : 5000  // in milliseconds
		 });
		//prepare the connection
		client.open("GET", url);
		//send the request
		client.send();
	}
	
	/* -----------------------Event listeners for mySchedule.html-----------------------*/
	//gets the username from properties table
	Ti.App.addEventListener('mySchedule:getUNameFromProperties', function() {
		// Ti.API.info('Getting the username from the database');
		// var uName = Ti.App.Properties.getString('username');
		// Ti.API.info('The userName being returned is: ' + uName);
		Ti.App.fireEvent('mySchedule:sendUsername', {username: Ti.App.Properties.getString('username')});
		// Ti.API.info('ApplicationWindow.js says "username ' + 
		// Ti.App.Properties.getString('username') + ' sent"');	});
	});

	//creates a request for the schedule
	Ti.App.addEventListener('mySchedule:openScheduleRequest', function(e) {
		openScheduleRequest(e);
	});
	
	function openScheduleRequest(e) {
		var url = 'http://' + Ti.App.Properties.getString('server') +
			Ti.App.Properties.getString('requestPath') + '&request=schedule&user=' + 
			Ti.App.Properties.getString('username') + '&session=' + e.session + '&year=' + e.year;
		
		var client = Ti.Network.createHTTPClient({
    		 // function called when the response data is available
    		 onload : function(f) {
    		     // Ti.API.info("Received text: " + this.responseText);
    		     checkSchedule(this.responseText);
    		     // Ti.App.fireEvent("mySchedule:sendSchedule", {object: this.responseText});
    		 },
    		 // function called when an error occurs, including a timeout
    		 onerror : function(f) {
    		     Ti.API.debug(f.error);
    		     alert('Problem connecting to the server');
    		 },
    		 withCredentials: true,
    		 timeout : 5000  // in milliseconds
		 });
		 Ti.API.info('The schedule request is: ' + url);
		//prepare the connection
		client.open("GET", url);
		//send the request
		client.send();
	}
	
	function checkSchedule(aResponse) {
		if( aResponse == "not logged in" ) {
			Ti.App.fireEvent('schedule:mustLogIn');
			alert('You must log in to see your schedule');
		}
		else {
			Ti.App.fireEvent("mySchedule:sendSchedule", {object: aResponse});
		}
	}
	
	/*We are not going to save the student's schedule to the device right now
	// Saves the schedule JSON to the device
	Ti.App.addEventListener('mySchedule:saveSchedule', function(e) {
		Ti.API.info('object to be saved: ' + e.scheduleObject);
		Ti.App.Properties.setObject('studentSchedule', e.scheduleObject);
		Ti.API.info('Schedule saved')
	});
	
	Ti.App.addEventListener('mySchedule:openSchedule', function() {
		Ti.API.info('open schedule file');
		var schedule = Ti.App.Properties.getObject('studentSchedule');
		Ti.API.info(schedule);
		Ti.App.fireEvent('mySchedule:sendSchedule', {schedule: schedule});
	});	*/

	/* -----------------------Event listeners for myMentor.html-----------------------*/
	
	//listens for mentor request
	Ti.App.addEventListener('myMentor:loadMentorInfo', function() {
		loadMentorInfo();
	});
	
	function loadMentorInfo() {
		// Ti.API.info('loadMentorInfo fired');
		var mentorObject;
		mentorObject = Ti.App.Properties.getObject('mentorInfo');
		// Ti.API.info('The mentor object to be sent is: ' + mentorObject);
		Ti.App.fireEvent('myMentor:sendMentor', {mentor: mentorObject});
		// Ti.API.info('Mentor info sent');
	}
	
	Ti.App.addEventListener('myMentor:getMentorFilePath', function() {
		getMentorFilePath();
	});
	
	function getMentorFilePath() {
		var imageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'myMentor.jpg');
		// Ti.API.info('mentor image directory; ' + imageDir);
		var imageFile = Ti.Filesystem.getFile(imageDir.resolve());
		// Ti.API.info('mentor image file directory; ' + imageFile.resolve());

		Ti.App.fireEvent('myMentor:sendMentorPicDir', {imgDir: imageFile.resolve()});
	}
	
	
	/* -----------------------Event listeners for index.html-----------------------*/
	
	Ti.App.addEventListener('index:getLoggedInStatus', function() {
		Ti.App.fireEvent('index:sendLoggedInStatus', {status: Ti.App.Properties.getBool('isLoggedIn')});
	});
	
	//creates a request to log out
	Ti.App.addEventListener('index:logoutRequest', function() {
		logoutRequest();
	});
	
	function logoutRequest() {
		var client = Ti.Network.createHTTPClient({
    		 // function called when the response data is available
    		 onload : function(f) {
    		     // Ti.API.info("Received text: " + this.responseText);
    		     isLoggedIn = false;
    		     Ti.App.Properties.setBool('isLoggedIn', 'false');
    		     alert('You are now logged out');
    		     // Ti.App.fireEvent("mySchedule:sendSchedule", {object: this.responseText});
    		 },
    		 // function called when an error occurs, including a timeout
    		 onerror : function(f) {
    		     Ti.API.debug(f.error);
    		     // isLoggedIn = false;
    		     alert('Problem connecting to the server');
    		     Ti.App.Properties.setBool('isLoggedIn', false);
    		     Ti.API.info('isLogged in status: ' + Ti.App.Properties.getBool('isLoggedIn'));
    		 },
    		 withCredentials: true,
    		 timeout : 5000  // in milliseconds
		 });
		//prepare the connection
		client.open("GET", "http://" + Ti.App.Properties.getString('server') + "/brandon/request.php?request=logoff");
		//send the request
		client.send();
	}
	
	Ti.App.addEventListener('index:openFacebook', function () {
		Ti.Platform.openURL("http://www.facebook.com/georgiagwinnett");
	});

	Ti.App.addEventListener('index:openTwitter', function() {
		Ti.Platform.openURL("http://twitter.com/GeorgiaGwinnett");
	});
	
	Ti.App.addEventListener('index:openYouTube', function (){ 
		Ti.Platform.openURL("http://www.youtube.com/user/GeorgiaGwinnett");
	});

	// Dont think I need this anymore
	// //gets the username from properties table
	// Ti.App.addEventListener('app:getUNameFromProperties', function() {
		// getUnameFromProperties();
	// });
// 	
	// function getUnameFromProperties() {
		// // Ti.API.info('Getting the username from the database');
		// // var uName = Ti.App.Properties.getString('username');
		// // Ti.API.info('The userName being returned is: ' + uName);
		// Ti.App.fireEvent('app:sendUsername', {username: Ti.App.Properties.getString('username')});
		// // Ti.API.info('ApplicationWindow.js says "username ' + 
		// // Ti.App.Properties.getString('username') + ' sent"');
	// }

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
    ApplicationWindowPlatform(self, homeWebView, titleBarOn, drawerOn);

    return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;