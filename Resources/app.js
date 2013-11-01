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

var osname = Ti.Platform.osname;
var gutter = 0;


//bootstrap and check dependencies
if (Ti.version < 1.8) {
    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
} else {
    // Ti.App.Properties.setString('server', '10.0.179.202');                  //The server to which the requests are being sent
    // Ti.App.Properties.setString('requestPath', '/brandon/myinfo-titanium-server-side/request.php?');    //The path on the server to send the requests to
    
    Ti.App.Properties.setString('server', 'myinfo.dev.ggc.edu');                  //The server to which the requests are being sent
    Ti.App.Properties.setString('requestPath', '/ss/request.php?');    //The path on the server to send the requests to
    
    Ti.App.Properties.setBool('isLoggedIn', false);
    Ti.App.Properties.setString('loginRequest', 'request=login');
    Ti.App.Properties.setString('mentorRequest', 'request=mentor');
    Ti.App.Properties.setString('mentorPicRequest', 'request=pics');
    Ti.App.Properties.setString('scheduleRequest', 'request=schedule');
    Ti.App.Properties.setString('logoutRequest', 'request=logout');
    
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
    var homeWindow = new HomeWindow();
    
    var win1 = Titanium.UI.createWindow();
    
    if(osname == 'iphone' || osname == 'ipad') {
        //create the navigation group for ios
        var nav = Titanium.UI.iPhone.createNavigationGroup({
            window: homeWindow
        });
        //add the navigation group to the window and open
        win1.add(nav);
        win1.open();
    } else {
        // open the window
        homeWindow.open();
    }
    
    // //set up the default mentor picture
    // var imageView = Ti.UI.createImageView({
        // image:'/Resources/HTML/images/defaultMentorPic.jpg'
    // });
    // var blob = imageView.toBlob();
    // Ti.API.info(blob);
    // var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'mentorPic.jpg');
    // file.write(blob);
//     
    // Ti.API.info("the file path is " + file.nativePath);
       
    /**
     * These are the listeners for the icon buttons to open the selected function
     */
    function addWindowListeners() {
        Ti.App.addEventListener('index:openLogin', function() {
            if(osname == 'iphone' || osname == 'ipad'){
                nav.open(loginWindow, {animated:true});
            } else {
                loginWindow.open();
            }
        });

        Ti.App.addEventListener('index:openSchedule', function() {
            if(osname == 'iphone' || osname == 'ipad'){
                nav.open(scheduleWindow, {animated:true});
            } else {
                scheduleWindow.open();
            }
        });
        
        Ti.App.addEventListener('index:openMentor', function() {
            if(osname == 'iphone' || osname == 'ipad'){
                nav.open(mentorWindow, {animated:true});
            } else {
                mentorWindow.open();
            }
        });
        
        Ti.App.addEventListener('index:openNews', function() {
            if(osname == 'iphone' || osname == 'ipad'){
                nav.open(newsWindow, {animated:true});
            } else {
                newsWindow.open();
            }
        });
        
        Ti.App.addEventListener('index:openEvents', function() {
            if(osname == 'iphone' || osname == 'ipad'){
                nav.open(eventsWindow, {animated:true});
            } else {
                eventsWindow.open();
            }
        });
    }
    
    
    
    addWindowListeners();
}