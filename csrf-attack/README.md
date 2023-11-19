# authgate-worker-csrf

## Introduction

This attacker aims to mimic the penetration attack of DDoS by sending multiple requests in a short time. The vulnerable version of the web service fails to handle it, while the later version fixed this issue by integrating with Cloudflare to set a rate limit.

## Get Started

### Installation

- Download the latest version of API Monitor from this repo.

- Run following commands.

```
npm install
npm run dev
```

### Testing Procedure

- After starting the script, the attacker will automatically send requests to https://api.authgate.work/pay.
