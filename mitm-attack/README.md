## Introduction
This Chrome extension is designed to intercept and display the payment information submitted by users. 

This tool serves as a demonstrative proof of concept, highlighting the risks associated with transmitting payment details in plain text over the front end. It effectively illustrates the vulnerability of such information to Man in The Middle (MITM) attacks, where sensitive data can be easily intercepted or altered by unauthorized entities. 

This extension is a critical part of our security analysis, underscoring the importance of robust encryption methods to safeguard user data during online transactions.

## Get Started

### Installation
* Download the latest version of API Monitor from this repo.
* Load the Extension in Chrome:
Open Chrome and navigate to chrome://extensions/.
* Enable “Developer Mode” at the top right corner.
* Click on “Load unpacked” and select the directory where the extension files are located.

### Testing Procedure

* After installation, API Monitor will automatically start monitoring any POST requests to https://api.authgate.work/pay made by pages in Chrome.
* Now you can navigate to https://authgate.work and make a payment.

### Viewing Logs
* To view the logs, open the extension's background page.
* Go to chrome://extensions/.
* Find API Monitor in your list of extensions.
* Click on the “Background Page” link (might be named “Service Worker” depending on your extension setup).
* In the opened Developer Tools window, switch to the “Console” tab to see the logs.
