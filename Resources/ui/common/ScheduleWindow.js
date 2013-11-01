/**
 * @author Brandon Wood
 */
function ScheduleWindow() {
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
    var scheduleWebView = Ti.UI.createWebView({
        left : gutter,
        top : gutter,
        right : gutter,
        bottom : gutter,
        // // This allows the translucent view and the background to shine through. You could set this to a standard RGB color and change the opacity if desired.
        // backgroundColor : translucentViewOn ? 'transparent' : backgroundColor,
        // opacity : animationsOn ? 0 : 1,
        disableBounce: true,
        willHandleTouches: true,
        enableZoomControls : true, // Android only
        // Default assumes that all HTML is in the HTML folder and the first file is index.html, you can change the next line to suit your HTML.
        url : '/HTML/mySchedule.html'
    });
    
    
    function addEventListeners() {
        Ti.App.addEventListener('schedule:getUserNameFromProperties', function() {
            var user = Ti.App.Properties.getString('username');
            Ti.App.fireEvent('schedule:sendUsername', {username: user});
        });
        
        Ti.App.addEventListener('schedule:sendScheduleRequest', function(e) {
            var url = 'http://' + Ti.App.Properties.getString('server') + Ti.App.Properties.getString('requestPath') +
                Ti.App.Properties.getString('scheduleRequest') + '&user=' + Ti.App.Properties.getString('username') +
                '&session=' + e.semester + '&year=' + e.year;
                                    
            var client = Ti.Network.createHTTPClient({
                onload : function(e) {
                    checkScheduleResponse(client.responseText);
                },
                onerror : function(e) {
                    Ti.API.debug(e.error);
                    alert("Problem connecting to the server");
                },
                timeout : 5000, //in miliseconds
                withCredentials: true
            });
            
            //prepare the connection
            client.open("GET", url);
            // Send the request
            client.send();
        });
        
        function checkScheduleResponse( aResponse ) {
            if (aResponse == 'not logged in') {
                notLoggedIn();
            } else {
                Ti.App.fireEvent('schedule:sendScheduleText', { scheduleText: aResponse });
            }
        }
        
        function notLoggedIn() {
            if(osname == 'iphone' || osname == 'ipad'){
                alert('You must log in to see your schedule.');
            } else {
                loginWindow.open();
                alert('You must log in to see your schedule.');
            }
        }
        
        Ti.App.addEventListener('schedule:mustLogIn', function() {
            alert('You must log in to see your schedule.');
        });
        
        Ti.App.addEventListener('schedule:closeWindow', function () {
            if (osname == 'iphone' || osname == 'ipad') {
                nav.close(scheduleWindow, {animated: true});
            } else {
                scheduleWindow.close();
            }
        });
    }
    
    addEventListeners();
    self.add(scheduleWebView);
    return self;
}

module.exports = ScheduleWindow;