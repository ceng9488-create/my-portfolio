<script lang="ts">
	import { blockFlip } from '$lib/actions/block-flip';
	import {
		ARC_RADIUS,
		PANEL_RADIUS,
		YEAR_RADIUS,
		focalTransform,
		type SpreadSide
	} from '$lib/book/dial-geometry';
	import type { Dial } from '$lib/book/dial.svelte';
	import SkillChips from './SkillChips.svelte';

	/**
	 * Half of the skills dial.
	 *
	 * Both halves render the WHOLE dial, anchored to their own spine edge; each
	 * page's overflow clips away the half that belongs to the other. That is what
	 * lets the focal year straddle the gutter in one piece — so the two instances
	 * must be handed the SAME `dial`.
	 */
	let { dial, side }: { dial: Dial; side: SpreadSide } = $props();

	// Sized from ARC_RADIUS inline rather than a CSS variable, so the radius has
	// exactly one definition and the markers can't drift off the curve.
	const quarter = `width: ${ARC_RADIUS}px; height: ${ARC_RADIUS}px;`;
</script>

<div class="tl-arc tl-arc-{side}" style={quarter}></div>

<!-- Quarter disc matching the arc: kills flips inside the circle itself.
     The dots, years and panel sit outside it, so they block on their own. -->
<div class="tl-shield tl-shield-{side}" style={quarter} use:blockFlip></div>

<!-- One spoke per year, pivoting on the spine-bottom corner. Rotating the spoke
     (rather than re-translating the markers) keeps them travelling ALONG the
     circle instead of cutting the chord between two points. <button> targets are
     exempt from flipping via clickEventForward, so these need no shielding. -->
{#each dial.entries as entry, i (entry.year)}
	<div class="tl-spoke" style="transform: rotate({dial.spokeAngle(i)}deg);">
		<button
			class="tl-marker tl-dot"
			class:is-selected={dial.selected === i}
			style={dial.markerStyle(i, ARC_RADIUS)}
			aria-label="Show {entry.year}"
			onclick={() => dial.select(i)}
		></button>
		<button
			class="tl-marker tl-year"
			class:is-selected={dial.selected === i}
			style={dial.markerStyle(i, YEAR_RADIUS)}
			onclick={() => dial.select(i)}
		>
			{entry.year}
		</button>
	</div>
{/each}

<div class="tl-panel" style={focalTransform(PANEL_RADIUS, side)} use:blockFlip>
	{#key dial.selected}
		<SkillChips skills={dial.skills} />
	{/key}
</div>

<style>
	/* Each page draws a quarter arc anchored to its spine-bottom corner; open the
	   spread and the two quarters meet into one half circle on the bottom edge.
	   The rounded corner does all the work — with a 100% radius the two borders
	   merge into a pure curve, leaving no straight segment. */
	.tl-arc {
		position: absolute;
		bottom: 0;
		border-top: 1px dashed var(--book-accent);
		pointer-events: none;
	}

	.tl-arc-left {
		right: 0;
		border-left: 1px dashed var(--book-accent);
		border-radius: 100% 0 0 0;
	}

	.tl-arc-right {
		left: 0;
		border-right: 1px dashed var(--book-accent);
		border-radius: 0 100% 0 0;
	}

	/* Same quarter-disc geometry as .tl-arc, but hit-testable. Transparent still
	   receives clicks, and border-radius clips the hit area to the curve, so only
	   the inside of the circle is shielded — the outer corners still flip. */
	.tl-shield {
		position: absolute;
		bottom: 0;
	}

	.tl-shield-left {
		right: 0;
		border-radius: 100% 0 0 0;
	}

	.tl-shield-right {
		left: 0;
		border-radius: 0 100% 0 0;
	}

	/* A zero-size point pinned to the spine-bottom corner — the dial's centre.
	   Rotating it swings every marker it holds around that pivot. */
	.tl-spoke {
		position: absolute;
		bottom: 0;
		width: 0;
		height: 0;
		transition: transform var(--dial-duration) var(--dial-ease);
	}

	/* Anchored to whichever edge is the spine for this half. */
	:global(.tl-left) .tl-spoke,
	:global(.tl-left) .tl-panel {
		right: 0;
	}

	:global(.tl-right) .tl-spoke,
	:global(.tl-right) .tl-panel {
		left: 0;
	}

	/* Dial.markerStyle() pushes these out along the spoke and counter-rotates them
	   upright. Same easing as .tl-spoke so the two stay in lockstep. */
	.tl-marker {
		position: absolute;
		left: 0;
		top: 0;
		transition: transform var(--dial-duration) var(--dial-ease);
	}

	.tl-panel {
		position: absolute;
		bottom: 0;
		width: 150px;
	}

	.tl-dot {
		width: 18px;
		height: 18px;
		padding: 0;
		border: 2px solid var(--book-accent);
		border-radius: 50%;
		background: var(--book-parchment);
		cursor: pointer;
		transition:
			transform var(--dial-duration) var(--dial-ease),
			background 0.3s ease,
			box-shadow 0.3s ease;
	}

	.tl-dot:hover {
		background: var(--book-tan);
	}

	.tl-dot.is-selected {
		background: var(--book-accent);
		box-shadow: 0 0 0 4px rgba(139, 94, 60, 0.25);
	}

	.tl-year {
		border: none;
		background: none;
		padding: 0;
		font: inherit;
		font-size: 1.05rem;
		font-variant-numeric: tabular-nums;
		color: var(--book-accent-soft);
		cursor: pointer;
		white-space: nowrap;
		transition:
			transform var(--dial-duration) var(--dial-ease),
			color 0.3s ease,
			font-size 0.3s ease;
	}

	.tl-year:hover {
		color: var(--book-accent);
	}

	.tl-year.is-selected {
		font-size: 1.45rem;
		font-weight: 700;
		color: var(--book-accent-deep);
	}

	@media (prefers-reduced-motion: reduce) {
		.tl-spoke,
		.tl-marker,
		.tl-dot,
		.tl-year,
		.tl-panel {
			transition-duration: 0.01ms;
		}
	}
</style>
