/**
 * @author Brandon Wood
 */
function MentorWindow() {
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
    var mentorWebView = Ti.UI.createWebView({
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
        url : '/HTML/myMentor.html'
    });
    
    function addEventListeners() {
         Ti.App.addEventListener('mentor:getMentorInfo', function() {
            var mentorObject = Ti.App.Properties.getObject('mentorObject');
            var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, mentorObject.FACULTY_USERNAME + '.jpg');
            
            Ti.App.fireEvent('mentor:sendMentorInfo', {
                username: Ti.App.Properties.getString('username'),
                mentorObject: mentorObject,
                mentorPicNativePath: file.nativePath}
            );
        });

        //listens for mentor request
        Ti.App.addEventListener('myMentor:loadMentorInfo', function() {
            loadMentorInfo();
        });
        
        function loadMentorInfo() {
            var mentorObject;
            mentorObject = Ti.App.Properties.getObject('mentorInfo');
            Ti.App.fireEvent('myMentor:sendMentor', {mentor: mentorObject});
        }
        
        Ti.App.addEventListener('mentor:closeWindow', function() {
            if( osname == 'iphone' || osname == 'ipad') {
                nav.close(mentorWindow, {animated: true});
                // mentorWebView.setHtml("");
                // mentorWebView.setHtml('<html><head></head><body>hello</body></html>');
            } else {
                mentorWindow.close();
            }
        });
        
        Ti.App.addEventListener('login:deleteMentorPic', function() {
            Ti.API.info('login:deleteMentorPic heard');
            Ti.App.fireEvent('mentor:deleteMentorPic');
            
        });
    }
    
    addEventListeners();
    self.add(mentorWebView);
    return self;
}

module.exports = MentorWindow;