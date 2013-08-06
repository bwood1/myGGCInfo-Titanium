/*
* HTML Application Template:
* A basic starting point for your application.  Mostly a blank canvas with a web view.
*
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*
*/

//bootstrap and check dependencies
if (Ti.version < 1.8) {
    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
} else {
    Ti.App.Properties.setString('server', '10.0.179.202');                  //The server to which the requests are being sent
    Ti.App.Properties.setString('requestPath', '/brandon/request.php?');    //The path on the server to send the requests to
    Ti.App.Properties.setBool('isLoggedIn', false);
    
    // var self = Ti.UI.createWindow();
    var LoginWindow = require('ui/common/LoginWindow');
    var loginWindow = new LoginWindow();
    var ScheduleWindow = require('ui/common/ScheduleWindow');
    var scheduleWindow = new ScheduleWindow();
    var MentorWindow = require('ui/common/MentorWindow');
    var mentorWindow = new MentorWindow();
    var NewsWindow = require('ui/common/NewsWindow');
    var newsWindow = new NewsWindow();
    var EventsWindow = require('ui/common/EventsWindow');
    var eventsWindow = new EventsWindow();

    
    //require and open top level UI component
    var HomeWindow = require('ui/common/HomeWindow');
    new HomeWindow().open();
        
    function addWindowListeners() {
        Ti.App.addEventListener('index:openLogin', function() {
            loginWindow.open();
        });

        Ti.App.addEventListener('index:openSchedule', function() {
            scheduleWindow.open();
        });
        
        Ti.App.addEventListener('index:openMentor', function() {
            mentorWindow.open();
        });
        
        Ti.App.addEventListener('index:openNews', function() {
            newsWindow.open();
        });
        
        Ti.App.addEventListener('index:openEvents', function() {
            eventsWindow.open();
        });
    }
    
    
    /*--------------------------------------- event listeners for each window ----------------------------------------*/
    function addHomeEventListeners() {
        
    }
    
    function addLoginEventListeners() {
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
    
        Ti.App.addEventListener('login:openLoginRequest', function(e) {
            openLoginRequest(e);
        });
        
        /**
         * creates a request for the user to log in
         */
        function openLoginRequest(e) {
            var url = 'http://' + Ti.App.Properties.getString('server') + Ti.App.Properties.getString('requestPath') + 
                'request=login&user=' + e.username.toLowerCase() + '&pass=BOrd5621!!' /*+ e.password*/;
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
                     // alert(f.error);
                     alert('Problem connecting to the server');
                 },
                 withCredentials: true,
                 //TODO: change this back when we get a valid certificate
                 validatesSecureCertificate: false,
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
            // Ti.App.fireEvent('login:loginSuccess');
            try {
                scheduleWindow.close();
            } catch(e){}
            loginWindow.close();
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
                 //TODO: change this back when we get a valid certificate
                 validatesSecureCertificate: false,
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
                 //TODO: change this back when we get a valid certificate
                 validatesSecureCertificate: false,
                 timeout : 5000  // in milliseconds
             });
            //prepare the connection
            client.open("GET", url);
            //send the request
            client.send();
        }
    }
    
    function addScheduleEventListeners() {
        /* -----------------------Event listeners for mySchedule.html-----------------------*/
        //gets the username from properties table
        Ti.App.addEventListener('mySchedule:getUNameFromProperties', function() {
            // Ti.API.info('Getting the username from the database');
            // var uName = Ti.App.Properties.getString('username');
            // Ti.API.info('The userName being returned is: ' + uName);
            Ti.App.fireEvent('mySchedule:sendUsername', {username: Ti.App.Properties.getString('username')});
            // Ti.API.info('ApplicationWindow.js says "username ' + 
            // Ti.App.Properties.getString('username') + ' sent"'); });
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
                 //TODO: change this back when we get a valid certificate
                 validatesSecureCertificate: false,
                 timeout : 5000  // in milliseconds
             });
             // Ti.API.info('The schedule request is: ' + url);
            //prepare the connection
            client.open("GET", url);
            //send the request
            client.send();
        }
        
        function checkSchedule(aResponse) {
            if( aResponse == "not logged in" ) {
                Ti.App.fireEvent('schedule:mustLogIn');
                alert('You must log in to see your schedule');
                loginWindow.open();
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
        }); */
    }

    function addMentorEventListeners() {
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
    }
    
   
    
    // var nav = Titanium.UI.iPhone.createNavigationGroup({
       // window: HomeWindow 
    // });
    // self.add(nav);
    // self.open();
    
    addLoginEventListeners();
    addScheduleEventListeners();
    addMentorEventListeners();
    addWindowListeners();

    // var ApplicationWindow = require('ui/ApplicationWindow');
    // new ApplicationWindow().open();
}