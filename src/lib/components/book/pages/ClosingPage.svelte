<script lang="ts">
	import { closing } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';

	/**
	 * The back leaf of the contact spread. It exists mostly so the page count
	 * stays even — page-flip binds pages in facing pairs, and an odd count leaves
	 * the last leaf flipping against nothing.
	 */
</script>

<PageShell background="page6.png" cover contentTop="12rem">
	<div class="end">
		<h2>{closing.title}</h2>
		<p>{closing.body}</p>
		<p class="signoff">{closing.signoff}</p>
	</div>
</PageShell>

<style>
	.end {
		max-width: 18rem;
		text-align: center;
	}

	h2 {
		margin: 0 0 1rem;
		font-size: 1.4rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--book-accent-deep);
	}

	.end p {
		font-size: 0.9rem;
		line-height: 1.6;
	}

	.signoff {
		margin-top: 1.5rem;
		font-style: italic;
		color: var(--book-accent);
	}
</style>
