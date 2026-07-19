<script lang="ts">
	import { blockFlip } from '$lib/actions/block-flip';
	import type { SpreadSide } from '$lib/book/dial-geometry';
	import type { Dial } from '$lib/book/dial.svelte';
	import PageShell from '../PageShell.svelte';
	import SpreadTitle from '../SpreadTitle.svelte';
	import SkillNote from '../SkillNote.svelte';
	import SkillsDial from '../SkillsDial.svelte';
	import SkillsGrid from '../SkillsGrid.svelte';

	/**
	 * One leaf of the skills spread. The two leaves are the same page mirrored:
	 * each anchors the dial to its own spine edge and clips away the other's half.
	 * Only the left leaf carries the title — centred on the spread, it would
	 * otherwise print twice.
	 */
	let { dial, side, background }: { dial: Dial; side: SpreadSide; background: string } = $props();
</script>

<!-- The dial is positioned from the bottom edge, so the shared top padding would
     only push the title off. `tl-{side}` tells the dial which edge is its spine. -->
<PageShell {background} contentTop="0" contentClass="tl-{side}">
	{#if side === 'left'}
		<div class="title-slot">
			<SpreadTitle chapter={2} title="Skills" />
		</div>
		<SkillsGrid {dial} />
	{:else}
		<!-- The right leaf's top corner is the only space the dial doesn't reach:
		     the arc rises from the spine-bottom corner and the panel hugs the
		     gutter, so the note is inset past both. -->
		<div class="note-slot" use:blockFlip>
			{#key dial.selected}
				<SkillNote note={dial.note} year={dial.year} />
			{/key}
		</div>
	{/if}
	<SkillsDial {dial} {side} />
</PageShell>

<style>
	/* Unlike the other spreads, this title is lifted out of flow so the dial can
	   own the whole leaf beneath it. The wrapper carries the position; the
	   heading itself stays the shared SpreadTitle. */
	.title-slot {
		position: absolute;
		top: 4rem;
		left: 0;
		right: 0;
	}

	/* Left inset clears the panel that overhangs the gutter (half of its 150px);
	   the block ends well above the arc, which only reaches this far out near the
	   bottom of the leaf. */
	.note-slot {
		position: absolute;
		top: 3.5rem;
		left: 96px;
		right: 1.2rem;
	}
</style>
