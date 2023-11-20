/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


async function sendPaymentData({ targetUrl, requestTimes = 1 }) {
  let url = new URL(targetUrl);

  try {
    for (let i = 0; i < requestTimes; i++) {
      const jsonData = JSON.stringify({
        name: 'attack' + Math.random() * 100000,
        cardNumber: Math.random() * 100000
      });

      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      });
    }
    return new Response(`Add ${requestTimes} entries.`, { status: 200 });

  } catch (error) {
    return new Response(error.message, { status: 200 });
  }
}

export default {
  async fetch(request, env, ctx) {
    // Get the ID of the Durable Object.
    const id = env.worker_payment_request.idFromName('Fetcher');

    // Get the instance of the Durable Object.
    const obj = env.worker_payment_request.get(id);

    // Use the Durable Object.
    const response = await obj.fetch(request);

    return response;
  },
};


export class Fetcher {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    // return new Response('Hello World');
    return await sendPaymentData({ targetUrl: 'https://apiweak.authgate.work/pay', requestTimes: 2 });
  }
}
