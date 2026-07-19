<script lang="ts">
	import { about } from '$lib/data/resume';
	import PageShell from '../PageShell.svelte';

	/** The paragraph split around `about.highlight` so the phrase can carry its
	 * own marker sweep. If the phrase ever drifts out of the copy the split
	 * collapses to `[body]` and the page just reads as plain text. */
	const [before, after] = about.body.split(about.highlight);
</script>

<PageShell background="page2.png">
	<div class="max-w-80">
		<h2 class="page-heading">
			<span class="chapter-eyebrow">Chapter 1</span>
			{about.title}
		</h2>
		<p class="pt-8">
			{before}{#if after}<span class="marker">{about.highlight}</span>{after}{/if}
		</p>
	</div>
</PageShell>

<style>
	/* Highlighter sweep: a gradient painted behind the text, grown from 0 to full
	   width. Animating background-size keeps it off the layout path. */
	.marker {
		background-image: linear-gradient(
			transparent 55%,
			color-mix(in srgb, var(--book-accent) 35%, transparent) 55%
		);
		background-repeat: no-repeat;
		background-size: 0% 100%;
		padding: 0 0.1em;
		animation: marker-sweep 60s linear infinite;
	}

	/* One sweep a minute. The delay before the first draw and the erase at the
	   end live in the keyframes rather than animation-delay, so every repeat
	   paces the same as the first. Percentages are of the 60s cycle: draw over
	   ~0.7s starting at 1.4s, hold, then erase over ~1.2s. */
	@keyframes marker-sweep {
		0%,
		2.3% {
			background-size: 0% 100%;
		}
		3.5%,
		96% {
			background-size: 100% 100%;
		}
		98%,
		100% {
			background-size: 0% 100%;
		}
	}

	/* No looping sweep for reduced motion — the highlight is just always there. */
	@media (prefers-reduced-motion: reduce) {
		.marker {
			animation: none;
			background-size: 100% 100%;
		}
	}
</style>
