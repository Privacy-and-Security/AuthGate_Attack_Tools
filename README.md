## Introduction

Welcome to our repository, specifically focused on simulating various attack vectors targeting AuthGate, our authentication and payment gateway. This collection contains four distinct directories, each hosting scripts designed to emulate different types of cyber attacks. These simulations play a crucial role in stress-testing and validating the security robustness of AuthGate against real-world threats.

### Directory Overview:

1. **/brute-force-attack**: 
   - This directory contains scripts simulating Brute-Force Attacks on the login system. It is designed to test the system's resistance to unauthorized access attempts through repetitive and systematic password guessing.

2. **/ddos-attack**: 
   - Here, you'll find scripts for executing a Distributed Denial-of-Service (DDoS) attack on the AuthGate server. These scripts aim to assess the server's capability to handle and mitigate massive, coordinated access requests, preventing service disruption against hostile attacks.

3. **/mitm-attack**: 
   - This section includes a Chrome extension stimulated Man In The Middle (MITM) attacks. It demonstrates the potential risks of data interception during communication sessions.

4. **/payment-request-attack**: 
   - The scripts in this directory are focused on spoofed payment request attacks targeting the AuthGate server. They evaluate the system's ability to detect and block falsified payment requests, ensuring the integrity of transactions.

Through rigorous testing with these scripts, we aim to identify and rectify potential vulnerabilities, thereby enhancing the security and reliability of AuthGate.