chrome.action.onClicked.addListener(function(tab)
{

	chrome.tabs.insertCSS(tab.id, {file:'style/viewer.css'});
	chrome.tabs.insertCSS(tab.id, {file:'style/appmenu.css'});
	chrome.tabs.insertCSS(tab.id, {file:'style/clipboard.css'});

});