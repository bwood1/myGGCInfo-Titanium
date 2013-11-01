/**
 * @author Brandon Wood
 */
function LoginWindow() {
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
        title: 'Login',
        // If no image desired, you can remove this line and set the backgroundColor instead.
        backgroundColor : '#FFFFFF',
        fullscreen:false,
        modal : false,
        exitOnClose : false  // Android only
    });
	
	//Create a WebView, this will host the HTML
    var loginWebView = Ti.UI.createWebView({
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
        url : '/HTML/login.html'
    });
    
    /**
     * Adds the event listeners for the login screen
     */
    function addEventListeners() {
        //gets the username from properties table
        Ti.App.addEventListener('login:getUNameFromProperties', function() {
            Ti.App.fireEvent('login:sendUsername', {username: Ti.App.Properties.getString('username')});
        });
        
        /**
         * Generates and sends the login request to the server
         * 
         */
        Ti.App.addEventListener('login:sendLoginRequest', function(e) {
            var user = e.user;
            var url = 'http://' + Ti.App.Properties.getString('server') + Ti.App.Properties.getString('requestPath') +
                Ti.App.Properties.getString('loginRequest') + '&user=' + user;
                
            var params = {'pass':e.pass};
            
            var client = Ti.Network.createHTTPClient({
                onload : function(e) {
                    checkLoginResponse(client.responseText, user);
                },
                onerror : function(e) {
                    Ti.API.debug(e.error);
                    alert("Problem connecting to the server");
                },
                timeout : 5000, //in miliseconds
                withCredentials: true
            });
            
            //prepare the connection
            client.open("POST", url);
            // Send the request
            client.send(params);
        });
        
        /**
         * Checks the response of the login request
         * If no then lets the user know that their username or 
         *   password was entered incorrectly.
         * If empty then lets the user know that they need to fill out both fields
         * If yes then logs the user in, saves username, and 
         *   checks to see if the mentor is saved on the device.
         */
        function checkLoginResponse( aResponse, aUser ) {
            if( aResponse == 'no' )
                alert('Username or password incorrect.');
            else if ( aResponse == 'empty') 
                alert('Must fill out both fields.');
            else if ( aResponse == 'yes' ) {
                checkUserName(aUser);
                checkMentor();
                Ti.App.fireEvent('login:reloadHomeWindow');
                Ti.App.fireEvent('login:closeLoginWindow');
            }
        }
        
        /**
         * Checks to see if this is the same user as the one that logged in last time.
         * If it is then do nothing. If not then erase old mentor informate and save new username.
         * 
         * aUser - the new username being checked
         */
        function checkUserName( aUser ) {
            var oldUser = Ti.App.Properties.getString('username');
            if ( oldUser != aUser ) {
                Ti.App.Properties.setString('username', aUser);
                Ti.App.Properties.setObject('mentorObject', null);
                var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "mentorPic.jpg");
                if( file.exists() ) {
                    file.deleteFile();
                    file.deleteDirectory();
                    Ti.App.fireEvent('login:deleteMentorPic');
                }
            }
        }
        
        /**
         * Checks to see if the mentor is saved on the device, if not then generates and sends a request
         * to get the mentor from the server.
         */
        function checkMentor() {
            //TODO: get new mentor if a different user logs in
            var mentorObject = Ti.App.Properties.getObject('mentorObject');
            if(mentorObject == null || mentorObject.FULL_NAME == "No Mentor")
                getMentorInfoFromServer();
        }
        
        /**
         * 
         */
        function getMentorInfoFromServer() {
            var url = 'http://' + Ti.App.Properties.getString('server') + Ti.App.Properties.getString('requestPath') +
                Ti.App.Properties.getString('mentorRequest') + '&user=' + Ti.App.Properties.getString('username');
                           
            var client = Ti.Network.createHTTPClient({
                onload : function(e) {
                    checkMentorResponse(client.responseText);
                },
                onerror : function(e) {
                    Ti.API.debug(e.error);
                    alert("Problem connecting to the server");
                },
                timeout : 5000, //in miliseconds
                withCredentials: false
            });
            
            //prepare the connection
            client.open("GET", url);
            // Send the request
            client.send();
        }
        
        function checkMentorResponse(aResponse) {
            if ( aResponse == 'no mentor') {
                Ti.App.Properties.setObject('mentorObject', {"FULL_NAME":"No Mentor",
                    "FACULTY_USERNAME":"noMent","OFFICE_NUMBER":"","BUILDING_NAME":"","PHONE":""});
            } else {
                Ti.App.Properties.setObject('mentorObject', eval('(' + aResponse + ')'));
                var mentorObject = Ti.App.Properties.getObject('mentorObject');
                getMentorPicture(Ti.App.Properties.getObject('mentorObject'));
            }
        }
        
        function getMentorPicture( aMentorObject ) {
            var url = 'http://' + Ti.App.Properties.getString('server') + Ti.App.Properties.getString('requestPath') +
                Ti.App.Properties.getString('mentorPicRequest') + '&size=200' +  '&user=' + 
                Ti.App.Properties.getString('username')  + '&faculty=' + aMentorObject.FACULTY_USERNAME;
                                           
            var client = Ti.Network.createHTTPClient({
                onload : function(e) {
                    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, aMentorObject.FACULTY_USERNAME + ".jpg");
                    file.write(client.responseData);
                },
                onerror : function(e) {
                    Ti.API.debug(e.error);
                    alert("Problem connecting to the server");
                },
                timeout : 5000, //in miliseconds
                withCredentials: false
            });
            
            //prepare the connection
            client.open("GET", url);
            // Send the request
            client.send();
        }
        
        /**
         * closes the login window once the user has successfully logged in. If schedule 
         * was opened before user is logged in will also close the schdule window.
         */
        Ti.App.addEventListener('login:closeLoginWindow', function() {
            if(osname == 'iphone' || osname == 'ipad'){
                try {
                    nav.close(scheduleWindow, {animated: false});
                } catch(e) {}
                nav.close(loginWindow, {animated:true});
            } else {
                try {
                    scheduleWindow.close();
                } catch(e) {}
                loginWindow.close();
            }
        });
    }
    
    addEventListeners();
    self.add(loginWebView);
    return self;
}

module.exports = LoginWindow;