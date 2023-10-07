// Handle clicking on the extension icon
chrome.browserAction.onClicked.addListener(function (tab) {
  // Open popup.html in a new tab
  chrome.tabs.create({ url: "popup.html" });
});