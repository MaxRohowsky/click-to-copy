document.getElementById('startButton').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'injectCode' });
  });
});




/*

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {


    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['scripts/start.js'],
    });
  });
});*/