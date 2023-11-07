/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


async function sendMultipleRequests({ targetUrl }) {
  let promises = [];
  for (let i = 0; i < 100; i++) {
    let promise = fetch(targetUrl).then(response => {
      if (response.status === 429) { // HTTP 429 Too Many Requests
        throw new Error(`Rate limit hit after ${i} requests`);
      }
    });
    promises.push(promise);
  }

  try {
    await Promise.all(promises);
    return new Response(`No rate limit hit after 100 requests`, { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 200 });
  }
}

export default {
  async fetch(request, env, ctx) {
    return await sendMultipleRequests({ targetUrl: "http://authgate.work" });
  },
};
