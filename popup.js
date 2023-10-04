document.getElementById("changeColor").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeBackgroundColor,
      });
    });
  });
  
  function changeBackgroundColor() {
    document.body.style.backgroundColor = "lightblue";
  }