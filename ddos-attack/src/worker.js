/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */



async function sendMultipleRequests({ targetUrl, requestTimes = 1 }) {
  let promises = [];
  const url = targetUrl;

  for (let i = 0; i < requestTimes; i++) {
    let promise = (async function (index) {
      const response = await fetch(url);
      if (response.status === 429) {
        throw new Error(`Rate limit hit after ${index + 1} requests`);
      }
    })(i);

    promises.push(promise);
  }

  try {
    await Promise.all(promises);
    return `No rate limit hit after ${requestTimes} requests`;
  } catch (error) {
    return `Got error: ${error.message}`;

  }
}

export class Fetcher {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    const weak = await sendMultipleRequests({ targetUrl: 'https://apiweak.authgate.work/hello', requestTimes: 100 });
    const fixed = await sendMultipleRequests({ targetUrl: 'https://api.authgate.work/', requestTimes: 100 });

    return new Response(`Weak version: ${weak},\nFixed version: ${fixed}`, { status: 200 });

  };
}


export default {
  async fetch(request, env, ctx) {
    // Get the ID of the Durable Object.
    const id = env.ddos2.idFromName('Fetcher');

    // Get the instance of the Durable Object.
    const obj = env.ddos2.get(id);

    const response = await obj.fetch(request);

    return response;
  },
};

