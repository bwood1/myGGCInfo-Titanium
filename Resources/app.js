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
    // var self = Ti.UI.createWindow();
    
    
    //require and open top level UI component
    var HomeWindow = require('ui/common/HomeWindow');
    new HomeWindow().open();
        
    function addWindowListeners() {
        Ti.App.addEventListener('index:openLogin', function() {
            var LoginWindow = require('ui/common/LoginWindow');
            new LoginWindow().open();
        });

        Ti.App.addEventListener('index:openSchedule', function() {
            var ScheduleWindow = require('ui/common/LoginWindow');
            new ScheduleWindow().open();
        });
        
        Ti.App.addEventListener('index:openMentor', function() {
            var MentorWindow = require('ui/common/MentorWindow');
            new MentorWindow().open();
        });
        
        Ti.App.addEventListener('index:openNews', function() {
            var NewsWindow = require('ui/common/NewsWindow');
            new NewsWindow().open();
        });
        
        Ti.App.addEventListener('index:openEvents', function() {
            var EventsWindow = require('ui/common/EventsWindow');
            new EventsWindow().open();
        });
    }
    
    // var nav = Titanium.UI.iPhone.createNavigationGroup({
       // window: HomeWindow 
    // });
    // self.add(nav);
    // self.open();
    
    addWindowListeners();

    // var ApplicationWindow = require('ui/ApplicationWindow');
    // new ApplicationWindow().open();
}