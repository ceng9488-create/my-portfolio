<script lang="ts">
	import type { Note } from '$lib/data/timeline';

	/** The focal year's story. Re-keyed by the caller, so `note-in` replays as a
	 * new year lands. */
	let { note, year }: { note: Note; year: string } = $props();
</script>

<article class="tl-note">
	<p class="note-year">{year}</p>
	<h3 class="note-headline">{note.headline}</h3>
	<p class="note-body">{note.body}</p>
</article>

<style>
	.tl-note {
		animation: note-in 0.45s ease both;
	}

	@keyframes note-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.note-year {
		margin: 0;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		font-variant-numeric: tabular-nums;
		color: var(--book-accent-soft);
	}

	.note-headline {
		margin: 0.15rem 0 0.5rem;
		font-size: 1rem;
		font-weight: 700;
		color: var(--book-accent-deep);
	}

	.note-body {
		margin: 0;
		font-size: 1rem;
		line-height: 1.6;
		color: var(--book-ink);
	}

	@media (prefers-reduced-motion: reduce) {
		.tl-note {
			animation-duration: 0.01ms;
		}
	}
</style>
