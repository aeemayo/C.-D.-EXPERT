
const readline = require('readline');

function ask(question, { hide = false } = {}) {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

	if (!hide) {
		return new Promise((resolve) => rl.question(question, ans => { rl.close(); resolve(ans); }));
	}

	// mask input for passwords
	return new Promise((resolve) => {
		rl.stdoutMuted = true;
		rl._writeToOutput = function _writeToOutput(stringToWrite) {
			if (rl.stdoutMuted) rl.output.write('*');
			else rl.output.write(stringToWrite);
		};

		rl.question(question, (answer) => {
			rl.history = rl.history || [];
			rl.close();
			rl.output.write('\n');
			resolve(answer);
		});
	});
}

(async function main() {
	try {
		const { create } = await import('@storacha/client');
		const client = await create();

		const envEmail = process.env.STORACHA_EMAIL;

		const email = envEmail || await ask('Storacha email: ');

		if (!email) {
			console.error('No email provided. Set STORACHA_EMAIL or enter it when prompted.');
			process.exit(2);
		}

		try {
			await client.login(email);
		} catch (err) {
			console.error('Login failed:', err && err.message ? err.message : err);
			process.exit(3);
		}

		// call the upload list capability
		if (!client.capability || !client.capability.upload || !client.capability.upload.list) {
			console.error('The client does not expose client.capability.upload.list(). Is @storacha/client up to date?');
			process.exit(4);
		}

		const result = await client.capability.upload.list();
        console.log('Uploads result:', result)


	} catch (err) {
		console.error('Unexpected error:', err && err.stack ? err.stack : err);
		process.exit(1);
	}
})();

