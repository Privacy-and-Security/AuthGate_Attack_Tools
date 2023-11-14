chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.url.includes('https://api.authgate.work/pay')) {
        if (details.requestBody) {
            console.log('Detected API request to Authgate Pay:', details);
            console.log('Request Body:', details.requestBody);
        }
      }
    },
    {urls: ["<all_urls>"]},
    ["requestBody"]
  );