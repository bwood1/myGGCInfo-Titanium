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
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later'); 
} else {
	//require and open top level UI component
	var ApplicationWindow = require('ui/ApplicationWindow');
	new ApplicationWindow().open();
}

//include external JS
//Titanium.include('http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js'); //doesnt work

// var xhr = Ti.Network.createHTTPClient();												//doesnt work either
    // //use the xhr http client object to do an HTTP GET request to the URL
//  
// var myUrl = 'ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js';
// xhr.open("GET", myUrl);
//  
// xhr.onload = function() {
    // try
    // {
        // Titanium.API.info(this.responseText)
        // response1 = this.responseText;
        // initapp();  
    // }
    // catch(E) {
        // //if anything bad happens, show the error to the user and log it
        // Titanium.API.debug(E);
//  
        // Titanium.UI.createAlertDialog({
            // title: 'Error',
            // message: E
        // }).show();
    // }
// };
//  
// xhr.send();
//  
// function initapp() {
    // eval(response1);
// }