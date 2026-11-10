#!/usr/bin/env node
// Opens a probe issue in the inbox repo so the mail forwarder can be tested.
import { execFileSync } from 'node:child_process';

const payload = {
	kind: 'contact',
	email: 'mrxubr@gmail.com',
	name: 'Probe',
	message: 'probe run - ignore',
	source: 'ci-probe',
};

const body = [
	'dhyaana-form-submission',
	'',
	'```json',
	JSON.stringify(payload, null, 2),
	'```',
].join('\n');

try {
	const out = execFileSync(
		'gh',
		['issue', 'create', '--title', 'dhyaana-form-submission: contact', '--body', body, '--label', 'form-submission'],
		{ encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
	);
	console.log('created:', out.trim());
} catch (error) {
	console.error('could not open the probe issue:', error?.stderr?.toString() ?? error?.message);
	process.exit(1);
}
