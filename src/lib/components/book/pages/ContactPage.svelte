<script lang="ts">
	import { contact } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';
	import SpreadTitle from '../SpreadTitle.svelte';
	import { Mail, Check, Copy } from '@lucide/svelte';
	import { siGithub } from 'simple-icons';

	// Lucide dropped brand marks and simple-icons no longer ships LinkedIn
	// (trademark), so GitHub comes from simple-icons and LinkedIn is inlined.
	const linkedinPath =
		'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.848 3.37-1.848 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';
	const brand: Record<string, string> = { github: siGithub.path, linkedin: linkedinPath };

	// Plenty of desktops have no mail client wired up, so `mailto:` opens nothing.
	// Copying the address gives those visitors a way through.
	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout>;

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(contact.email);
			copied = true;
			clearTimeout(resetTimer);
			resetTimer = setTimeout(() => (copied = false), 1600);
		} catch {
			// Clipboard blocked (insecure context, denied permission) — the mailto
			// links above still work, so there is nothing useful to say here.
		}
	}
</script>

<PageShell background="page5.png" cover contentTop="3rem">
	<div class="max-w-80">
		<SpreadTitle chapter={6} title={contact.title} />
		<p class="blurb">{contact.blurb}</p>
		<p class="prompt">{contact.prompt}</p>
		<ul class="contact-links">
			{#each contact.links as link (link.href)}
				<li>
					<a href={link.href} target={link.icon === 'mail' ? undefined : '_blank'} rel="noreferrer">
						{#if link.icon === 'mail'}
							<Mail class="contact-icon" size={16} aria-hidden="true" />
						{:else}
							<svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d={brand[link.icon]} />
							</svg>
						{/if}
						<span>{link.label}</span>
					</a>
					{#if link.icon === 'mail'}
						<button
							class="copy"
							type="button"
							onclick={copyEmail}
							aria-label={copied ? 'Email address copied' : 'Copy email address'}
						>
							{#if copied}
								<Check class="contact-icon icon-xs" size={14} aria-hidden="true" />
								<span>Copied</span>
							{:else}
								<Copy class="contact-icon icon-xs" size={14} aria-hidden="true" />
								<span>Copy</span>
							{/if}
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</PageShell>

<style>
	.blurb {
		margin: 0;
	}

	.prompt {
		margin: 0.4rem 0 0;
		font-size: 0.9em;
		opacity: 0.8;
	}

	.contact-links {
		list-style: none;
		padding: 0;
		/* Sets the links apart from the invitation above them. */
		margin: 2.5rem 0 0;
		display: flex;
		flex-direction: column;
		/* Pills carry their own padding, so they need less gap than bare rows did. */
		gap: 0.4rem;
	}

	/* The pill lives on the row, not the anchor, so the copy button sits inside
	   the same border. `align-self` keeps each pill as wide as its own content —
	   without it the column would stretch them all to full width. */
	.contact-links li {
		display: inline-flex;
		align-self: flex-start;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.7rem;
		border: 1px solid color-mix(in srgb, var(--book-accent-deep) 35%, transparent);
		border-radius: 999px;
		font-size: 0.9em;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	.contact-links li:hover {
		background-color: color-mix(in srgb, var(--book-accent-deep) 10%, transparent);
		border-color: var(--book-accent-deep);
	}

	.contact-links a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--book-accent-deep);
	}

	.copy {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		/* Sharing the pill with the link, so a rule keeps the two readable. */
		padding: 0.1rem 0 0.1rem 0.5rem;
		border: 0;
		border-left: 1px solid color-mix(in srgb, var(--book-accent-deep) 25%, transparent);
		border-radius: 0;
		background: none;
		color: var(--book-accent-deep);
		opacity: 0.55;
		font: inherit;
		font-size: 0.75em;
		cursor: pointer;
		transition: opacity 0.15s ease;
	}

	.copy:hover {
		opacity: 1;
	}

	/* Sized to sit inside the pills rather than dominate them. */
	:global(.contact-icon) {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}

	:global(.contact-icon.icon-xs) {
		width: 14px;
		height: 14px;
	}
</style>
