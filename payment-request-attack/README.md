## Introduction
This is a Cloudflare script designed to mimic some fake payment requests to the backend server. 

The primary purpose of this script is to validate and demonstrate a crucial security concern: the vulnerability of our backend system to spoofed payment requests.

## Get Started
1. To begin, execute the following commands in your terminal:
```
npm install
npm run dev
```
2. After the guide text appears, type `b` to open the browser. This action will trigger the display of the message `Add 2 entries` on the new webpage.

3. Proceed to visit the Firebase console at `https://console.firebase.google.com/u/0/project/authgate-5ab07/firestore/data/2Fpayments2Fz1fZRw5oKED9GTgnArGa`. Here, you will observe the addition of two new data entries in the firebase database.