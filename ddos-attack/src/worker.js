/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */



async function sendMultipleRequests({ targetUrl, requestTimes = 1, batchSize = 10 }) {
  let successfulRequests = 0;
  let allPromises = [];

  for (let i = 0; i < requestTimes; i++) {
    // Create a promise for the fetch request.
    let promise = fetch(targetUrl)
      .then(response => {
        if (response.status === 429) {
          throw new Error(`Rate limit hit after ${successfulRequests} requests`);
        }
        if (response.ok) {
          successfulRequests++;
        }
        return response;
      })
      .catch(error => {
        return `Request failed after ${successfulRequests} successful requests. Error: ${error.message}`;
      });

    allPromises.push(promise);

    if ((i + 1) % batchSize === 0 || i === requestTimes - 1) {
      try {
        // Wait for the current batch to complete.
        await Promise.all(allPromises);
      } catch (error) {
        return `Hit rate limit after ${successfulRequests} successful requests. Failed to send ${requestTimes - successfulRequests} requests`;
      }
      allPromises = [];
    }
  }

  return `Finished sending requests with ${successfulRequests} successful requests. Failed to send ${requestTimes - successfulRequests} requests`;
}


export class Fetcher {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    const weak = await sendMultipleRequests({ targetUrl: 'https://apiweak.authgate.work/hello', requestTimes: 300 });
    const fixed = await sendMultipleRequests({ targetUrl: 'https://api.authgate.work/', requestTimes: 300 });
    // return new Response(`Fixed version: ${fixed}`, { status: 200 });

    return new Response(`Weak version: ${weak}\nFixed version: ${fixed}`, { status: 200 });

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

