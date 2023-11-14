# authgate-mitm-attack
Man-in-the-middle attack chrome extension.

# Installation

## Download the Extension:
* Download the latest version of API Monitor from this repo.
* Load the Extension in Chrome:
Open Chrome and navigate to chrome://extensions/.
* Enable “Developer Mode” at the top right corner.
* Click on “Load unpacked” and select the directory where the extension files are located.

# Usage

* After installation, API Monitor will automatically start monitoring any POST requests to https://api.authgate.work/pay made by pages in Chrome.

## Viewing Logs:
* To view the logs, open the extension's background page.
* Go to chrome://extensions/.
* Find API Monitor in your list of extensions.
* Click on the “Background Page” link (might be named “Service Worker” depending on your extension setup).
* In the opened Developer Tools window, switch to the “Console” tab to see the logs.
