var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon16.png",
    "32": "./icon48.png",
    "64": "./icon128.png"
  },
  onClick: handleClick
});

var self = require("sdk/self");
var pageUrl = self.data.url("window.html");
tabs.on('ready', function(tab) {
	console.log(tab.url == pageUrl);
	if (tab.url == pageUrl){
		var {Cc, Ci} = require("chrome");
		var cookieValue = "", cookieMgr = Cc["@mozilla.org/cookiemanager;1"].getService(Ci.nsICookieManager);
		
		for (var e = cookieMgr.enumerator; e.hasMoreElements();) {
		  var cookie = e.getNext().QueryInterface(Ci.nsICookie);
		  if (cookie.host.indexOf("bungie.net") > -1){
		  	if (cookie.name == "bungled"){
				cookieValue = cookie.value;
			}	
		  } 
		}
		console.log("cookieValue: " + cookieValue);
		tab.attach({
		    contentScript: [ 'unsafeWindow.bungieToken = "' + cookieValue + '";']
		});	
	}
});

function handleClick(state) {
 	var tab = tabs.open(pageUrl);
	//&Egrave;worker.port.emit("cookie",cookieValue);
}

