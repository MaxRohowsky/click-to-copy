// Listen for messages from content script
// popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.cssText) {
      document.getElementById("css-info").innerHTML = message.cssText;
    }
  });