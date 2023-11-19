/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


// async function sendMultipleRequestsSlowly({ targetUrl, requestTimes = 1 }) {
//   let url = new URL(targetUrl);

//   try {
//     for (let i = 0; i < requestTimes; i++) {
//       let response = await fetch(url);
//       if (response.status === 429) { // HTTP 429 Too Many Requests
//         return new Response(`Rate limit hit after ${i} requests`, { status: 200 });
//       }
//     }
//     return new Response(`No rate limit hit after ${requestTimes} requests`, { status: 200 });

//   } catch (error) {
//     return new Response(error.message, { status: 200 });
//   }
// }


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
    // return new Response('Hello World');

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

    // Use the Durable Object.

    // const responseWeak = await obj.fetch('https://apiweak.authgate.work/hello');

    // const response = await obj.fetch('https://api.authgate.work/');

    const response = await obj.fetch(request);

    return response;
    // return new Response(`Weak version: ${await response.weak},\nFixed version: ${await response.fixed}`, { status: 200 });
  },
};

