## Introduction
This Chrome extension is designed to intercept and display the payment information submitted by users. 

This tool serves as a demonstrative proof of concept, highlighting the risks associated with transmitting payment details in plain text over the front end. It effectively illustrates the vulnerability of such information to Man in The Middle (MITM) attacks, where sensitive data can be easily intercepted or altered by unauthorized entities. 

This extension is a critical part of our security analysis, underscoring the importance of robust encryption methods to safeguard user data during online transactions.

## Get Started

### Installation
* Download the latest version of API Monitor from this repo.
* Open Chrome and navigate to chrome://extensions/.
* Enable “Developer Mode” at the top right corner.
* Click on “Load unpacked” and select the directory where the extension files are located.

### Viewing Logs
* Find API Monitor in your list of extensions.
* Click on the “Background Page” link (might be named “Service Worker” depending on your extension setup).
* In the opened Developer Tools window, switch to the “Console” tab to see the logs.

### Testing Procedure

* After installation, API Monitor will automatically start monitoring any POST requests to https://apiweak.authgate.work/pay made by pages in Chrome.
* Now you can navigate to https://feweak.authgate.work and make a payment.
* After successfully making a payment, the API Monitor will automatically catch the payment information. Click `request body` on the console window to expand the whole list of body contents, and then click on the small icon next to the text `ArrayBuffer` to see the payment information.

    <img width="550" alt="Screenshot1" src="https://github.com/Privacy-and-Security/AuthGate_Attack_Tools/assets/82356933/c397ff34-ee54-4973-8436-e2c51b7246d1">
    
    <img width="550" alt="Screenshot2" src="https://github.com/Privacy-and-Security/AuthGate_Attack_Tools/assets/82356933/1199465b-98f4-4816-abcc-d5fbe95695c7">
