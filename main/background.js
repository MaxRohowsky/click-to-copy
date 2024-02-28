

chrome.runtime.onInstalled.addListener((object) => {
  // Inject Extension on install
  const manifest = chrome.runtime.getManifest();

  const injectIntoTab = (tab) => {
    const scripts = manifest.content_scripts[0].js;
    const s = scripts.length;

    const styles = manifest.content_scripts[0].css;
    const st = styles.length;

    for (let i = 0; i < s; i++) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [scripts[i]],
      });
    }

    for (let i = 0; i < st; i++) {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: [styles[i]],
      });
    }

  };

  // Get all windows
  chrome.windows.getAll(
    {
      populate: true,
    },
    (windows) => {
      let currentWindow;
      const w = windows.length;

      for (let i = 0; i < w; i++) {
        currentWindow = windows[i];

        let currentTab;
        const t = currentWindow.tabs.length;
        console.log("Tabs: " + t);
        for (let j = 0; j < t; j++) {
          currentTab = currentWindow.tabs[j];
          console.log(currentTab);
          if (!currentTab.url.includes("chrome://") && !currentTab.url.includes("chrome-extension://") && !currentTab.url.includes("chrome.google.com")) {
            injectIntoTab(currentTab);
          }
        }
      }
    }
  );

  if (object.reason === "install") {
    chrome.tabs.create({ url: "https://maxontech.io/" });
  }
});




chrome.action.onClicked.addListener((tab) => {

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['scripts/start.js']
  }).catch((error) => console.log(`Failed to inject Script: ${error}`));
  

});

