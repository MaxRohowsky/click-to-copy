chrome.action.onClicked.addListener(function(tab)
{

	chrome.tabs.insertCSS(tab.id, {file:'style/viewer.css'});

});