let appManager;

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'injectCode') {

    $(function () {
      appManager = new AppManager();
      appManager.Inject()
    });
  }
});

