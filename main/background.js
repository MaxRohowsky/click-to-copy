chrome.action.onClicked.addListener((tab) => {
  console.log('action clicked');
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['scripts/content.js']
  }).catch((error) => console.log(`Failed to inject Script: ${error}`));
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files:["style/viewer.css", "style/appmenu.css", "style/clipboard.css"]
  }).then(() => console.log("CSS injected"))
  .catch((error) => console.log(`Failed to inject CSS: ${error}`));
});




