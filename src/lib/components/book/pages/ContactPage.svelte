<script lang="ts">
	import { contact } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';
	import { Mail } from '@lucide/svelte';
	import { siGithub } from 'simple-icons';

	// Lucide dropped brand marks and simple-icons no longer ships LinkedIn
	// (trademark), so GitHub comes from simple-icons and LinkedIn is inlined.
	const linkedinPath =
		'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.848 3.37-1.848 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';
	const brand: Record<string, string> = { github: siGithub.path, linkedin: linkedinPath };
</script>

<PageShell background="page5.png" cover contentTop="3rem">
	<div class="max-w-80">
		<h2 class="spread-title">{contact.title}</h2>
		<p>{contact.blurb}</p>
		<ul class="mt-4 contact-links">
			{#each contact.links as link (link.href)}
				<li>
					<a href={link.href} target={link.icon === 'mail' ? undefined : '_blank'} rel="noreferrer">
						{#if link.icon === 'mail'}
							<Mail class="contact-icon" size={18} aria-hidden="true" />
						{:else}
							<svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d={brand[link.icon]} />
							</svg>
						{/if}
						<span>{link.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</PageShell>

<style>
	.spread-title {
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin: 0 0 1.2rem;
		text-align: center;
		color: var(--book-accent-deep);
	}
	.contact-links {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.contact-links a {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		text-decoration: none;
		color: inherit;
		transition: opacity 0.15s ease;
	}

	.contact-links a:hover {
		opacity: 0.7;
	}

	:global(.contact-icon) {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}
</style>
